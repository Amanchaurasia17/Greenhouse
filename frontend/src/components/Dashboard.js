import React, { useState, useEffect } from 'react';
import { fetchOutages } from '../api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const Dashboard = () => {
  const [outages, setOutages] = useState([]);

  const loadOutages = async () => {
    try {
      const { data } = await fetchOutages();
      setOutages(data);
    } catch (err) {
      console.error('Error fetching outages', err);
    }
  };

  useEffect(() => {
    loadOutages();
  }, []);

  const data = outages.map((outage) => ({
    location: outage.location,
    count: 1,
  }));

  return (
    <div>
      <h2>Outage Analytics</h2>
      <BarChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="location" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default Dashboard;
