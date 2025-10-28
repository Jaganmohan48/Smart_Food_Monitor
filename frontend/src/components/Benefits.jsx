import React from 'react';
import { Link } from 'react-router-dom';

const Benefits = () => {
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
              <Link to="/about" className="text-gray-700 hover:text-primary-600 font-medium">About</Link>
              <Link to="/benefits" className="text-primary-600 font-medium">Benefits</Link>
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
      <section className="py-20 px-4 bg-gradient-to-r from-accent-100 to-primary-100">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-primary-800 mb-6">
            🚀 Why Choose Smart Food Monitor?
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Discover the comprehensive benefits that make our system the perfect choice for food export monitoring and safety compliance.
          </p>
        </div>
      </section>

      {/* Main Benefits */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="card p-8 text-center bg-gradient-to-br from-primary-50 to-primary-100 hover:shadow-glow">
              <span className="text-6xl mb-4 block">🛡️</span>
              <h3 className="text-2xl font-bold text-primary-800 mb-4">Food Safety Compliance</h3>
              <p className="text-gray-600 mb-6">
                Maintain HACCP, FDA, and international food safety standards with automated monitoring and detailed compliance reports.
              </p>
              <ul className="text-left text-sm text-gray-700 space-y-2">
                <li>• Automated compliance tracking</li>
                <li>• Real-time regulatory alerts</li>
                <li>• Audit-ready documentation</li>
                <li>• Global standard adherence</li>
              </ul>
            </div>

            <div className="card p-8 text-center bg-gradient-to-br from-accent-50 to-accent-100 hover:shadow-glow">
              <span className="text-6xl mb-4 block">💰</span>
              <h3 className="text-2xl font-bold text-accent-800 mb-4">Cost Reduction</h3>
              <p className="text-gray-600 mb-6">
                Prevent costly spoilage and waste with proactive monitoring, reducing losses by up to 30%.
              </p>
              <ul className="text-left text-sm text-gray-700 space-y-2">
                <li>• Minimize product waste</li>
                <li>• Reduce insurance claims</li>
                <li>• Optimize storage conditions</li>
                <li>• Prevent recall costs</li>
              </ul>
            </div>

            <div className="card p-8 text-center bg-gradient-to-br from-danger-50 to-danger-100 hover:shadow-glow-red">
              <span className="text-6xl mb-4 block">⚡</span>
              <h3 className="text-2xl font-bold text-danger-800 mb-4">Real-time Alerts</h3>
              <p className="text-gray-600 mb-6">
                Instant notifications when conditions deviate from safe parameters, allowing immediate corrective action.
              </p>
              <ul className="text-left text-sm text-gray-700 space-y-2">
                <li>• SMS and email alerts</li>
                <li>• Customizable thresholds</li>
                <li>• 24/7 monitoring</li>
                <li>• Escalation protocols</li>
              </ul>
            </div>

            <div className="card p-8 text-center bg-gradient-to-br from-primary-100 to-accent-100 hover:shadow-glow">
              <span className="text-6xl mb-4 block">📊</span>
              <h3 className="text-2xl font-bold text-primary-800 mb-4">Data Analytics</h3>
              <p className="text-gray-600 mb-6">
                Comprehensive analytics and reporting tools to track trends, predict issues, and optimize operations.
              </p>
              <ul className="text-left text-sm text-gray-700 space-y-2">
                <li>• Historical data analysis</li>
                <li>• Predictive insights</li>
                <li>• Custom reports</li>
                <li>• Performance metrics</li>
              </ul>
            </div>

            <div className="card p-8 text-center bg-gradient-to-br from-accent-100 to-primary-50 hover:shadow-glow">
              <span className="text-6xl mb-4 block">🌍</span>
              <h3 className="text-2xl font-bold text-accent-800 mb-4">Global Standards</h3>
              <p className="text-gray-600 mb-6">
                Meet international food safety standards for global exports, ensuring market access worldwide.
              </p>
              <ul className="text-left text-sm text-gray-700 space-y-2">
                <li>• ISO 22000 compliance</li>
                <li>• GFSI recognition</li>
                <li>• Country-specific requirements</li>
                <li>• Export certification support</li>
              </ul>
            </div>

            <div className="card p-8 text-center bg-gradient-to-br from-primary-50 to-danger-50 hover:shadow-glow-red">
              <span className="text-6xl mb-4 block">📱</span>
              <h3 className="text-2xl font-bold text-primary-800 mb-4">Mobile Access</h3>
              <p className="text-gray-600 mb-6">
                Monitor your shipments from anywhere with our responsive web platform and mobile-optimized interface.
              </p>
              <ul className="text-left text-sm text-gray-700 space-y-2">
                <li>• Responsive design</li>
                <li>• Mobile notifications</li>
                <li>• Offline capabilities</li>
                <li>• Cross-device sync</li>
              </ul>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Food Safety Operations?</h3>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of food exporters who trust Smart Food Monitor for their monitoring needs.
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/signup" className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
                Start Free Trial
              </Link>
              <Link to="/contact" className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
                Contact Sales
              </Link>
            </div>
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

export default Benefits;
