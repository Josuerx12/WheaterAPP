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
const units = document.querySelectorAll('.unit')
// content item's

const cardsOfWeek = document.querySelector('.forequest-of-the-week')

//units

const celciusBtn = document.querySelector('.celcius-btn')
const fahrenheitBtn = document.querySelector('.fahrenheit-btn')

celciusBtn.addEventListener('click', () => {
    celciusBtn.classList.toggle('selected')
    fahrenheitBtn.classList.toggle('selected')
})
fahrenheitBtn.addEventListener('click', () => {
    celciusBtn.classList.toggle('selected')
    fahrenheitBtn.classList.toggle('selected')
})

    searchLocation.addEventListener('click', () => {
        if (celciusBtn.classList.contains('selected')){
            const inputLocationValue = inputSearch.value
            console.log(inputLocationValue)
            sidebar.classList.toggle('hidden')
            searchSidebar.classList.toggle('hidden')
            inputSearch.value = ''
            units.innerText = `°C`
                api.get(`forecast.json?key=${apiKey}&q=${inputLocationValue}&days=5&aqi=yes&alerts=no&lang=pt`)
                .then(weather => {
                    const weatherData = weather.data
                    console.log(weatherData)
                    currentLocation.innerHTML = `<p id="current-location"><i class="fa-solid fa-location-dot"></i> ${weatherData.location.name}</p>`
                    temperature.innerHTML = `<p id="temperature">${weatherData.current.temp_c.toFixed(0)}<span id="unit">°C</span></p>`
                    iconActualWheaterState.src = `${weatherData.current.condition.icon}`
                    actualWheaterState.innerText = `${weatherData.current.condition.text}`
                    const highlights = weatherData.forecast.forecastday
    
                    highlights.map((tempo) => {
                        console.log(tempo.date)
                        console.log(tempo.day)
                        const newHtml = `
                        <div class="card">
                            <h3 class="day-of-the-week">${tempo.date}</h3>
                            <img src="${tempo.day.condition.icon}" alt="icone do estado de temperatura do dia">
                            <p> <span id="maxima">${tempo.day.maxtemp_c.toFixed(0)}<span class="unit">°C</span></span> <span class="minima">${tempo.day.mintemp_c.toFixed(0)}<span class="unit">°C</span></span></p>
                        </div>
                        `
                        cardsOfWeek.innerHTML += newHtml
                    })
                    //Wind force and direction
                    const windForce = document.querySelector('.wind-force')
                    const windDirection = document.querySelector('#wind-direction')
                    const windDegree = document.querySelector('.fa-location-arrow')
                    windForce.innerHTML = `<p class="wind-force">${weatherData.current.wind_mph} <span>mph</span></p>`
                    windDirection.innerHTML = `<p id="wind-direction"><i class="fa-solid fa-location-arrow"></i>${weatherData.current.wind_dir}</p>`
                    windDegree.style.transform = `rotate(${weatherData.current.wind_degree})`
                    //humidity
                    const percentageHum = document.querySelector('#percentage')
                    const humidityPer = document.querySelector('.humidity-percentage')
                    humidityPer.innerHTML = `<p class="humidity-percentage">${weatherData.current.humidity}<span>%</span></p>`
                    percentageHum.style.width = `${weatherData.current.humidity}`
                    //visibility
                    const visibility = document.querySelector('#visibility-value')
                    visibility.innerHTML = `<p id="visibility-value">${weatherData.current.vis_miles} <span>miles</span></p>`
                    // air pression
                    const pressureValue = document.querySelector('#pressure-value')
                    pressureValue.innerHTML = `<p id="pressure-value">${weatherData.current.pressure_mb} <span>mb</span></p>`
                })
                .catch(error => {
                    alert('Erro na busca, digite o nome de um lugar ou corrija o nome digitado!')
                    inputSearch.value = ''
                })
        } else {
        const inputLocationValue = inputSearch.value
        console.log(inputLocationValue)
        sidebar.classList.toggle('hidden')
        searchSidebar.classList.toggle('hidden')
        inputSearch.value = ''
        units.innerText += `°F`
            api.get(`forecast.json?key=${apiKey}&q=${inputLocationValue}&days=5&aqi=yes&alerts=no&lang=pt`)
            .then(weather => {
                const weatherData = weather.data
                console.log(weatherData)
                currentLocation.innerHTML = `<p id="current-location"><i class="fa-solid fa-location-dot"></i> ${weatherData.location.name}</p>`
                temperature.innerHTML = `<p id="temperature">${weatherData.current.temp_f.toFixed(0)}<span id="unit">°F</span></p>`
                iconActualWheaterState.src = `${weatherData.current.condition.icon}`
                actualWheaterState.innerText = `${weatherData.current.condition.text}`
                const highlights = weatherData.forecast.forecastday

                highlights.map((tempo) => {
                    console.log(tempo.date)
                    console.log(tempo.day)
                    const newHtml = `
                    <div class="card">
                        <h3 class="day-of-the-week">${tempo.date}</h3>
                        <img src="${tempo.day.condition.icon}" alt="icone do estado de temperatura do dia">
                        <p> <span id="maxima">${tempo.day.maxtemp_f.toFixed(0)}<span class="unit">°F</span></span> <span class="minima">${tempo.day.mintemp_f.toFixed(0)}<span class="unit">°F</span></span></p>
                    </div>
                    `
                    cardsOfWeek.innerHTML += newHtml
                })
                //Wind force and direction
                const windForce = document.querySelector('.wind-force')
                const windDirection = document.querySelector('#wind-direction')
                const windDegree = document.querySelector('.fa-location-arrow')
                windForce.innerHTML = `<p class="wind-force">${weatherData.current.wind_mph} <span>mph</span></p>`
                windDirection.innerHTML = `<p id="wind-direction"><i class="fa-solid fa-location-arrow"></i>${weatherData.current.wind_dir}</p>`
                windDegree.style.transform = `rotate(${weatherData.current.wind_degree})`
                //humidity
                const percentageHum = document.querySelector('#percentage')
                const humidityPer = document.querySelector('.humidity-percentage')
                humidityPer.innerHTML = `<p class="humidity-percentage">${weatherData.current.humidity}<span>%</span></p>`
                percentageHum.style.width = `${weatherData.current.humidity}`
                //visibility
                const visibility = document.querySelector('#visibility-value')
                visibility.innerHTML = `<p id="visibility-value">${weatherData.current.vis_miles} <span>miles</span></p>`
                // air pression
                const pressureValue = document.querySelector('#pressure-value')
                pressureValue.innerHTML = `<p id="pressure-value">${weatherData.current.pressure_mb} <span>mb</span></p>`
            })
            .catch(error => {
                alert('Erro na busca, digite o nome de um lugar ou corrija o nome digitado!')
                inputSearch.value = ''
            })
        }
    })

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