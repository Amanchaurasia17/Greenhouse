import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { fetchOutages } from '../api';

const MapView = () => {
  const [outages, setOutages] = useState([]);
  const [selectedOutage, setSelectedOutage] = useState(null);

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

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={{ lat: 20.5937, lng: 78.9629 }} // Default to India
        zoom={5}
      >
        {outages.map((outage) => (
          <Marker
            key={outage._id}
            position={{ lat: outage.latitude, lng: outage.longitude }}
            onClick={() => setSelectedOutage(outage)}
          />
        ))}
        {selectedOutage && (
          <InfoWindow
            position={{ lat: selectedOutage.latitude, lng: selectedOutage.longitude }}
            onCloseClick={() => setSelectedOutage(null)}
          >
            <div>
              <h4>{selectedOutage.location}</h4>
              <p>{selectedOutage.description}</p>
              <small>Status: {selectedOutage.status}</small>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapView;
