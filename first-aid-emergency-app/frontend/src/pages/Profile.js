import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Avatar,
  Switch,
  FormControlLabel,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListItemIcon,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Notifications as NotificationsIcon,
  LocationOn as LocationIcon,
  Security as SecurityIcon,
  Language as LanguageIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
} from '@mui/icons-material';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    emergencyContacts: [
      { name: 'Jane Smith', phone: '+1 234 567 8901' },
      { name: 'Mike Johnson', phone: '+1 234 567 8902' },
    ],
    preferences: {
      notifications: true,
      language: 'English',
      security: true,
    },
  });

  const handleSave = () => {
    // Here you would typically save the changes to your backend
    setIsEditing(false);
  };

  const handlePreferenceChange = (preference) => (event) => {
    setUserData({
      ...userData,
      preferences: {
        ...userData.preferences,
        [preference]: event.target.checked,
      },
    });
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 6 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Profile
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Manage your personal information and preferences
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                mx: 'auto',
                mb: 2,
                bgcolor: 'primary.main',
              }}
            >
              {userData.name.charAt(0)}
            </Avatar>
            <Typography variant="h6" gutterBottom>
              {userData.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {userData.email}
            </Typography>
            <Button
              variant="outlined"
              startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              sx={{ mt: 2 }}
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  value={userData.name}
                  onChange={(e) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={userData.phone}
                  onChange={(e) =>
                    setUserData({ ...userData, phone: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              Emergency Contacts
            </Typography>
            <List>
              {userData.emergencyContacts.map((contact, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={contact.name}
                    secondary={contact.phone}
                  />
                  {isEditing && (
                    <ListItemSecondaryAction>
                      <Button color="error">Remove</Button>
                    </ListItemSecondaryAction>
                  )}
                </ListItem>
              ))}
            </List>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              Preferences
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <NotificationsIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Notifications"
                  secondary="Receive emergency alerts"
                />
                <Switch
                  edge="end"
                  checked={userData.preferences.notifications}
                  onChange={handlePreferenceChange('notifications')}
                />
              </ListItem>

              <Divider />

              <ListItem>
                <ListItemIcon>
                  <LanguageIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Language"
                  secondary="English"
                />
              </ListItem>

              <Divider />

              <ListItem>
                <ListItemIcon>
                  <SecurityIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Two-Factor Authentication"
                  secondary="Add an extra layer of security"
                />
                <Switch
                  edge="end"
                  checked={userData.preferences.security}
                  onChange={handlePreferenceChange('security')}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;