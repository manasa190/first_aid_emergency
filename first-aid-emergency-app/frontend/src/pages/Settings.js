import React, { useState } from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  Divider,
  Paper,
  Box,
} from '@mui/material';
import {
  Notifications,
  Language,
  Security,
  Help,
} from '@mui/icons-material';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    language: 'English',
    security: true,
  });

  const handleToggle = (setting) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 'var(--border-radius)' }}>
        <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 700, mb: 3 }}>
          Settings
        </Typography>

        <List>
          <ListItem>
            <ListItemIcon>
              <Notifications />
            </ListItemIcon>
            <ListItemText
              primary="Notifications"
              secondary="Receive emergency alerts and updates"
            />
            <Switch
              edge="end"
              checked={settings.notifications}
              onChange={() => handleToggle('notifications')}
            />
          </ListItem>

          <Divider />

          <ListItem>
            <ListItemIcon>
              <Language />
            </ListItemIcon>
            <ListItemText
              primary="Language"
              secondary="Change application language"
            />
            <Box sx={{ minWidth: 120 }}>
              <select
                value={settings.language}
                onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                style={{
                  padding: '8px',
                  borderRadius: '8px',
                  border: '1px solid #e0e0e0',
                  backgroundColor: 'white',
                }}
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
              </select>
            </Box>
          </ListItem>

          <Divider />

          <ListItem>
            <ListItemIcon>
              <Security />
            </ListItemIcon>
            <ListItemText
              primary="Security"
              secondary="Enable two-factor authentication"
            />
            <Switch
              edge="end"
              checked={settings.security}
              onChange={() => handleToggle('security')}
            />
          </ListItem>

          <Divider />

          <ListItem>
            <ListItemIcon>
              <Help />
            </ListItemIcon>
            <ListItemText
              primary="Help & Support"
              secondary="Get help with the application"
            />
          </ListItem>
        </List>
      </Paper>
    </Container>
  );
};

export default Settings; 