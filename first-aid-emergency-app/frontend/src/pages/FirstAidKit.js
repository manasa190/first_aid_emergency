import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  LocalPharmacy as PharmacyIcon,
} from '@mui/icons-material';

const defaultItems = [
  {
    id: 1,
    name: 'Bandages',
    quantity: 10,
    expiryDate: '2024-12-31',
    category: 'Wound Care',
  },
  {
    id: 2,
    name: 'Antiseptic Wipes',
    quantity: 20,
    expiryDate: '2024-10-31',
    category: 'Wound Care',
  },
  {
    id: 3,
    name: 'Pain Relievers',
    quantity: 30,
    expiryDate: '2024-09-30',
    category: 'Medications',
  },
  {
    id: 4,
    name: 'First Aid Manual',
    quantity: 1,
    expiryDate: null,
    category: 'Documentation',
  },
];

const FirstAidKit = () => {
  const [items, setItems] = useState(defaultItems);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    expiryDate: '',
    category: '',
  });

  const handleOpenDialog = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        quantity: item.quantity,
        expiryDate: item.expiryDate || '',
        category: item.category,
      });
    } else {
      setEditingItem(null);
      setFormData({
        name: '',
        quantity: '',
        expiryDate: '',
        category: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingItem(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveItem = () => {
    if (editingItem) {
      setItems(
        items.map((item) =>
          item.id === editingItem.id
            ? { ...item, ...formData, quantity: parseInt(formData.quantity) }
            : item
        )
      );
    } else {
      setItems([
        ...items,
        {
          id: Date.now(),
          ...formData,
          quantity: parseInt(formData.quantity),
        },
      ]);
    }
    handleCloseDialog();
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const categories = [...new Set(items.map((item) => item.category))];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 6 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          First Aid Kit Inventory
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Manage your first aid supplies and track their quantities
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {categories.map((category) => (
          <Grid item xs={12} md={6} key={category}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                {category}
              </Typography>
              <List>
                {items
                  .filter((item) => item.category === category)
                  .map((item) => (
                    <ListItem
                      key={item.id}
                      sx={{
                        mb: 1,
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 1,
                      }}
                    >
                      <ListItemText
                        primary={item.name}
                        secondary={
                          <>
                            <Typography variant="body2" component="span">
                              Quantity: {item.quantity}
                            </Typography>
                            {item.expiryDate && (
                              <Typography variant="body2" component="span" sx={{ ml: 2 }}>
                                Expires: {item.expiryDate}
                              </Typography>
                            )}
                          </>
                        }
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="edit"
                          onClick={() => handleOpenDialog(item)}
                          sx={{ mr: 1 }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleDeleteItem(item.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
              </List>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add New Item
        </Button>
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {editingItem ? 'Edit Item' : 'Add New Item'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              name="name"
              label="Item Name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              name="quantity"
              label="Quantity"
              type="number"
              value={formData.quantity}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              name="expiryDate"
              label="Expiry Date"
              type="date"
              value={formData.expiryDate}
              onChange={handleInputChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              name="category"
              label="Category"
              value={formData.category}
              onChange={handleInputChange}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveItem} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default FirstAidKit; 