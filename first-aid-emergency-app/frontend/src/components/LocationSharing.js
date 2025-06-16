import React, { useEffect, useState } from 'react';

const LocationSharing = () => {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);
    const [sharing, setSharing] = useState(false);

    const handleLocationSuccess = (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });

        // Send location to backend or emergency contacts
        fetch('/api/sos/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: 'YOUR_USER_ID', // Replace with actual user ID
                location: { latitude, longitude }
            })
        })
        .then(res => res.json())
        .then(data => {
            // Optionally show a notification or handle response
            console.log('Location sent:', data);
        })
        .catch(err => {
            setError('Failed to send location to server.');
        });
    };

    const handleLocationError = (error) => {
        setError(error.message);
    };

    const toggleLocationSharing = () => {
        if (sharing) {
            setSharing(false);
            setLocation(null);
        } else {
            setSharing(true);
            navigator.geolocation.getCurrentPosition(handleLocationSuccess, handleLocationError);
        }
    };

    useEffect(() => {
        if (sharing) {
            const watchId = navigator.geolocation.watchPosition(handleLocationSuccess, handleLocationError);
            return () => navigator.geolocation.clearWatch(watchId);
        }
    }, [sharing]);

    return (
        <div>
            <button className="button" onClick={toggleLocationSharing} style={{ marginBottom: 12 }}>
                {sharing ? 'Stop Sharing Location' : 'Share Location'}
            </button>
            {location && (
                <div style={{ marginTop: 8 }}>
                    <div>
                        <strong>Latitude:</strong> {location.latitude}
                    </div>
                    <div>
                        <strong>Longitude:</strong> {location.longitude}
                    </div>
                    <a
                        href={`https://www.google.com/maps?q=${location.latitude},${location.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button"
                        style={{ marginTop: 8, display: 'inline-block' }}
                    >
                        View on Map
                    </a>
                </div>
            )}
            {error && sharing && (
                <p style={{ color: '#b1001a' }}>Error: {error}</p>
            )}
        </div>
    );
};

export default LocationSharing;