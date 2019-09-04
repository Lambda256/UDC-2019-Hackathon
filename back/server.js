// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Template File Location
app.set('/', __dirname + '/views');

// Middleware
app.use(express.static(__dirname + '/public'));
app.use(express.static('views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// Router
const router = require('./router/router');
app.use(router);

app.get('/', (req, res) => {
    res.redirect('/index.html');
});

// Server initialize
app.listen(3000, function() {
    console.log("Run server");
});