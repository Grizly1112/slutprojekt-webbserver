import axiosInstance from './axiosInstance';

// https://codepen.io/MiguelEnc/pen/vmZVar
// https://codesandbox.io/s/ovq706o755?file=/src/index.js
export const GetWeatherData = async () => {
    const position = await axiosInstance.get('https://ipapi.co/json/');
    const api_key = "8b4a1cfe7b37f251dcce8b232975fd6d";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${position.data.city}&appid=${api_key}`;        
    const forecastApi = await axiosInstance.get(url);
    return forecastApi.data;
};

export const UpdateVisitingCount = async (uniqueUserVisiting) => await axiosInstance.post('/updatevisitorcount', {uniqueUserVisiting: uniqueUserVisiting})

export const GetVisitingCount = async () => await axiosInstance.get('/getVisitingCount')

