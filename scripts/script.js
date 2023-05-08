const sidebar = document.querySelector(".sidebar");
const searchSidebar = document.querySelector(".search-sidebar");
const searchSidebarBtn = document.querySelector(".search-btn");
const myLocation = document.querySelector(".location-btn");
const iconActualWheaterState = document.querySelector(
  "#icon-actual-wheater-state"
);
const temperature = document.querySelector(".temperature");
const actualWheaterState = document.querySelector("#actual-wheater-state");
const actualDaySidebar = document.querySelector("#actual-day");
const currentLocation = document.querySelector("#current-location");
const exitSearch = document.querySelector(".fa-xmark");
const inputSearch = document.querySelector("#search-location");
const searchLocation = document.querySelector("#procurar");
const units = document.querySelectorAll(".unit");
// content item's

const cardsOfWeek = document.querySelector(".forequest-of-the-week");

//units

const celciusBtn = document.querySelector(".celcius-btn");
const fahrenheitBtn = document.querySelector(".fahrenheit-btn");

searchLocation.addEventListener("click", () => {
    const inputLocationValue = inputSearch.value;
    console.log(inputLocationValue);
    sidebar.classList.toggle("hidden");
    searchSidebar.classList.toggle("hidden");
    inputSearch.value = "";
    api
      .get(
        `forecast.json?key=${apiKey}&q=${inputLocationValue}&days=5&aqi=yes&alerts=no&lang=pt`
      )
      .then((weather) => {
        const weatherData = weather.data;
        //aside data api
        const currentTemp = weatherData.current.temp_c.toFixed(0)
        const currentTempF = Number((currentTemp * 1.8) + 32).toFixed(0);
        celciusBtn.style.opacity = "1"
        celciusBtn.style.cursor = "pointer"
        fahrenheitBtn.style.opacity = "1"
        fahrenheitBtn.style.cursor = "pointer"


        celciusBtn.addEventListener("click", () => {
          temperature.innerText = `${currentTemp}`;
          unit3.innerText = "°C"
          temperature.appendChild(unit3);
          celciusBtn.classList.add("selected");
          fahrenheitBtn.classList.remove("selected");
        })
        fahrenheitBtn.addEventListener("click", () => {
          temperature.innerText = `${currentTempF}`;
          unit3.innerText = "°F"
          temperature.appendChild(unit3);
          celciusBtn.classList.remove("selected");
          fahrenheitBtn.classList.add("selected");
        })
        //elements
        //(unit span)
        const unit3 = document.createElement('span');
        unit3.classList.add('unit');
        unit3.innerText = "°C"
        //(dot icon)
        const dotIcon = document.createElement('i')
        dotIcon.classList.add('fa-solid');
        dotIcon.classList.add('fa-location-dot')
        //
        console.log(weatherData);
        currentLocation.innerText = `${weatherData.location.name}`;
        currentLocation.appendChild(dotIcon);
        temperature.innerText = `${currentTemp}`;
        temperature.appendChild(unit3);
        iconActualWheaterState.src = `${weatherData.current.condition.icon}`;
        actualWheaterState.innerText = `${weatherData.current.condition.text}`;
        const highlights = weatherData.forecast.forecastday;
  
        highlights.map((tempo) => {
          console.log(tempo.date);
          console.log(tempo.day);
  
          const maxTemp = tempo.day.maxtemp_c.toFixed(0)
          const minTemp = tempo.day.mintemp_c.toFixed(0)
          //card weather week
          //div card
          const div = document.createElement('div')
          div.classList.add('card')
          //h3
          const h3 = document.createElement('h3')
          h3.classList.add('day-of-the-week')
          h3.innerText= `${tempo.date}`
          //img
          const img = document.createElement('img')
          img.src = `${tempo.day.condition.icon}`
          //span 
          const unit = document.createElement('span')
          unit.innerText = "°C"
          unit.classList.add('unit')
          const unit2 = document.createElement('span')
          unit2.classList.add('unit')
          unit2.innerText = "°C"
          const maxima = document.createElement('span')
          maxima.classList.add('maxima')
          maxima.innerText = `${maxTemp}`
          maxima.appendChild(unit)
          const minima = document.createElement('span')
          minima.classList.add('minima')
          minima.innerText = `${minTemp}`
          minima.appendChild(unit2)
          //conversor celcius para fahrenheit
          celciusBtn.addEventListener('click', () => {
            unit.innerText = "°C"
            unit2.innerText = "°C"
            maxima.innerText = `${maxTemp}`
            minima.innerText = `${minTemp}`
            maxima.appendChild(unit)
            minima.appendChild(unit2)
          })
          fahrenheitBtn.addEventListener('click', () => {
            const maxTempF = Number((maxTemp * 1.8) + 32).toFixed(0)
            const minTempF = Number((minTemp * 1.8) + 32).toFixed(0)
            unit.innerText = "°F"
            unit2.innerText = "°F"
            maxima.innerText = `${maxTempF}`
            minima.innerText = `${minTempF}`
            maxima.appendChild(unit)
            minima.appendChild(unit2)
          })
          //p
          const p = document.createElement('p')
          p.appendChild(maxima)
          p.appendChild(minima)
          // mount cards
          div.appendChild(h3)
          div.appendChild(img)
          div.appendChild(p)
          cardsOfWeek.appendChild(div)
        });
        //Wind force and direction
        const windForce = document.querySelector(".wind-force");
        const windDirection = document.querySelector("#wind-direction");
        const windArrowDirection = Number(315 + weatherData.current.wind_degree)
        windForce.innerHTML = `<p class="wind-force">${weatherData.current.wind_mph} <span>mph</span></p>`;
        windDirection.innerHTML = `<p id="wind-direction"><i class="fa-solid fa-location-arrow" style="transform: rotate(${windArrowDirection}deg)"></i>${weatherData.current.wind_dir}</p>`;
        //humidity
        const percentageHum = document.querySelector("#percentage");
        const humidityPer = document.querySelector(".humidity-percentage");
        humidityPer.innerHTML = `<p class="humidity-percentage">${weatherData.current.humidity}<span>%</span></p>`;
        percentageHum.style.width = `${weatherData.current.humidity}%`;
        //visibility
        const visibility = document.querySelector("#visibility-value");
        visibility.innerHTML = `<p id="visibility-value">${weatherData.current.vis_miles} <span>miles</span></p>`;
        // air pression
        const pressureValue = document.querySelector("#pressure-value");
        pressureValue.innerHTML = `<p id="pressure-value">${weatherData.current.pressure_mb} <span>mb</span></p>`;
        searchSidebarBtn.addEventListener("click", () => {
          cardsOfWeek.innerHTML = "";
        });
      })
      .catch((error) => {
        const errorMessage = document.createElement("h2");
        errorMessage.innerText = 'Possivel erro de digitação no nome da localização ou erro ao carregar a API do Tempo'
        errorMessage.style.display = "block";
        errorMessage.style.textAlign = "center";
        errorMessage.style.width = "100%"
        errorMessage.style.height = "4rem"
        errorMessage.style.padding = "4rem"
        errorMessage.style.color = "red";
        errorMessage.style.backgroundColor = "#000"

        error => document.body.appendChild(errorMessage);
        alert('error: Erro na pesquisa ou no carregamento da API do tempo')

        inputSearch.value = "";
      });
});

// Data config
const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];
const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
const date = new Date();
const actualDay = days[date.getDay()];
const actualDate = date.getDate();
const month = months[date.getMonth()];

actualDaySidebar.innerHTML = `<p id="actual-day">Hoje <i class="fa-solid fa-circle"> </i> <span id="date">${actualDay}, ${actualDate} ${month}</span></p>`;
// Fim data config
//api config
const apiKey = "8fbd2da2c27b4c6d988131145230205";
const api = axios.create({
  baseURL: "https://api.weatherapi.com/v1/",
});
// fim api config
myLocation.addEventListener("click", (construction) => alert("Em construção!"));
searchSidebarBtn.addEventListener("click", () => {
  sidebar.classList.toggle("hidden");
  searchSidebar.classList.toggle("hidden");
});
exitSearch.addEventListener("click", () => {
  sidebar.classList.toggle("hidden");
  searchSidebar.classList.toggle("hidden");
});