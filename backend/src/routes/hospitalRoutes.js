const express = require('express');
const router = express.Router();

// Get nearby hospitals
router.get('/nearby-hospitals', (req, res) => {
    const { latitude, longitude } = req.query;
    
    // Mock data for nearby hospitals
    const nearbyHospitals = [
        {
            id: 1,
            name: "City General Hospital",
            address: "123 Main Street",
            latitude: parseFloat(latitude) + 0.01,
            longitude: parseFloat(longitude) + 0.01,
            waitTime: "15 mins",
            rating: 4.5
        },
        {
            id: 2,
            name: "Community Medical Center",
            address: "456 Oak Avenue",
            latitude: parseFloat(latitude) - 0.01,
            longitude: parseFloat(longitude) - 0.01,
            waitTime: "30 mins",
            rating: 4.2
        },
        {
            id: 3,
            name: "Emergency Care Hospital",
            address: "789 Pine Road",
            latitude: parseFloat(latitude) + 0.02,
            longitude: parseFloat(longitude) - 0.02,
            waitTime: "10 mins",
            rating: 4.8
        }
    ];

    res.json(nearbyHospitals);
});

module.exports = router; 