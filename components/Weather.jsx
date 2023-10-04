import React from "react";

function Weather() {
  return (
    <div style={{ display: "grid", color: "black", justifyContent: "center", margin: 100 }}>
      <h1>Weather App</h1>
      <div style={{ backfaceVisibility: "visible" }}>
        <nav className="navbar navbar-light bg-light" style={{backgroundBlendMode:"lighten"}}>
          <div className="container">
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
             
            </form>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Weather;
