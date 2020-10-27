import React, { useState } from 'react';
import Search from './Search';
import Main from './Main';
import weather from './api/weather';
import './App.css';
import bg from './images/bg.jpg';

const KEY = '&appid=21324c920748e543e68cc51a99754d90'

const lang = 'en';

function App() {

  const [results, setResult] = useState('');
  const [coord, setCoord] = useState({});
  const [forecast, setForecast] = useState('');

  const search = async (value) => {
    try {
      setForecast('');
      const response = await weather.get('/data/2.5/weather?q=' + value + '&units=metric' + KEY + '&lang=' + lang);
      setResult(response.data);  
      setCoord({lat: response.data.coord.lat, lon: response.data.coord.lon});
    } catch (err) {
      alert('oops, try again');
    }
    
  }
    
  const weatherSearch = async () => {
    const response = await weather.get('/data/2.5/onecall?lat=' + coord.lat + '&lon=' + coord.lon + '&units=metric' + KEY + '&lang=' + lang);
    setForecast(response.data);
  }

  return (
    <div className="App">
      <Search onSearchValue={search} />
      <Main results={results} forecast={forecast}  onSearchForeCast={weatherSearch} />
    </div>
  );
}

export default App;