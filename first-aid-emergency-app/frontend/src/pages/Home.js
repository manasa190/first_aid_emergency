import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Container,
  useTheme,
} from '@mui/material';
import {
  WarningAmber as EmergencyIcon,
  LocalHospital as HospitalIcon,
  Chat as ChatIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const QuickActionCard = ({ title, description, icon, color, onClick }) => (
  <Card
    sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      cursor: 'pointer',
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
      },
    }}
    onClick={onClick}
  >
    <CardContent>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2,
          color: color,
        }}
      >
        {icon}
        <Typography variant="h6" component="div" sx={{ ml: 1 }}>
          {title}
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
  </Card>
);

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Emergency SOS',
      description: 'Get immediate help and share your location with emergency contacts',
      icon: <EmergencyIcon fontSize="large" />,
      color: theme.palette.error.main,
      path: '/emergency',
    },
    {
      title: 'First Aid Guide',
      description: 'Access comprehensive first aid instructions and procedures',
      icon: <HospitalIcon fontSize="large" />,
      color: theme.palette.primary.main,
      path: '/first-aid',
    },
    {
      title: 'AI Assistant',
      description: 'Get instant guidance from our AI-powered medical assistant',
      icon: <ChatIcon fontSize="large" />,
      color: theme.palette.secondary.main,
      path: '/chat',
    },
    {
      title: 'Location Sharing',
      description: 'Share your real-time location with trusted contacts',
      icon: <LocationIcon fontSize="large" />,
      color: theme.palette.info.main,
      path: '/emergency',
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 6 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to First Aid Emergency App
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Your trusted companion for emergency situations and first aid guidance
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {quickActions.map((action) => (
          <Grid item xs={12} sm={6} md={3} key={action.title}>
            <QuickActionCard
              {...action}
              onClick={() => navigate(action.path)}
            />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          Emergency Contacts
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Emergency Services</Typography>
                <Typography variant="body2" color="text.secondary">
                  Call 911 for immediate emergency assistance
                </Typography>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ mt: 2 }}
                  onClick={() => window.location.href = 'tel:911'}
                >
                  Call 911
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Poison Control</Typography>
                <Typography variant="body2" color="text.secondary">
                  National Poison Control Center
                </Typography>
                <Button
                  variant="contained"
                  color="warning"
                  sx={{ mt: 2 }}
                  onClick={() => window.location.href = 'tel:1-800-222-1222'}
                >
                  Call Poison Control
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Local Hospital</Typography>
                <Typography variant="body2" color="text.secondary">
                  Find the nearest hospital
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => navigate('/emergency')}
                >
                  Find Hospital
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;