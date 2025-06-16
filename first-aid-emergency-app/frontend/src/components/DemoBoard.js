import React, { useEffect, useState } from 'react';
import VoiceCommand from './VoiceCommand';
import LocationSharing from './LocationSharing';

export default function DemoBoard() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('medicalProfile');
    if (saved) setProfile(JSON.parse(saved));
  }, []);

  return (
    <div className="app-container">
      <header style={{ color: '#ff0000' }}>First Aid Emergency App</header>
      <VoiceCommand onSOS={() => alert('SOS Triggered by Voice!')} />
      <div className="masonry-grid">
        {profile && (
          <div className="masonry-card">
            <div className="card-title" style={{ color: '#ff0000' }}>Medical Profile</div>
            <div className="card-content">
              <strong>Name:</strong> {profile.name || 'N/A'}<br />
              <strong>Blood Type:</strong> {profile.bloodType || 'N/A'}<br />
              <strong>Allergies:</strong> {profile.allergies || 'N/A'}<br />
              <strong>Medications:</strong> {profile.medications || 'N/A'}<br />
              <strong>Note:</strong> {profile.emergencyNote || 'N/A'}
            </div>
            <a href="/profile" className="button" style={{textDecoration: 'none', marginTop: 8}}>Edit Profile</a>
          </div>
        )}
        {!profile && (
          <div className="masonry-card">
            <div className="card-title" style={{ color: '#ff0000' }}>Medical Profile</div>
            <div className="card-content">
              No profile found. Please create your medical profile.
            </div>
            <a href="/profile" className="button" style={{textDecoration: 'none', marginTop: 8}}>Create Profile</a>
          </div>
        )}
        <div className="masonry-card">
          <span className="card-badge">NEW</span>
          <div className="card-title" style={{ color: '#ff0000' }}>Emergency Contact</div>
          <div className="card-content">
            Add and manage your emergency contacts easily.
          </div>
          <button className="button">Add Contact</button>
        </div>
        <div className="masonry-card">
          <div className="card-title" style={{ color: '#ff0000' }}>SOS Feature</div>
          <div className="card-content">
            Instantly send your location to all emergency contacts.
          </div>
          <button className="button">Send SOS</button>
        </div>
        <div className="masonry-card">
          <div className="card-title" style={{ color: '#ff0000' }}>Location Sharing</div>
          <div className="card-content">
            Share your real-time location securely with trusted people.
          </div>
          <LocationSharing />
        </div>
        <div className="masonry-card">
          <div className="card-title" style={{ color: '#ff0000' }}>AI Assistant</div>
          <div className="card-content">
            Get instant guidance from our AI-powered medical assistant
          </div>
          <button className="button">Start Chat</button>
        </div>
      </div>
      <div className="toast">This is a notification!</div>
      <div className="loader"></div>
    </div>
  );
}