const express = require('express');
const Outage = require('../models/Outage');
const axios = require('axios');

const router = express.Router();

// Report an outage
router.post('/', async (req, res) => {
  try {
    const outage = new Outage(req.body);
    await outage.save();
    res.status(201).json(outage);
  } catch (err) {
    res.status(500).json({ error: 'Error reporting outage' });
  }
});

// Get all outages
router.get('/', async (req, res) => {
  try {
    const outages = await Outage.find();
    res.json(outages);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching outages' });
  }
});

// Get weather for a location (Example: OpenWeather API)
router.get('/weather', async (req, res) => {
  const { lat, lon } = req.query;
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching weather data' });
  }
});

module.exports = router;
