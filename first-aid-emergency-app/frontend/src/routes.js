import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import EmergencySOS from './pages/EmergencySOS';
import FirstAidGuide from './pages/FirstAidGuide';
import ChatAssistant from './pages/ChatAssistant';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import EmergencyMap from './pages/EmergencyMap';
import FirstAidQuiz from './pages/FirstAidQuiz';
import EmergencyContacts from './pages/EmergencyContacts';
import FirstAidKit from './pages/FirstAidKit';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/emergency-sos" element={<EmergencySOS />} />
      <Route path="/first-aid-guide" element={<FirstAidGuide />} />
      <Route path="/chat-assistant" element={<ChatAssistant />} />
      <Route path="/emergency-map" element={<EmergencyMap />} />
      <Route path="/first-aid-quiz" element={<FirstAidQuiz />} />
      <Route path="/emergency-contacts" element={<EmergencyContacts />} />
      <Route path="/first-aid-kit" element={<FirstAidKit />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes; 