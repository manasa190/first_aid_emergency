import React, { useEffect, useState } from 'react';
import { Typography, Button, Card, CardContent, Grid } from '@mui/material';
import {
  WarningAmber as EmergencyIcon,
  LocalHospital as HospitalIcon,
  Chat as ChatIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';

export default function DemoBoard() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('medicalProfile');
    if (saved) setProfile(JSON.parse(saved));
  }, []);

  return (
    <div className="app-container">
      <header>First Aid Emergency App</header>
      <div className="masonry-grid">
        {profile && (
          <Card className="masonry-card">
            <CardContent>
              <Typography variant="h5" className="card-title">Medical Profile</Typography>
              <div className="card-content">
                <strong>Name:</strong> {profile.name || 'N/A'}<br />
                <strong>Blood Type:</strong> {profile.bloodType || 'N/A'}<br />
                <strong>Allergies:</strong> {profile.allergies || 'N/A'}<br />
                <strong>Medications:</strong> {profile.medications || 'N/A'}<br />
                <strong>Note:</strong> {profile.emergencyNote || 'N/A'}
              </div>
              <Button variant="contained" color="primary" href="/profile">Edit Profile</Button>
            </CardContent>
          </Card>
        )}
        {!profile && (
          <Card className="masonry-card">
            <CardContent>
              <Typography variant="h5" className="card-title">Medical Profile</Typography>
              <div className="card-content">
                No profile found. Please create your medical profile.
              </div>
              <Button variant="contained" color="primary" href="/profile">Create Profile</Button>
            </CardContent>
          </Card>
        )}
        <Card className="masonry-card">
          <span className="card-badge">NEW</span>
          <CardContent>
            <Typography variant="h5" className="card-title">Emergency Contact</Typography>
            <div className="card-content">
              Add and manage your emergency contacts easily.
            </div>
            <Button variant="contained" color="primary">Add Contact</Button>
          </CardContent>
        </Card>
        <Card className="masonry-card">
          <CardContent>
            <Typography variant="h5" className="card-title">SOS Feature</Typography>
            <div className="card-content">
              Instantly send your location to all emergency contacts.
            </div>
            <Button variant="contained" color="primary">Send SOS</Button>
          </CardContent>
        </Card>
        <Card className="masonry-card">
          <CardContent>
            <Typography variant="h5" className="card-title">Location Sharing</Typography>
            <div className="card-content">
              Share your real-time location securely with trusted people.
            </div>
            <Button variant="contained" color="primary">Share Location</Button>
          </CardContent>
        </Card>
        <Card className="masonry-card">
          <CardContent>
            <Typography variant="h5" className="card-title">AI Assistant</Typography>
            <div className="card-content">
              Get instant guidance from our AI-powered medical assistant
            </div>
            <Button variant="contained" color="primary">Start Chat</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 