

function getForecast(city) {
    autofill.innerHTML = ''
    let xhr = new XMLHttpRequest()
    let id = getCityId(city)
    xhr.open('GET', `https://api.openweathermap.org/data/2.5/forecast?id=${id}&appid=aca53484d3608d9e44da5e4aa3d58763&units=metric`)
    xhr.onload = () => {
        if (xhr.status === 200) {
            target.innerHTML = ''
            let obj = JSON.parse(xhr.responseText)
            for (let i=0; i<40; i+=8) {
                let div = document.createElement('div');
                let date = new Date(obj.list[i].dt_txt);
                let weekdayText = days[date.getDay()]
                let icon = `http://openweathermap.org/img/wn/${obj.list[i].weather[0].icon}@2x.png`
                let img = document.createElement('img')
                img.setAttribute('src', icon)

                let weekday = document.createElement('h2')
                weekday.textContent = weekdayText
                
                let temperature = document.createElement('h1')
                temperature.textContent = obj.list[i].main.temp + '°C'
                let description = document.createElement('h3')
                description.textContent += obj.list[i].weather[0].description
                weekday.appendChild(img)
                div.appendChild(weekday)
                div.appendChild(temperature)
                div.appendChild(description)
                if (i==0) {
                    let cityName = document.createElement('h1')
                    cityName.textContent = obj.city.name
                    div.insertBefore(cityName, div.firstElementChild)
                    let day1div = document.createElement('div')
                    day1div.className = 'day1'
                    let windspeed = document.createElement('h4')
                    let pressure = document.createElement('h4')
                    let humidity = document.createElement('h4')
                    let cloudiness = document.createElement('h4')
                    windspeed.textContent = 'wind: ' + obj.list[i].wind.speed + 'm/s'
                    pressure.textContent = 'humidity: ' + obj.list[i].main.pressure + 'hPa'
                    humidity.textContent = 'pressure: ' + obj.list[i].main.humidity + '%'
                    cloudiness.textContent = 'cloudiness: ' + obj.list[i].clouds.all + '%'
                    day1div.appendChild(windspeed)
                    day1div.appendChild(pressure)
                    day1div.appendChild(humidity)
                    day1div.appendChild(cloudiness)
                    div.appendChild(day1div)
                }
                target.appendChild(div)
            }
        } else {
            target.innerHTML = xhr.status + ' - ' + xhr.statusText
        }
    }
    xhr.send(null)
}

function getCityId(city) {
    let info = city.split(' - ')
    city = info[0]
    for (i=0; i<cityList.length; i++) {
        let state = info[1] ? info[1].toLowerCase() == cityList[i].state.toLowerCase() : true, 
            country = info[2] ? info[2].toLowerCase() == cityList[i].country.toLowerCase() : true
        if (cityList[i].name.toLowerCase() == city.toLowerCase() && state && country) {
            return cityList[i].id
        }
    }
}
//==================================autofill=====================================
function parseCityList () {
    let xhr = new XMLHttpRequest()
    xhr.open('GET', './city.list.json')
    xhr.onload = () => {
        if (xhr.status == 200) {
            cityList = JSON.parse(xhr.responseText)
        }
    }
    xhr.send(null)
}

function updateAutofill(str) {
    let arr = [];
    str = str.split(' - ');
    let city = `^${str[0]}`
    let regex = new RegExp(city, 'i')
    for (let i=0; i<cityList.length && arr.length < 10; i++) {
        let state = str[1] != undefined ? str[1].toLowerCase().trim() == cityList[i].state.toLowerCase() : true, 
            country = str[2] != undefined ? str[2].toLowerCase().trim() == cityList[i].country.toLowerCase() : true
        if (regex.test(cityList[i].name) && state && country) {
            arr.push(cityList[i])
        }
    }
    
    autofill.innerHTML = ''
    for (let i=0; i<arr.length; i++) {
        let div = document.createElement('div')
        div.textContent = `${arr[i].name} - ${arr[i].state} - ${arr[i].country}`
        div.addEventListener('click', (e) => {
            input.value = e.target.textContent
            getForecast(e.target.textContent)
        })
        autofill.appendChild(div)
    }
}
/////==========================================================
let target = document.getElementById('targetBlock')
let input = document.querySelector('input')
let autofill = document.getElementById('autofill')
let prevInputVal
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let cityList
parseCityList()


input.addEventListener('keyup', (e)=> {
    if (e.key == 'Enter') {
        getForecast(e.target.value)
    } else if (e.target.value != prevInputVal) {
        updateAutofill(e.target.value)
        prevInputVal = e.target.value
    } else if (e.code == 'ArrowDown') {
        let currSection = document.querySelector('.activeSection');
        if (currSection) {
            if (currSection.nextElementSibling) {
                currSection.className = '';
                currSection.nextElementSibling.className = 'activeSection';
                input.value = currSection.nextElementSibling.textContent
                prevInputVal = e.target.value
            }
        } else {
            autofill.firstElementChild.className = 'activeSection';
            input.value = autofill.firstElementChild.textContent
            prevInputVal = e.target.value
        }
    } else if (e.code == 'ArrowUp') {
        let currSection = document.querySelector('.activeSection');
        if (currSection) {
            if (currSection.previousElementSibling) {
                currSection.className = '';
                currSection.previousElementSibling.className = 'activeSection';
                input.value = currSection.previousElementSibling.textContent
                prevInputVal = e.target.value
            }
        }
    }
})