import React, { useState } from 'react';
import { Box, Typography, Button, Card, CardContent, Alert, TextField } from '@mui/material';

export default function LocationSharing() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setError('');
        },
        (err) => {
          setError('Unable to get location. Please enable location services.');
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  };

  const shareMessage = location
    ? `My live location: https://maps.google.com/?q=${location.latitude},${location.longitude}`
    : '';

  const handleCopy = () => {
    navigator.clipboard.writeText(shareMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box sx={{ p: 3, maxWidth: 500, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>Location Sharing</Typography>
      <Card>
        <CardContent>
          <Typography variant="body1" paragraph>
            Share your real-time location securely with trusted people.
          </Typography>
          <Button variant="contained" color="primary" onClick={getLocation} sx={{ mb: 2 }}>
            Get My Location
          </Button>
          {location && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Latitude: {location.latitude} <br />
              Longitude: {location.longitude}
            </Alert>
          )}
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {location && (
            <>
              <TextField
                label="Share this message"
                value={shareMessage}
                fullWidth
                InputProps={{ readOnly: true }}
                sx={{ mb: 2 }}
              />
              <Button variant="outlined" color="primary" onClick={handleCopy}>
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
} 