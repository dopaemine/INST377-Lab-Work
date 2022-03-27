async function mainEvent() { 
    const form = document.querySelector('.hunger-form');
    form.addEventListener('submit', async (submitEvent) => { 
      submitEvent.preventDefault(); 
      console.log('Anyone here?'); 
      const results = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json'); 
      const arrayFromJson = await results.json(); 
      console.table(arrayFromJson); 
      
    });
  }
  
  document.addEventListener('DOMContentLoaded', async () => mainEvent()); 