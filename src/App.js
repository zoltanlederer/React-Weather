import React, { useState } from 'react';
import Search from './Search';
import Main from './Main';
import weather from './api/weather';
import './App.css';

const KEY = '&appid=21324c920748e543e68cc51a99754d90'

const lang = 'en';

function App() {

  const [results, setResult] = useState('');
  const [coord, setCoord] = useState({});

  const search = async (value) => {
 
    const response = await weather.get('/data/2.5/weather?q=' + value + '&units=metric' + KEY + '&lang=' + lang);

    setResult(response.data);
    // setCoord({lat: response.data.coord.lat, lon: response.data.coord.lon});
    // weatherSearch();
  }
    

  // const weatherSearch = async () => {
  //   const response = await weather.get('/data/2.5/onecall?lat=' + coord.lat + '&lon=' + coord.lon + '&units=metric' + KEY + '&lang=' + lang);
  //   setResult(response.data);
  // }

  // console.log(coord);
  console.log(results);

  return (
    <div className="App">

      <Search onSearchValue={search} />
      <Main results={results} />
      {/* <div className='container'>
        <div className='main-city'>
          <h2>Taipei, Taiwan</h2>
          <p>Mon, 12 Oct 2020</p>
        </div>

        <div className='main-current-weather-pt1'>
          <div>
            <h1>23C</h1>
            <h3>Partly Sunny</h3>
            <h5>Update 1.48pm</h5>
          </div>
          <div>
            <img src='https://openweathermap.org/img/wn/02d@2x.png' alt='Partly Sunny' />
          </div>
        </div>

        <div className='main-current-weather-pt2'>
          <p>Barometer <br /><span>1009.0 mb</span></p>
          <p>Feels like <br /><span>25C</span></p>
          <p>Humidity <br /><span>41%</span></p>
        </div>

        <div className='main-current-weather-pt3'>
          <p>Perciitation <br /><span>50%</span></p>
          <p>Humidity <br /><span>41%</span></p>
          <p>UV Index <br /><span>6 High</span></p>
        </div>

      </div> */}
    </div>
  );
}

export default App;

/*
City: Taipei
City ID: 1668341
Timezone: 28800
Time of data: 1602521303
Latitude: 25.05
Longitude: 121.53
Description: moderate rain
Icon: 10n
ID: 501
Weather parameters: Rain
Temperature: 24.79
Temperature feels: 26.04
Pressure: 1013
Humidity: 100
Minimum temperature: 24.44
Maximum temperature: 25
Wind speed: 7.2
Wind direction: 80
Wind gust: 12.3
Clouds: 75
Rain 1h: 0.21
Country: TW
Sunrise: 1602539457
Sunset: 1602581337
*/


// 21324c920748e543e68cc51a99754d90

// api.openweathermap.org/data/2.5/weather?q=pecs&appid=21324c920748e543e68cc51a99754d90

// https://api.openweathermap.org/data/2.5/onecall?lat=46.08&lon=18.23&exclude=hourly,daily&appid=21324c920748e543e68cc51a99754d90


// https://api.openweathermap.org/data/2.5/onecall?lat=undefined&lon=undefined&units=metric&appid=21324c920748e543e68cc51a99754d90&lang=en

// https://api.openweathermap.org/data/2.5/onecall?lat=35.69&lon=139.69&units=metric&appid=21324c920748e543e68cc51a99754d90&lang=en

// function App() {

//   const [results, setResult] = useState('');
//   const [coord, setCoord] = useState({});
//   const [weatherData, setWeatherData] = useState('');

//   const search = async (value) => {
 
//     const response = await weather.get('/data/2.5/weather?q=' + value + '&units=metric' + KEY + '&lang=' + lang);

//     // setResult(response.data);
//     setCoord({lat: response.data.coord.lat, lon: response.data.coord.lon});
//     weatherSearch();
//   }
    

//   const weatherSearch = async () => {
//     const response = await weather.get('/data/2.5/onecall?lat=' + coord.lat + '&lon=' + coord.lon + '&units=metric' + KEY + '&lang=' + lang);
//     setResult(response.data);
//   }

//   console.log(coord);
//   console.log(results);

//   return (
//     <div className="App">

//       <Search onSearchValue={search} />
//       {/* <Main results={results} /> */}
//     </div>
//   );
// }