import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send the form data to a server
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', company: '', message: '' });
  };

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
              <Link to="/benefits" className="text-gray-700 hover:text-primary-600 font-medium">Benefits</Link>
              <Link to="/contact" className="text-primary-600 font-medium">Contact</Link>
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
            📞 Get In Touch
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Have questions about our Smart Food Monitoring System? We're here to help you ensure food safety and compliance.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h3 className="text-3xl font-bold text-primary-800 mb-8">Contact Information</h3>

              <div className="space-y-8">
                <div className="flex items-start">
                  <span className="text-4xl mr-4">📧</span>
                  <div>
                    <h4 className="text-xl font-semibold text-primary-800 mb-2">Email Support</h4>
                    <p className="text-gray-600 mb-1">sasidarvarma@gmail.com</p>
                    <p className="text-sm text-gray-500">We respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="text-4xl mr-4">📞</span>
                  <div>
                    <h4 className="text-xl font-semibold text-primary-800 mb-2">Phone Support</h4>
                    <p className="text-gray-600 mb-1">+91 7382220280</p>
                    <p className="text-sm text-gray-500">Mon-Fri 9AM-6PM IST</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="text-4xl mr-4">📍</span>
                  <div>
                    <h4 className="text-xl font-semibold text-primary-800 mb-2">Office Address</h4>
                    <p className="text-gray-600 mb-1">VelTech University</p>
                    <p className="text-gray-600 mb-1">Chennai, Tamil Nadu</p>
                    <p className="text-gray-600">India - 600062</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="text-4xl mr-4">🕒</span>
                  <div>
                    <h4 className="text-xl font-semibold text-primary-800 mb-2">Business Hours</h4>
                    <p className="text-gray-600 mb-1">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-600 mb-1">Saturday: 10:00 AM - 4:00 PM</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                    <p className="text-xs text-gray-500 mt-1">All times in IST (UTC+5:30)</p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="mt-8">
                <h4 className="text-xl font-semibold text-primary-800 mb-4">Find Us</h4>
                <div className="bg-gray-200 rounded-lg h-64 overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.0!2d80.2206!3d13.0827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52679b1b1b1b1b%3A0x1234567890abcdef!2sVelTech%20University!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="VelTech University Location"
                  ></iframe>
                </div>
                <p className="text-sm text-gray-500 mt-2">VelTech University, Chennai, Tamil Nadu, India</p>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h3 className="text-3xl font-bold text-primary-800 mb-8">Send Us a Message</h3>

              <form onSubmit={handleSubmit} className="card p-8">
                <div className="mb-6">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Your company name"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    placeholder="Tell us about your food monitoring needs..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h3 className="text-3xl font-bold text-primary-800 mb-8 text-center">Frequently Asked Questions</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="card p-6">
                <h4 className="text-lg font-semibold text-primary-800 mb-3">How quickly can I get started?</h4>
                <p className="text-gray-600">You can sign up and start monitoring within minutes. Our setup process is designed to be quick and user-friendly.</p>
              </div>
              <div className="card p-6">
                <h4 className="text-lg font-semibold text-primary-800 mb-3">Do you offer training?</h4>
                <p className="text-gray-600">Yes, we provide comprehensive training materials, video tutorials, and dedicated support to ensure you get the most out of our system.</p>
              </div>
              <div className="card p-6">
                <h4 className="text-lg font-semibold text-primary-800 mb-3">What kind of support do you offer?</h4>
                <p className="text-gray-600">We offer 24/7 technical support, regular system updates, and dedicated account managers for enterprise clients.</p>
              </div>
              <div className="card p-6">
                <h4 className="text-lg font-semibold text-primary-800 mb-3">Can I integrate with existing systems?</h4>
                <p className="text-gray-600">Yes, our API allows for seamless integration with existing warehouse management and ERP systems.</p>
              </div>
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

export default Contact;
