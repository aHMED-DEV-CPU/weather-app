"use strict";
const apiKey = "d970ecd19d1743b481963847242406";
let search = document.getElementById("search")
let form = document.getElementById("form")
let dayOfWeather = document.querySelectorAll(".day") //all days
let dateOfWeather = document.querySelector(".date")
let humidityOfWeather = document.querySelector("#humidity")
let windOfWeather = document.querySelector("#wind")
let submit = document.getElementById("submit")
let secIconOfWeather = document.querySelectorAll("[sec-icon]")
console.log(secIconOfWeather);
let maxDegree = document.querySelectorAll("[max-degree]")
let minDegree = document.querySelectorAll("[min-degree]")
let conditionOfWeather = document.querySelectorAll("[condition]")

form.addEventListener("submit", function (e) {
    e.preventDefault()
})
submit.addEventListener("click", function () {
    let searchValue = search.value
    getData(searchValue)
})

function displayWeatherData(data) {
    // data for first card
    let location = data.location.name
    let temp = data.current.temp_c
    let condition = data.current.condition.text
    let icon = data.current.condition.icon
    let wind = data.current.wind_kph
    let humidity = data.current.humidity

    let date = [data.forecast.forecastday[0].date, data.forecast.forecastday[1].date, data.forecast.forecastday[2].date]
    const day = new Date(date[0]).getDay()
    var getMonth = new Date(date[0]).getMonth()
    const getDayNum = new Date(date[0]).getDate()
    let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let dayOfWeekName = dayOfWeek[day]
    let monthName = month[getMonth]
    let dayNum = getDayNum

    // get data for second and third card
    let maxTemp = [data.forecast.forecastday[1].day.maxtemp_c, data.forecast.forecastday[2].day.maxtemp_c]
    let minTemp = [data.forecast.forecastday[1].day.mintemp_c, data.forecast.forecastday[2].day.mintemp_c]
    let secCondition = [data.forecast.forecastday[1].day.condition.text, data.forecast.forecastday[2].day.condition.text]
    let secIcon = [data.forecast.forecastday[1].day.condition.icon, data.forecast.forecastday[1].day.condition.icon]
    let secDay = [new Date(date[1]).getDay(), new Date(date[2]).getDay()]
    let secDayOfWeekName = [dayOfWeek[secDay[0]], dayOfWeek[secDay[1]]]
    // show second and third card
    secIconOfWeather[0].src = secIcon[0]
    secIconOfWeather[1].src = secIcon[1]
    maxDegree[0].innerHTML = maxTemp[0]
    maxDegree[1].innerHTML = maxTemp[1]
    minDegree[0].innerHTML = minTemp[0]
    minDegree[1].innerHTML = minTemp[1]
    conditionOfWeather[1].innerHTML = secCondition[0]
    conditionOfWeather[2].innerHTML = secCondition[1]
    dayOfWeather[1].innerHTML = secDayOfWeekName[0]
    dayOfWeather[2].innerHTML = secDayOfWeekName[1]
    // show first card
    dayOfWeather[0].innerHTML = dayOfWeekName
    dateOfWeather.innerHTML = `${dayNum} ${monthName}`
    document.getElementById("location").innerHTML = location
    document.getElementById("temp").innerHTML = temp
    conditionOfWeather[0].innerHTML = condition
    document.getElementById("icon").src = icon
    humidityOfWeather.innerHTML = humidity
    windOfWeather.innerHTML = wind
}

async function getData(searchValue) {
    let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${searchValue}&days=3`);
    let data = await response.json()
    displayWeatherData(data)
}

(function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
})();

async function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=3`);
    let data = await response.json()
    displayWeatherData(data)
}
