import Searchbox from "./Searchbox"
import InfoBox from "./InfoBox"
import './InfoBox.css';
import { useState } from "react"
export default function WeatherApp(){
    const [weatherInfo,setWeatherInfo] = useState({
        city: "Delhi",
        temp: 25.05,
        temp_min: 25.05,
        temp_max: 25.05,
        humidity: 47,
        feels_like: 24.84,
        weather: "haze",
      });
      let updateInfo = (newInfo) =>{
        setWeatherInfo(newInfo);
      };

    return(
    <div className="wea-app" style={{textAlign: "center"}}>
       <h1>Weather</h1>
       <Searchbox updateInfo={updateInfo}/>
       <InfoBox info = {weatherInfo}/>
    </div>
    )
}
