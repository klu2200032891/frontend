import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Map = () => {
  const position = [51.505, -0.09]; // Example coordinates (latitude, longitude)

  return (
    <MapContainer center={position} zoom={13} style={{ height: '400px', marginTop: '20px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>A pretty CSS3 popup. <br /> Easily customizable.</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
