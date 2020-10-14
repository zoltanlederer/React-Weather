import React from 'react';
import './Main.css';

const Main = ( {results} ) => {

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
        sunset: { name: 'Sunset' }
    };

    // function Unix_timestamp(t){
    //     var dt = new Date(t*1000);
    //     var hr = dt.getHours();
    //     var m = "0" + dt.getMinutes();
    //     var s = "0" + dt.getSeconds();
    //     return hr+ ':' + m.substr(-2) + ':' + s.substr(-2);  
    // }       

    if (typeof(results.coord) === 'object') {
        // Assign city
        weather.city.data = results.name;
        weather.cityId.data = results.id;
        weather.timezone.data = results.timezone; // Shift in seconds from UTC 
        weather.timeOfData.data = results.dt; // Time of data calculation, unix, UTC 

        // Assign latitude and longitude
        for (const property in results.coord) {
            // console.log(`${property}: ${results.coord[property]}`);
            if (property === 'lat') { weather.latitude.data = results.coord[property] };
            if (property === 'lon') { weather.longitude.data = results.coord[property] };
        }

        // weather = results.weather;
        results.weather.map(result => {
            // return weather = result;
            // console.log(result)
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
            weather.temperature.data = results.main.temp;
            for (const property in results.main) {
                // if (property === 'temp') { weather.temp = results.main.temp }
                if (property === 'feels_like') { weather.tempFeels.data = results.main.feels_like }
                //Atmospheric pressure 
                if (property === 'pressure') { weather.pressure.data = results.main.pressure }
                if (property === 'humidity') { weather.humidity.data = results.main.humidity }
                if (property === 'temp_min') { weather.minTemperature.data = results.main.temp_min }
                if (property === 'temp_max') { weather.maxTemperature.data = results.main.temp_max }
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
                if (property === 'sunrise') { weather.sunrise.data = results.sys.sunrise }; // Sunrise time, unix, UTC
                if (property === 'sunset') { weather.sunset.data = results.sys.sunset }; // Sunset time, unix, UTC
            }

        })

        console.log(weather);
        console.log('igen');
    } else {
        console.log('nem');
    }

    // From the weather object export the relevant data to an array and render this array
    let contents = [];   
    if (weather.city.data) {
        for (const prop in weather) {
            console.log(weather[prop].name, weather[prop].data);
            
            if (weather[prop].data) {
                contents.push(`${weather[prop].name}: ${weather[prop].data}`);
            }
            
        }
        console.log(contents)
    }
    
    // const display = () => {
    //     return (
    //       <div className='container'>
    //             <div className='main-city'>
    //             <h2>{weather.city.data}, {weather.country.data}</h2>
    //             <p>Mon, 12 Oct 2020</p>
    //             </div>

    //             <div className='main-current-weather-pt1'>
    //             <div>
    //                 <h1>{weather.temperature.data}C</h1>
    //                 <h3>{weather.description.data}</h3>
    //                 <h5>Update 1.48pm</h5>
    //             </div>
    //             <div>
    //                 <img src={`https://openweathermap.org/img/wn/${weather.icon.data}@2x.png`} alt={weather.description.data} />
    //             </div>
    //             </div>

    //             <div className='main-current-weather-pt2'>
    //             <p>Pressure <br /><span>{weather.pressure.data} mb</span></p>
    //             <p>Feels like <br /><span>{weather.tempFeels.data}</span></p>
    //             <p>Humidity <br /><span>{weather.humidity.data}%</span></p>
    //             </div>

    //             <div className='main-current-weather-pt3'>
    //             <p>Perciitation <br /><span>50%</span></p>
    //             <p>Humidity <br /><span>41%</span></p>
    //             <p>UV Index <br /><span>6 High</span></p>
    //             </div>
    //         </div>  
    //     );
    // };

    return (
        <div>
            <h1>Weather</h1>
            <ul>
                {/* { contents.map(content => (<li>{content}</li>) ) } */}
            </ul>

        {/* {display()} */}

            <div className='container'>
                <div className='main-city'>
                <h2>{weather.city.data}, {weather.country.data}</h2>
                <p>Mon, 12 Oct 2020</p>
                </div>

                <div className='main-current-weather-pt1'>
                <div>
                    <h1>{weather.temperature.data}C</h1>
                    <h3>{weather.description.data}</h3>
                    <h5>Update 1.48pm</h5>
                </div>
                <div>
                    <img src={`https://openweathermap.org/img/wn/${weather.icon.data}@2x.png`} alt={weather.description.data} />
                </div>
                </div>

                <div className='main-current-weather-pt2'>
                <p>Pressure <br /><span>{weather.pressure.data} mb</span></p>
                <p>Feels like <br /><span>{weather.tempFeels.data}</span></p>
                <p>Humidity <br /><span>{weather.humidity.data}%</span></p>
                </div>

                <div className='main-current-weather-pt3'>
                <p>Perciitation <br /><span>50%</span></p>
                <p>Humidity <br /><span>41%</span></p>
                <p>UV Index <br /><span>6 High</span></p>
                </div>
            </div>

        </div>
    );
};

export default Main;





/* 
City: {weather.city.data} <br />
City ID: {weather.cityId.data} <br />
Timezone: {weather.timezone.data} <br />
Time of data: {weather.timeOfData.data} <br />
Latitude: {weather.latitude.data} <br />
Longitude: {weather.longitude.data} <br />
Description: {weather.description.data} <br />
Icon: {weather.icon.data} <br />
ID: {weather.id.data} <br />
Weather parameters: {weather.weatherParameters.data} <br />
Temperature: {weather.temperature.data} <br />
Temperature feels: {weather.tempFeels.data} <br />
Pressure: {weather.pressure.data} <br />
Humidity: {weather.humidity.data} <br />
Minimum temperature: {weather.minTemperature.data} <br />
Maximum temperature: {weather.maxTemperature.data} <br />
Wind speed: {weather.windSpeed.data} <br />
Wind direction: {weather.windDirection.data} <br />
Wind gust: {weather.windGust.data} <br />
Clouds: {weather.clouds.data} <br />
Rain 1h: {weather.rain1h.data} <br />
Rain 3h: {weather.rain3h.data} <br />
Snow 1h: {weather.snow1h.data} <br />
Snow 3h: {weather.snow3h.data} <br />
Country: {weather.country.data} <br />
Sunrise: {weather.sunrise.data} <br />
Sunset: {weather.sunset.data}
*/