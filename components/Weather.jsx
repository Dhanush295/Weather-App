import React, { useState } from "react";
import{ rapid_api, rapid_key }from '../components/apiandkeys.jsx/Config'
import axios from "axios";

function Weather() {
  const [cityname, setCityName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  let lat = '';
  let lon = '';

  const handleSubmit = async () => {
    try {
      setLoading(true); // Set loading to true while fetching
      setError(null); // Clear any previous errors

      const response = await axios.request({
        method: "GET",
        url: `${rapid_api}`,params: {
          minPopulation: '10000',
          namePrefix: `${cityname}`
        },
        headers: {
          "X-RapidAPI-Key": rapid_key,
          "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
        },
      });

      let location = response.data.data;
      location.map((city)=>{
        console.log(city.latitude);
        lat = city.latitude
        console.log(city.longitude);
        lon = city.longitude
      });

      setLoading(false); 
    } catch (error) {
      setError("Error fetching weather data.");
      setLoading(false); 
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
    </div>
  );
}

export default Weather;





