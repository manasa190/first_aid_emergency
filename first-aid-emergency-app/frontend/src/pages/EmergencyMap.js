import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Alert,
  Box,
  Paper,
  Divider,
  CircularProgress,
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Directions as DirectionsIcon,
  Share as ShareIcon,
  Close,
  LocalHospital as HospitalIcon,
  AccessTime,
  Star,
  Emergency,
  Warning,
} from '@mui/icons-material';
import '../styles/App.css';
import { analyzeEmergency, getNearbyHospitals, shareLocation } from '../services/api';

const EmergencyMap = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyHospitals, setNearbyHospitals] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [hospitalDialogOpen, setHospitalDialogOpen] = useState(false);
  const [emergencyAnalysis, setEmergencyAnalysis] = useState(null);

  useEffect(() => {
    getUserLocation();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          fetchNearbyHospitals(latitude, longitude);
        },
        (error) => {
          setError('Error getting location: ' + error.message);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
    }
  };

  const fetchNearbyHospitals = async (latitude, longitude) => {
    try {
      setLoading(true);
      const hospitals = await getNearbyHospitals(latitude, longitude);
      setNearbyHospitals(hospitals);
    } catch (error) {
      setError('Error fetching nearby hospitals');
    } finally {
      setLoading(false);
    }
  };

  const handleEmergencyAnalysis = async (description) => {
    try {
      setLoading(true);
      const analysis = await analyzeEmergency(description);
      setEmergencyAnalysis(analysis);
    } catch (error) {
      setError('Error analyzing emergency situation');
    } finally {
      setLoading(false);
    }
  };

  const handleShareLocation = async () => {
    if (!userLocation) return;
    
    try {
      await navigator.share({
        title: 'My Emergency Location',
        text: 'I need help at this location',
        url: `https://www.google.com/maps?q=${userLocation.latitude},${userLocation.longitude}`,
      });
    } catch (error) {
      console.error('Error sharing location:', error);
    }
  };

  const handleGetDirections = (hospital) => {
    const { latitude, longitude } = hospital;
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`,
      '_blank'
    );
  };

  const handleCallHospital = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const handleHospitalClick = (hospital) => {
    setSelectedHospital(hospital);
    setHospitalDialogOpen(true);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, textAlign: 'center' }}>
        <div className="loading-spinner" />
        <Typography variant="h6" sx={{ mt: 2, color: 'var(--primary-color)' }}>
          Loading your location...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button
          variant="contained"
          onClick={getUserLocation}
          className="button"
          startIcon={<LocationIcon />}
        >
          Try Again
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 'var(--border-radius)' }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#e53935', fontWeight: 700 }}>
          Emergency Map
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: 'var(--text-secondary)' }}>
          Find nearby hospitals and emergency services
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
            <CircularProgress />
          </Box>
        )}

        {userLocation && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Your Location
            </Typography>
            <iframe
              title="User Location"
              width="100%"
              height="300"
              frameBorder="0"
              style={{ border: 0, borderRadius: 'var(--border-radius)' }}
              src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&q=${userLocation.latitude},${userLocation.longitude}&zoom=15`}
              allowFullScreen
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={<ShareIcon />}
              onClick={handleShareLocation}
              sx={{ mt: 2, bgcolor: '#e53935', '&:hover': { bgcolor: '#c62828' } }}
            >
              Share Location
            </Button>
          </Box>
        )}

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card className="card">
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ color: '#e53935' }}>
                  Nearby Hospitals
                </Typography>
                <List className="hospital-list">
                  {nearbyHospitals.map((hospital) => (
                    <ListItem
                      key={hospital.id}
                      className="hospital-item"
                      onClick={() => handleHospitalClick(hospital)}
                      sx={{ cursor: 'pointer' }}
                    >
                      <ListItemIcon>
                        <HospitalIcon sx={{ color: '#e53935' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#e53935' }}>
                            {hospital.name}
                          </Typography>
                        }
                        secondary={
                          <>
                            <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
                              {hospital.address}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                              <Chip
                                size="small"
                                icon={<AccessTime />}
                                label={`${hospital.waitTime} wait`}
                                color="primary"
                              />
                              <Chip
                                size="small"
                                icon={<Star />}
                                label={`${hospital.rating} rating`}
                                color="primary"
                              />
                            </Box>
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card className="card">
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ color: '#e53935' }}>
                  Emergency Analysis
                </Typography>
                {emergencyAnalysis && (
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      mt: 3,
                      bgcolor: 'error.light',
                      color: 'error.contrastText',
                      borderRadius: 'var(--border-radius)',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Warning sx={{ mr: 1 }} />
                      <Typography variant="h6">
                        Emergency Level: {emergencyAnalysis.emergency_level}
                      </Typography>
                    </Box>
                    <Typography variant="body1">
                      {emergencyAnalysis.recommendation}
                    </Typography>
                  </Paper>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      {/* Share Location Dialog */}
      <Dialog open={shareDialogOpen} onClose={() => setShareDialogOpen(false)}>
        <DialogTitle sx={{ color: 'var(--primary-color)' }}>
          Location Shared
        </DialogTitle>
        <DialogContent>
          <Typography>
            Your location has been copied to clipboard. Share this link with emergency services or loved ones.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShareDialogOpen(false)} className="button">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Hospital Details Dialog */}
      <Dialog
        open={hospitalDialogOpen}
        onClose={() => setHospitalDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        {selectedHospital && (
          <>
            <DialogTitle sx={{ color: 'var(--primary-color)' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {selectedHospital.name}
                <IconButton onClick={() => setHospitalDialogOpen(false)}>
                  <Close />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                  <LocationIcon sx={{ verticalAlign: 'middle', mr: 1, color: 'var(--primary-color)' }} />
                  {selectedHospital.address}
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => handleCallHospital(selectedHospital.phone)}
                    className="button"
                    startIcon={<PhoneIcon />}
                  >
                    Call
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => handleGetDirections(selectedHospital)}
                    className="button"
                    startIcon={<DirectionsIcon />}
                  >
                    Directions
                  </Button>
                </Grid>
              </Grid>
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2" sx={{ color: 'var(--text-secondary)', mb: 1 }}>
                  Specialties
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {selectedHospital.specialties.map((specialty, index) => (
                    <Chip
                      key={index}
                      label={specialty}
                      color="primary"
                      size="small"
                    />
                  ))}
                </Box>
              </Box>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default EmergencyMap; 