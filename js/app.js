const API = 'aa3d648dd1d55d5a05313a802c523171';

const getCity = () => {
    const cityName = document.getElementById('search-field');
    loadData(cityName.value);
}

const loadData = async cityName => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    processData(data);
}
loadData('dhaka');

const getCountryName = async code => {
    const url = `https://restcountries.eu/rest/v2/alpha/${code}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.name);
    return data.name;
}

const processData = infos => {

    try {
        const weatherIcon = document.getElementById('weather-icon');
        const city = document.getElementById('city-name');
        const tempCelcius = document.getElementById('temp-celcius-value');
        const feelings = document.getElementById('weather-feelings');
        const countryCode = infos.sys.country;
        const iconID = infos.weather[0].icon;
        const countryName = getCountryName(countryCode);
        console.log(countryName);

        weatherIcon.src = `https://openweathermap.org/img/wn/${iconID}@2x.png`;
        city.innerText = infos.name + ', ' + countryName;
        tempCelcius.innerText = infos.main.temp + '° C';
        feelings.innerText = infos.weather[0].main;
    } catch (error) {
        alert(infos.message);
    }

}