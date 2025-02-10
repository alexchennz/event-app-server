const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    city: String,
    enum: ['Auckland', 'Wellington', 'Christchurch'],
    venue: String,
  },
  category: {
    type: String,
    enum: ['Music', 'Sports', 'Arts', 'Food & Wine', 'Comedy', 'Theatre'],
    required: true,
  },
  price: {
    from: Number,
    to: Number,
  },
  image: String,
  featured: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    required: true
  },
  ticketsRemaining: {
    type: Number,
    required: true,
    min: 0
  },
  ticketUrl: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Event', eventSchema); 