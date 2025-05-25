"use client"
import React from 'react';
import { MapContainer, TileLayer, Circle, Tooltip } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import "./Heatmap.css";

export default function Heatmap() {
  const avalancheMarkers = [
    // Avalanche-prone areas
    { geocode: [34.0844, 77.5592], message: "Avalanche prone area - Kashmir region" },
    { geocode: [32.0842, 76.3041], message: "Avalanche prone area - Himachal Pradesh" },
    { geocode: [30.7131, 79.2084], message: "Avalanche prone area - Uttarakhand" },
    { geocode: [33.7782, 76.5762], message: "Avalanche prone area - Jammu region" },
    { geocode: [30.6425, 79.8322], message: "Avalanche prone area - Gangotri Glacier region" },
    { geocode: [31.4451, 77.2674], message: "Avalanche prone area - Solang Valley" },
  ];

  const accidentMarkers = [
     // Accident-prone areas
     { geocode: [28.7041, 77.1025], message: "Accident prone area - Delhi" },
     { geocode: [19.0760, 72.8777], message: "Accident prone area - Mumbai" },
     { geocode: [22.5726, 88.3639], message: "Accident prone area - Kolkata" },
     { geocode: [13.0827, 80.2707], message: "Accident prone area - Chennai" },
     { geocode: [17.3850, 78.4867], message: "Accident prone area - Hyderabad" },
     { geocode: [12.9716, 77.5946], message: "Accident prone area - Bangalore" },
  ];

  return (
    <div>
      <h1 className="font-semibold text-white text-[50px]">
        Heat{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-cyan-500">
          {" "}
          Map{" "}
        </span>
      </h1>
      <MapContainer
        className="leaflet-container"
        center={[22.9868, 87.8550]}
        zoom={5}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {avalancheMarkers.map((marker, index) => (
          <Circle
            key={index}
            center={marker.geocode}
            radius={100000} // Adjust the radius as needed for your heatmap
            pathOptions={{
              color: 'green',
              fillColor: 'green',
              fillOpacity: 0.5,
            }}
          >
            <Tooltip>{marker.message}</Tooltip>
          </Circle>
        ))}
        {accidentMarkers.map((marker, index) => (
          <Circle
            key={index}
            center={marker.geocode}
            radius={100000} // Adjust the radius as needed for your heatmap
            pathOptions={{
              color: 'red',
              fillColor: 'red',
              fillOpacity: 0.5,
            }}
          >
            <Tooltip>{marker.message}</Tooltip>
          </Circle>
        ))}
      </MapContainer>
    </div>
  );
}
