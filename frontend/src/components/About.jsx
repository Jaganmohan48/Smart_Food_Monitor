import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center">
              <span className="text-3xl mr-3">🌡️</span>
              <h1 className="text-2xl font-bold text-primary-800">Smart Food Monitor</h1>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium">Home</Link>
              <Link to="/about" className="text-primary-600 font-medium">About</Link>
              <Link to="/benefits" className="text-gray-700 hover:text-primary-600 font-medium">Benefits</Link>
              <Link to="/contact" className="text-gray-700 hover:text-primary-600 font-medium">Contact</Link>
            </nav>
            <div className="flex space-x-4">
              <Link to="/login" className="btn-primary">Login</Link>
              <Link to="/signup" className="bg-accent-600 hover:bg-accent-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">Sign Up</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary-100 to-accent-100">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-primary-800 mb-6">
            🔬 About Smart Food Monitor
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-4xl mx-auto">
            Revolutionizing food safety through intelligent monitoring technology. We combine cutting-edge sensors,
            real-time analytics, and automated compliance systems to ensure your food exports meet the highest safety standards.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-primary-800 mb-6">Our Mission</h3>
              <p className="text-lg text-gray-600 mb-6">
                To empower food exporters worldwide with technology that ensures food safety, prevents waste,
                and maintains compliance with international standards. We believe that every meal deserves to be safe,
                and every exporter deserves peace of mind.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <span className="text-3xl font-bold text-primary-600 block">500+</span>
                  <span className="text-sm text-gray-600">Happy Clients</span>
                </div>
                <div className="text-center">
                  <span className="text-3xl font-bold text-accent-600 block">1M+</span>
                  <span className="text-sm text-gray-600">Shipments Monitored</span>
                </div>
                <div className="text-center">
                  <span className="text-3xl font-bold text-danger-600 block">99.9%</span>
                  <span className="text-sm text-gray-600">Uptime</span>
                </div>
                <div className="text-center">
                  <span className="text-3xl font-bold text-primary-600 block">24/7</span>
                  <span className="text-sm text-gray-600">Support</span>
                </div>
              </div>
            </div>
            <div className="card p-8 bg-gradient-to-br from-primary-50 to-accent-50">
              <h4 className="text-2xl font-bold text-primary-800 mb-4">Why Food Safety Matters</h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-accent-600 mr-3">✓</span>
                  <span>Prevents foodborne illnesses affecting millions annually</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-600 mr-3">✓</span>
                  <span>Reduces economic losses from spoiled goods</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-600 mr-3">✓</span>
                  <span>Ensures compliance with global trade regulations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-600 mr-3">✓</span>
                  <span>Builds consumer trust and brand reputation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-600 mr-3">✓</span>
                  <span>Supports sustainable food supply chains</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-primary-800 mb-4">Our Technology</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Cutting-edge monitoring solutions powered by IoT sensors, AI analytics, and cloud computing.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-6 text-center bg-gradient-to-br from-primary-50 to-primary-100">
              <span className="text-5xl mb-4 block">📡</span>
              <h4 className="text-xl font-semibold mb-3 text-primary-800">IoT Sensors</h4>
              <p className="text-gray-600 mb-4">
                High-precision temperature and humidity sensors with wireless connectivity for real-time data collection.
              </p>
              <ul className="text-left text-sm text-gray-700 space-y-1">
                <li>• ±0.1°C accuracy</li>
                <li>• Battery life up to 2 years</li>
                <li>• Wireless range up to 100m</li>
                <li>• IP67 waterproof rating</li>
              </ul>
            </div>

            <div className="card p-6 text-center bg-gradient-to-br from-accent-50 to-accent-100">
              <span className="text-5xl mb-4 block">🤖</span>
              <h4 className="text-xl font-semibold mb-3 text-accent-800">AI Analytics</h4>
              <p className="text-gray-600 mb-4">
                Machine learning algorithms analyze patterns and predict potential issues before they occur.
              </p>
              <ul className="text-left text-sm text-gray-700 space-y-1">
                <li>• Predictive maintenance</li>
                <li>• Anomaly detection</li>
                <li>• Trend analysis</li>
                <li>• Automated reporting</li>
              </ul>
            </div>

            <div className="card p-6 text-center bg-gradient-to-br from-danger-50 to-danger-100">
              <span className="text-5xl mb-4 block">☁️</span>
              <h4 className="text-xl font-semibold mb-3 text-danger-800">Cloud Platform</h4>
              <p className="text-gray-600 mb-4">
                Secure, scalable cloud infrastructure ensuring 99.9% uptime and global accessibility.
              </p>
              <ul className="text-left text-sm text-gray-700 space-y-1">
                <li>• Enterprise-grade security</li>
                <li>• Global data centers</li>
                <li>• Auto-scaling capacity</li>
                <li>• 24/7 monitoring</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary-50 to-accent-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-primary-800 mb-4">Meet Our Team</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experts in food science, technology, and compliance working together to revolutionize food safety monitoring.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-6 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl text-white">👩‍🔬</span>
              </div>
              <h4 className="text-xl font-semibold text-primary-800 mb-2">Dr. Sarah Chen</h4>
              <p className="text-primary-600 font-medium mb-3">Chief Food Scientist</p>
              <p className="text-gray-600 text-sm">PhD in Food Microbiology, 15+ years in food safety research and HACCP implementation.</p>
            </div>

            <div className="card p-6 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl text-white">👨‍💻</span>
              </div>
              <h4 className="text-xl font-semibold text-accent-800 mb-2">Michael Rodriguez</h4>
              <p className="text-accent-600 font-medium mb-3">Lead Engineer</p>
              <p className="text-gray-600 text-sm">IoT specialist with expertise in sensor networks and real-time data processing systems.</p>
            </div>

            <div className="card p-6 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-danger-400 to-danger-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl text-white">👩‍💼</span>
              </div>
              <h4 className="text-xl font-semibold text-danger-800 mb-2">Jennifer Park</h4>
              <p className="text-danger-600 font-medium mb-3">Compliance Director</p>
              <p className="text-gray-600 text-sm">Regulatory expert ensuring compliance with FDA, EU, and international food safety standards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary-600 to-accent-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Join the Food Safety Revolution?</h3>
          <p className="text-xl mb-8 opacity-90">
            Experience the peace of mind that comes with knowing your food exports are monitored by the best in the industry.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/signup" className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
              Start Your Journey
            </Link>
            <Link to="/contact" className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-900 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2024 Smart Food Monitor. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
