import axios from "axios";

const URL = "http://localhost:8000"

export const GetWeatherData = async () => {
    var forecast = null;

    await axios.get('https://ipapi.co/json/').then(async(position) => {
        const api_key = "8b4a1cfe7b37f251dcce8b232975fd6d";
        
        // https://codepen.io/MiguelEnc/pen/vmZVar
        // https://codesandbox.io/s/ovq706o755?file=/src/index.js
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${position.data.city}&appid=${api_key}`;        
        await axios.get(url).then(((forecastApi) => {
            forecast = forecastApi.data;
        }))
    })

    return forecast;
}