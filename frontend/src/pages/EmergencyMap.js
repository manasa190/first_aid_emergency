import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, ListGroup, Alert, Spinner } from 'react-bootstrap';

const emergencyServices = [
  { type: "Hospital", name: "City General Hospital", address: "123 Main St", phone: "555-0101", distance: "2.3 miles" },
  { type: "Urgent Care", name: "QuickCare Medical", address: "456 Oak Ave", phone: "555-0102", distance: "1.5 miles" },
  { type: "Pharmacy", name: "24/7 Pharmacy", address: "789 Pine Rd", phone: "555-0103", distance: "0.8 miles" },
  { type: "Fire Station", name: "Central Fire Station", address: "321 Elm St", phone: "555-0104", distance: "1.2 miles" },
  { type: "Police Station", name: "Downtown Police", address: "654 Maple Dr", phone: "555-0105", distance: "1.7 miles" }
];

export default function EmergencyMap() {
  const [selectedType, setSelectedType] = useState('all');
  const [showDirections, setShowDirections] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          setIsLoading(false);
        },
        (error) => {
          setLocationError("Unable to get your location. Please enable location services.");
          setIsLoading(false);
        }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser.");
      setIsLoading(false);
    }
  };

  const filteredServices = selectedType === 'all' 
    ? emergencyServices 
    : emergencyServices.filter(service => service.type === selectedType);

  const handleGetDirections = (service) => {
    setShowDirections(service);
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    // This is a simplified distance calculation
    // In a real app, you would use a more accurate formula or API
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return (distance * 0.621371).toFixed(1); // Convert to miles
  };

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Nearby Emergency Services</h2>

      {isLoading ? (
        <div className="text-center my-4">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-2">Getting your location...</p>
        </div>
      ) : locationError ? (
        <Alert variant="warning" className="mb-4">
          <Alert.Heading>Location Access Required</Alert.Heading>
          <p>{locationError}</p>
          <Button variant="primary" onClick={getCurrentLocation}>
            Try Again
          </Button>
        </Alert>
      ) : (
        <Card className="mb-4">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h5>Your Current Location</h5>
                <p className="mb-0">
                  Latitude: {userLocation.latitude.toFixed(6)}<br />
                  Longitude: {userLocation.longitude.toFixed(6)}
                </p>
              </div>
              <Button variant="outline-primary" onClick={getCurrentLocation}>
                Refresh Location
              </Button>
            </div>
          </Card.Body>
        </Card>
      )}

      <Card className="mb-4">
        <Card.Body>
          <Form.Group className="mb-3">
            <Form.Label>Filter by Service Type</Form.Label>
            <Form.Select 
              value={selectedType} 
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">All Services</option>
              <option value="Hospital">Hospitals</option>
              <option value="Urgent Care">Urgent Care</option>
              <option value="Pharmacy">Pharmacies</option>
              <option value="Fire Station">Fire Stations</option>
              <option value="Police Station">Police Stations</option>
            </Form.Select>
          </Form.Group>

          <div className="services-list">
            {filteredServices.map((service, index) => (
              <Card key={index} className="mb-3">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h5>{service.name}</h5>
                      <p className="text-muted mb-1">{service.type}</p>
                      <p className="mb-1">{service.address}</p>
                      {userLocation && (
                        <p className="mb-1">
                          Distance: {calculateDistance(
                            userLocation.latitude,
                            userLocation.longitude,
                            // Using dummy coordinates for demo
                            // In a real app, these would be actual service coordinates
                            40.7128 + (index * 0.01),
                            -74.0060 + (index * 0.01)
                          )} miles
                        </p>
                      )}
                      <p className="mb-0">Phone: {service.phone}</p>
                    </div>
                    <div>
                      <Button 
                        variant="primary" 
                        className="me-2"
                        onClick={() => window.location.href = `tel:${service.phone}`}
                      >
                        Call
                      </Button>
                      <Button 
                        variant="outline-primary"
                        onClick={() => handleGetDirections(service)}
                      >
                        Get Directions
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Card.Body>
      </Card>

      {showDirections && (
        <Card className="mb-4">
          <Card.Body>
            <h4>Directions to {showDirections.name}</h4>
            <p className="text-muted">Since we can't access your exact location, here are general directions:</p>
            <ListGroup>
              <ListGroup.Item>1. Start from your current location</ListGroup.Item>
              <ListGroup.Item>2. Head towards {showDirections.address}</ListGroup.Item>
              <ListGroup.Item>3. Estimated distance: {showDirections.distance}</ListGroup.Item>
              <ListGroup.Item>4. Look for {showDirections.name} signage</ListGroup.Item>
            </ListGroup>
            <Alert variant="info" className="mt-3">
              <Alert.Heading>Important Note</Alert.Heading>
              <p>
                For the most accurate directions, please use your preferred navigation app or call {showDirections.phone} for assistance.
              </p>
            </Alert>
            <Button 
              variant="secondary" 
              onClick={() => setShowDirections(null)}
              className="mt-3"
            >
              Close Directions
            </Button>
          </Card.Body>
        </Card>
      )}

      <Card>
        <Card.Body>
          <h5>Emergency Tips</h5>
          <ul>
            <li>Save important emergency numbers in your phone</li>
            <li>Know the quickest route to your nearest hospital</li>
            <li>Keep a list of your medications and allergies</li>
            <li>Share your location with emergency contacts</li>
          </ul>
        </Card.Body>
      </Card>
    </Container>
  );
} 