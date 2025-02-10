const mongoose = require('mongoose');
const Event = require('../models/Event');

// Connect to MongoDB - removed deprecated options
const uri = `mongodb+srv://${process.env.DB_USER}:` +
            `${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER_URL}/` +
            `?retryWrites=true&w=majority&appName=${process.env.DB_APP_NAME}`;

// Connect to MongoDB - removed deprecated options
mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const seedEvents = async () => {
  try {
    // Clear existing events
    await Event.deleteMany({});
    
    // Insert new events
    await Event.insertMany(require('./eventSeeder'));
    
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedEvents(); 