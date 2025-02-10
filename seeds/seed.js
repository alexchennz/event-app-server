const mongoose = require('mongoose');
const Event = require('./models/Event');

// Connect to MongoDB - removed deprecated options
mongoose.connect("mongodb+srv://newzealandbuy:bI4Nsm9kQGuNVHEo@eventappdb.vxkgr.mongodb.net/?retryWrites=true&w=majority&appName=eventappdb")
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