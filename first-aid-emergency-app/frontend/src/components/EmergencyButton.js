import React from 'react';

const EmergencyButton = () => {
    const handleEmergency = () => {
        // Logic to share location and notify emergency contacts
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            // Send latitude and longitude to backend or emergency contacts
            console.log("Emergency! Location:", latitude, longitude);
            // Here you would typically make an API call to notify contacts
        }, (error) => {
            console.error("Error getting location:", error);
        });
    };

    return (
        <button onClick={handleEmergency} style={styles.button}>
            SOS Emergency
        </button>
    );
};

const styles = {
    button: {
        backgroundColor: 'red',
        color: 'white',
        padding: '15px 30px',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
    },
};

export default EmergencyButton;