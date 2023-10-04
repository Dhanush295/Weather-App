import React, { useState } from "react";
import{ rapid_api, rapid_key, weatherApi, weatherApiKey }from '../components/apiandkeys.jsx/Config'
import axios from "axios";

// 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}'

function Weather() {
  const [cityname, setCityName] = useState("");
  const [weather, setWeather ] = useState([]);
  let lat = '';
  let lon = '';

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
      const latitudes = locations.map((city) => city.latitude);
      const longitudes = locations.map((city) => city.longitude);
  
      // Fetch weather data for each location
      const weatherDataArray = await Promise.all(
        latitudes.map(async (lat, index) => {
          const lon = longitudes[index];
          try {
            const response = await axios.get(`${weatherApi}weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`);
            return response.data;
          } catch (error) {
            console.error("Error fetching weather data:", error);
            return null;
          }
        })
      );
  
      // Filter out any null values (failed requests)
      const validWeatherData = weatherDataArray.filter((data) => data !== null);
      setWeather(validWeatherData);
    } catch (error) {
      console.error("Error fetching location data:", error);
      // You should set an error state here to handle and display the error to the user
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
                type="button" // Change to "button" to prevent form submission
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
  
    // You can render the weather data here, e.g., props.alldata.name, props.alldata.temperature, etc.
    return (
      <div>
        {/* Render weather data here */}
      </div>
    );
  }
  
  
  
  
  
  
  
export default Weather;
