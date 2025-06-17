import React, { useState } from 'react';
import { Container, Card, ListGroup, Form, Button, Alert } from 'react-bootstrap';

const firstAidItems = [
  {
    category: "Basic Supplies",
    items: [
      "Adhesive bandages (various sizes)",
      "Sterile gauze pads",
      "Medical tape",
      "Antiseptic wipes",
      "Antibiotic ointment",
      "Pain relievers (acetaminophen, ibuprofen)",
      "Scissors",
      "Tweezers",
      "Disposable gloves"
    ]
  },
  {
    category: "Emergency Items",
    items: [
      "Emergency blanket",
      "Instant cold packs",
      "CPR face shield",
      "First aid manual",
      "Emergency contact numbers",
      "Flashlight with extra batteries"
    ]
  },
  {
    category: "Additional Items",
    items: [
      "Elastic bandages",
      "Splint",
      "Eye wash solution",
      "Burn gel",
      "Hydrocortisone cream",
      "Antihistamine"
    ]
  }
];

export default function FirstAidKit() {
  const [checkedItems, setCheckedItems] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const handleCheck = (item) => {
    setCheckedItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const handleSave = () => {
    // Here you would typically save to a backend
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const getProgress = () => {
    const totalItems = firstAidItems.reduce((acc, category) => acc + category.items.length, 0);
    const checkedCount = Object.values(checkedItems).filter(Boolean).length;
    return Math.round((checkedCount / totalItems) * 100);
  };

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">First Aid Kit Checklist</h2>
      
      {showAlert && (
        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
          Your checklist has been saved!
        </Alert>
      )}

      <Card className="mb-4">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">Progress: {getProgress()}%</h5>
            <Button variant="primary" onClick={handleSave}>
              Save Checklist
            </Button>
          </div>
          <div className="progress">
            <div 
              className="progress-bar" 
              role="progressbar" 
              style={{ width: `${getProgress()}%` }}
              aria-valuenow={getProgress()} 
              aria-valuemin="0" 
              aria-valuemax="100"
            />
          </div>
        </Card.Body>
      </Card>

      {firstAidItems.map((category, categoryIndex) => (
        <Card key={categoryIndex} className="mb-4">
          <Card.Header>
            <h4 className="mb-0">{category.category}</h4>
          </Card.Header>
          <ListGroup variant="flush">
            {category.items.map((item, itemIndex) => (
              <ListGroup.Item key={itemIndex}>
                <Form.Check
                  type="checkbox"
                  id={`item-${categoryIndex}-${itemIndex}`}
                  label={item}
                  checked={checkedItems[item] || false}
                  onChange={() => handleCheck(item)}
                />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      ))}

      <Card className="mt-4">
        <Card.Body>
          <h5>Tips for Maintaining Your First Aid Kit</h5>
          <ul>
            <li>Check your kit every 6 months</li>
            <li>Replace expired items immediately</li>
            <li>Keep your kit in a cool, dry place</li>
            <li>Make sure everyone in your household knows where the kit is located</li>
          </ul>
        </Card.Body>
      </Card>
    </Container>
  );
} 