const sidebar = document.querySelector('.sidebar')
const searchSidebar = document.querySelector('.search-sidebar')
const searchSidebarBtn = document.querySelector('.search-btn')
const myLocation = document.querySelector('.location-btn')
const iconActualWheaterState = document.querySelector('#icon-actual-wheater-state')
const temperature = document.querySelector('#temperature')
const actualWheaterState = document.querySelector('#actual-wheater-state')
const actualDaySidebar = document.querySelector('#actual-day')
const currentLocation = document.querySelector('#current-location')
const exitSearch = document.querySelector('.fa-xmark')
const inputSearch = document.querySelector('#search-location')
const searchLocation = document.querySelector('#procurar')

// Data config
const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]
const date = new Date()
const actualDay = days[date.getDay()]
const actualDate = date.getDate()
const month = months[date.getMonth()]

actualDaySidebar.innerHTML= `<p id="actual-day">Hoje <i class="fa-solid fa-circle"> </i> <span id="date">${actualDay}, ${actualDate} ${month}</span></p>`
// Fim data config
//api config
const apiKey = '8fbd2da2c27b4c6d988131145230205'
const api = axios.create({
    baseURL: 'https://api.weatherapi.com/v1/'
})
// fim api config
myLocation.addEventListener('click', construction => alert('Em construção!'))
searchSidebarBtn.addEventListener('click', () => {
    sidebar.classList.toggle('hidden')
    searchSidebar.classList.toggle('hidden')
})
exitSearch.addEventListener('click', ()=> {
    sidebar.classList.toggle('hidden')
    searchSidebar.classList.toggle('hidden')
})
searchLocation.addEventListener('click', () => {
    const inputLocationValue = inputSearch.value
    console.log(inputLocationValue)
    sidebar.classList.toggle('hidden')
    searchSidebar.classList.toggle('hidden')
    inputSearch.value = ''
    api.get(`forecast.json?key=${apiKey}&q=${inputLocationValue}&days=5&aqi=yes&alerts=no`)
    .then(weather => {
        const weatherData = weather.data
        console.log(weatherData)
        currentLocation.innerHTML = `<p id="current-location"><i class="fa-solid fa-location-dot"></i> ${weatherData.location.name}</p>`
        temperature.innerHTML = `<p id="temperature">${weatherData.current.temp_c.toFixed(0)}<span id="unit">°C</span></p>`
        iconActualWheaterState.src = `${weatherData.current.condition.icon}`
        if (weatherData.current.condition.text === 'Partly cloudy') {
            actualWheaterState.innerText = `Parcialmente Nublado`
        } else if (weatherData.current.condition.text === 'Sunny' && weatherData.current.condition.text === 'clear') {
            actualWheaterState.innerText = `Céu Limpo/Ensolarado`
        } else if (weatherData.current.condition.text === 'Cloudy') {
            actualWheaterState.innerText = `Nublado`
        } else if (weatherData.current.condition.text === 'Overcast') {
            actualWheaterState.innerText = `Completamente Nublado`
        } else if (weatherData.current.condition.text === 'Mist') {
            actualWheaterState.innerText = `Névoa`
        } else if (weatherData.current.condition.text === 'Patchy rain possible') {
            actualWheaterState.innerText = `Possivel Chuva Irregular`
        } else if (weatherData.current.condition.text === 'Patchy snow possible') {
            actualWheaterState.innerText = `Possivel Neve Irregular`
        } else if (weatherData.current.condition.text === 'Patchy sleet possible') {
            actualWheaterState.innerText = `Possivel Granizo Irregular`
        } else if (weatherData.current.condition.text === 'Patchy freezing drizzle possible') {
            actualWheaterState.innerText = `possível Neve Congelante Irregular`
        } else if (weatherData.current.condition.text === 'Thundery outbreaks possible') {
            actualWheaterState.innerText = `Possiveis Relampagos`
        } else if (weatherData.current.condition.text === 'Blowing snow') {
            actualWheaterState.innerText = `Sopro de Neve`
        } else if (weatherData.current.condition.text === 'Blizzard') {
            actualWheaterState.innerText = `Nevasca`
        } else if (weatherData.current.condition.text === 'Fog') {
            actualWheaterState.innerText = `Névoa`
        } else if (weatherData.current.condition.text === 'Freezing fog') {
            actualWheaterState.innerText = `Névoa Congelante`
        } else if (weatherData.current.condition.text === 'Patchy light drizzle') {
            actualWheaterState.innerText = `Garoa Leve Irregular`
        } else if (weatherData.current.condition.text === 'Light drizzle') {
            actualWheaterState.innerText = `Garoa Leve`
        } else if (weatherData.current.condition.text === 'Freezing drizzle') {
            actualWheaterState.innerText = `Garoa Congelante`
        } else if (weatherData.current.condition.text === 'Heavy freezing drizzle') {
            actualWheaterState.innerText = `Garoa Forte e Congelante`
        } else if (weatherData.current.condition.text === 'Patchy light rain') {
            actualWheaterState.innerText = `Chuva Leve Irregular`
        } else if (weatherData.current.condition.text === 'Light rain') {
            actualWheaterState.innerText = `Chuva Leve`
        } else if (weatherData.current.condition.text === 'Moderate rain at times') {
            actualWheaterState.innerText = `Chuva Moderada as vezes`
        } else if (weatherData.current.condition.text === 'Moderate rain') {
            actualWheaterState.innerText = `Chuva Moderada`
        } else if (weatherData.current.condition.text === 'Heavy rain at times') {
            actualWheaterState.innerText = `Chuva Forte as Vezes`
        } else if (weatherData.current.condition.text === 'Heavy rain') {
            actualWheaterState.innerText = `Chuva Forte`
        } else if (weatherData.current.condition.text === 'Light freezing rain') {
            actualWheaterState.innerText = `Chuva Congelante Leve`
        } else if (weatherData.current.condition.text === 'Moderate or heavy freezing rain') {
            actualWheaterState.innerText = `Chuva Congelante Forte ou Moderada`
        } else if (weatherData.current.condition.text === 'Light sleet') {
            actualWheaterState.innerText = `granizo leve`
        } else if (weatherData.current.condition.text === 'Moderate or heavy sleet') {
            actualWheaterState.innerText = `Nevasca moderada ou forte`
        } else if (weatherData.current.condition.text === 'Patchy light snow') {
            actualWheaterState.innerText = `Neve fraca irregular`
        } else if (weatherData.current.condition.text === 'Light snow') {
            actualWheaterState.innerText = `Pouca neve`
        } else if (weatherData.current.condition.text === 'Neve moderada irregular') {
            actualWheaterState.innerText = `Céu Limpo`
        } else if (weatherData.current.condition.text === 'Moderate snow') {
            actualWheaterState.innerText = `neve moderada`
        } else if (weatherData.current.condition.text === 'Patchy heavy snow') {
            actualWheaterState.innerText = `Neve pesada irregular`
        } else if (weatherData.current.condition.text === 'Heavy snow') {
            actualWheaterState.innerText = `Nevasca Forte`
        } else if (weatherData.current.condition.text === 'Ice pellets') {
            actualWheaterState.innerText = `Pelotas de gelo`
        } else if (weatherData.current.condition.text === 'Light rain shower') {
            actualWheaterState.innerText = `Chuva leve`
        } else if (weatherData.current.condition.text === 'Moderate or heavy rain shower') {
            actualWheaterState.innerText = `Pancada de chuva moderada ou forte`
        } else if (weatherData.current.condition.text === 'Torrential rain shower') {
            actualWheaterState.innerText = `chuva torrencial`
        } else if (weatherData.current.condition.text === 'Light sleet showers') {
            actualWheaterState.innerText = `Chuvas leves de granizo`
        } else if (weatherData.current.condition.text === 'Moderate or heavy sleet showers') {
            actualWheaterState.innerText = `Pancadas de granizo moderadas ou fortes`
        } else if (weatherData.current.condition.text === 'Light snow showers') {
            actualWheaterState.innerText = `Nevascas leves`
        } else if (weatherData.current.condition.text === 'Moderate or heavy snow showers') {
            actualWheaterState.innerText = `Pancadas de neve moderadas ou fortes`
        } else if (weatherData.current.condition.text === 'Light showers of ice pellets') {
            actualWheaterState.innerText = `Chuvas leves de pelotas de gelo`
        } else if (weatherData.current.condition.text === 'Moderate or heavy showers of ice pellets') {
            actualWheaterState.innerText = `Chuvas moderadas ou pesadas de pelotas de gelo`
        } else if (weatherData.current.condition.text === 'Patchy light rain with thunder') {
            actualWheaterState.innerText = `Chuva fraca irregular com trovão`
        } else if (weatherData.current.condition.text === 'Moderate or heavy rain with thunder') {
            actualWheaterState.innerText = `Chuva moderada ou forte com trovoada`
        } else if (weatherData.current.condition.text === 'Patchy light snow with thunder') {
            actualWheaterState.innerText = `Neve fraca irregular com trovão`
        } else{
            actualWheaterState.innerText = `Neve moderada ou forte com trovoada`
        }
        })
    .catch(error => {
        alert('Erro na busca, digite o nome de um lugar ou corrija o nome digitado!')
        inputSearch.value = ''
    })
})

