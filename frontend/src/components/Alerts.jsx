import React, { useState, useEffect } from 'react';

const Alerts = () => {
  const [foods, setFoods] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/foods', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const result = await response.json();
        setFoods(result);
      } catch (error) {
        console.error('Error fetching foods:', error);
      }
    };

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/data', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchFoods();
    fetchData();
    const interval = setInterval(() => {
      fetchFoods();
      fetchData();
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Get current alerts for each food
  const currentAlerts = foods.map(food => {
    // Get latest data for this food
    const foodData = data.filter(d => d.foodId === food.id).slice(-1)[0];
    if (!foodData) return null;

    const isSafe = foodData.temperature >= 15 && foodData.temperature <= 25 &&
                   foodData.humidity >= 40 && foodData.humidity <= 70;

    return {
      food,
      data: foodData,
      isSafe,
      message: isSafe ? null : `Unsafe condition for ${food.name}: Temperature ${foodData.temperature}°C, Humidity ${foodData.humidity}%`,
      timestamp: foodData.timestamp
    };
  }).filter(alert => alert && !alert.isSafe); // Only show unsafe foods

  return (
    <div className="glass-effect p-8 rounded-2xl fade-in">
      <h2 className="text-4xl font-bold mb-6 gradient-text heartbeat">🚨 Current Alerts</h2>
      {currentAlerts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4 floating-animation">✅</div>
          <p className="text-xl text-white neon-glow font-medium">All foods are safe</p>
          <p className="text-gray-300 mt-2">All monitored food items are within safe temperature and humidity ranges.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {currentAlerts.map((alert, index) => (
            <li key={alert.food.id} className="alert-item slide-in-up" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="flex items-start">
                <span className="text-3xl mr-4 mt-1 pulse-glow">⚠️</span>
                <div className="flex-1">
                  <p className="font-semibold text-lg text-danger-800 mb-1">{alert.message}</p>
                  <p className="text-sm text-danger-600 flex items-center mb-1">
                    <span className="mr-2">📍</span>
                    Location: {alert.data.currentLocation || 'Unknown'}
                  </p>
                  <p className="text-sm text-danger-600 flex items-center">
                    <span className="mr-2">🕒</span>
                    Last checked: {new Date(alert.timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Alerts;
