import React from 'react';
import './Main.css';

const Main = ( {results, forecast, onSearchForeCast} ) => {

// console.log(results);

    const weather = {
        city: { name: 'City' },
        cityId: { name: 'City ID' },
        timezone: { name: 'Timezone' },
        timeOfData: { name: 'Time of data' },
        latitude: { name: 'Latitude' },
        longitude: { name: 'Longitude' },
        description: { name: 'Description' },
        icon: { name: 'Icon' },
        id: { name: 'ID' },
        weatherParameters: { name: 'Weather parameters' },
        temperature: { name: 'Temperature' },
        tempFeels: { name: 'Temperature feels' },
        pressure: { name: 'Pressure' },
        humidity: { name: 'Humidity' },
        minTemperature: { name: 'Minimum temperature' },
        maxTemperature: { name: 'Maximum temperature' },
        windSpeed: { name: 'Wind speed' },
        windDirection: { name: 'Wind direction' },
        windGust: { name: 'Wind gust' },
        clouds: { name: 'Clouds' },
        rain1h: { name: 'Rain 1h' },
        rain3h: { name: 'Rain 3h' },
        snow1h: { name: 'Snow 1h' },
        snow3h: { name: 'Snow 3h' },
        country: { name: 'Country' },
        sunrise: { name: 'Sunrise' },
        sunset: { name: 'Sunset' }, 
        cityTime: { name: 'Time' }
    };

    // Convert time
    Date.prototype.addSeconds = function(s) {
        this.setSeconds(this.getSeconds()+s);
        return this;
    }

    // Time and weekday
    function timeNormal(timeInSeconds, format = 'time'){
        const currentFullDate = new Date().addSeconds(timeInSeconds-3600);

        if (format === 'time') {
            return currentFullDate.toLocaleString('en-GB', {hour12: false, hour: '2-digit', minute: '2-digit'});
        }
        if (format === 'weekday') {
            return currentFullDate.toLocaleString('en-GB', {weekday: 'long'});
        }
    }

    // Sunset / sunrise time
    function sunSetRise(timeInSeconds) {
        const timezone = weather.timezone.data;
        const milliseconds = ((timeInSeconds + timezone) - 3600) * 1000;
        const sunTime = new Date(milliseconds);
        return sunTime.toLocaleString('en-GB', {hour: '2-digit', minute: '2-digit'});
    }


    if (typeof(results.coord) === 'object') {
        // Assign city
        weather.city.data = results.name;
        weather.cityId.data = results.id;
        weather.timezone.data = results.timezone; // Shift in seconds from UTC
        // Custom field: Searched city local time
        weather.cityTime.data = timeNormal(results.timezone, 'time');
        weather.cityTime.dataDay = timeNormal(results.timezone, 'weekday');
        weather.timeOfData.data = new Date(results.dt * 1000).toLocaleString("en-GB", {hour12: false, hour: '2-digit', minute: '2-digit'}); // Time of data calculation, unix, UTC 

        // Assign latitude and longitude
        for (const property in results.coord) {
            if (property === 'lat') { weather.latitude.data = results.coord[property] };
            if (property === 'lon') { weather.longitude.data = results.coord[property] };
        }

        // weather = results.weather;
        results.weather.map(result => {
            for (const property in result) {
                 // Weather condition within the group. You can get the output in your language
                if (property === 'description') { weather.description.data = result.description }
                if (property === 'icon') { weather.icon.data = result.icon }
                // Weather condition id
                if (property === 'id') { weather.id.data = result.id }
                // Group of weather parameters (Rain, Snow, Extreme etc.)
                if (property === 'main') { weather.weatherParameters.data = result.main }
            }

            // Temperature
            weather.temperature.data = parseInt(results.main.temp);
            for (const property in results.main) {
                if (property === 'feels_like') { weather.tempFeels.data = parseInt(results.main.feels_like) }
                //Atmospheric pressure 
                if (property === 'pressure') { weather.pressure.data = results.main.pressure }
                if (property === 'humidity') { weather.humidity.data = results.main.humidity }
                if (property === 'temp_min') { weather.minTemperature.data = parseInt(results.main.temp_min) }
                if (property === 'temp_max') { weather.maxTemperature.data = parseInt(results.main.temp_max) }
            }

            // Wind
            for (const property in results.wind) {
                if (property === 'speed') { weather.windSpeed.data = results.wind.speed }
                // Wind direction, degrees (meteorological)
                if (property === 'deg') { weather.windDirection.data = results.wind.deg }
                if (property === 'gust') { weather.windGust.data = results.wind.gust }
            }

            // Clouds
            for (const property in results.clouds) {
                // Cloudiness, %
                if (property === 'all') { weather.clouds.data = results.clouds.all };
            }

            // Rain
            for (const property in results.rain) {
                // Rain volume for the last 1 or 3 hours, mm
                if (property === '1h') { weather.rain1h.data = results.rain['1h'] };
                if (property === '3h') { weather.rain3h.data = results.rain['3h'] };
            }

            // Snow
            for (const property in results.snow) {
                // Snow volume for the last 1 or 3 hours, mm
                if (property === '1h') { weather.snow1h.data = results.snow['1h'] };
                if (property === '3h') { weather.snow3h.data = results.snow['3h'] };
            }
            
            // System
            for (const property in results.sys) {
                // Snow volume for the last 1 or 3 hours, mm
                if (property === 'country') { weather.country.data = results.sys.country };
                if (property === 'sunrise') { weather.sunrise.data = sunSetRise(results.sys.sunrise) }; // Sunrise time, unix, UTC
                if (property === 'sunset') { weather.sunset.data = sunSetRise(results.sys.sunset) }; // Sunset time, unix, UTC
            }
        return '';
        })
    }

    // Forecast button call
    const onSearchForecastBtn = (e) => {
        e.preventDefault();
        const currentActive = document.querySelector('.container-current-active');
        const forecastActive = document.querySelector('.container-forecast-active');
        currentActive.classList.toggle('active');

        if (forecastActive) {
            forecastActive.classList.toggle('active');    
        }
        
        onSearchForeCast();
    }

    // 8 Day Forecast
    const forecastArr = [ [ {} ], [ {} ], [ {} ], [ {} ], [ {} ], [ {} ], [ {} ], [ {} ] ];
    const foreCast = () => {
        for (const idx in forecast.daily) {
                const unixTimeStamp = forecast.daily[idx].dt + 86400;
                const milliseconds = unixTimeStamp * 1000;
                const dateObject = new Date(milliseconds);

                forecastArr[idx].tempMin = parseInt(forecast.daily[idx].temp.min);
                forecastArr[idx].tempMax = parseInt(forecast.daily[idx].temp.max);
                forecastArr[idx].icon = forecast.daily[idx].weather[0].icon;
                forecastArr[idx].weekday = dateObject.toLocaleString('en-GB', {weekday: 'long'});
        }   
    }

    console.log(weather);

    return (
        <div className='weather-wrap'>
            {/* <h1>Weather</h1> */}
            
            { results === '' ? <h2>Hi there,<br />Please search for a city for weather information</h2> : 
            <div className='container container-current container-current-active'>
                <div className='main-city'>
                <h1>{weather.city.data}, {weather.country.data}</h1>
                <h2>{weather.cityTime.data}<br />{weather.cityTime.dataDay}</h2>
                </div>

                <div className='main-current-weather-pt1'>
                <div>
                    <h1>{weather.temperature.data} &#8451;</h1>
                    <h2><span className='temp-max'>{weather.maxTemperature.data} &#8451;</span> / <span className='temp-min'>{weather.minTemperature.data} &#8451;</span></h2>
                    <p>Feels like <br /><span>{weather.tempFeels.data} &#8451;</span></p>
                    
                    {/* <h5>Update {weather.timeOfData.data}</h5> */}
                </div>
                <div>
                    <img src={require(`./images/${weather.icon.data}.png`)} alt={weather.description.data} />
                    <h3>{weather.description.data}</h3>
                </div>
                </div>

                <div className='main-current-weather-pt2'>
                <p>Pressure <br /><span>{weather.pressure.data} mb</span></p>
                
                <p>Humidity <br /><span>{weather.humidity.data} %</span></p>
                </div>

                <div className='main-current-weather-pt3'>
                <p><img src={require(`./images/sunrise.png`)} alt='Sunrise' /> <br /><span>{weather.sunrise.data}</span></p>
                <p><img src={require(`./images/sunset.png`)} alt='Sunset' /> <br /><span>{weather.sunset.data}</span></p>
                <p><img src={require(`./images/wind.png`)} alt='Wind' /> <br /><span>{weather.windSpeed.data} m/s</span></p>
                </div>

                <div className='main-current-weather-pt4'>
                    <button className='forecast-btn' onClick={onSearchForecastBtn}>8 Day Forecast</button>
                </div>

            </div> 
            }


            { forecast === '' ? '' : 
            <div className='container container-forecast container-forecast-active'>
                <div className='main-city'>
                    <h1>{weather.city.data}, {weather.country.data}</h1>
                    <h2>8 Day Forecast</h2>
                </div>

                {foreCast()}
                <div className='forecast-day'>
                
                {forecastArr.map(data => (
                    <ul key={Math.random()}>
                    <li>{data.weekday}</li>
                    <li><span className='temp-max'>{data.tempMax} &#8451;</span> / <span className='temp-min'>{data.tempMin} &#8451;</span></li>
                    <li><img src={require(`./images/${data.icon}.png`)} alt={data.icon} /></li>
                    </ul>
                    )
                )
                }

                </div>

                <div className='main-current-weather-pt4'>
                    <button className='forecast-btn' onClick={onSearchForecastBtn}>Today</button>
                </div>

            </div> 
            }

        </div>
    );
};

export default Main;