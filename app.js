"use strict";

(async()=>{
  const getData = async (url) => {
  const response = await fetch(url)
  if(!response.ok) throw new Error ("there's something wrong right now try again later")

  return response.json()
  }

  const fetchcountries = async () => {
    try{const countries = await getData('https://restcountries.com/v3.1/all?fields=name,population,region,currencies')
      return countries
    } catch (err){
      console.log (`you need to check ${err}`)
    }   
  }


  document.getElementById('newForm').addEventListener('submit',(event)=>{
    event.preventDefault()

  })

  document.getElementById('showBtn').addEventListener('click', ()=>{
    const inHere = document.getElementById('inHere');
    const template = countries.map( ({region,population,name}) => {
    return `
      <div class="border">
      <p>name: ${name.common}</p>
      <p>Region: ${region}</p>
      <p>Population: ${population}</p>
      </div>`
     
    }).join('')
    inHere.innerHTML = template;
  })

  document.getElementById('clearBtn').addEventListener('click', ()=>{ 
    document.getElementById('inHere').innerHTML = ''
    document.getElementById('tableFirst').innerHTML = ''
    document.getElementById('tableScnd').innerHTML = ''
    document.getElementById('searchInfo').value = ''
  })

  document.getElementById('searchBtn').addEventListener('click', ()=> {findRegion(countries)})
  const findRegion = (countriesArry) => {
    const userInput = document.getElementById('searchInfo').value.toLowerCase()
      const filteredCountries = countriesArry.filter(country => {
        return country.name.common.toLowerCase().startsWith(userInput); 
      });
      if (filteredCountries.length === 0) throw new Error("please type again ");
      addTotalcountryAndPopulation(filteredCountries)
      insertToTable(filteredCountries)
      const groupedRegions = groupCountriesByRegion(filteredCountries)
      insertToTable2(groupedRegions)

  }
  

  const groupCountriesByRegion = (countriesArray) => {
      return countriesArray.reduce((cumulative, {region}) => {
          cumulative[region] = (cumulative[region] || 0) + 1;
          return cumulative;
      }, {});
  };

  const addTotalcountryAndPopulation = regionCumu => {
    const inHere = document.getElementById('inHere');
    const totals = regionCumu.reduce((cumulative, country)=>{
      cumulative.totalPopulation += country.population;
      cumulative.totalCountries +=1;
      console.log(cumulative)
      return cumulative 
    }, {totalPopulation:0, totalCountries:0,})
    const avaragePopulation = totals.totalPopulation/totals.totalCountries;
    const template = `
    <p>Total countries result: ${totals.totalCountries}</p>
    <p> total countries population: ${totals.totalPopulation}</p>
    <p>Average Population: ${avaragePopulation.toFixed(0)}</p>`;
    inHere.innerHTML = template
  }

  const insertToTable = (regionCumu) => {
    const table = document.getElementById('tableFirst')
    const template = regionCumu.map(({population , name : {common}}) =>`
      <tr>
        <td>${common}</td>
        <td>${population}</td>
      </tr> `).join('')
    table.innerHTML = template;
  }



  const insertToTable2 = (regionCumu) => {
    const table = document.getElementById('tableScnd')
    const template = Object.entries(regionCumu).map(([region, count]) => `
        <tr>
          <td>${region}</td>
          <td>${count}</td>
        </tr> ` ).join('')
      table.innerHTML = template;
}


  






  const countries = await fetchcountries();

  

  if(countries) console.log('success1');
  

})()