import React, { useState } from 'react';
import { reportOutage } from '../api';

const ReportForm = ({ refreshOutages }) => {
  const [formData, setFormData] = useState({ location: '', description: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await reportOutage(formData);
      alert('Outage reported successfully');
      setFormData({ location: '', description: '' });
      refreshOutages(); // Refresh outages on successful submission
    } catch (err) {
      alert('Error reporting outage');
    }
  };

  return (
    <div>
      <h2>Report a Power Outage</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ReportForm;
