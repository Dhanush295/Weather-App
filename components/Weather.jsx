import React, { useState } from "react";
import{ rapid_api, rapid_key, weatherApi, weatherApiKey }from '../components/apiandkeys.jsx/Config'
import axios from "axios";

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
      {weather.map((data) => (
      <WeatherData key={data.id} alldata={data} />))}      
    </div>
  );
}



  function WeatherData(props) {
    console.log(props.alldata);
  
    return (
      <div>
        
      </div>
    );
  }
  
  
  
  
  
  
  
export default Weather;
