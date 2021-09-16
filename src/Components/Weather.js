import React,{useState} from 'react'
import axios from 'axios'
import './Weather.css'
import RainImage from './Rain.gif'
import CloudsImage from './Clouds.gif'
import ThunderStormImage from './ThunderStorm.gif'
import ClearImage from './Clear.gif'

function Weather(){
    const [currentState,setCurrentState] = useState("Mumbai");
    const [temp,setTemp] = useState(0);
    const [windspeed,setWindSpeed] = useState(0);
    const [weather,setWeather] = useState(' ');
    const [humidity,setHumidity] = useState(0);

    const api = {
        key1:"16b3150cbc7ae60647e69fc58dfae3e5",
        key2:"2375010151ce1d34ce3cde9aa0fda689",
        base:"https://api.openweathermap.org/data/2.5/",
    }
    const states = ["Assam","Bihar","Delhi","Gujarat","Haryana","Kerala","Punjab","Rajasthan","Tamil Nadu","Uttar Pradesh","Uttarakhand","West Bengal"]
     const searchWeather = async()=>{
        let res = await axios(`${api.base}weather?q=${currentState}&units=metric&APPID=${api.key1}`)
        const t = res.data.main.temp
        setTemp(t);
    }

    const searchForecast = async()=>{
        let res = await axios(`${api.base}forecast?q=${currentState}&appid=${api.key2}`);
        let data = res.data.list[0]
        let h = data.main.humidity;
        setHumidity(h);
        let w = data.weather[0].main;
        setWeather(w)
        let cont = document.querySelector(".main-container");
        if(w === "Rain") cont.style.backgroundImage = `url(${RainImage})`;
        else if(w === "Clouds") cont.style.backgroundImage = `url(${CloudsImage})`;
        else if(w === "Clear") cont.style.backgroundImage = `url(${ClearImage})`;
        else cont.style.backgroundImage = `url(${ThunderStormImage})`;
        let ws = data.wind.speed;
        setWindSpeed(ws)
    }

    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", 
      "August", "September", "October", "November", "December"];
        let date=d.getDate();
        let month=months[d.getMonth()];
        return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} ${date}, ${month}`
      
      }
 
    console.log(temp);
    return(
        <div className="main-container">
            <div><h1>Weather App</h1></div>
            <div className="cities">
                <select className="drop-down" value={currentState} name={currentState} onChange={(e)=>{const val = e.target.value; setCurrentState(val); searchWeather(); searchForecast();}}>
                    <option value="Mumbai" name="Mumbai" selected>Mumbai</option>
                    {
                        states.map((s,ind)=>(
                            <option value={s} name = {s} key={ind}>{s}</option>
                        ))
                    }
                </select>
            </div>
            
            <div className="weather">
                    <div className="weather-info">
                        <h1>{temp}°c</h1>
                        <div className="weather-type">
                            <h2>{weather}</h2>
                            <h3>{dateBuilder(new Date())}</h3>
                        </div>
                    </div>
                    <div className="forecast-info">
                        <h1>{currentState}</h1>
                        <h2>Wind Speed : {windspeed}</h2>
                        <h2>Humidity : {humidity}</h2>
                    </div>
            </div>
        </div>
    )
}

export default Weather