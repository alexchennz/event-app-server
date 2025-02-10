const mongoose = require('mongoose');
const Event = require('../models/Event');

const events = [
  {
    title: "Summer Music Festival 2025",
    date: new Date("2025-02-22"),
    location: {
      city: "Auckland",
      venue: "Auckland Domain"
    },
    category: "Music",
    price: {
      from: 9999,
      to: 150
    },
    image: "/images/summer-fest.jpg",
    featured: true,
    description: "Get ready for the biggest summer festival in New Zealand! Featuring top international and local artists, food stalls, and amazing experiences. Join thousands of music lovers for an unforgettable day of music and fun.",
    ticketsRemaining: 1245,
    ticketUrl: "https://www.ticketmaster.co.nz/"
  },
  {
    title: "Wine & Food Festival",
    date: new Date("2025-02-23"),
    location: {
      city: "Wellington",
      venue: "Wellington Waterfront"
    },
    category: "Food & Wine",
    price: {
      from: 89,
      to: 120
    },
    image: "/images/food-fest.jpg",
    featured: true,
    description: "Indulge in New Zealand's finest wines and culinary delights at Wellington's premier food and wine festival. Experience gourmet tastings, chef demonstrations, and live entertainment.",
    ticketsRemaining: 756,
    ticketUrl: "https://www.ticketmaster.co.nz/"
  },
  {
    title: "Rugby Championship",
    date: new Date("2025-02-24"),
    location: {
      city: "Christchurch",
      venue: "Orangetheory Stadium"
    },
    category: "Sports",
    price: {
      from: 120,
      to: 250
    },
    image: "/images/rugby.jpg",
    featured: false,
    description: "Watch the most anticipated rugby match of the season! Experience world-class rugby action as top teams battle it out for championship glory.",
    ticketsRemaining: 2890,
    ticketUrl: "https://www.ticketmaster.co.nz/"
  },
  {
    title: "Art Gallery Exhibition",
    date: new Date("2025-02-25"),
    location: {
      city: "Auckland",
      venue: "Auckland Art Gallery"
    },
    category: "Arts",
    price: {
      from: 25,
      to: 40
    },
    image: "/images/art-exhibition.jpg",
    featured: false,
    description: "Discover contemporary masterpieces at this exclusive art exhibition. Featuring works from renowned local and international artists, this exhibition promises to inspire and captivate.",
    ticketsRemaining: 450,
    ticketUrl: "https://www.ticketmaster.co.nz/"
  },
  {
    title: "Comedy Night Special",
    date: new Date("2025-02-26"),
    location: {
      city: "Wellington",
      venue: "The Opera House"
    },
    category: "Comedy",
    price: {
      from: 45,
      to: 85
    },
    image: "/images/comedy.jpg",
    featured: false,
    description: "Laugh your heart out with New Zealand's top comedians! An evening of non-stop entertainment featuring stand-up comedy, improv, and hilarious sketches.",
    ticketsRemaining: 328,
    ticketUrl: "https://www.ticketmaster.co.nz/"
  },
  {
    title: "Shakespeare in the Park",
    date: new Date("2025-02-27"),
    location: {
      city: "Auckland",
      venue: "Western Springs Park"
    },
    category: "Theatre",
    price: {
      from: 30,
      to: 60
    },
    image: "/images/theatre.jpg",
    featured: false,
    description: "Experience Shakespeare under the stars! This outdoor theatre production brings the Bard's timeless classic to life in the beautiful setting of Western Springs Park.",
    ticketsRemaining: 890,
    ticketUrl: "https://www.ticketmaster.co.nz/"
  },
  {
    title: "Jazz Night Under the Stars",
    date: new Date("2025-02-28"),
    location: {
      city: "Wellington",
      venue: "Botanic Gardens"
    },
    category: "Music",
    price: {
      from: 55,
      to: 85
    },
    image: "/images/jazz.jpg",
    featured: false,
    description: "Experience an enchanting evening of jazz music in the beautiful Wellington Botanic Gardens. Featuring top jazz musicians and a magical atmosphere under the stars.",
    ticketsRemaining: 420,
    ticketUrl: "https://www.ticketmaster.co.nz/"
  },
  {
    title: "Street Food Festival",
    date: new Date("2025-03-01"),
    location: {
      city: "Auckland",
      venue: "Queens Wharf"
    },
    category: "Food & Wine",
    price: {
      from: 25,
      to: 45
    },
    image: "/images/street-food.jpg",
    featured: false,
    description: "Discover the best street food Auckland has to offer! From local delicacies to international cuisine, enjoy a day of culinary exploration and live cooking demonstrations.",
    ticketsRemaining: 1500,
    ticketUrl: "https://www.ticketmaster.co.nz/"
  },
  {
    title: "Contemporary Dance Show",
    date: new Date("2025-03-02"),
    location: {
      city: "Christchurch",
      venue: "Isaac Theatre Royal"
    },
    category: "Arts",
    price: {
      from: 45,
      to: 95
    },
    image: "/images/dance.jpg",
    featured: false,
    description: "A mesmerizing performance that pushes the boundaries of contemporary dance. Experience innovative choreography and stunning visual effects.",
    ticketsRemaining: 380,
    ticketUrl: "https://www.ticketmaster.co.nz/"
  },
  {
    title: "Cricket Championship Final",
    date: new Date("2025-03-03"),
    location: {
      city: "Wellington",
      venue: "Basin Reserve"
    },
    category: "Sports",
    price: {
      from: 40,
      to: 120
    },
    image: "/images/cricket.jpg",
    featured: false,
    description: "Watch the thrilling conclusion to this year's cricket championship! Don't miss the excitement as top teams compete for the trophy.",
    ticketsRemaining: 2200,
    ticketUrl: "https://www.ticketmaster.co.nz/"
  },
  {
    title: "Stand-up Comedy Festival",
    date: new Date("2025-03-04"),
    location: {
      city: "Auckland",
      venue: "Civic Theatre"
    },
    category: "Comedy",
    price: {
      from: 60,
      to: 100
    },
    image: "/images/comedy-fest.jpg",
    featured: false,
    description: "Three nights of non-stop laughter featuring international and local comedy stars. The biggest comedy event of the year!",
    ticketsRemaining: 850,
    ticketUrl: "https://www.ticketmaster.co.nz/"
  },
  {
    title: "Opera Gala Night",
    date: new Date("2025-03-05"),
    location: {
      city: "Christchurch",
      venue: "Town Hall"
    },
    category: "Theatre",
    price: {
      from: 75,
      to: 180
    },
    image: "/images/opera.jpg",
    featured: false,
    description: "A spectacular evening of world-class opera performances featuring renowned singers and the Christchurch Symphony Orchestra.",
    ticketsRemaining: 600,
    ticketUrl: "https://www.ticketmaster.co.nz/"
  },
  {
    title: "Rock Music Festival",
    date: new Date("2025-03-06"),
    location: {
      city: "Auckland",
      venue: "Mt Smart Stadium"
    },
    category: "Music",
    price: {
      from: 120,
      to: 250
    },
    image: "/images/rock.jpg",
    featured: false,
    description: "A full day of rock music featuring international headliners and the best local bands. Multiple stages and food vendors throughout the venue.",
    ticketsRemaining: 5000,
    ticketUrl: "https://www.ticketmaster.co.nz/"
  },
  {
    title: "Wine & Cheese Festival",
    date: new Date("2025-03-07"),
    location: {
      city: "Wellington",
      venue: "TSB Arena"
    },
    category: "Food & Wine",
    price: {
      from: 65,
      to: 95
    },
    image: "/images/wine.jpg",
    featured: false,
    description: "Sample the finest wines from New Zealand's top vineyards paired with artisanal cheeses. Includes masterclasses and tasting sessions.",
    ticketsRemaining: 750,
    ticketUrl: "https://www.ticketmaster.co.nz/"
  },
  {
    title: "Basketball Championship",
    date: new Date("2025-03-08"),
    location: {
      city: "Christchurch",
      venue: "Horncastle Arena"
    },
    category: "Sports",
    price: {
      from: 35,
      to: 85
    },
    image: "/images/basketball.jpg",
    featured: false,
    description: "Watch the intense basketball championship finals! Experience the thrill as teams battle for the national title.",
    ticketsRemaining: 1800,
    ticketUrl: "https://www.ticketmaster.co.nz/"
  },
  {
    title: "Modern Art Exhibition",
    date: new Date("2025-03-09"),
    location: {
      city: "Wellington",
      venue: "City Gallery"
    },
    category: "Arts",
    price: {
      from: 20,
      to: 35
    },
    image: "/images/modern-art.jpg",
    featured: false,
    description: "Explore thought-provoking modern art installations from both established and emerging artists. Interactive exhibits and guided tours available.",
    ticketsRemaining: 300,
    ticketUrl: "https://www.ticketmaster.co.nz/"
  }
];

// Export the events array
module.exports = events;

// Update the server/index.js to serve static files 