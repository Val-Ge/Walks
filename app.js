const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Walk = require('./models/Walk');


const port = 3000;

const app = express();

mongoose.connect('mongodb://localhost:27017/walksdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));


app.set('view engine', 'ejs');

//middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded( { extended: true}))



app.get('/', (req, res) => {
    res.render('index');
});

app.get('/walks', (req, res) => {
    res.render('walks');
  });

app.get('/topwalks', async (req, res) => {
    try {
        const walks = await Walk.find({});
        console.log('Fetched walks:', walks); // Log the fetched data
        if (walks.length === 0) {
            console.log('No data found in the walks collection.');
        }
        res.render('topwalks', { title: 'Top Walks', walks });
    } catch (err) {
        console.error('Error fetching walks:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/tips', (req, res) => {
    res.render('tips');
});

  
// // In your Express route handler
// app.get('/topwalks', (req, res) => {
//     const walks = [
//         { title: 'Mountain Trail', image: '/images/mountain.jpg', distance: '5 miles', difficulty: 'Moderate', location: 'Mountain Park' },
//         { title: 'Beach Walk', image: '/images/beach.jpg', distance: '3 miles', difficulty: 'Easy', location: 'Sunny Beach' }
        
//     ];
//     res.render('topwalks', { walks });
// });


app.listen(port, () => {
    console.log(`server is listening on port http://localhost:${port}`);
});