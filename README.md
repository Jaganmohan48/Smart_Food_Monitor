# Smart Food Export Monitoring System

A full-stack web application that simulates monitoring environmental conditions (temperature and humidity) for packed food during export. The system ensures food is maintained in safe conditions and alerts users if conditions become unsafe.

## Features

- **Real-time Simulation**: Automatically generates temperature and humidity data every 5 seconds.
- **Safe Condition Monitoring**: Checks data against safe ranges (Temperature: 15°C–25°C, Humidity: 40%–70%).
- **Alert System**: Triggers alerts when conditions are unsafe.
- **Live Dashboard**: Displays current data, status indicator, and historical chart.
- **Alert Logs**: View past alert notifications.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, Recharts
- **Backend**: Node.js, Express.js
- **Database**: Local JSON files (data.json for readings, alerts.json for alerts)

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- npm

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd smart-food-monitor/backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the backend server:
   ```
   npm start
   ```
   The server will run on `http://localhost:5000`.

### Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```
   cd smart-food-monitor/frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the React app:
   ```
   npm start
   ```
   The app will open in your browser at `http://localhost:3000`.

## Usage

1. Start the backend server first.
2. Start the frontend app.
3. The dashboard will automatically update every 5 seconds with simulated data.
4. Monitor the status indicator: 🟢 Safe or 🔴 Unsafe.
5. View the chart for historical data trends.
6. Check the Alert Logs section for past notifications.

## API Endpoints

- `GET /api/data`: Retrieves all stored data readings.
- `GET /api/alerts`: Retrieves all alert logs.

## Project Structure

```
smart-food-monitor/
├── backend/
│   ├── server.js
│   ├── data.json
│   └── alerts.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.jsx
│   │   │   └── Alerts.jsx
│   │   ├── App.jsx
│   │   └── index.css
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

## Simulation Details

- Data is generated randomly every 5 seconds.
- Temperature range: 5°C to 45°C
- Humidity range: 10% to 90%
- Safe ranges are checked automatically, and alerts are logged if unsafe.

## Contributing

Feel free to contribute by opening issues or submitting pull requests.

## License

This project is for educational purposes.
