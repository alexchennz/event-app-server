require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const Event = require('./models/Event');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:` +
            `${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER_URL}/` +
            `?retryWrites=true&w=majority&appName=${process.env.DB_APP_NAME}`;

// Connect to MongoDB - removed deprecated options
mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
// app.use('/api/events', require('./routes/events'));

// Serve static files
app.use('/images', express.static(path.join(__dirname, 'seeds/images')));

// Update the GET endpoint to handle search and sort by upcoming dates
app.get('/api/events', async (req, res) => {
  
  try {
    const { limit, featured, search, ids, location, date, category } = req.query;
    
    if (ids) {
      // Convert comma-separated string to array of ObjectIds
      const eventIds = ids.split(',');
      const events = await Event.find({ _id: { $in: eventIds } });
      return res.json(events);
    }
    
    // Base query to get only upcoming events
    let query = {
      date: { $gte: new Date() }  // Only get events from today onwards
    };

    // Apply location filter
    if (location) {
      query['location.city'] = location;
    }

    // Apply category filter
    if (category) {
      query.category = category;
    }

    // Apply date filter
    if (date) {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      switch (date) {
        case 'Today':
          query.date = {
            $gte: new Date(today.setHours(0, 0, 0, 0)),
            $lt: new Date(today.setHours(23, 59, 59, 999))
          };
          break;
        case 'Tomorrow':
          query.date = {
            $gte: new Date(tomorrow.setHours(0, 0, 0, 0)),
            $lt: new Date(tomorrow.setHours(23, 59, 59, 999))
          };
          break;
        case 'This Weekend':
          const nextSaturday = new Date(today);
          nextSaturday.setDate(today.getDate() + (6 - today.getDay()));
          const nextSunday = new Date(nextSaturday);
          nextSunday.setDate(nextSaturday.getDate() + 1);
          
          query.date = {
            $gte: new Date(nextSaturday.setHours(0, 0, 0, 0)),
            $lt: new Date(nextSunday.setHours(23, 59, 59, 999))
          };
          break;
      }
    }
    
    // Apply search if provided
    if (search) {
      query = {
        ...query,
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { category: { $regex: search, $options: 'i' } },
          { 'location.city': { $regex: search, $options: 'i' } },
          { 'location.venue': { $regex: search, $options: 'i' } }
        ]
      };
    }

    // Apply featured filter if provided
    if (featured) {
      query.featured = featured === 'true';
    }
    
    // Create the Mongoose query
    let mongooseQuery = Event.find(query);
    
    // Always sort by date ascending (closest dates first)
    mongooseQuery = mongooseQuery.sort('date');
    
    // Apply limit if provided
    if (limit) {
      mongooseQuery = mongooseQuery.limit(parseInt(limit));
    }
    
    const events = await mongooseQuery.exec();
    res.json(events);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 