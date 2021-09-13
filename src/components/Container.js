import React, { useEffect, useState } from 'react'
import { useWeather } from '../context/WeatherContext';
import { useLocation } from "../context/LocationContext";
import data from "../cities_of_turkey.json"

function Container() {
    const {weatherData} = useWeather();
    const {locationData} = useLocation();
    const date = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDay = days[date.getDay()];
    const final = getDays(date.getDay())
    const [city, setCity] = useState(null)


    function getDays(dayValue){
        let finalArray;
        if (dayValue === 0) {
            finalArray = days.slice(date.getDay(), days.length);
            finalArray.push(currentDay);
            return finalArray
        }else if (dayValue === 6) {
            finalArray = days.slice(0, date.getDay());
            finalArray.push(currentDay)
            finalArray.unshift(currentDay)
            return finalArray
        }else{
            finalArray = days.slice(date.getDay(), days.length)
            finalArray.push(days.slice(0, date.getDay()))
            finalArray.push(currentDay)
            return finalArray
        }
    }
    
    useEffect(() => {
        setCity(getCity(locationData[0], locationData[1]))
    }, [locationData])

    function getCity(latitude, longitude){
        const city = data.filter((item) => Number(item.latitude) === latitude && Number(item.longitude) === longitude)
        
        if (city.length === 1) {
            return city[0].name            
        } else {
            return "Mevcut Konum"
        }
    }

    return (
        <div>
            <div className="weather-container">
                <h3>{city}</h3>
                {
                weatherData && weatherData.map((item, key) => (
                    <div key={key} className={`weather-of-day ${(key === 0) ? "framed" : ""}`}>
                        <div className="name-of-day">
                            {final[key]}
                        </div>
                        <div className="icon">
                            <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}  alt="hava durumu ikonu"/>
                            <span>({item.weather[0].description})</span>
                        </div>
                        <div className="celsius-degree">
                            <span>Max : {item.temp.max} &#8451;</span>
                            <span>Min : {item.temp.min} &#8451;</span>
                        </div>
                    </div>))
                }
            </div>
        </div>
    )
}

export default Container
