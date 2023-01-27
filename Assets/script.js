
let cityInput = document.getElementById("city"); 
let citiesList = []; 
let todayDate = document.getElementById("todayDate");
let cityForm = document.getElementById("formCity");
let buttons = document.getElementById("buttons"); 
let cityEl = document.querySelector("#searchedCity"); 


let getWeather = (city) => {
  let apiURL1 = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=4204bfdd6f4f063ef67429ec56df1142";
  fetch(apiURL1)
    .then((response) => {
        response.json()
          .then((data) => {
             
              showWeather(data, city);
            });
      });
};


let getForecast = (city) => {
  let apiURL3 = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=4204bfdd6f4f063ef67429ec56df1142";
  fetch(apiURL3)
    .then((response) => {
      response.json()
        .then((data) => {
       
          showForecast(data, city);
         
          let lat = data.city.coord.lat;
          let lon = data.city.coord.lon;
         
          let getTodayUV = (city) => {
            let apiURL2 = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=4204bfdd6f4f063ef67429ec56df1142";
            fetch(apiURL2)
              .then((response) => {
                response.json()
                  .then((data) => {
                   
                    document.getElementById("todayUV")
                      .innerHTML = data.value;
                    if(data.value <= 3) {
                      document.getElementById("todayUV")
                        .setAttribute("class", "favorableLevel");
                    } else if(data.value > 3 && data.value <=10) {
                      document.getElementById("todayUV")
                        .setAttribute("class", "moderateLevel");
                    } else { 
                      document.getElementById("todayUV")
                        .setAttribute("class", "severeLevel");
                    };
                  });
              });
          };
          getTodayUV();
        });
    });
};


let submitQuery = (event) => {
  event.preventDefault();
  let cityEl = cityInput.value.trim();
  let btn = document.createElement("button"); 
  btn.className = "searched-list btn";
  btn.innerHTML = cityEl; 
  buttons.appendChild(btn);
  listCity();
  if(!citiesList.includes(cityEl) && (cityEl != "")) {
    citiesList.push(cityEl);
  };
  localStorage.setItem("citiesList", JSON.stringify(citiesList));
  if(cityEl) {
    getWeather(cityEl);
    getForecast(cityEl);
    cityInput.value = "";
  } else {
    alert("Enter a city name to get the weather!");
  }
};


let listCity = () => {
  citiesList = JSON.parse(localStorage.getItem("citiesList"));
  if(!citiesList) {
    citiesList = [];
  };
};


let addList = () => {
  for(var i = 0; i < citiesList.length; i++) {
    let btn = document.createElement("button");
    btn.className = "searched-list btn"; 
    btn.innerHTML = citiesList[i];
    buttons.appendChild(btn); 
  };

  
  let listButtons = document.querySelectorAll(".searched-list");
  for(var i = 0; i < listButtons.length; i++) {
    listButtons[i].addEventListener("click", (event) => {
      getWeather(event.target.textContent);
      getForecast(event.target.textContent);
    })
  }
};


todayDate.textContent = moment()
  .format("dddd, MMMM Do, h:mm a");


let showWeather = (weather, searchQuery) => {
  cityEl.textContent = searchQuery;
  iconEl = weather.weather[0].icon;
  document.getElementById("todayIcon")
    .src = "./assets/css/icons/" + iconEl + ".png";
  document.getElementById("todayTemp")
    .innerHTML = weather.main.temp;
  document.getElementById("todayHumidity")
    .innerHTML = weather.main.humidity;
  document.getElementById("todayWind")
    .innerHTML = weather.wind.speed;
};

// 5 DAY FORECAST
document.getElementById("day1")
  .innerHTML = moment()
  .add(1, "d")
  .format("MMMM Do");
document.getElementById("day2")
  .innerHTML = moment()
  .add(2, "d")
  .format("MMMM Do");
document.getElementById("day3")
  .innerHTML = moment()
  .add(3, "d")
  .format("MMMM Do");
document.getElementById("day4")
  .innerHTML = moment()
  .add(4, "d")
  .format("MMMM Do");
document.getElementById("day5")
  .innerHTML = moment()
  .add(5, "d")
  .format("MMMM Do");




let showForecast = (forecast, searchQuery) => {
  cityEl.textContent = searchQuery;
  document.getElementById("t1")
    .innerHTML = forecast.list[4].main.temp;
  document.getElementById("h1")
    .innerHTML = forecast.list[4].main.humidity;
  iconEl1 = forecast.list[4].weather[0].icon;
  document.getElementById("i1")
    .src = "./assets/css/icons/" + iconEl1 + ".png";
  // 2 of 5
  document.getElementById("t2")
    .innerHTML = forecast.list[12].main.temp;
  document.getElementById("h2")
    .innerHTML = forecast.list[12].main.humidity;
  iconEl2 = forecast.list[12].weather[0].icon;
  document.getElementById("i2")
    .src = "./assets/css/icons/"  + iconEl2 + ".png";
  // 3 of 5
  document.getElementById("t3")
    .innerHTML = forecast.list[20].main.temp;
  document.getElementById("h3")
    .innerHTML = forecast.list[20].main.humidity;
  iconEl3 = forecast.list[20].weather[0].icon;
  document.getElementById("i3")
    .src = "./assets/css/icons/" + iconEl3 + ".png";
  // 4 of 5
  document.getElementById("t4")
    .innerHTML = forecast.list[28].main.temp;
  document.getElementById("h4")
    .innerHTML = forecast.list[28].main.humidity;
  iconEl4 = forecast.list[28].weather[0].icon;
  document.getElementById("i4") 
    .src = "./assets/css/icons/" + iconEl4 + ".png";
  // 5 of 5
  document.getElementById("t5")
    .innerHTML = forecast.list[36].main.temp;
  document.getElementById("h5")
    .innerHTML = forecast.list[36].main.humidity;
  iconEl5 = forecast.list[36].weather[0].icon;
  document.getElementById("i5")
    .src = "./assets/css/icons/" + iconEl5 + ".png";
  
};


cityForm.addEventListener("submit", submitQuery);
listCity();
addList();


getWeather("Berkeley");
getForecast("Berkeley");