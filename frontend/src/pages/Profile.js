import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Card, CardContent, Alert } from '@mui/material';

export default function Profile() {
  const [profile, setProfile] = useState({
    name: '',
    bloodType: '',
    allergies: '',
    medications: '',
    emergencyNote: ''
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem('medicalProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('medicalProfile', JSON.stringify(profile));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Box sx={{ p: 3, maxWidth: 500, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>Medical Profile</Typography>
      <Card>
        <CardContent>
          <form onSubmit={handleSave}>
            <TextField
              label="Name"
              name="name"
              value={profile.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Blood Type"
              name="bloodType"
              value={profile.bloodType}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Allergies"
              name="allergies"
              value={profile.allergies}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Medications"
              name="medications"
              value={profile.medications}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Emergency Note"
              name="emergencyNote"
              value={profile.emergencyNote}
              onChange={handleChange}
              fullWidth
              margin="normal"
              multiline
              rows={2}
            />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
              Save Profile
            </Button>
            {saved && <Alert severity="success" sx={{ mt: 2 }}>Profile saved!</Alert>}
          </form>
        </CardContent>
      </Card>
    </Box>
  );
} 