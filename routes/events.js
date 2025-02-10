const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get events by category
router.get('/category/:category', async (req, res) => {
  try {
    const events = await Event.find({ 
      category: req.params.category === 'All Events' ? /./ : req.params.category 
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search events
router.get('/search', async (req, res) => {
  try {
    const searchQuery = new RegExp(req.query.q, 'i');
    const events = await Event.find({
      $or: [
        { title: searchQuery },
        { 'location.city': searchQuery },
        { 'location.venue': searchQuery }
      ]
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 