
const API_URL = 'https://restcountries.eu/rest/v2/all'
const SEARCH_API ='https://restcountries.eu/rest/v2/name/'
const EUROPE_API = 'https://restcountries.eu/rest/v2/region/europe'
const AFRICA_API = 'https://restcountries.eu/rest/v2/region/africa'
const AMERICAS_API = 'https://restcountries.eu/rest/v2/region/americas'
const ASIA_API = 'https://restcountries.eu/rest/v2/region/asia'
const OCEANIA_API = 'https://restcountries.eu/rest/v2/region/oceania'
const form = document.getElementById('form')
const search = document.getElementById('search')
const countryContainer = document.getElementById('country-container')
const countryInfo = document.getElementById('country-information')
const main = document.getElementById('main')
const selectEl = document.getElementById('region')
const darkMode = document.getElementById('dark')
const navEl = document.querySelector('.nav')
const btnEl = document.querySelector('.btn')

getCountries(API_URL)

async function getCountries(url) {
    const res = await fetch(url)
    const data = await res.json()
    showCountries(data)
}


function showCountries(countries) {
    countryContainer.innerHTML = ''

    countries.forEach((country) => {
        const { name, population, region, capital, flag, nativeName, subregion, topLevelDomain, currencies, languages, borders } = country
        
        const countryEl = document.createElement('div')
        countryEl.classList.add('country')

        countryEl.innerHTML = `
        <img src="${flag}" alt="${name} flag">
        <div class="country-info">
            <h3 class="country-name">${name}</h3>
            <p>Population: <span class=population>${population}</span></p>
            <p>Region: <span>${region}</span></p>
            <p>Capital: <span>${capital}</span></p>
        </div>
        `
        countryContainer.appendChild(countryEl)
        countryEl.addEventListener('click', ()=> {
            main.innerHTML = `
            <button class="btn" id="btn"><a href="index.html"><i class="fas fa-arrow-left"></i>Back</a></button>
            <div class="country-information" id="country-information">
                <div class="img-container">
                    <img src="${flag}" alt="${name} "flag"> 
                </div>
                <div class="info">
                    <h1>${name}</h1>
                    <span>Native Name: ${nativeName}</span>
                    <span>Population: ${population}</span>
                    <span>Region: ${region}</span>
                    <span>Sub-Region: ${subregion}</span>
                    <span>Top Level Domain: ${topLevelDomain}</span>
                    <span>Currencies: ${currencies.map(currency => currency.name + ' ')}
                    </span>
                    <span>Languages: ${languages.map(language=> language.name + ' ')} </span>
                    <span class="borders">Border Countries: ${borders.join(' , ')}
                    
                    </span>
                </div>
                
            </div>
            `
        })
    
    })
}



form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !== '') {
        getCountries(SEARCH_API + searchTerm)

        search.value = ''
    } else {
        window.location.reload()
    }
})

selectEl.addEventListener('change', (e) => {
    const userChoice = e.target.value
    if(userChoice === 'europe') {
        getCountries(EUROPE_API)
    } else if(userChoice === 'africa') {
        getCountries(AFRICA_API)
    } else if(userChoice ==='asia') {
        getCountries(ASIA_API)
    } else if(userChoice === 'americas') {
        getCountries(AMERICAS_API)
    } else if(userChoice === 'oceania') {
        getCountries(OCEANIA_API)
    } else {
        getCountries(API_URL)
    }
})

darkMode.addEventListener('click', () => {
    navEl.classList.toggle('dark')
    main.classList.toggle('dark')
    selectEl.classList.toggle('dark')
    search.classList.toggle('dark')
    btnEl.classList.toggle('dark')
})



