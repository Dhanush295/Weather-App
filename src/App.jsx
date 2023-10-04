import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Weather from "../components/Weather";
import './App.css';


function App() {
  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      backgroundImage: `url("../components/images/weather.jpg")`,
      backgroundSize: "cover", 
      backgroundRepeat: "no-repeat",
    }}>
      <Router>
        <Routes>
          <Route path="/" element={<Weather />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
