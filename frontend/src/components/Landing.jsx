import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const Landing = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Enhanced search functionality with better suggestions
    const searchSuggestions = [
      { term: 'dashboard', description: 'View real-time monitoring data', link: '/dashboard' },
      { term: 'monitoring', description: 'Temperature and humidity tracking', link: '/about' },
      { term: 'temperature', description: 'Safe temperature ranges for food', link: '/benefits' },
      { term: 'humidity', description: 'Optimal humidity levels', link: '/benefits' },
      { term: 'alerts', description: 'Real-time safety notifications', link: '/benefits' },
      { term: 'food safety', description: 'Compliance and standards', link: '/about' },
      { term: 'sensors', description: 'IoT monitoring technology', link: '/about' },
      { term: 'compliance', description: 'FDA and HACCP standards', link: '/benefits' },
      { term: 'export', description: 'International food shipping', link: '/benefits' },
      { term: 'analytics', description: 'Data analysis and reporting', link: '/benefits' },
      { term: 'contact', description: 'Get in touch with our team', link: '/contact' },
      { term: 'support', description: 'Technical support and help', link: '/contact' }
    ];

    const results = searchSuggestions.filter(item =>
      item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-primary-50 via-white to-accent-50'}`}>
      {/* Header */}
      <header className={`shadow-lg sticky top-0 z-50 transition-colors duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center">
              <span className="text-3xl mr-3">🌡️</span>
              <h1 className={`text-2xl font-bold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-primary-800'}`}>Smart Food Monitor</h1>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#home" className={`font-medium transition-colors duration-300 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-primary-600'}`}>Home</a>
              <Link to="/about" className={`font-medium transition-colors duration-300 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-primary-600'}`}>About</Link>
              <Link to="/benefits" className={`font-medium transition-colors duration-300 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-primary-600'}`}>Benefits</Link>
              <Link to="/contact" className={`font-medium transition-colors duration-300 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-primary-600'}`}>Contact</Link>
            </nav>

            {/* Auth Links */}
            <div className="flex space-x-4 items-center">
              <button
                onClick={toggleTheme}
                className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white p-2 rounded-lg transition-colors duration-200"
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>
              <Link to="/login" className="btn-primary">Login</Link>
              <Link to="/signup" className="bg-accent-600 hover:bg-accent-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">Sign Up</Link>
            </div>
          </div>

          {/* Search Bar */}
          <div className="pb-4">
            <form onSubmit={handleSearch} className="max-w-md mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search our site..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
                <button type="submit" className="absolute right-2 top-1.5 bg-primary-600 text-white px-3 py-1 rounded text-sm hover:bg-primary-700">
                  Search
                </button>
              </div>
            </form>
            {searchResults.length > 0 && (
              <div className="mt-2 max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                <div className="p-3">
                  <h4 className="font-semibold text-sm text-gray-700 mb-3">🔍 Search Results:</h4>
                  <ul className="space-y-2">
                    {searchResults.slice(0, 8).map((result, index) => (
                      <li key={index} className="border-b border-gray-100 last:border-b-0 pb-2 last:pb-0">
                        <Link
                          to={result.link}
                          className="block hover:bg-primary-50 p-2 rounded transition-colors"
                          onClick={() => setSearchResults([])}
                        >
                          <div className="font-medium text-primary-700 text-sm">{result.term}</div>
                          <div className="text-xs text-gray-600 mt-1">{result.description}</div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {searchResults.length > 8 && (
                    <div className="text-xs text-gray-500 mt-2 text-center">
                      And {searchResults.length - 8} more results...
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-primary-800 mb-6">
            Smart Food Export Monitoring System
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Ensure food safety with real-time temperature and humidity monitoring.
            Protect your exports with advanced monitoring technology and instant alerts.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/signup" className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
              Get Started
            </Link>
            <Link to="/about" className="border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-16 px-4 transition-colors duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-primary-800 mb-4">About Our System</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Our Smart Food Export Monitoring System uses cutting-edge IoT technology, AI-powered analytics,
              and cloud computing to ensure your food exports maintain optimal conditions throughout the entire supply chain.
              We combine precision sensors with intelligent software to provide comprehensive food safety monitoring.
            </p>
            <div className="flex justify-center">
              <Link to="/about" className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
                Learn More About Our Technology
              </Link>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center card p-6 bg-gradient-to-br from-primary-50 to-primary-100">
              <span className="text-5xl mb-4 block">📡</span>
              <h4 className="text-xl font-semibold mb-3 text-primary-800">IoT Sensor Network</h4>
              <p className="text-gray-600">High-precision sensors with ±0.1°C accuracy, wireless connectivity, and 2-year battery life for continuous monitoring.</p>
            </div>
            <div className="text-center card p-6 bg-gradient-to-br from-accent-50 to-accent-100">
              <span className="text-5xl mb-4 block">🤖</span>
              <h4 className="text-xl font-semibold mb-3 text-accent-800">AI-Powered Analytics</h4>
              <p className="text-gray-600">Machine learning algorithms predict issues before they occur, analyze trends, and provide actionable insights.</p>
            </div>
            <div className="text-center card p-6 bg-gradient-to-br from-danger-50 to-danger-100">
              <span className="text-5xl mb-4 block">☁️</span>
              <h4 className="text-xl font-semibold mb-3 text-danger-800">Cloud Infrastructure</h4>
              <p className="text-gray-600">Enterprise-grade security with 99.9% uptime, global data centers, and seamless scalability.</p>
            </div>
          </div>
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">
              Trusted by 500+ food exporters worldwide, monitoring over 1 million shipments annually.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-primary-600">500+</div>
                <div className="text-sm text-gray-600">Happy Clients</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-accent-600">1M+</div>
                <div className="text-sm text-gray-600">Shipments</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-danger-600">99.9%</div>
                <div className="text-sm text-gray-600">Uptime</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-primary-600">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className={`py-16 px-4 transition-colors duration-300 ${isDarkMode ? 'bg-gray-700' : 'bg-gradient-to-r from-primary-50 to-accent-50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-primary-800 mb-4">Why Choose Smart Food Monitor?</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Discover the comprehensive benefits that make our system the perfect choice for food export monitoring.
            </p>
            <div className="flex justify-center">
              <Link to="/benefits" className="bg-accent-600 hover:bg-accent-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
                Explore All Benefits
              </Link>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card p-6 text-center bg-gradient-to-br from-primary-50 to-primary-100 hover:shadow-glow">
              <span className="text-4xl mb-3 block">🛡️</span>
              <h4 className="text-lg font-semibold mb-2 text-primary-800">Food Safety Compliance</h4>
              <p className="text-gray-600 text-sm">Maintain HACCP and FDA compliance with automated monitoring and detailed reports.</p>
            </div>
            <div className="card p-6 text-center bg-gradient-to-br from-accent-50 to-accent-100 hover:shadow-glow">
              <span className="text-4xl mb-3 block">💰</span>
              <h4 className="text-lg font-semibold mb-2 text-accent-800">Cost Reduction</h4>
              <p className="text-gray-600 text-sm">Prevent spoilage and reduce waste by up to 30% with proactive monitoring.</p>
            </div>
            <div className="card p-6 text-center bg-gradient-to-br from-danger-50 to-danger-100 hover:shadow-glow-red">
              <span className="text-4xl mb-3 block">⚡</span>
              <h4 className="text-lg font-semibold mb-2 text-danger-800">Real-time Alerts</h4>
              <p className="text-gray-600 text-sm">Instant notifications when conditions deviate from safe parameters.</p>
            </div>
            <div className="card p-6 text-center bg-gradient-to-br from-primary-100 to-accent-50 hover:shadow-glow">
              <span className="text-4xl mb-3 block">📱</span>
              <h4 className="text-lg font-semibold mb-2 text-primary-800">Mobile Access</h4>
              <p className="text-gray-600 text-sm">Monitor shipments from anywhere with our responsive web platform.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-16 px-4 transition-colors duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-primary-800 mb-4">Contact Us</h3>
            <p className="text-lg text-gray-600 mb-8">Get in touch with our team for support, inquiries, or to learn more about our solutions.</p>
            <div className="flex justify-center">
              <Link to="/contact" className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
                Contact Our Team
              </Link>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center card p-6 bg-gradient-to-br from-primary-50 to-primary-100">
                  <span className="text-4xl mb-3 block">📧</span>
                  <h4 className="text-xl font-semibold mb-2 text-primary-800">Email Support</h4>
                  <p className="text-gray-600 mb-2">sasidharvarma@gmail.com</p>
                  <p className="text-sm text-gray-500">We respond within 24 hours</p>
                </div>
                <div className="text-center card p-6 bg-gradient-to-br from-accent-50 to-accent-100">
                  <span className="text-4xl mb-3 block">📞</span>
                  <h4 className="text-xl font-semibold mb-2 text-accent-800">Phone Support</h4>
                  <p className="text-gray-600 mb-2">+91 7382220280</p>
                  <p className="text-sm text-gray-500">Mon-Fri 9AM-6PM IST</p>
                </div>
                <div className="text-center card p-6 bg-gradient-to-br from-danger-50 to-danger-100">
                  <span className="text-4xl mb-3 block">📍</span>
                  <h4 className="text-xl font-semibold mb-2 text-danger-800">Office Address</h4>
                  <p className="text-gray-600 mb-2">VelTech University<br />Chennai, India</p>
                  <p className="text-sm text-gray-500">Tamil Nadu - 600062</p>
                </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 px-4 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-primary-900 text-white'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-2">🌡️</span>
                <h4 className="text-lg font-semibold">Smart Food Monitor</h4>
              </div>
              <p className="text-primary-200 text-sm">
                Ensuring food safety through intelligent monitoring solutions.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-sm text-primary-200">
                <li><a href="#home" className="hover:text-white">Home</a></li>
                <li><a href="#about" className="hover:text-white">About</a></li>
                <li><a href="#benefits" className="hover:text-white">Benefits</a></li>
                <li><a href="#contact" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Services</h5>
              <ul className="space-y-2 text-sm text-primary-200">
                <li>Temperature Monitoring</li>
                <li>Humidity Tracking</li>
                <li>Alert System</li>
                <li>Data Analytics</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Legal</h5>
              <ul className="space-y-2 text-sm text-primary-200">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Compliance</li>
                <li>Support</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-800 mt-8 pt-8 text-center text-primary-300 text-sm">
            <p>&copy; 2024 Smart Food Monitor. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
