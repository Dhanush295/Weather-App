import React, { useState } from "react";
import{ rapid_api, rapid_key, weatherApi, weatherApiKey }from '../components/apiandkeys.jsx/Config'
import axios from "axios";
import './Weather.css';

// 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}'

function Weather() {
  const [cityname, setCityName] = useState("");
  const [weather, setWeather ] = useState([]);


  const handleSubmit = async () => {
    try {
      const response = await axios.request({
        method: "GET",
        url: `${rapid_api}`,
        params: {
          minPopulation: '10000',
          namePrefix: `${cityname}`
        },
        headers: {
          "X-RapidAPI-Key": rapid_key,
          "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
        },
      });

      const locations = response.data.data;
      
      const weatherDataArray = await Promise.all(
        locations.map(async (city) => {
          const { latitude: lat, longitude: lon } = city; 
          try {
            const response = await axios.get(`${weatherApi}weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`);
            return response.data;
          } catch (error) {
            console.error("Error fetching weather data:", error);
            return null;
          }
        })
      );
  
      const validWeatherData = weatherDataArray.filter((data) => data !== null);
      setWeather(validWeatherData);
    } catch (error) {
      console.error("Error fetching location data:", error);
      
    }
  };
  
  return (
    <div
      style={{
        display: "grid",
        color: "black",
        justifyContent: "center",
        padding: 100,
      }}
    >
      <h1>Weather App</h1>
      <div style={{ backfaceVisibility: "visible" }}>
        <nav
          className="navbar navbar-light bg-light"
          style={{ backgroundBlendMode: "lighten" }}
        >
          <div className="container">
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => setCityName(e.target.value)}
              />
              <button
                className="btn btn-outline-success"
                type="button"
                onClick={handleSubmit}
              >
                Search
              </button>
            </form>
          </div>
        </nav>
      </div> 
      <div style={{display:"inline-grid", justifyContent:"center", justifyItems:"center"}}>
      {weather.map((data) => (
      <WeatherData key={Math.random()}
       main={data.weather.main} 
       description = {data.weather.description} 
       name = {data.name}
       temp = {data.main.temp}
       temp_min = {data.main.temp_min}
       temp_max = {data.main.temp_max}
       pressure = {data.main.pressure}
       humidity = {data.main.humidity}
       speed = {data.wind.speed}
       />))} 
      </div>
           
    </div>
  );
}


  function WeatherData(props) {
    console.log(props.name);
    return (
      <div className="card" style={{ width: "18rem", margin: 10 }}>
          <div className="card-body col-sm-8">
            <h5 className="card-title">{props.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{props.main}</h6>
            <p className="card-text">{props.description}</p>
            <p className="card-text">Temperature: {props.temp}°C</p>
            <p className="card-text">Min Temperature: {props.temp_min}°C</p>
            <p className="card-text">Max Temperature: {props.temp_max}°C</p>
            <p className="card-text">Pressure: {props.pressure} hPa</p>
            <p className="card-text">Humidity: {props.humidity}%</p>
            <p className="card-text">Wind Speed: {props.speed} m/s</p>
          </div>
        </div>  
    );
  }
  

  
  
  
  
  
export default Weather;
