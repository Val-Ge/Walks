import mongoose from 'mongoose';
import Walk from './models/Walk.js'; // Adjust the path to your model

mongoose.connect('mongodb://localhost:27017/walksdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const walks = [
  {
    title: "Dunstable Downs Walk",
    distance: "5 miles",
    difficulty: "Moderate",
    location: "Bedfordshire, UK",
    image: "uploads/dunst_downs.jpg",
    coordinates: [51.8731, -0.5446] // Example coordinates
  },
  {
    title: "Warden Hill Circular",
    distance: "3.5 miles",
    difficulty: "Easy",
    location: "Bedfordshire, UK",
    image: "uploads/warden_hill.jpg",
    coordinates: [51.9076, -0.4301] // Example coordinates
  },
  {
    title: "Bedford River Walk",
    distance: "7 miles",
    difficulty: "Hard",
    location: "Bedfordshire, UK",
    image: "uploads/bedford_river.jpg",
    coordinates: [52.1357, -0.4677] // Example coordinates
  },
  {
    title: "Grantchester Meadows Walk",
    distance: "4 miles",
    difficulty: "Easy",
    location: "Cambridgeshire, UK",
    image: "uploads/grantchester_meadows.jpg",
    coordinates: [52.1796, 0.1026] // Example coordinates
  },
  {
    title: "Wimpole Estate Walk",
    distance: "6 miles",
    difficulty: "Moderate",
    location: "Cambridgeshire, UK",
    image: "uploads/wimpole_estate.jpg",
    coordinates: [52.1423, -0.0518] // Example coordinates
  },
  {
    title: "Gog Magog Hills Walk",
    distance: "8 miles",
    difficulty: "Hard",
    location: "Cambridgeshire, UK",
    image: "uploads/gog_magog_hills.jpg",
    coordinates: [52.1626, 0.1552] // Example coordinates
  },
  {
    title: "Sywell Country Park Walk",
    distance: "3 miles",
    difficulty: "Easy",
    location: "Northamptonshire, UK",
    image: "uploads/sywell_country_park.jpg",
    coordinates: [52.2884, -0.7851] // Example coordinates
  },
  {
    title: "Barnwell Country Park Walk",
    distance: "5 miles",
    difficulty: "Moderate",
    location: "Northamptonshire, UK",
    image: "uploads/barnwell_country_park.jpg",
    coordinates: [52.4691, -0.4648] // Example coordinates
  },
  {
    title: "Stanwick Lakes Walk",
    distance: "7.5 miles",
    difficulty: "Hard",
    location: "Northamptonshire, UK",
    image: "uploads/stanwick_lakes.jpg",
    coordinates: [52.3237, -0.5665] // Example coordinates
  }
];

Walk.insertMany(walks)
  .then(() => {
    console.log('Database seeded with walks');
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error('Error seeding database:', error);
  });
