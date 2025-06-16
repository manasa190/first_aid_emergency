import React, { useState } from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Paper,
  Box,
  Divider,
} from '@mui/material';
import {
  Phone,
  Email,
  Delete,
  Edit,
  Add,
  Person,
  LocalHospital,
  WarningAmber,
} from '@mui/icons-material';

const EmergencyContacts = () => {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: 'Dr. John Smith',
      type: 'doctor',
      phone: '+1 234-567-8901',
      email: 'john.smith@hospital.com',
    },
    {
      id: 2,
      name: 'City General Hospital',
      type: 'hospital',
      phone: '+1 234-567-8902',
      email: 'emergency@cityhospital.com',
    },
    {
      id: 3,
      name: 'Emergency Services',
      type: 'emergency',
      phone: '911',
      email: 'emergency@city.gov',
    },
  ]);

  const [open, setOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'doctor',
    phone: '',
    email: '',
  });

  const handleOpen = (contact = null) => {
    if (contact) {
      setEditingContact(contact);
      setFormData(contact);
    } else {
      setEditingContact(null);
      setFormData({
        name: '',
        type: 'doctor',
        phone: '',
        email: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingContact(null);
  };

  const handleSubmit = () => {
    if (editingContact) {
      setContacts(contacts.map(contact =>
        contact.id === editingContact.id ? { ...formData, id: contact.id } : contact
      ));
    } else {
      setContacts([...contacts, { ...formData, id: Date.now() }]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'doctor':
        return <Person />;
      case 'hospital':
        return <LocalHospital />;
      case 'emergency':
        return <WarningAmber />;
      default:
        return <Person />;
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 'var(--border-radius)' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 700 }}>
            Emergency Contacts
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpen()}
            className="button"
          >
            Add Contact
          </Button>
        </Box>

        <List>
          {contacts.map((contact) => (
            <React.Fragment key={contact.id}>
              <ListItem
                className="hospital-item"
                sx={{
                  mb: 2,
                  borderRadius: 'var(--border-radius)',
                  '&:hover': {
                    backgroundColor: 'rgba(229, 57, 53, 0.04)',
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'primary.main' }}>
                  {getIcon(contact.type)}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                        {contact.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                        {contact.phone}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {contact.email}
                      </Typography>
                    </Box>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => handleOpen(contact)}
                    sx={{ mr: 1 }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDelete(contact.id)}
                  >
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              {contact.id < contacts.length && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: 'primary.main' }}>
          {editingContact ? 'Edit Contact' : 'Add New Contact'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className="button">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" className="button">
            {editingContact ? 'Save Changes' : 'Add Contact'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default EmergencyContacts; 