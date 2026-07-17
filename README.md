# 🚨 AlertTrace - IoT Based Accident Detection & Emergency Alert System

<p align="center">
  <img src="https://img.shields.io/badge/Platform-IoT-blue?style=for-the-badge">
  <img src="https://img.shields.io/badge/ESP32-Microcontroller-success?style=for-the-badge">
  <img src="https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge">
  <img src="https://img.shields.io/badge/Next.js-Website-black?style=for-the-badge">
  <img src="https://img.shields.io/badge/Firebase-RealtimeDB-orange?style=for-the-badge">
  <img src="https://img.shields.io/badge/MongoDB-Database-green?style=for-the-badge">
</p>

---

# 📖 Overview

AlertTrace is an IoT-based Smart Accident Detection and Emergency Alert System that automatically detects road accidents using sensors and instantly notifies emergency services with the victim's real-time GPS location.

The system combines IoT hardware, cloud databases, mobile applications, web applications, and an admin dashboard to reduce emergency response time and save lives.

Instead of waiting for someone to manually report an accident, AlertTrace detects the impact automatically and immediately shares the victim's location with rescue teams.

---

# ❗ Problem Statement

Every year millions of road accidents occur.

Most deaths happen because:

- Emergency services are informed too late.
- Exact accident location is unknown.
- Victims cannot ask for help.
- Rescue teams lose valuable time locating victims.

AlertTrace solves these problems by providing an automatic emergency response system.

---

# ✅ Solution

AlertTrace continuously monitors vehicle movement using sensors.

When an accident is detected:

1. Sensors detect abnormal acceleration.
2. GPS collects live coordinates.
3. ESP32 processes the data.
4. Firebase stores sensor information.
5. SIM800L sends emergency SMS.
6. Admin Dashboard receives live notification.
7. Emergency teams receive accident location.
8. Victim location appears on Google Map.

Entire process takes only a few seconds.

---

# 🎯 Features

## 🚗 Automatic Accident Detection

- Detects high impact crashes
- Detects sudden acceleration
- Detects dangerous situations
- Configurable accident thresholds

---

## 📍 Live GPS Tracking

- Real-time latitude
- Real-time longitude
- Google Maps integration
- Victim location tracking

---

## 📩 Instant Emergency SMS

Automatically sends SMS containing:

- Accident alert
- Live GPS coordinates
- Google Maps Location Link
- Emergency message

---

## 🔥 Firebase Integration

Stores:

- Sensor Data
- GPS Coordinates
- Accident Status
- Temperature
- Acceleration

Realtime synchronization with Admin Dashboard.

---

## 🌐 Website

Users can

- Report Emergency
- Submit Enquiry
- View Accident Heatmap
- Contact Support
- Read Safety News

---

## 📱 Mobile Application

Built using React Native.

Features include:

- Google Login
- Emergency Reporting
- Heatmap
- Contact Form
- News Feed
- User Profile

---

## 🖥 Admin Dashboard

Admin can

- Monitor accidents
- View live GPS location
- View Emergency requests
- Manage Enquiries
- View Contact Requests
- Send alerts
- Track victims on map

---

## 🗺 Heatmap

Displays

- Accident-prone areas
- Dangerous locations
- User reported zones

Helps people avoid risky locations.

---

# 🏗 System Architecture

```
              MPU6050
                  │
                  │
             ESP32 Controller
                  │
      ┌───────────┴───────────┐
      │                       │
   GPS Module             SIM800L GSM
      │                       │
      │                       │
 Firebase Realtime DB      SMS Alert
      │
      │
 Node.js Backend
      │
 ┌────┴─────────┐
 │              │
Website     Admin Dashboard
 │              │
React Native Mobile App
```

---

# 🛠 Hardware Components

| Component | Purpose |
|------------|----------|
| ESP32 | Main Controller |
| MPU6050 | Accident Detection |
| NEO-6M GPS | Live Location |
| SIM800L GSM | SMS Alerts |
| Buzzer | Alert |
| Push Button | Reset Alert |
| Power Supply | Device Power |

---

# 💻 Software Stack

## Frontend

- React Native
- React.js
- Next.js
- Tailwind CSS

---

## Backend

- Node.js
- Express.js

---

## Database

- MongoDB
- Firebase Realtime Database

---

## Authentication

- Clerk Authentication

---

## Maps

- React Leaflet
- Google Maps

---

# 📂 Project Structure

```
AlertTrace/

├── Hardware/
│     ESP32 Code
│
├── Mobile-App/
│     React Native
│
├── Website/
│     Next.js
│
├── Admin/
│     React Dashboard
│
├── Backend/
│     Node.js Server
│
├── Firebase/
│
├── MongoDB/
│
└── README.md
```

---

# ⚙ Hardware Connection

## ESP32 Connections

### MPU6050

```
VCC  → 3.3V
GND  → GND
SCL  → GPIO22
SDA  → GPIO21
```

---

### GPS Module

```
VCC → 3.3V
GND → GND
TX → GPIO16
RX → GPIO17
```

---

### SIM800L

```
VCC → External Power
GND → GND
TX → GPIO26
RX → GPIO27
```

---

### Buzzer

```
Positive → GPIO25
Negative → GND
```

---

### Push Button

```
GPIO → Reset Pin
Other → GND
```

---

# 🔄 Workflow

```
Vehicle Starts

↓

ESP32 Reads Sensor

↓

Accident Detected

↓

GPS Gets Location

↓

Firebase Updated

↓

SMS Sent

↓

Admin Dashboard Updates

↓

Emergency Team Notified

↓

Victim Rescued
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/AlertTrace.git

cd AlertTrace
```

---

## Install Backend

```bash
cd backend

npm install

npm run dev
```

---

## Install Website

```bash
cd website

npm install

npm run dev
```

---

## Install Admin Dashboard

```bash
cd admin

npm install

npm start
```

---

## Install Mobile App

```bash
cd mobile

npm install

npx expo start
```

---

# 🔑 Environment Variables

Create a `.env` file.

```env
MONGODB_URI=

FIREBASE_API_KEY=

FIREBASE_PROJECT_ID=

CLERK_PUBLISHABLE_KEY=

CLERK_SECRET_KEY=

GOOGLE_MAP_API=

JWT_SECRET=
```

---

# 📊 Technologies Used

- ESP32
- Arduino IDE
- C++
- React.js
- React Native
- Next.js
- Node.js
- Express.js
- MongoDB
- Firebase
- Clerk Authentication
- React Leaflet
- Google Maps API

---

# 📸 Project Modules

- Hardware Device
- Mobile Application
- Website
- Admin Dashboard
- Firebase
- MongoDB
- Live Tracking
- SMS Notification
- Heatmap
- Emergency Reporting

---

# 🎯 Future Improvements

- AI-based accident prediction
- Machine Learning crash analysis
- Voice emergency assistant
- Automatic ambulance dispatch
- Push notifications
- Offline accident detection
- Multiple language support
- Wearable device integration

---

# 🤝 Contributing

Contributions are welcome.

1. Fork Repository

2. Create Feature Branch

```bash
git checkout -b feature-name
```

3. Commit

```bash
git commit -m "Added Feature"
```

4. Push

```bash
git push origin feature-name
```

5. Open Pull Request

---

# 📄 License

This project is developed for educational and research purposes.

---

# 👨‍💻 Author

**Abir Dey**

Bachelor of Science (Honours)

Department of Computer Science

Scottish Church College

University of Calcutta

---

## ⭐ If you like this project, don't forget to Star the repository!
