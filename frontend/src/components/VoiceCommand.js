import React, { useState, useEffect } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { Mic, MicOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function VoiceCommand() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState('');
  const [recognition, setRecognition] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognitionInstance = new window.webkitSpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;

      recognitionInstance.onstart = () => {
        setIsListening(true);
        setError('');
      };

      recognitionInstance.onerror = (event) => {
        setError('Error occurred in recognition: ' + event.error);
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      recognitionInstance.onresult = (event) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        setTranscript(transcript);

        // Command recognition
        const command = transcript.toLowerCase();
        if (command.includes('emergency') || command.includes('sos')) {
          navigate('/emergency-sos');
        } else if (command.includes('help') || command.includes('chat')) {
          navigate('/chat-assistant');
        } else if (command.includes('location') || command.includes('share')) {
          navigate('/location-sharing');
        } else if (command.includes('contact')) {
          navigate('/emergency-contacts');
        } else if (command.includes('profile') || command.includes('medical')) {
          navigate('/profile');
        } else if (command.includes('quiz')) {
          navigate('/first-aid-quiz');
        } else if (command.includes('guide') || command.includes('first aid')) {
          navigate('/first-aid-guide');
        }
      };

      setRecognition(recognitionInstance);
    } else {
      setError('Speech recognition not supported in this browser.');
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [navigate]);

  const toggleListening = () => {
    if (!recognition) {
      setError('Speech recognition not initialized');
      return;
    }

    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  return (
    <div className="voice-command-container slide-up">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button
          variant="contained"
          color={isListening ? "error" : "primary"}
          onClick={toggleListening}
          startIcon={isListening ? <MicOff /> : <Mic />}
          className={`voice-command-button ${isListening ? 'listening' : ''}`}
          fullWidth
        >
          {isListening ? 'Stop Listening' : 'Start Voice Command'}
        </Button>

        {transcript && (
          <Typography variant="body1" className="fade-in">
            You said: {transcript}
          </Typography>
        )}

        {error && (
          <Typography variant="body2" color="error" className="fade-in">
            {error}
          </Typography>
        )}

        <Typography variant="caption" color="textSecondary">
          Try saying: "Emergency", "Help", "Call ambulance", "Find hospital"
        </Typography>
      </Box>
    </div>
  );
} 