import { BsSearch } from "react-icons/bs";
import { WiDaySunny,WiDaySunnyOvercast, WiRain, WiDayCloudy, WiDayWindy, WiDayLightning,} from "react-icons/wi";
import { IconContext } from "react-icons";
import { WiHumidity } from "react-icons/wi";
import { WiCelsius } from "react-icons/wi";
import { WiStrongWind } from "react-icons/wi";
import { useState } from "react";

function App() {
  const[weatherIcon,setWeatherIcon] = useState(<WiDaySunny/>);
  const[iconColor,setIconColor] = useState("yellow");
  const[currentWidth,setCurrentWidth] = useState("40px");
  const[visibility,setVisibility] = useState("none");
  const[height,setHeight] = useState("100px");
  const[top,setTop]=useState("50%");
  const[left,setLeft]=useState("40%");
  

  const backgrounds = new Map();
  backgrounds.set('bright','linear-gradient(90deg, rgba(9,74,121,1) 0%, rgba(0,155,163,1) 39%, rgba(0,212,255,1) 100%)');
  backgrounds.set('dull','linear-gradient(90deg, rgba(71,71,71,1) 0%, rgba(117,117,117,1) 39%, rgba(164,164,164,1) 100%)');
  backgrounds.set('mild','linear-gradient(90deg, rgba(0,165,215,1) 0%, rgba(54,132,168,1) 39%, rgba(156,173,177,1) 100%)');
  backgrounds.set('overcast',' background: linear-gradient(45deg, #c3eafa, #cacbcc)')
  backgrounds.set('snow','linear-gradient(90deg, rgba(240,240,240,1) 0%, rgba(244,244,244,1) 39%, rgba(249,249,249,1) 100%)');
  const[background,setBackground] = useState('white');



  async function getWeatherData(){
    const cityInput = document.querySelector(".location");
    const apiKey = "2dde2e74e010401496811402241904";
    const apiUrl = ` https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityInput.value}`;
    const response = await fetch(apiUrl).then((response)=>response.json().then((current)=>current));
    setWeatherData(response.location.name,response.current.temp_c,response.current.humidity,response.current.wind_kph);
    getDayWeatherIcon(response.current.condition.text);
  }
  
  function setWeatherData(cityText,temperatureText,humidityText,wind_speedText){
    const temperature = document.getElementById("temp-text");
    const city = document.getElementById("city-text");
    const humidity = document.getElementById("humidity-text");
    const wind_speed =document.getElementById("wind-text");
    if(temperatureText.toString().length<2) {
      setCurrentWidth("10px");
      setLeft("40%")
    }
    else if(temperatureText.toString().length<4){
      setCurrentWidth("60px");
      setLeft("40%")
    }
    else {
      setCurrentWidth("160px");
      setLeft("60%")
    }

    city.innerHTML=cityText;
    temperature.innerHTML = temperatureText;
    humidity.innerHTML = humidityText+" %";
    wind_speed.innerHTML = wind_speedText+" km/h";
    
  }
  function getDayWeatherIcon(condition){
    switch(condition){
      case "Clear":
        setBackground(backgrounds.get('bright'));
        setIconColor("yellow");
        setWeatherIcon(<WiDaySunny/>);
        break;
      case "Overcast":
        setBackground(backgrounds.get('overcast'));
        setIconColor("lightskyblue");
        setWeatherIcon(<WiDaySunnyOvercast/>);
        break;
      case "Sunny":
        setBackground(backgrounds.get('bright'));
        setIconColor("yellow");
        setWeatherIcon(<WiDaySunny/>);
        break;
      case "Rain":
        setBackground(backgrounds.get('dull'));
        setIconColor("slategray");
        setWeatherIcon(<WiRain/>);
        break;
      case "Cloudy":
        setBackground(backgrounds.get('mild'));
        setIconColor("teal");
        setWeatherIcon(<WiDayCloudy/>);
        break;
      case "Windy":
        setBackground(backgrounds.get('dull'));
        setIconColor("teal");
        setWeatherIcon(<WiDayWindy/>);
        break;
      case "Lightning":
        setBackground(backgrounds.get('dull'));
        setIconColor("orange");
        setWeatherIcon(<WiDayLightning/>);
        break;
      case "Partly cloudy":
        setBackground(backgrounds.get('mild'));
        setIconColor("teal");
        setWeatherIcon(<WiDayCloudy/>);
        break;
    }
  }
  return(
    <div className="container" style={{'background':background,'height':height}}>
      <div className="search-container" style={{'top':top}}>
        <div className="search-box">
            <form className="location-input" autoComplete="off" onSubmit={(event)=>{
              event.preventDefault();
              setVisibility("initial");
              setHeight("700px");
              setTop("15%");
              }}>
              <input type="search" className="location" name="location"></input>
              <button type="submit" id="search-button" onClick={()=>{getWeatherData()}}>
                {
                  <IconContext.Provider value={{ size:"30px",color: "black", className: "search-icon" }}>
                    <BsSearch/>
                  </IconContext.Provider>
                }
              </button>
            </form>
          </div>
      </div>
      <div className="display-container" style={{'display':visibility}}>
        <div className="temperature-box">
          <div className="temperature">
            <div id="temp-icon">
              <IconContext.Provider value={{ size:"170px",color:iconColor ,className:"weather-icon"}}>
                  {weatherIcon}
              </IconContext.Provider>
            </div>
            <div className = "temp-info" style={{'width':currentWidth,'left':left}}>
            <p id="temp-text">--</p><IconContext.Provider value={{ size:"100px",color: "white", className:"celsius-icon"}}>
                  <WiCelsius/>
              </IconContext.Provider>
            </div>
            <div className = "city-info">
              <p id="city-text"></p>
            </div>
          </div>
          <div className="humidity">
            <div className = "humidity-icon">
              <IconContext.Provider value={{ size:"70px",color: "white"}}>
                  <WiHumidity/>
              </IconContext.Provider>
            </div>
            <div className="humidity-info">
              <h3 id="humidity-text">-- %</h3>
              <p>HUMIDITY</p>
            </div>
          </div>
          <div className="wind">
            <div className = "wind-icon">
              <IconContext.Provider value={{size:"70px",color:"white"}}>
                <WiStrongWind/>
              </IconContext.Provider>
            </div>
            <div className="wind-info">
              <h3 id="wind-text">-- km/h</h3>
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default App
