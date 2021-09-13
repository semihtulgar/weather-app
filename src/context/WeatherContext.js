import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "./LocationContext";
import axios from "axios";

const WeatherContext = createContext();

export const WeatherProvider = ({children}) => {
    const {locationData} = useLocation();

    const [weatherData, setWeatherData] = useState(null)

    useEffect(() => {
        getWeatherData(locationData[0], locationData[1])    
    }, [locationData])
    
    async function getWeatherData (latitude, longitude) {
        const response = await axios(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly,alerts&units=metric&appid=311b152bb9e01d265d12cce358df682f`);
        
        setWeatherData(response.data.daily)
    }

    const values = {
        weatherData,
        setWeatherData
    }

    return <WeatherContext.Provider value={values}>{children}</WeatherContext.Provider>
}

export const useWeather = () => useContext(WeatherContext);
