const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5001;
const JWT_SECRET = 'your-secret-key'; // In production, use environment variable

app.use(cors());
app.use(express.json());

// Paths to JSON files
const dataFilePath = path.join(__dirname, 'data.json');
const alertsFilePath = path.join(__dirname, 'alerts.json');
const usersFilePath = path.join(__dirname, 'users.json');
const foodsFilePath = path.join(__dirname, 'foods.json');

// Initialize JSON files if they don't exist
if (!fs.existsSync(dataFilePath)) {
  fs.writeFileSync(dataFilePath, JSON.stringify([]));
}
if (!fs.existsSync(alertsFilePath)) {
  fs.writeFileSync(alertsFilePath, JSON.stringify([]));
}
if (!fs.existsSync(usersFilePath)) {
  fs.writeFileSync(usersFilePath, JSON.stringify([]));
}
if (!fs.existsSync(foodsFilePath)) {
  fs.writeFileSync(foodsFilePath, JSON.stringify([]));
}

// Safe ranges
const SAFE_TEMP_MIN = 15;
const SAFE_TEMP_MAX = 25;
const SAFE_HUM_MIN = 40;
const SAFE_HUM_MAX = 70;

// Function to generate gradual temperature and humidity changes
function generateRandomData(previousTemp = null, previousHumidity = null) {
  let temperature, humidity;

  if (previousTemp === null || previousHumidity === null) {
    // Initial values - start with safe ranges
    temperature = 20 + (Math.random() - 0.5) * 4; // Around 18-22°C
    humidity = 55 + (Math.random() - 0.5) * 10; // Around 50-60%
  } else {
    // Apply small gradual changes (±0.5 to ±2°C for temp, ±2 to ±5% for humidity)
    const tempChange = (Math.random() - 0.5) * 4; // -2 to +2°C
    const humidityChange = (Math.random() - 0.5) * 10; // -5 to +5%

    temperature = previousTemp + tempChange;
    humidity = previousHumidity + humidityChange;

    // Keep within realistic bounds (0-50°C for temp, 0-100% for humidity)
    temperature = Math.max(0, Math.min(50, temperature));
    humidity = Math.max(0, Math.min(100, humidity));
  }

  const timestamp = new Date().toISOString();
  return { temperature: parseFloat(temperature.toFixed(2)), humidity: parseFloat(humidity.toFixed(2)), timestamp };
}

// Function to check if data is safe
function isSafe(data) {
  return data.temperature >= SAFE_TEMP_MIN && data.temperature <= SAFE_TEMP_MAX &&
         data.humidity >= SAFE_HUM_MIN && data.humidity <= SAFE_HUM_MAX;
}

// Function to add alert
function addAlert(data, foodName = null) {
  const alerts = JSON.parse(fs.readFileSync(alertsFilePath));
  const alert = {
    message: foodName
      ? `Unsafe condition for ${foodName}: Temperature ${data.temperature}°C, Humidity ${data.humidity}%`
      : `Unsafe condition: Temperature ${data.temperature}°C, Humidity ${data.humidity}%`,
    timestamp: data.timestamp,
    foodId: data.foodId || null,
    foodName: foodName || null
  };
  alerts.push(alert);
  fs.writeFileSync(alertsFilePath, JSON.stringify(alerts, null, 2));
}

// Function to get route for destination
function getRouteForDestination(destination) {
  // If destination is USA, use locations that lead to USA
  if (destination.toLowerCase().includes('usa') || destination.toLowerCase().includes('america')) {
    return [
      'Warehouse, Chennai, India',
      'Chennai Port, India',
      'Mumbai Transit Hub, India',
      'Delhi Distribution Center, India',
      'International Airport, Delhi, India',
      'Cargo Ship - Arabian Sea',
      'Dubai Transit Port, UAE',
      'Cargo Plane - Atlantic Route',
      'New York JFK Airport, USA',
      'New York Distribution Center, USA'
    ];
  }

  // If destination is UK/Europe, use European route
  if (destination.toLowerCase().includes('uk') || destination.toLowerCase().includes('london') ||
      destination.toLowerCase().includes('europe') || destination.toLowerCase().includes('france')) {
    return [
      'Warehouse, Chennai, India',
      'Chennai Port, India',
      'Mumbai Transit Hub, India',
      'Delhi Distribution Center, India',
      'International Airport, Delhi, India',
      'Cargo Plane - European Route',
      'London Heathrow Airport, UK',
      'London Distribution Center, UK',
      'Paris Transit Hub, France'
    ];
  }

  // Default route for other destinations
  return [
    'Warehouse, Chennai, India',
    'Chennai Port, India',
    'Mumbai Transit Hub, India',
    'Delhi Distribution Center, India',
    'International Airport, Delhi, India',
    'Cargo Ship - Arabian Sea',
    'Dubai Transit Port, UAE',
    'Cargo Plane - Middle East Route',
    'London Heathrow Airport, UK',
    'London Distribution Center, UK',
    'Paris Transit Hub, France',
    'New York JFK Airport, USA',
    'New York Distribution Center, USA'
  ];
}

// Function to generate random location along delivery route
function generateRandomLocation(destination) {
  const route = getRouteForDestination(destination);
  return route[Math.floor(Math.random() * route.length)];
}

// Function to generate progressive location updates (forward movement)
function generateProgressiveLocation(currentLocation, destination) {
  const route = getRouteForDestination(destination);
  const currentIndex = route.indexOf(currentLocation);

  if (currentIndex === -1) {
    // If current location not found, start from beginning
    return route[0];
  }

  // 70% chance to move forward, 20% chance to stay, 10% chance to move backward (simulating delays)
  const rand = Math.random();
  if (rand < 0.7 && currentIndex < route.length - 1) {
    // Move forward
    return route[currentIndex + 1];
  } else if (rand < 0.9 && currentIndex > 0) {
    // Move backward (delays)
    return route[currentIndex - 1];
  } else {
    // Stay at current location
    return currentLocation;
  }
}

// Function to calculate journey percentage
function calculateJourneyPercentage(currentLocation, destination) {
  const route = getRouteForDestination(destination);
  const currentIndex = route.indexOf(currentLocation);
  if (currentIndex === -1) return 0;
  return Math.round(((currentIndex + 1) / route.length) * 100);
}

// Global variables to track previous temperature and humidity for gradual changes
let previousTemp = null;
let previousHumidity = null;

// Simulation interval for all foods
setInterval(() => {
  const foods = JSON.parse(fs.readFileSync(foodsFilePath));
  if (foods.length === 0) {
    // If no foods added, use default simulation
    const data = generateRandomData(previousTemp, previousHumidity);
    previousTemp = data.temperature;
    previousHumidity = data.humidity;

    const readings = JSON.parse(fs.readFileSync(dataFilePath));
    readings.push(data);
    // Keep only last 100 readings for simplicity
    if (readings.length > 100) readings.shift();
    fs.writeFileSync(dataFilePath, JSON.stringify(readings, null, 2));

    if (!isSafe(data)) {
      addAlert(data);
    }
  } else {
    // Generate data for each food item and update location
    foods.forEach(food => {
      const data = generateRandomData(previousTemp, previousHumidity);
      previousTemp = data.temperature;
      previousHumidity = data.humidity;

      // Update location with more realistic progression
      const currentLocation = generateProgressiveLocation(food.currentLocation, food.destination);
      const foodData = {
        ...data,
        foodId: food.id,
        foodName: food.name,
        destination: food.destination,
        currentLocation: currentLocation,
        status: 'In Transit'
      };

      const readings = JSON.parse(fs.readFileSync(dataFilePath));
      readings.push(foodData);
      // Keep only last 100 readings per food or total
      if (readings.length > 100) readings.shift();
      fs.writeFileSync(dataFilePath, JSON.stringify(readings, null, 2));

      if (!isSafe(foodData)) {
        addAlert(foodData, food.name);
      }

      // Update food location in foods.json
      food.currentLocation = currentLocation;
      food.journeyPercentage = calculateJourneyPercentage(currentLocation, food.destination);
    });

    // Save updated foods with new locations
    fs.writeFileSync(foodsFilePath, JSON.stringify(foods, null, 2));
  }
}, 5000); // Every 5 seconds

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access token required' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Auth endpoints
app.post('/api/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const users = JSON.parse(fs.readFileSync(usersFilePath));
    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

    const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET);
    res.status(201).json({ token, user: { id: newUser.id, name: newUser.name, email: newUser.email } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const users = JSON.parse(fs.readFileSync(usersFilePath));
    const user = users.find(u => u.email === email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Protected API endpoints
app.get('/api/data', authenticateToken, (req, res) => {
  const readings = JSON.parse(fs.readFileSync(dataFilePath));
  res.json(readings);
});

app.get('/api/alerts', authenticateToken, (req, res) => {
  const alerts = JSON.parse(fs.readFileSync(alertsFilePath));
  res.json(alerts);
});

// Food management endpoints
app.get('/api/foods', authenticateToken, (req, res) => {
  const foods = JSON.parse(fs.readFileSync(foodsFilePath));
  const userFoods = foods.filter(food => food.userId === req.user.id);
  res.json(userFoods);
});

app.post('/api/foods', authenticateToken, (req, res) => {
  const { name, destination, description, quantity, weight, packaging, expiryDate } = req.body;

  if (!name || !destination) {
    return res.status(400).json({ message: 'Name and destination are required' });
  }

  const foods = JSON.parse(fs.readFileSync(foodsFilePath));
  const newFood = {
    id: Date.now().toString(),
    name,
    destination,
    description: description || '',
    quantity: quantity || null,
    weight: weight || null,
    packaging: packaging || '',
    expiryDate: expiryDate || null,
    addedAt: new Date().toISOString(),
    userId: req.user.id,
    currentLocation: 'Warehouse, Chennai, India', // Starting location
    status: 'In Transit' // Initial status
  };

  foods.push(newFood);
  fs.writeFileSync(foodsFilePath, JSON.stringify(foods, null, 2));

  res.status(201).json(newFood);
});

app.delete('/api/foods/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const foods = JSON.parse(fs.readFileSync(foodsFilePath));
  const foodIndex = foods.findIndex(food => food.id === id && food.userId === req.user.id);

  if (foodIndex === -1) {
    return res.status(404).json({ message: 'Food item not found' });
  }

  foods.splice(foodIndex, 1);
  fs.writeFileSync(foodsFilePath, JSON.stringify(foods, null, 2));

  // Also remove associated data and alerts for this food
  const data = JSON.parse(fs.readFileSync(dataFilePath));
  const filteredData = data.filter(d => d.foodId !== id);
  fs.writeFileSync(dataFilePath, JSON.stringify(filteredData, null, 2));

  const alerts = JSON.parse(fs.readFileSync(alertsFilePath));
  const filteredAlerts = alerts.filter(a => a.foodId !== id);
  fs.writeFileSync(alertsFilePath, JSON.stringify(filteredAlerts, null, 2));

  res.json({ message: 'Food item removed successfully' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
