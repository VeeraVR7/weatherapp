import { use, useEffect, useState } from 'react'
import './App.css'
import { FaCloud, FaSun, FaCloudRain, FaSnowflake, FaWind, FaTint, FaSearch } from 'react-icons/fa';

const WeatherDetails=({ temp, city, country, lot, log, humidity,wind,weatherstate})=>{
const getIconColor = (state) => {
    switch (state) {
      case "Clouds":
        return "#D3D3D3"; 
      case "Clear":
        return "#FFD700"; 
      case "Rain":
        return "#1E90FF"; 
      case "Snow":
        return "#FFFFFF"; 
      case "Mist":
        return "#AFEEEE"; 
      default:
        return "#FFFFFF"; 
    }
  }
  return(<>

   <div className="image">
        {weatherstate === "Clouds" && <FaCloud className="display-icon" style={{ color: getIconColor("Clouds") }} />}
        {weatherstate === "Clear" && <FaSun className="display-icon" style={{ color: getIconColor("Clear") }} />}
        {weatherstate === "Rain" && <FaCloudRain className="display-icon" style={{ color: getIconColor("Rain") }} />}
        {weatherstate === "Snow" && <FaSnowflake className="display-icon" style={{ color: getIconColor("Snow") }} />}
        {weatherstate === "Mist" && <FaTint className="display-icon" style={{ color: getIconColor("Mist") }} />}
      </div>
    <div className='temp'>{temp}°C</div>
    <div className='weatherstate'>{weatherstate}</div>
    <div className='location'>{city}</div>
    <div className='country'>{country}</div>
    <div className='cord'>
      <div>
        <span className='lat'>latitude</span>
        <span>{lot}</span>
      </div>
      <div>
        <span className='log'>logitude</span>
        <span>{log}</span>
      </div>
    </div>
    <div className='data-container'>
      <div className='element'>
         <FaTint className="icon" style={{ color: "#ADD8E6" }} />
        <div className='data'>
          <div className='humidity-percent'>{humidity}%</div>
          <div className='text'>Humidity</div>
        </div>
      </div>
       <div className='element'>
        <FaWind className="icon" style={{ color: "#20B2AA" }} />
        <div className='data'>
          <div className='wind-percent'>{wind} km/h</div>
          <div className='text'>WindSpeed</div>
        </div>
      </div>
    </div>
  
    </>)
};

function App() {
  const[text,settext]=useState("Madurai")
  const [icon, seticon]=useState(FaSun);
  const [temp, settemp]=useState(0);
  const[weatherstate,setweatherstate]=useState("")
  const [city,setcity]=useState("Madurai");
  const [country, setcountry]=useState("IN");
  const [lot, setlot]=useState(0);
  const [log, setlog]=useState(0);
  const[humidity,sethumidity]=useState(0);
  const[wind,setwind]=useState(0);
  const[cityNotFound,setCityNotFound]=useState(false);
  const[loading,setloading]=useState(false);
  const[error,seterror]=useState(null);

const search=async()=>{
  setloading(true);

  let api_key="24e637478af676b2e60fbddf136b6a9e"
  let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=metric`;
  try{
    let res=await fetch(url);
    let data=await res.json();
    console.log(data)
    if (data.cod==="404"){
      console.error("Ciyt not found");
      setCityNotFound(true);
      setloading(false);
      return
    }
    sethumidity(data.main.humidity);
    setwind(data.wind.speed);
    settemp(Math.floor(data.main.temp));
    setweatherstate(data.weather[0].main)
    setcity(data.name);
    setcountry(data.sys.country);
    setlog(data.coord.lon);
    setlot(data.coord.lat);
    setCityNotFound(false);
  }catch(err){
    console.error("An error occurred:",err)
    seterror("An error occurred while fetching weather data.");
  }finally{
    setloading(false);

  }
}
const handleCity=(e)=>{
  settext(e.target.value);
}
const handleKeyDown=(e)=>{
  if(e.key==="Enter"){
    search();
  }
}
useEffect(function(){
  search();
},[])
  return (
    <>
      <div className='container'>
      <div className='input-container'>
        <input type='text' className='city-input' placeholder='Search city' 
        onChange={handleCity} value={text} onKeyDown={handleKeyDown}/>
        <div className='search-icon' onClick={()=>search()}>
          <FaSearch/>
        </div>
      </div>
      {loading && <div className='loading-message'>loading...</div>}
      {error && <div className='error-message'>{error}</div>}
      {cityNotFound && <div className='city-Not-Found'>cityNotFound</div>}
     {!loading && !cityNotFound && <WeatherDetails weatherstate={weatherstate} temp={temp} city={city} country={country} 
      lot={lot} log={log} humidity={humidity} wind={wind}
      />}
      </div>
    </>
  )
}

export default App
