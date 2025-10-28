import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Landing from './components/Landing';
import About from './components/About';
import Benefits from './components/Benefits';
import Contact from './components/Contact';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Alerts from './components/Alerts';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen animated-gradient">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/about" element={<About />} />
              <Route path="/benefits" element={<Benefits />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <div className="min-h-screen particle-bg p-4">
                      <div className="max-w-7xl mx-auto">
                        <header className="text-center mb-12 pt-8 slide-in-up">
                          <h1 className="text-6xl font-bold gradient-text mb-4 floating-animation">
                            🌡️ Smart Food Export Monitoring
                          </h1>
                          <p className="text-xl text-white font-medium neon-glow">
                            Real-time temperature and humidity monitoring for food safety
                          </p>
                          <div className="mt-6 flex justify-center">
                            <div className="rainbow-border rounded-full p-1">
                              <div className="bg-black bg-opacity-50 rounded-full px-6 py-2">
                                <span className="text-white font-semibold">Live Monitoring Active</span>
                              </div>
                            </div>
                          </div>
                        </header>
                        <Dashboard />
                        <Alerts />
                      </div>
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
