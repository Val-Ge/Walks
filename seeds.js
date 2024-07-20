// seed.js
const mongoose = require('mongoose');
const Walk = require('./models/Walk');
// const walks = require('./seeds'); // Assuming your walk data is in seeds.js

mongoose.connect('mongodb://localhost:27017/walksdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('MongoDB connected');

  // Clear the collection
  await Walk.deleteMany({});

  // Insert the walks data
  await Walk.insertMany(walks);

  console.log('Seed data inserted');
  mongoose.connection.close();
})
.catch(err => console.error('Error:', err));

const walks = [
    // Bedfordshire Walks
    {
      title: "Dunstable Downs Walk",
      distance: "5 miles",
      difficulty: "Moderate",
      location: "Bedfordshire, UK",
      image: "https://example.com/images/dunstable_downs.jpg"
    },
    {
      title: "Warden Hill Circular",
      distance: "3.5 miles",
      difficulty: "Easy",
      location: "Bedfordshire, UK",
      image: "https://example.com/images/warden_hill.jpg"
    },
    {
      title: "Bedford River Walk",
      distance: "7 miles",
      difficulty: "Hard",
      location: "Bedfordshire, UK",
      image: "https://example.com/images/bedford_river.jpg"
    },
    
    // Cambridgeshire Walks
    {
      title: "Grantchester Meadows Walk",
      distance: "4 miles",
      difficulty: "Easy",
      location: "Cambridgeshire, UK",
      image: "https://example.com/images/grantchester_meadows.jpg"
    },
    {
      title: "Wimpole Estate Walk",
      distance: "6 miles",
      difficulty: "Moderate",
      location: "Cambridgeshire, UK",
      image: "https://example.com/images/wimpole_estate.jpg"
    },
    {
      title: "Gog Magog Hills Walk",
      distance: "8 miles",
      difficulty: "Hard",
      location: "Cambridgeshire, UK",
      image: "https://example.com/images/gog_magog_hills.jpg"
    },
    
    // Northamptonshire Walks
    {
      title: "Sywell Country Park Walk",
      distance: "3 miles",
      difficulty: "Easy",
      location: "Northamptonshire, UK",
      image: "https://example.com/images/sywell_country_park.jpg"
    },
    {
      title: "Barnwell Country Park Walk",
      distance: "5 miles",
      difficulty: "Moderate",
      location: "Northamptonshire, UK",
      image: "https://example.com/images/barnwell_country_park.jpg"
    },
    {
      title: "Stanwick Lakes Walk",
      distance: "7.5 miles",
      difficulty: "Hard",
      location: "Northamptonshire, UK",
      image: "https://example.com/images/stanwick_lakes.jpg"
    }
  ];
  
  module.exports = walks;
  