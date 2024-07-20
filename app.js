const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = 3000;

const app = express();

mongoose.connect('mongodb://localhost:27017/walkdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/topwalks', (req, res) => {
    res.render('topwalks');
});


app.listen(port, () => {
    console.log(`server is listening on port http://localhost:${port}`);
});