import { useEffect } from 'react';

const useVoiceCommand = (onCommand) => {
    useEffect(() => {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event) => {
            const command = event.results[0][0].transcript.toLowerCase();
            onCommand(command);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
        };

        recognition.start();

        return () => {
            recognition.stop();
        };
    }, [onCommand]);
};

export default useVoiceCommand;