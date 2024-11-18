import React from 'react';
import MapView from './components/MapView';
import ReportForm from './components/ReportForm';
import WeatherCard from './components/WeatherCard';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <div>
      <h1>Power Outage Reporting System</h1>
      <ReportForm />
      <MapView />
      <WeatherCard />
      <Dashboard />
    </div>
  );
};

export default App;
