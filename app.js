const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = 3000;

const app = express();

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