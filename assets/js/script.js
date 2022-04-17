//so many vars lol
var key = 'bad4c6fb514de50e1ba64cb13ca925e8';
var townEl = document.querySelector("#town-name");
var userInfo = document.querySelector("#btn-2");
var weatherEl = document.querySelector("#weathered");
var cityTop = document.getElementById("city-1");
var tempInfo = document.getElementById("temp-1");
var humidityInfo = document.getElementById("humidity-1");
var windInfo = document.getElementById("wind-1");
var uvInfo = document.getElementById("uv-1");
var forecast = document.getElementById("forcast-future");
var date = moment().format('dddd, MMMM Do YYYY');
var weatherImage = document.createElement("img");
var cities = [];
var cityList = [];

var dayOne =  document.getElementById("day1");
var dayTwo =  document.getElementById("day2");
var dayThree =  document.getElementById("day3");
var dayFour =  document.getElementById("day4");
var dayFive =  document.getElementById("day5");

var icon1 = document.getElementById("icon1");
var icon2 = document.getElementById("icon2");
var icon3 = document.getElementById("icon3");
var icon4 = document.getElementById("icon4");
var icon5 = document.getElementById("icon5");

var tempOne = document.getElementById("temp1");
var tempTwo = document.getElementById("temp2");
var tempThree = document.getElementById("temp3");
var tempFour = document.getElementById("temp4");
var tempFive = document.getElementById("temp5");

var humidOne = document.getElementById("humid1");
var humidTwo = document.getElementById("humid2");
var humidThree = document.getElementById("humid3");
var humidFour = document.getElementById("humid4");
var humidFive = document.getElementById("humid5");

var windOne = document.getElementById("wind1");
var windTwo = document.getElementById("wind2");
var windThree = document.getElementById("wind3");
var windFour = document.getElementById("wind4");
var windFive = document.getElementById("wind5");

//pulls from the api 
function getCityWeather(city) {
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + key;
    var apiURLForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + key;
    fetch(apiURL)
    .then(response => {
        return response.json();
         })
         .then(json => {
            displayWeather(json);
            return fetch(apiURLForecast);
         }) 
         .then(response => {
             return response.json();
         })
         .then(json => {
            return displayForecast(json);
         })
         .catch(err => alert("error"));
        };


function getUVIndex(json) {
    return fetch("https://api.openweathermap.org/data/2.5/uvi?lat=" + json.city.coord.lat + "&lon=" + json.city.coord.lon + "&appid=" + key)
    .then(function (response) {
        return response.json();
    }) 
    .then(function (json) {
        var uvIndex = json.value;
        uvInfo.textContent = uvIndex;

        if(uvIndex < 3) {
            uvInfo.classList.add("badge-success");
        } else if(uvIndex >= 3 || uvIndex <= 5) {
            uvInfo.classList.add("badge-primary");
        } else if(uvIndex >= 6 || uvIndex <= 7 ) {
            uvInfo.classList.add("badge-warning");
        } else if(uvIndex >= 8 || uvIndex <= 10 ) {
            uvInfo.classList.add("badge-danger");
        } else
        uvInfo.classList.add("badge-dark");
    });
}

//grabs user input of city sets perameter for getCityWeather()
function citySubmit(event) {
    event.preventDefault();

    var cityName = townEl.value.trim();
    if (cityName) {
        getCityWeather(cityName);
        townEl.value = "";
        var listHeader = document.getElementById("pastCity");
        var previousCityEl = document.createElement("button");
        var previousCity = listHeader.appendChild(previousCityEl);
        previousCity.textContent = cityName;
        previousCity.setAttribute("type", "button");
        previousCity.setAttribute("class", "btn info-btn btn-lg btn-block m-1");
        previousCity.setAttribute("id", "btnNew")
        previousCity.addEventListener("click", function() {
            getCityWeather(cityName);
        });
        
    } else {
        alert("Please enter a city name");
    }
}

    
//function to display the weather - pulls weather, city, temp, humidity & wind
function displayWeather(json) {
    weatherEl.removeAttribute('hidden');
    cityTop.textContent = json.name + " " + date;
    weatherImage.src = "http://openweathermap.org/img/w/" + json.weather[0].icon + ".png";
    cityTop.appendChild(weatherImage);
    tempInfo.textContent = json.main.temp;
    humidityInfo.textContent = json.main.humidity;
    windInfo.textContent = json.wind.speed + "MPH";
}

//displays the temp, humidity, icon, day & UVindex
function displayForecast(json) {
    forecast.removeAttribute('hidden');
    tempOne.textContent = json.list[2].main.temp;
    tempTwo.textContent = json.list[10].main.temp;
    tempThree.textContent = json.list[18].main.temp;
    tempFour.textContent = json.list[26].main.temp;
    tempFive.textContent = json.list[34].main.temp;
 
    humidOne.textContent = json.list[2].main.humidity;
    humidTwo.textContent = json.list[10].main.humidity;
    humidThree.textContent = json.list[18].main.humidity;
    humidFour.textContent = json.list[26].main.humidity;
    humidFive.textContent = json.list[34].main.humidity;

    windOne.textContent = json.list[2].wind.speed;
    windTwo.textContent = json.list[10].wind.speed;
    windThree.textContent = json.list[18].wind.speed;
    windFour.textContent = json.list[26].wind.speed;
    windFive.textContent = json.list[34].wind.speed;

    icon1.src = "http://openweathermap.org/img/w/" + json.list[2].weather[0].icon + ".png";
    icon2.src = "http://openweathermap.org/img/w/" + json.list[10].weather[0].icon + ".png";
    icon3.src = "http://openweathermap.org/img/w/" + json.list[18].weather[0].icon + ".png";
    icon4.src = "http://openweathermap.org/img/w/" + json.list[26].weather[0].icon + ".png";
    icon5.src = "http://openweathermap.org/img/w/" + json.list[34].weather[0].icon + ".png";

    dayOne.textContent = moment().add(1, 'date');
    dayTwo.textContent = moment().add(2, 'date');
    dayThree.textContent = moment().add(3, 'date');
    dayFour.textContent = moment().add(4, 'date');
    dayFive.textContent = moment().add(5, 'date');

    getUVIndex(json);
}

function init(){
    //local storage for past city searches
    var storedCities = JSON.parse(localStorage.getItem("#pastCity"));
    if (storedCities !== null) {
        cities = storedCities;
      }
    renderCities();
}

//Function StoreCities() and Stringify and set "cities" key in localStorage to cities array
function storeCities(){
  localStorage.setItem("cities", JSON.stringify(cities));
  console.log(localStorage);
}

//rendering and creating a new li for each city
function renderCities() {
    for (var i = 0; i < cities.length; i++) {
      var city = cities[i];
      
      var li = $("<li>").text(city);
      li.attr("id","listC");
      li.attr("data-city", city);
      li.attr("class", "list-group-item");
      console.log(li);
      cityList.prepend(li);
    }
    
    if (!city){
        return
    } 
    else{
        getResponseWeather(city)
    };
}   

init();
userInfo.addEventListener("click", citySubmit);