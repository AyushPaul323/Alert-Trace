// import React, { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import { Icon } from "leaflet";
// import firebase from "firebase/compat/app";
// import "firebase/compat/database";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import "leaflet/dist/leaflet.css";
// import "./Heatmap.css";
// const firebaseConfig = {
//   apiKey: "AIzaSyBdiqF2sQcIdnAFMyPKXSfTO_5Afrov944",
//   authDomain: "alerttrace-eb050.firebaseapp.com",
//   databaseURL: "https://alerttrace-eb050-default-rtdb.firebaseio.com",
//   projectId: "alerttrace-eb050",
//   storageBucket: "alerttrace-eb050.firebasestorage.app",
//   messagingSenderId: "737022141711",
//   appId: "1:737022141711:web:c5c36f21d9f12c72e9ca7a",
//   measurementId: "G-K5H8F38LMZ"
// };
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

// export default function Heatmap() {
//   const [markers, setMarkers] = useState([]);
//   const [customIcon, setCustomIcon] = useState(null); // State to hold the custom icon

//   useEffect(() => {
//     const database = firebase.database();
//     const markersRef = database.ref("sensor_data");

//     markersRef.on("value", (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         console.log(data); // Log the fetched data to console
//         const newMarkers = Object.keys(data).map((key) => {
//           const latitude = parseFloat(data[key].Latitude);
//           const longitude = parseFloat(data[key].Longitude);
//           const magnitude = parseFloat(data[key].AccelerationMagnitude);
//           const temperature = parseFloat(data[key].Temperature);
//           if (!isNaN(latitude) && !isNaN(longitude)) {
//             // Show toast notification for accident detection
//             toast.info(`Accident Detected with Magnitude: ${magnitude} Temperature of Surrounding: ${temperature}`);
//             return {
//               geocode: [latitude, longitude],
//               Popup: "Accident Detected with \t"+"\tMagnitude:\t"+[magnitude]+"\tand Temperature of Surrounding:\t"+[temperature],
//             };
//           } else {
//             return null; // Skip markers with invalid coordinates
//           }
//         });
//         setMarkers(newMarkers.filter(marker => marker !== null)); // Filter out null markers
//       }
//     });

//     // Cleanup function
//     return () => {
//       markersRef.off(); // Unsubscribe from the database updates when component unmounts
//     };
//   }, []);

//   useEffect(() => {
//     // Initialize the custom icon when component mounts
//     const icon = new Icon({
//       iconUrl: "https://res.cloudinary.com/dxxjc0u2h/image/upload/v1708629410/output-onlinegiftools_wtcrqx.gif",
//       iconSize: [38, 38],
//     });
//     setCustomIcon(icon);
//   }, []);

//   return (
//     <div>
//      <ToastContainer
//         position="top-right"
//         autoClose={2000}
//         hideProgressBar
//         toastStyle={{
//           background: "rgba(218,162,17, 0.95)", // Orange color with slight transparency
//           color: "#ffffff", // White text color
//         }}
//       />
//       <h1 className="font-semibold text-white text-[50px]">
//         Alert{" "}
//         <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-cyan-500">
//           {" "}
//           Map{" "}
//         </span>
//       </h1>
//       <MapContainer
//         className="leaflet-container"
//         center={[22.9868, 87.855]}
//         zoom={8}
//       >
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         {customIcon && markers.map((marker, index) => (
//           <Marker key={index} position={marker.geocode} icon={customIcon}>
//             <Popup className="w-[190px] h-[150px]">
//               <p className="text-[15px]">{marker.Popup}</p>
//             </Popup>
//           </Marker>
//         ))}
//       </MapContainer>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "leaflet/dist/leaflet.css";
import "./Heatmap.css";

const firebaseConfig = {
  apiKey: "AIzaSyBdiqF2sQcIdnAFMyPKXSfTO_5Afrov944",
  authDomain: "alerttrace-eb050.firebaseapp.com",
  databaseURL: "https://alerttrace-eb050-default-rtdb.firebaseio.com",
  projectId: "alerttrace-eb050",
  storageBucket: "alerttrace-eb050.appspot.com",
  messagingSenderId: "737022141711",
  appId: "1:737022141711:web:c5c36f21d9f12c72e9ca7a",
  measurementId: "G-K5H8F38LMZ"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function Heatmap() {
  const [accidents, setAccidents] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [admittedHospital, setAdmittedHospital] = useState(null);
  const [accidentIcon, setAccidentIcon] = useState(null);
  const [hospitalIcon, setHospitalIcon] = useState(null);

  useEffect(() => {
    const database = firebase.database();
    const markersRef = database.ref("sensor_data");

    markersRef.on("value", (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const newAccidents = [];
        const newHospitals = [];
        let admitted = null;

        Object.keys(data).forEach((key) => {
          const entry = data[key];
          const latitude = parseFloat(entry.Latitude);
          const longitude = parseFloat(entry.Longitude);
          const magnitude = parseFloat(entry.AccelerationMagnitude);
          const temperature = parseFloat(entry.Temperature);

          if (!isNaN(latitude) && !isNaN(longitude)) {
            // Add accident marker
            newAccidents.push({
              geocode: [latitude, longitude],
              popupText: `Accident Detected\nMagnitude: ${magnitude}\nTemperature: ${temperature}`
            });

            // Add search hospitals (nearby hospitals)
            if (entry.search) {
              entry.search.forEach((hospital) => {
                const hospLat = parseFloat(hospital.Latitude);
                const hospLon = parseFloat(hospital.Longitude);
                if (!isNaN(hospLat) && !isNaN(hospLon)) {
                  newHospitals.push({
                    geocode: [hospLat, hospLon]
                  });
                }
              });
            }

            // Check if admitted hospital exists
            if (entry.admitted) {
              const admittedLat = parseFloat(entry.admitted.Latitude);
              const admittedLon = parseFloat(entry.admitted.Longitude);
              if (!isNaN(admittedLat) && !isNaN(admittedLon)) {
                admitted = {
                  geocode: [admittedLat, admittedLon]
                };
              }
            }

            // Show toast
            toast.info(`Accident: Magnitude ${magnitude}, Temp ${temperature}`);
          }
        });

        setAccidents(newAccidents);
        setHospitals(newHospitals);
        setAdmittedHospital(admitted);
      }
    });

    return () => {
      markersRef.off();
    };
  }, []);

  useEffect(() => {
    // Accident icon (GIF)
    const accidentIconObj = new Icon({
      iconUrl: "https://res.cloudinary.com/dxxjc0u2h/image/upload/v1708629410/output-onlinegiftools_wtcrqx.gif",
      iconSize: [38, 38],
    });
    setAccidentIcon(accidentIconObj);

    // Hospital SVG Icon
    const hospitalIconObj = new Icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/512/2991/2991231.png", // Sample hospital SVG icon
      iconSize: [38, 38],
    });
    setHospitalIcon(hospitalIconObj);
  }, []);

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        toastStyle={{
          background: "rgba(218,162,17, 0.95)",
          color: "#ffffff",
        }}
      />
      <h1 className="font-semibold text-white text-[50px]">
        Alert{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-cyan-500">
          Map
        </span>
      </h1>

      <MapContainer
        className="leaflet-container"
        center={[22.9868, 87.855]}
        zoom={8}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Show accident markers */}
        {accidentIcon && accidents.map((marker, index) => (
          <Marker key={`accident-${index}`} position={marker.geocode} icon={accidentIcon}>
            <Popup className="w-[190px] h-[150px]">
              <p className="text-[15px] whitespace-pre-line">{marker.popupText}</p>
            </Popup>
          </Marker>
        ))}

        {/* Show hospitals */}
        {hospitalIcon && (
          <>
            {/* if admitted hospital is present -> show only that */}
            {admittedHospital ? (
              <Marker position={admittedHospital.geocode} icon={hospitalIcon}>
                <Popup className="w-[180px] h-[80px]">
                  <p className="text-[14px]">🚑 Admitted Hospital</p>
                </Popup>
              </Marker>
            ) : (
              // else show all nearby hospitals
              hospitals.map((hospital, index) => (
                <Marker key={`hospital-${index}`} position={hospital.geocode} icon={hospitalIcon}>
                  <Popup className="w-[180px] h-[80px]">
                    <p className="text-[14px]">🏥 Nearby Hospital</p>
                  </Popup>
                </Marker>
              ))
            )}
          </>
        )}
      </MapContainer>
    </div>
  );
}
