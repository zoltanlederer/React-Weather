import axios from 'axios';

export default axios.create({
    baseURL: 'http://api.openweathermap.org'
});


// 21324c920748e543e68cc51a99754d90

// api.openweathermap.org/data/2.5/weather?q=pecs&appid=21324c920748e543e68cc51a99754d90

// https://cors-anywhere.herokuapp.com/

// https://api.openweathermap.org/data/2.5/onecall?lat=46.08&lon=18.23&exclude=hourly,daily&appid=21324c920748e543e68cc51a99754d90