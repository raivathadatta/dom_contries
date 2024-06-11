// this function calls when all the html is loadedv

showLoader()
fetchCountryList()
console.log("all html is loaded")


//lists and varibles 
let isDark = false
let region_list = ["Filter by Region"]
let counter = 0
let totalCountries = 0
let countriesList = []



/// elements
let countries_grid = document.getElementById("counties_grid")
let page_title = document.getElementById("pagetitle")
let toggleButton = document.getElementById("toggl_background_button")
let searchInput = document.getElementById("search")
let filter_button = document.getElementById("filter_button")
let header = document.querySelector("header")
let screen_body = document.getElementById("screen_body")
let filter_main = document.getElementById("filter_main")

/// html modifications
page_title.innerHTML = "where in the world?"
page_title.style = "font-weight:bold; font-size:30px"
toggleButton.textContent = "Dark Mode"



///event listners 
searchInput.addEventListener("keyup", searchCountry)
filter_button.addEventListener("click", filterCountries)




toggleButton.addEventListener("click", changeBackgroundColor)


function changeBackgroundColor() {
    if (isDark) {
        document.body.style = " color:black"
        header.style.backgroundColor = "#FFFFFF"
        screen_body.style.backgroundColor = "hsl(0, 0%, 100%)"
        toggleButton.style.backgroundColor = " hsl(0, 0%, 100%)"
        searchInput.style.backgroundColor = " hsl(0, 0%, 100%)"
        filter_button.style.backgroundColor = " hsl(0, 0%, 100%)"
        toggleButton.innerHTML = "Light Mode"
        toggleButton.style = "color:black;"

        Array.from(countries_grid.children).forEach((country_card) => {
            console.log(country_card)
            country_card.style.backgroundColor = "hsl(0, 0%, 97%)"
            country_card.style.color = "black"
        })
        isDark = false
    } else {
        document.body.style = " color:white"
        toggleButton.innerHTML = "Dark Mode"
        toggleButton.style = "background-color: #444444;color: #ffffff;"
        header.style = "background-color: #1f1f1f;border-color: #444444;"
        toggleButton.style.backgroundColor = "#202D36"
        screen_body.style.backgroundColor = "#202D36"
        searchInput.style = " background-color: #444444; border-none border-width:0px"
        filter_button.style = "background-color: #444444;"
        filter_main.style.backgroundColor = "background-color: #1f1f1f;"

        Array.from(countries_grid.children).forEach((country_card) => {
            console.log(country_card)
            country_card.style.backgroundColor = "#2B3743"
            country_card.style.color = "white"
        })
        isDark = true


    }
}


/////////////////////
//functions
function fetchCountryList() {
    fetch("https://restcountries.com/v3.1/all").then((responce) => {
        console.log("fetched data ")

        return responce.json()
    }).then((countries) => {
        console.log(countries.length)
        // console.log("joing data", countries.length)
        totalCountries = countries.length
        countriesList = countries
        countries.forEach((element) => {

            countries_grid.appendChild(createCountryCard(element))
        });
        showContent()

    }).catch((error) => { console.log(error) })

}

function createCountryCard(element) {
    // console.log("element: " + element)
    let countryCard = document.createElement("div")
    let flag = document.createElement("img")
    let countryName = document.createElement("h2")
    let capital = document.createElement("p")
    let population = document.createElement("p")
    let region = document.createElement("p")
    region.id = "country_region"
    countryName.style = "font-weight : bold;"
    countryName.className = "mb-2 mt-2"
    population.style = "font-weight : 300;"
    region.style = "font-weight :300;"
    capital.style = "font-weight :300;"

    flag.className = "w-[100%]  block  top-left h-[50%] mb-2";
    flag.src = element['flags']['png']
    countryName.innerText = element['name']['common']
    capital.innerText = "Capital: " + element['capital']
    population.innerText = "Population: " + element['population']
    region.innerText = "Region: " + element['region']

    countryCard.className = "sm:w-[23%]    m-2 w-[90%] "
    countryCard.style.backgroundColor = "hsl(0, 0%, 97%)"

    countryCard.appendChild(flag)
    countryCard.appendChild(countryName)
    countryCard.appendChild(capital)
    countryCard.appendChild(population)
    countryCard.appendChild(region)

    countryCard.addEventListener('click', navigateToCountry)


    if (!region_list.includes(element['region'])) {
        region_list.push(element['region'])
    }
    counter++
    if (counter == totalCountries) {
        createSelectCountry()
    }


    return countryCard

}



function searchCountry() {

    let search_country = searchInput.value.toLowerCase()
    let filter_button_value = filter_button.value.toLowerCase()


    console.log(filter_button_value, region_list[0].toLocaleLowerCase())
    Array.from(countries_grid.children).forEach((countryCard) => {
        let country = countryCard.querySelector('h2').textContent.toLowerCase()
        if (country.indexOf(search_country) == -1) {
            countryCard.classList.add('hidden')

        } else {
            countryCard.classList.remove('hidden')
        }
    })


}


function showAllCountries() {
    countries_grid.innerHTML = ""
    countriesList.forEach((country) => {
        countries_grid.appendChild(createCountryCard(country))
    })
}

function createSelectCountry() {
    region_list.forEach((region) => {
        console.log(region)
        let option = document.createElement("option")
        option.value = region
        option.innerText = region
        filter_button.appendChild(option)
        console.log(region)
    })
}

function filterCountries() {
    let selectedItem = filter_button.value.toLowerCase()//country_region
    if (selectedItem == region_list[0].toLowerCase()) {

        showAllCountries()
    } else {
        countries_grid.innerHTML = ""
        countriesList.forEach((country) => {
            if (country['region'].toLocaleLowerCase() == selectedItem) {


                console.log(country.flags.png)
                countries_grid.appendChild(createCountryCard(country))
            }
        })


        //     Array.from(countries_grid.children).forEach((countryCard) => {
        //         let country_region = countryCard.querySelector('#country_region').textContent.toLowerCase()
        //         console.log(country_region)
        //         if (country_region.indexOf(selectedItem) == -1) {
        //             countryCard.classList.add('hidden')
        //         } else {
        //             countryCard.classList.remove('hidden')
        //         }
        //     })
    }

}


function navigateToCountry(event) {

    let selected_country = event.target.parentElement.querySelector('h2').textContent.toLowerCase()
    console.log(event.target.parentElement.querySelector('h2').textContent.toLowerCase() + ' selected')
    countriesList.forEach((country) => {
        if (country['name']['common'].toLowerCase() == selected_country) {
            console.log(country['name']['common'])
            window.location.href = "country.html?country=" + country['name']['common']
        }
    })
}


function showLoader() {
    const loader = document.getElementById("loader");
    loader.style.display = "block";
    const content = document.getElementById("screen");
    content.style.display = "none";
}

function showContent() {
    console.log()
    const loader = document.getElementById("loader");
    loader.style.display = "none";
    loader.classList.add("hidden")
    const content = document.getElementById("screen");
    content.style.display = "block";
}
