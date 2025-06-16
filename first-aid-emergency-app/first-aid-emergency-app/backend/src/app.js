const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Mock data for hospitals
const mockHospitals = [
  {
    id: 1,
    name: 'City General Hospital',
    address: '123 Main St, City',
    phone: '555-0123',
    distance: '2.5 km',
    emergency: true,
    rating: 4.5,
    waitTime: '15 min',
    specialties: ['Trauma', 'Cardiac', 'Pediatric'],
    latitude: 12.9264179,
    longitude: 77.4767151,
  },
  {
    id: 2,
    name: 'Community Medical Center',
    address: '456 Oak Ave, City',
    phone: '555-0124',
    distance: '3.8 km',
    emergency: true,
    rating: 4.2,
    waitTime: '25 min',
    specialties: ['General', 'Orthopedic', 'Neurology'],
    latitude: 12.9264179 + 0.01,
    longitude: 77.4767151 + 0.01,
  },
];

// Get nearby hospitals
app.get('/api/nearby-hospitals', (req, res) => {
  const { latitude, longitude } = req.query;
  // In a real app, we would calculate distances and filter hospitals
  // For now, we'll just return the mock data
  res.json(mockHospitals);
});

// Emergency analysis endpoint
app.post('/api/analyze-emergency', (req, res) => {
  const { symptoms, location } = req.body;
  // Mock analysis response
  res.json({
    severity: 'moderate',
    recommendedAction: 'Visit nearest hospital',
    estimatedWaitTime: '15-20 minutes',
    nearbyHospitals: mockHospitals.slice(0, 2),
  });
});

// Share location endpoint
app.post('/api/share-location', (req, res) => {
  const { latitude, longitude, timestamp } = req.body;
  // In a real app, we would store this in a database
  res.json({
    success: true,
    message: 'Location shared successfully',
    sharedAt: timestamp,
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 