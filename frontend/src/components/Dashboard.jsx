import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import AddFoodModal from './AddFoodModal';

const Dashboard = () => {
  const { user, getAuthHeaders, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [data, setData] = useState([]);
  const [alerts, setAlerts] = useState([]); // eslint-disable-line no-unused-vars
  const [currentData, setCurrentData] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [foods, setFoods] = useState([]);
  const [showAddFoodModal, setShowAddFoodModal] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [showFoodChartModal, setShowFoodChartModal] = useState(false);

  const handleRemoveFood = async (food) => {
    if (window.confirm(`Are you sure you want to remove "${food.name}" from monitoring?`)) {
      try {
        const response = await fetch(`http://localhost:5001/api/foods/${food.id}`, {
          method: 'DELETE',
          headers: getAuthHeaders()
        });

        if (response.ok) {
          setFoods(prev => prev.filter(f => f.id !== food.id));
          setSelectedFood(null);
          setShowFoodChartModal(false);
        } else {
          alert('Failed to remove food item');
        }
      } catch (error) {
        console.error('Error removing food:', error);
        alert('Error removing food item');
      }
    }
  };

  const handleFoodClick = (food) => {
    setSelectedFood(food);
    setShowFoodChartModal(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/data', {
          headers: getAuthHeaders()
        });
        const result = await response.json();
        setData(result);
        if (result.length > 0) {
          const latest = result[result.length - 1];
          setCurrentData(latest);
          const isSafe = latest.temperature >= 15 && latest.temperature <= 25 &&
                         latest.humidity >= 40 && latest.humidity <= 70;
          if (!isSafe) {
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 5000); // Hide after 5 seconds
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchAlerts = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/alerts', {
          headers: getAuthHeaders()
        });
        const result = await response.json();
        setAlerts(result);
      } catch (error) {
        console.error('Error fetching alerts:', error);
      }
    };

    const fetchFoods = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/foods', {
          headers: getAuthHeaders()
        });
        const result = await response.json();
        setFoods(result);
      } catch (error) {
        console.error('Error fetching foods:', error);
      }
    };

    fetchData();
    fetchAlerts();
    fetchFoods();
    const interval = setInterval(() => {
      fetchData();
      fetchAlerts();
      fetchFoods();
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [getAuthHeaders]);

  const isSafe = currentData ? (currentData.temperature >= 15 && currentData.temperature <= 25 &&
                                currentData.humidity >= 40 && currentData.humidity <= 70) : true;

  const chartData = data.map(item => ({
    time: new Date(item.timestamp).toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' }),
    temperature: item.temperature,
    humidity: item.humidity
  }));

  return (
    <div className="glass-effect p-8 mb-8 rounded-2xl interactive-card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-bold gradient-text heartbeat">📊 Dashboard</h2>
        <div className="flex items-center space-x-4">
          <span className="text-white neon-glow">Welcome, {user?.name}</span>
          <button
            onClick={() => setShowAddFoodModal(true)}
            className="liquid-button text-white px-4 py-2 rounded-lg font-semibold magnetic-hover text-sm"
            title="Add food for export monitoring"
          >
            ➕ Add Food
          </button>
          <button
            onClick={toggleTheme}
            className="liquid-button text-white px-4 py-2 rounded-lg font-semibold magnetic-hover text-sm"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
          <button
            onClick={logout}
            className="liquid-button text-white px-6 py-3 rounded-lg font-semibold magnetic-hover"
          >
            Logout
          </button>
        </div>
      </div>

      {showAlert && (
        <div className="alert-banner mb-6">
          <div className="flex items-center">
            <span className="text-2xl mr-3">⚠️</span>
            <div>
              <h3 className="font-semibold text-lg">Alert: Unsafe Conditions Detected!</h3>
              <p className="text-danger-100">Please check the environmental parameters immediately.</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="metric-card interactive-hover scale-in">
          <div className="flex items-center mb-3">
            <span className="text-4xl mr-3 floating-animation">🌡️</span>
            <h3 className="text-xl font-semibold text-primary-800">Temperature</h3>
          </div>
          <p className="text-5xl font-bold text-primary-700 pulse-glow">
            {currentData ? `${currentData.temperature}°C` : 'Loading...'}
          </p>
          <p className="text-sm text-primary-600 mt-1">Optimal: 15-25°C</p>
        </div>
        <div className="metric-card interactive-hover scale-in" style={{animationDelay: '0.1s'}}>
          <div className="flex items-center mb-3">
            <span className="text-4xl mr-3 floating-animation">💧</span>
            <h3 className="text-xl font-semibold text-primary-800">Humidity</h3>
          </div>
          <p className="text-5xl font-bold text-primary-700 pulse-glow">
            {currentData ? `${currentData.humidity}%` : 'Loading...'}
          </p>
          <p className="text-sm text-primary-600 mt-1">Optimal: 40-70%</p>
        </div>
        <div className="metric-card interactive-hover scale-in" style={{animationDelay: '0.2s'}}>
          <div className="flex items-center mb-3">
            <span className="text-4xl mr-3 heartbeat">🛡️</span>
            <h3 className="text-xl font-semibold text-primary-800">Status</h3>
          </div>
          <p className={`text-3xl font-bold ${isSafe ? 'status-safe' : 'status-unsafe'} morphing-blob`}>
            {isSafe ? '🟢 Safe' : '🔴 Unsafe'}
          </p>
          <p className="text-sm text-primary-600 mt-1">
            {isSafe ? 'All parameters within range' : 'Parameters out of range'}
          </p>
        </div>
      </div>

      <div className="chart-container">
        <h3 className="text-2xl font-semibold mb-4 text-primary-800">📈 Environmental Data Trends</h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
            <YAxis stroke="#6b7280" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#f9fafb',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#3b82f6"
              strokeWidth={3}
              name="Temperature (°C)"
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="humidity"
              stroke="#22c55e"
              strokeWidth={3}
              name="Humidity (%)"
              dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#22c55e', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Foods List */}
      {foods.length > 0 && (
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-4 text-white">🚚 Food Export Tracking & Monitoring</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {foods.map(food => {
              // Get latest data for this food
              const latestData = data.filter(d => d.foodId === food.id).slice(-1)[0];
              const isFoodSafe = latestData ? (latestData.temperature >= 15 && latestData.temperature <= 25 &&
                                             latestData.humidity >= 40 && latestData.humidity <= 70) : true;

              return (
                <div key={food.id} className="card p-4 interactive-hover cursor-pointer" onClick={() => handleFoodClick(food)}>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-semibold text-primary-800">{food.name}</h4>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFood(food);
                      }}
                      className="text-red-500 hover:text-red-700 text-sm"
                      title="Remove food"
                    >
                      🗑️
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">📍 Destination: {food.destination}</p>
                  <p className="text-sm text-blue-600 mb-1">📍 Current Location: {food.currentLocation || 'Warehouse, Chennai, India'}</p>
                  <p className={`text-sm font-medium mb-1 ${isFoodSafe ? 'text-green-600' : 'text-red-600'}`}>
                    🔄 Status: {isFoodSafe ? 'Safe' : 'Unsafe'} | {food.status || 'In Transit'}
                  </p>
                  <div className="mb-2">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Journey Progress</span>
                      <span>{food.journeyPercentage || 0}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${food.journeyPercentage || 0}%` }}
                      ></div>
                    </div>
                  </div>
                  {food.quantity && <p className="text-sm text-gray-500">📦 Quantity: {food.quantity}</p>}
                  {food.weight && <p className="text-sm text-gray-500">⚖️ Weight: {food.weight} kg</p>}
                  {food.packaging && <p className="text-sm text-gray-500">📦 Packaging: {food.packaging}</p>}
                  {food.expiryDate && <p className="text-sm text-gray-500">📅 Expiry: {new Date(food.expiryDate).toLocaleDateString()}</p>}
                  {food.description && (
                    <p className="text-sm text-gray-500 mt-1">{food.description}</p>
                  )}
                  {latestData && (
                    <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-700 rounded text-xs">
                      <p>🌡️ Temp: {latestData.temperature}°C | 💧 Humidity: {latestData.humidity}%</p>
                    </div>
                  )}
                  <p className="text-xs text-gray-400 mt-2">
                    Added: {new Date(food.addedAt).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add Food Modal */}
      <AddFoodModal
        isOpen={showAddFoodModal}
        onClose={() => setShowAddFoodModal(false)}
        onFoodAdded={(newFood) => {
          setFoods(prev => [...prev, newFood]);
          setShowAddFoodModal(false);
        }}
      />

      {/* Food Chart Modal */}
      {showFoodChartModal && selectedFood && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-primary-800 dark:text-primary-200">
                  📊 {selectedFood.name} - Environmental Data
                </h3>
                <button
                  onClick={() => setShowFoodChartModal(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
                >
                  ✕
                </button>
              </div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                <p>📍 Destination: {selectedFood.destination}</p>
                <p>📍 Current Location: {selectedFood.currentLocation || 'Warehouse, Chennai, India'}</p>
                <p>🔄 Status: {selectedFood.status || 'In Transit'}</p>
                <div className="mt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Journey Progress</span>
                    <span>{selectedFood.journeyPercentage || 0}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${selectedFood.journeyPercentage || 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={data.filter(d => d.foodId === selectedFood.id).map(item => ({
                    time: new Date(item.timestamp).toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' }),
                    temperature: item.temperature,
                    humidity: item.humidity,
                    isSafe: item.temperature >= 15 && item.temperature <= 25 && item.humidity >= 40 && item.humidity <= 70
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
                    <YAxis stroke="#6b7280" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#f9fafb',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                      formatter={(value, name) => [
                        `${value}${name === 'temperature' ? '°C' : '%'}`,
                        name === 'temperature' ? 'Temperature' : 'Humidity'
                      ]}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="temperature"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      name="Temperature (°C)"
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="humidity"
                      stroke="#22c55e"
                      strokeWidth={3}
                      name="Humidity (%)"
                      dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#22c55e', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Current Status */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {(() => {
                  const latestData = data.filter(d => d.foodId === selectedFood.id).slice(-1)[0];
                  if (!latestData) return null;

                  const isSafe = latestData.temperature >= 15 && latestData.temperature <= 25 &&
                                latestData.humidity >= 40 && latestData.humidity <= 70;

                  return (
                    <>
                      <div className="metric-card">
                        <div className="flex items-center mb-2">
                          <span className="text-2xl mr-2">🌡️</span>
                          <h4 className="text-lg font-semibold text-primary-800">Temperature</h4>
                        </div>
                        <p className="text-2xl font-bold text-primary-700">{latestData.temperature}°C</p>
                        <p className="text-sm text-primary-600">Optimal: 15-25°C</p>
                      </div>
                      <div className="metric-card">
                        <div className="flex items-center mb-2">
                          <span className="text-2xl mr-2">💧</span>
                          <h4 className="text-lg font-semibold text-primary-800">Humidity</h4>
                        </div>
                        <p className="text-2xl font-bold text-primary-700">{latestData.humidity}%</p>
                        <p className="text-sm text-primary-600">Optimal: 40-70%</p>
                      </div>
                      <div className="metric-card">
                        <div className="flex items-center mb-2">
                          <span className="text-2xl mr-2">🛡️</span>
                          <h4 className="text-lg font-semibold text-primary-800">Status</h4>
                        </div>
                        <p className={`text-2xl font-bold ${isSafe ? 'text-green-600' : 'text-red-600'}`}>
                          {isSafe ? '🟢 Safe' : '🔴 Unsafe'}
                        </p>
                        <p className="text-sm text-primary-600">
                          {isSafe ? 'Within safe range' : 'Out of safe range'}
                        </p>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
