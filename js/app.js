// API key
const API = 'aa3d648dd1d55d5a05313a802c523171';

// get city name from user
const getCity = document.getElementById('search-city');
getCity.addEventListener('click', (e) => {
    e.preventDefault();
    const cityName = document.getElementById('search-field');
    loadData(cityName.value);
    cityName.value = '';
})

// load data from openweathermap API
const loadData = async cityName => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    processData(data);
}

// default API
loadData('dhaka');

// get country name from restcoutries API
const getCountryName = async code => {
    const url = `https://restcountries.eu/rest/v2/alpha/${code}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.name);
    return data.name;
}

// process loaded data
const processData = async infos => {
    try {
        const weatherIcon = document.getElementById('weather-icon');
        const city = document.getElementById('city-name');
        const tempCelcius = document.getElementById('temp-celcius-value');
        const feelings = document.getElementById('weather-feelings');
        const countryCode = infos.sys.country;
        const iconID = infos.weather[0].icon;
        const countryName = await getCountryName(countryCode);
        console.log(countryName);

        weatherIcon.src = `https://openweathermap.org/img/wn/${iconID}@2x.png`;
        city.innerText = infos.name + ', ' + countryName;
        tempCelcius.innerText = infos.main.temp + '° C';
        feelings.innerText = infos.weather[0].main;
    } catch (error) {
        alert(infos.message);
    }
}