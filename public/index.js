const app = function(){
  const url = "https://restcountries.eu/rest/v2/all"
  const dropdown = document.getElementById('country-dropdown')

  makeRequest(url, requestComplete)

}

const findCountry = function(countries){

  const countryName = this.value
  const countryInfo = countries.filter(country => country.name === countryName)[0]

  console.log(countryInfo);

  const jsonString = JSON.stringify(countryInfo)
  localStorage.setItem("recentCountry", jsonString)

  const viewCountries = []
  viewCountries.push(countryInfo)

  const borderingAlpha3Codes = countryInfo.borders

  borderingAlpha3Codes.forEach(function(alpha3Code){
    const countryInfo = countries.filter(country => country.alpha3Code === alpha3Code)[0]
    viewCountries.push(countryInfo)
  })

  populatePage(viewCountries)
}

const populatePage = function(countries) {

  // console.log(countries);

  const ul = document.getElementById('country')
  ul.innerHTML = ''

  countries.forEach(function(country){
    const li1 = document.createElement('li')
    const li2 = document.createElement('li')
    const li3 = document.createElement('li')

    li1.innerText = "Name: " + country.name
    li2.innerText = "Population: " + country.population
    li3.innerHTML = "Capital: " + country.capital

    ul.appendChild(li1)
    ul.appendChild(li2)
    ul.appendChild(li3)

    const br = document.createElement('br')

    ul.appendChild(br)
  })

}

const makeRequest = function(url, callback){
  const request = new XMLHttpRequest()
  request.open("GET", url)
  request.addEventListener('load', callback)
  request.send()
}

const requestComplete = function(){
  if(this.status !== 200) return
  const jsonString = this.responseText
  const countries = JSON.parse(jsonString)

  populateDropdown(countries)
}


const populateDropdown = function(countries){
  const dropdown = document.getElementById('country-dropdown')

  countries.forEach(function(country){
    const option = document.createElement('option')
    option.innerText = country.name
    dropdown.appendChild(option)
  })

  if(localStorage.getItem('recentCountry') !== null) {
    const jsonString = localStorage.getItem('recentCountry')
    const countryInfo = JSON.parse(jsonString)
    const countryArray = []

    countryArray.push(countryInfo)

    populatePage(countryArray)
  }

  dropdown.addEventListener('change', findCountry.bind(dropdown, countries))
}

document.addEventListener('DOMContentLoaded', app);
