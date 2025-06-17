import React, { useState } from 'react';
import { Container, Card, Form, Button, ListGroup, Alert, Modal } from 'react-bootstrap';

export default function EmergencyContacts() {
  const [contacts, setContacts] = useState([
    { id: 1, name: "Emergency Services", number: "911", type: "Emergency" },
    { id: 2, name: "Poison Control", number: "1-800-222-1222", type: "Emergency" },
    { id: 3, name: "Local Hospital", number: "555-0123", type: "Medical" }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', number: '', type: 'Medical' });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleAddContact = () => {
    if (!newContact.name || !newContact.number) {
      setAlertMessage('Please fill in all fields');
      setShowAlert(true);
      return;
    }

    const newId = Math.max(...contacts.map(c => c.id)) + 1;
    setContacts([...contacts, { ...newContact, id: newId }]);
    setNewContact({ name: '', number: '', type: 'Medical' });
    setShowAddModal(false);
    setAlertMessage('Contact added successfully');
    setShowAlert(true);
  };

  const handleDeleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
    setAlertMessage('Contact deleted successfully');
    setShowAlert(true);
  };

  const handleCall = (number) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Emergency Contacts</h2>

      {showAlert && (
        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
          {alertMessage}
        </Alert>
      )}

      <Card className="mb-4">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>Your Emergency Contacts</h4>
            <Button variant="primary" onClick={() => setShowAddModal(true)}>
              Add New Contact
            </Button>
          </div>

          <ListGroup>
            {contacts.map(contact => (
              <ListGroup.Item key={contact.id} className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-1">{contact.name}</h5>
                  <p className="mb-1 text-muted">{contact.number}</p>
                  <span className="badge bg-info">{contact.type}</span>
                </div>
                <div>
                  <Button 
                    variant="success" 
                    className="me-2"
                    onClick={() => handleCall(contact.number)}
                  >
                    Call
                  </Button>
                  <Button 
                    variant="danger"
                    onClick={() => handleDeleteContact(contact.id)}
                  >
                    Delete
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <h5>Important Emergency Numbers</h5>
          <ListGroup>
            <ListGroup.Item>
              <strong>Emergency Services:</strong> 911
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Poison Control:</strong> 1-800-222-1222
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Suicide Prevention Lifeline:</strong> 988
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Emergency Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Contact Name</Form.Label>
              <Form.Control
                type="text"
                value={newContact.name}
                onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                placeholder="Enter contact name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                value={newContact.number}
                onChange={(e) => setNewContact({...newContact, number: e.target.value})}
                placeholder="Enter phone number"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact Type</Form.Label>
              <Form.Select
                value={newContact.type}
                onChange={(e) => setNewContact({...newContact, type: e.target.value})}
              >
                <option value="Medical">Medical</option>
                <option value="Emergency">Emergency</option>
                <option value="Family">Family</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddContact}>
            Add Contact
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
} 