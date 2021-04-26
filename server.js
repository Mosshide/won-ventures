// Dependencies 
const express = require('express')
const app = express(); 
const mongoose = require('mongoose');
const methodOverride = require('method-override');

// Dependency - ejs files 
app.set('view engine', 'ejs');

// Dependency - Models
const models = require('./models')
// Dependency - Controllers
const controllers = require('./controllers')

// connect mongoose -> !TODO replace with cluster 
mongoose.connect('mongodb://localhost:27017/wonVentures', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Connection successful")
    })
    .catch(err => {
        console.log('failure')
        console.log(err)
    })


// utilize dependencies 
app.use(express.urlencoded ({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static('public'));



// ROOT route 
app.get('/', (req,res) => {
    res.render('/user/login')
})

// // Index Route
// app.get('/user', (req,res) => {
//     res.render('/user/index')
// })

// Create 

// Read 

// Update

// Delete



app.listen(3000, (req,res) => {
    console.log("Is this thing on?")
});