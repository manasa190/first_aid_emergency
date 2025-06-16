import React from 'react';

const firstAidInstructions = [
    {
        category: 'Bleeding',
        instructions: [
            'Apply direct pressure to the wound.',
            'Elevate the injured area if possible.',
            'If bleeding does not stop, seek medical help.'
        ]
    },
    {
        category: 'Burns',
        instructions: [
            'Cool the burn under running water for at least 10 minutes.',
            'Cover the burn with a clean, non-stick dressing.',
            'Do not apply ice directly to the burn.'
        ]
    },
    {
        category: 'Choking',
        instructions: [
            'Encourage the person to cough if they can.',
            'If they cannot cough, perform the Heimlich maneuver.',
            'Call emergency services if the object does not dislodge.'
        ]
    }
];

const FirstAidInstructions = () => {
    return (
        <div>
            <h1>First Aid Instructions</h1>
            {firstAidInstructions.map((item, index) => (
                <div key={index}>
                    <h2>{item.category}</h2>
                    <ul>
                        {item.instructions.map((instruction, idx) => (
                            <li key={idx}>{instruction}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default FirstAidInstructions;