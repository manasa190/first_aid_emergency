import React, { useEffect, useState } from 'react';
import { Typography, Button, Card, CardContent, Grid, Box } from '@mui/material';
import {
  WarningAmber as EmergencyIcon,
  LocalHospital as HospitalIcon,
  Chat as ChatIcon,
  LocationOn as LocationIcon,
  Person as ProfileIcon, // For Medical Profile
  Contacts as ContactsIcon, // For Emergency Contact
  Call as SosIcon, // For SOS Feature
  SmartToy as AiAssistantIcon, // For AI Assistant
  Quiz as QuizIcon,
} from '@mui/icons-material';
import VoiceCommand from './VoiceCommand';
import EmergencyInstructions from './EmergencyInstructions';
import EmergencyQuiz from './EmergencyQuiz';
import { Link } from 'react-router-dom';

export default function DemoBoard() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('medicalProfile');
    if (saved) setProfile(JSON.parse(saved));
  }, []);

  return (
    <Box className="fade-in">
      <Typography variant="h3" sx={{ mt: 2, mb: 1, fontWeight: 'bold' }}>
        Welcome to First Aid Emergency App
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
        Your trusted companion for emergency situations and first aid guidance
      </Typography>

      {/* Emergency Instructions Section */}
      <Box sx={{ mb: 4 }}>
        <EmergencyInstructions />
      </Box>

      {/* Emergency Quiz Section */}
      <Box sx={{ mb: 4 }}>
        <EmergencyQuiz />
      </Box>

      <div className="masonry-grid">
        {/* Medical Profile Card */}
        {profile ? (
          <Card className="masonry-card glass-card">
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <ProfileIcon sx={{ color: 'primary.main', fontSize: 40 }} />
                </Grid>
                <Grid item xs>
                  <Typography variant="h5" className="card-title">Medical Profile</Typography>
                </Grid>
              </Grid>
              <div className="card-content">
                <strong>Name:</strong> {profile.name || 'N/A'}<br />
                <strong>Blood Type:</strong> {profile.bloodType || 'N/A'}<br />
                <strong>Allergies:</strong> {profile.allergies || 'N/A'}<br />
                <strong>Medications:</strong> {profile.medications || 'N/A'}<br />
                <strong>Note:</strong> {profile.emergencyNote || 'N/A'}
              </div>
              <Button 
                variant="contained" 
                color="primary" 
                component={Link} 
                to="/profile" 
                startIcon={<ProfileIcon />}
                className="modern-button"
              >
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="masonry-card glass-card">
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <ProfileIcon sx={{ color: 'primary.main', fontSize: 40 }} />
                </Grid>
                <Grid item xs>
                  <Typography variant="h5" className="card-title">Medical Profile</Typography>
                </Grid>
              </Grid>
              <div className="card-content">
                No profile found. Please create your medical profile.
              </div>
              <Button 
                variant="contained" 
                color="primary" 
                component={Link} 
                to="/profile" 
                startIcon={<ProfileIcon />}
                className="modern-button"
              >
                Create Profile
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Emergency Contact Card */}
        <Card className="masonry-card glass-card">
          <span className="card-badge">NEW</span> {/* Retaining NEW badge if desired */}
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <ContactsIcon sx={{ color: 'primary.main', fontSize: 40 }} />
              </Grid>
              <Grid item xs>
                <Typography variant="h5" className="card-title">Emergency Contact</Typography>
              </Grid>
            </Grid>
            <div className="card-content">
              Add and manage your emergency contacts easily.
            </div>
            <Button 
              variant="contained" 
              color="primary" 
              component={Link} 
              to="/emergency-contacts" 
              startIcon={<ContactsIcon />}
              className="modern-button"
            >
              Add Contact
            </Button>
          </CardContent>
        </Card>

        {/* SOS Feature Card */}
        <Card className="masonry-card glass-card">
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <SosIcon sx={{ color: 'primary.main', fontSize: 40 }} />
              </Grid>
              <Grid item xs>
                <Typography variant="h5" className="card-title">SOS Feature</Typography>
              </Grid>
            </Grid>
            <div className="card-content">
              Instantly send your location to all emergency contacts.
            </div>
            <Button 
              variant="contained" 
              color="primary" 
              component={Link} 
              to="/emergency-sos" 
              startIcon={<SosIcon />}
              className="emergency-button"
            >
              Send SOS
            </Button>
          </CardContent>
        </Card>

        {/* Location Sharing Card */}
        <Card className="masonry-card glass-card">
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <LocationIcon sx={{ color: 'primary.main', fontSize: 40 }} /> {/* Blue color for location icon */}
              </Grid>
              <Grid item xs>
                <Typography variant="h5" className="card-title" sx={{ color: 'primary.main' }}>Location Sharing</Typography> {/* Blue color for text */}
              </Grid>
            </Grid>
            <div className="card-content">
              Share your real-time location securely with trusted people.
            </div>
            <Button 
              variant="contained" 
              color="primary" 
              component={Link} 
              to="/location-sharing" 
              startIcon={<LocationIcon />}
              className="modern-button"
            >
              Share Location
            </Button>
          </CardContent>
        </Card>

        {/* AI Assistant Card */}
        <Card className="masonry-card glass-card">
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <AiAssistantIcon sx={{ color: 'primary.main', fontSize: 40 }} />
              </Grid>
              <Grid item xs>
                <Typography variant="h5" className="card-title">AI Assistant</Typography>
              </Grid>
            </Grid>
            <div className="card-content">
              Get instant guidance from our AI-powered medical assistant
            </div>
            <Button 
              variant="contained" 
              color="primary" 
              component={Link} 
              to="/chat-assistant" 
              startIcon={<ChatIcon />}
              className="modern-button"
            >
              Start Chat
            </Button>
          </CardContent>
        </Card>

        {/* Voice Commands Card - Reintegrated */}
        <Card className="masonry-card glass-card">
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <ChatIcon sx={{ color: 'primary.main', fontSize: 40 }} />
              </Grid>
              <Grid item xs>
                <Typography variant="h5" className="card-title">Voice Commands</Typography>
              </Grid>
            </Grid>
            <div className="card-content">
              Use voice commands for hands-free emergency assistance.
            </div>
            <VoiceCommand />
          </CardContent>
        </Card>
      </div>
    </Box>
  );
} 