import React, { useState, useRef, useEffect } from 'react';
import { Container, Card, Form, Button, ListGroup, Badge, Alert, Modal } from 'react-bootstrap';

const emergencyResponses = {
  "heart attack": {
    response: "Call 911 immediately. Have the person sit down and rest. Loosen any tight clothing. If they have prescribed nitroglycerin, help them take it.",
    severity: "high",
    symptoms: ["Chest pain", "Shortness of breath", "Nausea", "Lightheadedness"],
    steps: [
      "Call 911 immediately",
      "Have the person sit down and rest",
      "Loosen any tight clothing",
      "If they have prescribed nitroglycerin, help them take it",
      "Monitor their breathing and consciousness",
      "Be prepared to perform CPR if they become unconscious"
    ],
    keywords: ["chest pain", "heart", "attack", "pressure", "squeezing"]
  },
  "choking": {
    response: "If the person can cough or speak, encourage them to cough. If they cannot breathe, perform the Heimlich maneuver. Call 911 if the person becomes unconscious.",
    severity: "high",
    symptoms: ["Cannot breathe", "Cannot speak", "Clutching throat", "Panic"],
    steps: [
      "Ask 'Are you choking?'",
      "If they can speak or cough, encourage them to cough",
      "If they cannot breathe, perform the Heimlich maneuver",
      "Call 911 if the person becomes unconscious",
      "Begin CPR if they lose consciousness"
    ],
    keywords: ["choking", "can't breathe", "throat", "food", "stuck"]
  },
  "seizure": {
    response: "Clear the area of dangerous objects. Place something soft under their head. Do not restrain them. Time the seizure. Call 911 if it lasts more than 5 minutes.",
    severity: "medium",
    symptoms: ["Uncontrollable shaking", "Loss of consciousness", "Stiffening of body"],
    steps: [
      "Clear the area of dangerous objects",
      "Place something soft under their head",
      "Do not restrain them",
      "Time the seizure",
      "Call 911 if it lasts more than 5 minutes",
      "Stay with them until they are fully conscious"
    ],
    keywords: ["seizure", "convulsion", "shaking", "unconscious", "fit"]
  },
  "burn": {
    response: "Cool the burn under running water for 10-20 minutes. Do not use ice. Cover with sterile dressing. Seek medical help for severe burns.",
    severity: "medium",
    symptoms: ["Redness", "Pain", "Blisters", "White or charred skin"],
    steps: [
      "Cool the burn under running water for 10-20 minutes",
      "Do not use ice",
      "Remove any jewelry near the burn",
      "Cover with sterile dressing",
      "Do not pop any blisters",
      "Seek medical help for severe burns"
    ],
    keywords: ["burn", "hot", "fire", "scald", "blister"]
  },
  "bleeding": {
    response: "Apply direct pressure to the wound with a clean cloth. Elevate the injured area if possible. Call 911 for severe bleeding.",
    severity: "high",
    symptoms: ["Visible blood", "Deep wound", "Severe pain"],
    steps: [
      "Apply direct pressure to the wound with a clean cloth",
      "Elevate the injured area if possible",
      "Apply a bandage if available",
      "Call 911 for severe bleeding",
      "Monitor for signs of shock",
      "Keep the person warm and comfortable"
    ],
    keywords: ["bleeding", "blood", "cut", "wound", "injury"]
  },
  "allergic reaction": {
    response: "If they have an EpiPen, help them use it. Call 911 immediately. Monitor breathing and be prepared to perform CPR if needed.",
    severity: "high",
    symptoms: ["Difficulty breathing", "Swelling", "Hives", "Dizziness"],
    steps: [
      "Check if they have an EpiPen",
      "Help them use the EpiPen if available",
      "Call 911 immediately",
      "Monitor their breathing",
      "Be prepared to perform CPR if needed",
      "Keep them in a comfortable position"
    ],
    keywords: ["allergic", "allergy", "swelling", "hives", "epipen"]
  },
  "stroke": {
    response: "Call 911 immediately. Remember FAST: Face drooping, Arm weakness, Speech difficulties, Time to call emergency services.",
    severity: "high",
    symptoms: ["Face drooping", "Arm weakness", "Speech problems", "Sudden confusion"],
    steps: [
      "Call 911 immediately",
      "Check for FAST symptoms",
      "Note the time symptoms started",
      "Keep the person comfortable",
      "Monitor their breathing",
      "Do not give them anything to eat or drink"
    ],
    keywords: ["stroke", "face", "drooping", "speech", "weakness"]
  },
  "default": {
    response: "I'm here to help. Please describe your emergency situation in detail, and I'll provide appropriate guidance. If this is a life-threatening emergency, call 911 immediately.",
    severity: "low",
    symptoms: [],
    steps: [],
    keywords: []
  }
};

const emergencyCategories = [
  { name: "Medical", icon: "🏥", keywords: ["heart", "stroke", "seizure", "diabetes"] },
  { name: "Trauma", icon: "🩹", keywords: ["bleeding", "burn", "broken", "cut"] },
  { name: "Environmental", icon: "🌡️", keywords: ["heat", "cold", "dehydration", "hypothermia"] },
  { name: "Poisoning", icon: "⚠️", keywords: ["poison", "chemical", "overdose", "ingestion"] }
];

export default function ChatAssistance() {
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hello! I\'m your emergency assistance chatbot. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showEmergencyAlert, setShowEmergencyAlert] = useState(false);
  const [showStepsModal, setShowStepsModal] = useState(false);
  const [currentSteps, setCurrentSteps] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findBestMatch = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    let bestMatch = null;
    let highestMatchCount = 0;

    for (const [key, data] of Object.entries(emergencyResponses)) {
      if (key === "default") continue;

      const matchCount = data.keywords.filter(keyword => 
        lowerInput.includes(keyword.toLowerCase())
      ).length;

      if (matchCount > highestMatchCount) {
        highestMatchCount = matchCount;
        bestMatch = key;
      }
    }

    return highestMatchCount > 0 ? bestMatch : "default";
  };

  const getBotResponse = (userInput) => {
    const matchedEmergency = findBestMatch(userInput);
    const data = emergencyResponses[matchedEmergency];

    if (data.severity === "high") {
      setShowEmergencyAlert(true);
    }
    if (data.steps && data.steps.length > 0) {
      setCurrentSteps(data.steps);
      setShowStepsModal(true);
    }

    return {
      text: data.response,
      symptoms: data.symptoms,
      severity: data.severity
    };
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { type: 'user', text: input }]);

    // Get and add bot response
    const botResponse = getBotResponse(input);
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: botResponse.text,
        symptoms: botResponse.symptoms,
        severity: botResponse.severity
      }]);
    }, 500);

    setInput('');
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setMessages(prev => [...prev, { 
      type: 'bot', 
      text: `You've selected the ${category.name} category. Common issues include: ${category.keywords.join(', ')}. Please describe your emergency situation.`,
      severity: "low"
    }]);
  };

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Emergency Chat Assistance</h2>
      
      {showEmergencyAlert && (
        <Alert variant="danger" className="mb-4" onClose={() => setShowEmergencyAlert(false)} dismissible>
          <Alert.Heading>⚠️ Emergency Alert!</Alert.Heading>
          <p>
            This appears to be a serious emergency. Please call 911 immediately if you haven't already.
          </p>
          <div className="d-flex justify-content-end">
            <Button 
              variant="danger" 
              onClick={() => window.location.href = 'tel:911'}
              className="me-2"
            >
              Call 911
            </Button>
          </div>
        </Alert>
      )}

      <Card className="mb-4">
        <Card.Body>
          <div className="d-flex justify-content-between mb-3">
            {emergencyCategories.map((category) => (
              <Button
                key={category.name}
                variant={selectedCategory === category ? "primary" : "outline-primary"}
                onClick={() => handleCategorySelect(category)}
                className="me-2"
              >
                {category.icon} {category.name}
              </Button>
            ))}
          </div>
          <div className="chat-container" style={{ height: '400px', overflowY: 'auto' }}>
            <ListGroup>
              {messages.map((message, index) => (
                <ListGroup.Item
                  key={index}
                  className={`d-flex ${message.type === 'user' ? 'justify-content-end' : 'justify-content-start'}`}
                >
                  <div
                    className={`message ${message.type === 'user' ? 'user-message' : 'bot-message'}`}
                    style={{
                      maxWidth: '70%',
                      padding: '10px 15px',
                      borderRadius: '15px',
                      backgroundColor: message.type === 'user' ? '#007bff' : '#f8f9fa',
                      color: message.type === 'user' ? 'white' : 'black'
                    }}
                  >
                    {message.text}
                    {message.symptoms && message.symptoms.length > 0 && (
                      <div className="mt-2">
                        <small>Common symptoms:</small>
                        <div>
                          {message.symptoms.map((symptom, i) => (
                            <Badge key={i} bg="info" className="me-1">
                              {symptom}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </ListGroup.Item>
              ))}
              <div ref={messagesEndRef} />
            </ListGroup>
          </div>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Form onSubmit={handleSend}>
            <Form.Group className="d-flex">
              <Form.Control
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your emergency situation..."
                className="me-2"
              />
              <Button type="submit" variant="primary">
                Send
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>

      <Card className="mt-4">
        <Card.Body>
          <h5>Quick Emergency Tips</h5>
          <ul>
            <li>Always call 911 for life-threatening emergencies</li>
            <li>Stay calm and provide clear information</li>
            <li>Follow the dispatcher's instructions</li>
            <li>Keep important medical information readily available</li>
            <li>Know your location and be ready to provide it to emergency services</li>
          </ul>
        </Card.Body>
      </Card>

      <Modal show={showStepsModal} onHide={() => setShowStepsModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Emergency Steps</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {currentSteps.map((step, index) => (
              <ListGroup.Item key={index}>
                <div className="d-flex align-items-center">
                  <Badge bg="primary" className="me-3">{index + 1}</Badge>
                  {step}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowStepsModal(false)}>
            Close
          </Button>
          <Button 
            variant="danger" 
            onClick={() => window.location.href = 'tel:911'}
          >
            Call 911
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
} 