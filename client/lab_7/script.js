function getRandomIntInclusive(min, max) {
    const newMin = Math.ceil(min);
    const newMax = Math.floor(max);
    return Math.floor(Math.random(
    ) * (newMax - newMin + 1) + newMin); 
  }
  
  function restArrayMake(dataArray) {
    const range = [...Array(15).keys()];
    const listItems = range.map((item, index) => {
      const restNum = getRandomIntInclusive(0, dataArray.length - 1);
      return dataArray[restNum];
    });
  
    return listItems;
  }
  
  function createHtmlList(collection) {
    console.log(collection);
    const targetList = document.querySelector('.resto-list');
    targetList.innerHTML = '';
    collection.forEach((item) => {
      const {name} = item;
      const displayName = name.toLowerCase();
      const injectThisItem = `<li>${displayName}</li>`;
      targetList.innerHTML += injectThisItem;
    });
  }
  
  async function mainEvent() {
    console.log('script loaded');
    const form = document.querySelector('.hunger-form');
    const submit = document.querySelector('.submit');
  
    const resto = document.querySelector('#resto_name');
    const zipcode = document.querySelector('#zipcode');
    submit.style.display = 'none';
  
    const results = await fetch('/api/foodServicesPG'); 
    const arrayFromJson = await results.json(); 
  
    if (arrayFromJson.data.length > 0) {
      submit.style.display = 'block';
  
      let currentArray = [];
      resto.addEventListener('input', async (event) => {
        if (currentArray.length < 1) {
          return;
        }
  
        const selectResto = currentArray.filter((item) => {
          const lowerName = item.name.toLowerCase();
          const lowerValue = event.target.value.toLowerCase();
          return lowerName.includes(lowerValue);
        });
        createHtmlList(selectResto);
      });
  
      zipcode.addEventListener('input', async (event) => {
        if (currentArray.length < 1) {
          return;
        }
        const selectZip = currentArray.filter((item) => item.zip.includes(event.target.value)
        );
  
        createHtmlList(selectZip);
      });
  
      form.addEventListener('submit', async (submitEvent) => {
        submitEvent.preventDefault();
        // console.log('form submission'); // this is substituting for a "breakpoint"
        // arrayFromJson.data - we're accessing a key called 'data' on the returned object
        // it contains all 1,000 records we need
        currentArray = restArrayMake(arrayFromJson.data);
        console.log(currentArray);
        createHtmlList(currentArray);
      });
    }
  }
  // this actually runs first! It's calling the function above
  document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests