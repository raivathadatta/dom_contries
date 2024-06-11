
console.log(getQueryParams('country'))

let countriesList = []
let isDark = false

let country_name = getQueryParams('country').toLowerCase()

let flag_image = document.getElementById("flag_image")
let country_details = document.getElementById("country_details")
let top_level_domine = document.getElementById("top_level_domine")
let border_countries = document.getElementById("border_countries")
let backButton = document.getElementById('backButton');
let header = document.querySelector("header")
let page_title = document.getElementById("pagetitle")
let toggleButton = document.getElementById("toggl_background_button")
const content = document.getElementById("screen");
const loader = document.getElementById("loader");



showLoader()
loadCountryList()

backButton.addEventListener('click', previousPage)
toggleButton.addEventListener("click", changeBackgroundColor)


page_title.innerText = "where in the world?"
page_title.style = "font-weight:bold; font-size:30px"
toggleButton.textContent = "Dark Mode"
header.style.padding = "5%"




function loadCountryList() {
    fetch("https://restcountries.com/v3.1/all").then((responce) => {
        console.log("fetched data ")

        return responce.json()
    }).then((countries) => {
        console.log(countries.length)
        console.log("joing data", countries.length)
        countriesList = countries
        countries.forEach((element) => {
            // console.log(element['name']['common'].toLowerCase())
            if (element['name']['common'].toLowerCase() == country_name) {
                console.log(element['name']['common'].toLowerCase())

                createCountryDetailCard(element)

                showContent()
            }
        });

    }).catch((error) => { console.log(error) })

}


function changeBackgroundColor() {
    if (isDark) {
        document.body.style = " color:black"
        header.style.backgroundColor = "#FFFFFF"
        screen_body.style.backgroundColor = "#FAFAFA"
        toggleButton.style.backgroundColor = "#FAFAFA"
        toggleButton.innerHTML = "Light Mode"


        isDark = false
    } else {
        document.body.style = " color:white"
        toggleButton.innerHTML = "Dark Mode"
        toggleButton.style = "background-color: #444444;color: #ffffff;"
        header.style = "background-color: #1f1f1f;border-color: #444444;"
        toggleButton.style.backgroundColor = "#202D36"
        screen_body.style.backgroundColor = "#202D36"

        isDark = true


    }
}







function previousPage() {

    window.history.back();

}

function createCountryDetailCard(element) {
    console.log(element['name']['common'].toLowerCase(), element['name'])

    flag_image.src = element['flags']['png']
    ////country_details div 
    let countryName = document.createElement('h1')
    let population = document.createElement('p')
    let native_name = document.createElement('p')

    let region = document.createElement('p')
    let subregion = document.createElement('p')
    let capital = document.createElement('p')

    countryName.innerText = element['name']['common']
    native_name.innerText = " Native Name :" + Object.values(element['name']['nativeName'])['official']///official
    population.innerText = "Population :" + element['population']
    region.innerText = "Region :" + element['region']
    subregion.innerText = "Sub Region" + element['subregion']
    capital.innerText = "Capital" + element['capital']
    country_details.appendChild(countryName)
    country_details.appendChild(native_name)
    country_details.appendChild(population)
    country_details.appendChild(region)
    country_details.appendChild(subregion)
    country_details.appendChild(capital)



    let topLevelDomain = element['tld']
    let currencies = Object.keys(element['currencies']).toString()
    let languages = Object.values(element['languages']).toString()
    console.log(languages)

    let topleveldomain = document.createElement('p')
    let currencies_list = document.createElement('p')
    let languages_list = document.createElement('p')

    topleveldomain.innerHTML = `<span class="font-medium">Top Level Domain</span> :${topLevelDomain}`
    currencies_list.innerHTML = `<span class="font-medium">Currencies</span> :${currencies}`
    languages_list.innerHTML = `<span class="font-medium">Languages</span> :${languages}`

    top_level_domine.appendChild(topleveldomain)
    top_level_domine.appendChild(currencies_list)
    top_level_domine.appendChild(languages_list)

    let borders = element['borders']


    borders.forEach((border) => {
        let border_name = document.createElement('button')
        border_name.addEventListener('click', navigateToCountry)
        border_name.className = "border_button"
        border_name.style = "font-weight : 300;     border: 1px solid; padding:2%"
        border_name.style.padding = " 1px 6px 1px 6px;"

        border_name.innerText = border
        border_countries.appendChild(border_name)
    })
}

function getQueryParams(param) {
    let queryString = window.location.search
    let urlParams = new URLSearchParams(queryString)
    return urlParams.get(param)
}
function navigateToCountry(event) {
    let selected_country = event.target.textContent.toLowerCase()
    countriesList.forEach((country) => {
        console.log(country['cca3'].toLowerCase(), "hhhhhhhhhhh")
        if (country['cca3'].toLowerCase() == selected_country) {
            console.log(country['name']['common'])
            window.location.href = "country.html?country=" + country['name']['common']
        }
    })
}

function showLoader() {
    loader.style.display = "block";
    content.style.display = "none";
}

function showContent() {
    console.log("show content");
    loader.style.display = "none";
    content.style.display = "block";
}