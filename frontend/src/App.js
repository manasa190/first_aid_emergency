import React from 'react';
import './styles.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
  ThemeProvider,
  Box,
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery
} from '@mui/material';
import {
  Home as HomeIcon,
  WarningAmber as EmergencySosIcon,
  Map as EmergencyMapIcon,
  LocalHospital as FirstAidGuideIcon,
  Quiz as FirstAidQuizIcon,
  MedicalServices as FirstAidKitIcon,
  Contacts as EmergencyContactsIcon,
  SmartToy as ChatAssistantIcon,
  Menu as MenuIcon
} from '@mui/icons-material';
import theme from './theme';
import DemoBoard from './components/DemoBoard';
import EmergencySos from './pages/EmergencySos';
import EmergencyMap from './pages/EmergencyMap';
import FirstAidGuide from './pages/FirstAidGuide';
import FirstAidQuiz from './pages/FirstAidQuiz';
import FirstAidKit from './pages/FirstAidKit';
import EmergencyContacts from './pages/EmergencyContacts';
import ChatAssistance from './pages/ChatAssistance';
import Profile from './pages/Profile';
import LocationSharing from './pages/LocationSharing';

const drawerWidth = 240;

function App() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, route: '/' },
    { text: 'Emergency SOS', icon: <EmergencySosIcon />, route: '/emergency-sos' },
    { text: 'Emergency Map', icon: <EmergencyMapIcon />, route: '/emergency-map' },
    { text: 'First Aid Guide', icon: <FirstAidGuideIcon />, route: '/first-aid-guide' },
    { text: 'First Aid Quiz', icon: <FirstAidQuizIcon />, route: '/first-aid-quiz' },
    { text: 'First Aid Kit', icon: <FirstAidKitIcon />, route: '/first-aid-kit' },
    { text: 'Emergency Contacts', icon: <EmergencyContactsIcon />, route: '/emergency-contacts' },
    { text: 'Chat Assistant', icon: <ChatAssistantIcon />, route: '/chat-assistant' }
  ];

  const drawer = (
    <>
      <Toolbar sx={{ 
        backgroundColor: theme.palette.primary.main, 
        color: 'white', 
        fontWeight: 'bold', 
        fontSize: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '64px !important'
      }}>
        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold' }}>
          Medicus
        </Typography>
      </Toolbar>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton 
              component={Link} 
              to={item.route} 
              selected={item.route === '/'}
              onClick={isMobile ? handleDrawerToggle : undefined}
            >
              <ListItemIcon sx={{ minWidth: '40px' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar 
            position="fixed" 
            sx={{ 
              width: { sm: `calc(100% - ${drawerWidth}px)` }, 
              ml: { sm: `${drawerWidth}px` },
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
              {isMobile && (
                <MenuIcon 
                  onClick={handleDrawerToggle}
                  sx={{ color: theme.palette.primary.main }}
                />
              )}
              <Box sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: theme.palette.primary.main,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                marginLeft: 'auto'
              }}>
                U
              </Box>
            </Toolbar>
          </AppBar>
          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          >
            <Drawer
              variant={isMobile ? "temporary" : "permanent"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                '& .MuiDrawer-paper': { 
                  boxSizing: 'border-box', 
                  width: drawerWidth,
                  borderRight: 'none',
                  boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
                },
              }}
            >
              {drawer}
            </Drawer>
          </Box>
          <Box
            component="main"
            sx={{ 
              flexGrow: 1, 
              p: 3, 
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              backgroundColor: theme.palette.background.default,
              minHeight: '100vh'
            }}
          >
            <Toolbar />
            <Routes>
              <Route path="/" element={<DemoBoard />} />
              <Route path="/emergency-sos" element={<EmergencySos />} />
              <Route path="/emergency-map" element={<EmergencyMap />} />
              <Route path="/first-aid-guide" element={<FirstAidGuide />} />
              <Route path="/first-aid-quiz" element={<FirstAidQuiz />} />
              <Route path="/first-aid-kit" element={<FirstAidKit />} />
              <Route path="/emergency-contacts" element={<EmergencyContacts />} />
              <Route path="/chat-assistant" element={<ChatAssistance />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/location-sharing" element={<LocationSharing />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App; 