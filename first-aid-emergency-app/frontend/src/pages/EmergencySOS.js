import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  CircularProgress,
} from '@mui/material';
import {
  WarningAmber as EmergencyIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';

const EmergencySOS = () => {
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', phone: '' });
  const [emergencyContacts, setEmergencyContacts] = useState([
    { id: 1, name: 'John Doe', phone: '123-456-7890' },
    { id: 2, name: 'Jane Smith', phone: '098-765-4321' },
  ]);

  useEffect(() => {
    if (isEmergencyActive) {
      getCurrentLocation();
    }
  }, [isEmergencyActive]);

  const getCurrentLocation = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setIsLoading(false);
          // Here you would typically send this location to your backend
          // and notify emergency contacts
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLoading(false);
        }
      );
    }
  };

  const handleEmergencyClick = () => {
    setIsEmergencyActive(true);
    // Here you would typically trigger emergency protocols
    // such as calling emergency services and notifying contacts
  };

  const handleAddContact = () => {
    if (newContact.name && newContact.phone) {
      setEmergencyContacts([
        ...emergencyContacts,
        { id: Date.now(), ...newContact },
      ]);
      setNewContact({ name: '', phone: '' });
      setOpenDialog(false);
    }
  };

  const handleDeleteContact = (id) => {
    setEmergencyContacts(emergencyContacts.filter((contact) => contact.id !== id));
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 6 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Emergency SOS
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          In case of emergency, press the SOS button to alert your emergency contacts
          and share your location
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  p: 4,
                }}
              >
                <Button
                  variant="contained"
                  color="error"
                  size="large"
                  startIcon={<EmergencyIcon />}
                  onClick={handleEmergencyClick}
                  disabled={isEmergencyActive}
                  sx={{
                    width: 200,
                    height: 200,
                    borderRadius: '50%',
                    fontSize: '1.5rem',
                    textTransform: 'none',
                  }}
                >
                  {isEmergencyActive ? 'SOS Activated' : 'SOS'}
                </Button>
                {isLoading && (
                  <CircularProgress sx={{ mt: 2 }} />
                )}
                {location && (
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    Location shared: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                  </Typography>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Emergency Contacts</Typography>
                <Button
                  startIcon={<AddIcon />}
                  onClick={() => setOpenDialog(true)}
                >
                  Add Contact
                </Button>
              </Box>
              <List>
                {emergencyContacts.map((contact) => (
                  <ListItem key={contact.id}>
                    <ListItemText
                      primary={contact.name}
                      secondary={contact.phone}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDeleteContact(contact.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add Emergency Contact</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={newContact.name}
            onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Phone Number"
            fullWidth
            value={newContact.phone}
            onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddContact} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default EmergencySOS; 