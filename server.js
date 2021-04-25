// Dependencies 
const express = require('express')
const app = express(); 
const methodOverride = require('method-override');

// Dependency - ejs files 
app.set('view engine', 'ejs');

// Dependency - Models
const models = require('./models')
// Dependency - Controllers
const controllers = require('./controllers')


// utilize dependencies 
app.use(express.urlencoded ({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static('public'));


// Index route 
app.get('/', (req,res) => {
    res.render('index')
})

app.listen(3000, (req,res) => {
    console.log("Is this thing on?")
});