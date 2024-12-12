import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
const Weather = () => {
  const inputRef = useRef();
  const [weather_data, setWeather_Data] = useState(false);
  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };
  const search = async (city) => {
    if (city === "") {
      alert("enter the city name");
      return;
    } else {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
          import.meta.env.VITE_APP_ID
        }`;

        const response = await fetch(url);
        const data = await response.json();
        const icon = allIcons[data.weather[0].icon] || cloud_icon;
        setWeather_Data({
          humidity: data.main.humidity,
          windspeed: data.wind.speed,
          temperature: Math.floor(data.main.temp),
          location: data.name,
          icon: icon,
        });
        console.log(data);
      } catch (error) {
        alert("can't find the city");
        console.log("Error in fetching the data".error);
      }
    }
  };

  useEffect(() => {
    search("chennai");
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input
          type="text"
          ref={inputRef}
          placeholder="search"
          className="bg-violet-500 "
        />
        <img
          src={search_icon}
          alt=""
          onClick={() => search(inputRef.current.value)}
        />
      </div>
      {weather_data ? (
        <>
          <img src={weather_data.icon} alt="" className="weather_icon" />
          <p className="temperature">{weather_data.temperature}</p>
          <p className="location">{weather_data.location}</p>
          <div className="weather_data">
            <div className="col">
              <img src={humidity_icon} alt="" />
              <div>
                <p>{weather_data.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="" />
              <div>
                <p>{weather_data.windspeed} km/hr</p>
                <span className="">wind</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <p>Error</p>
        </>
      )}
    </div>
  );
};

export default Weather;
