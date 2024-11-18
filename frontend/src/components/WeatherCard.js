import React, { useState } from 'react';
import { fetchWeather } from '../api';

const WeatherCard = () => {
  const [location, setLocation] = useState({ lat: '', lon: '' });
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    try {
      const { data } = await fetchWeather(location.lat, location.lon);
      setWeather(data);
    } catch (err) {
      alert('Error fetching weather data');
    }
  };

  return (
    <div>
      <h2>Weather Information</h2>
      <input
        type="number"
        placeholder="Latitude"
        value={location.lat}
        onChange={(e) => setLocation({ ...location, lat: e.target.value })}
      />
      <input
        type="number"
        placeholder="Longitude"
        value={location.lon}
        onChange={(e) => setLocation({ ...location, lon: e.target.value })}
      />
      <button onClick={getWeather}>Get Weather</button>
      {weather && (
        <div>
          <h4>{weather.weather[0].description}</h4>
          <p>Temperature: {(weather.main.temp - 273.15).toFixed(2)}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
