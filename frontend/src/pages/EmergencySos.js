import React, { useState, useEffect } from 'react';
import { Typography, Button, TextField, Box, Card, CardContent } from '@mui/material';
import { Send as SendIcon, LocationOn as LocationOnIcon } from '@mui/icons-material';

export default function EmergencySos() {
  const [location, setLocation] = useState(null);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sentStatus, setSentStatus] = useState('');

  useEffect(() => {
    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          setSentStatus("Error: Unable to get location. Please enable location services.");
        }
      );
    } else {
      setSentStatus("Geolocation is not supported by your browser.");
    }
  }, []);

  const handleSendSOS = async () => {
    if (!location) {
      setSentStatus("Location not available. Please wait or enable location services.");
      return;
    }

    setIsSending(true);
    setSentStatus("Sending SOS...");

    try {
      // Simulate API call to send SOS
      console.log("Sending SOS with:", { location, message });
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay

      setSentStatus("SOS sent successfully!");
      setMessage(''); // Clear message after sending
    } catch (error) {
      console.error("Error sending SOS:", error);
      setSentStatus("Failed to send SOS. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Emergency SOS</Typography>
      <Typography variant="body1" paragraph>Instantly send your location to your emergency contacts.</Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Your Current Location:</Typography>
          {location ? (
            <Typography variant="body1">
              <LocationOnIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
              Latitude: {location.latitude}<br />
              Longitude: {location.longitude}
            </Typography>
          ) : (
            <Typography variant="body2" color="text.secondary">Fetching location...</Typography>
          )}
        </CardContent>
      </Card>

      <TextField
        label="Optional Message for Emergency Contacts"
        multiline
        rows={4}
        fullWidth
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        sx={{ mb: 3 }}
        variant="outlined"
      />

      <Button
        variant="contained"
        color="primary"
        startIcon={<SendIcon />}
        onClick={handleSendSOS}
        disabled={isSending || !location}
        sx={{ mr: 2 }}
      >
        {isSending ? 'Sending...' : 'Send SOS'}
      </Button>

      {sentStatus && (
        <Typography variant="body2" sx={{ mt: 2, color: sentStatus.includes("Error") || sentStatus.includes("Failed") ? 'error.main' : 'success.main' }}>
          {sentStatus}
        </Typography>
      )}
    </Box>
  );
} 