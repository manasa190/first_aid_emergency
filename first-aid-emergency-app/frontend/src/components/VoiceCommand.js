import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export default function VoiceCommand({ onSOS }) {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  React.useEffect(() => {
    if (transcript.toLowerCase().includes('sos')) {
      onSOS();
      resetTranscript();
    }
  }, [transcript, onSOS, resetTranscript]);

  return (
    <div style={{ margin: '24px 0' }}>
      <button className="button" onClick={SpeechRecognition.startListening}>
        {listening ? 'Listening...' : 'Activate Voice Command'}
      </button>
      <div style={{ color: '#b1001a', marginTop: 8 }}>{transcript}</div>
    </div>
  );
}