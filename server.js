const express = require('express')
const app = express(); 
const path = require('path'); 
const bcrypt = require('bcrypt'); 

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/wonVentures', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => { 
        console.log("Mongo connection open!")
    })
    .catch(err => {
        console.log("Error!")
        console.log(err)
    })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');




// Index Route  ->  view portfolio/watchlist 
app.get('/user', (req,res) => {
    res.render('/user/show');  //user = db info on user based on ID 
});

// new route -> new user 
app.get('/user/new', (req,res) => {
    res.render('user/register')
})



app.listen(3000, (req,res) => {
    console.log("Is this thing on?")
});

// new route 
// show route 
// update route 
// override 
// delete route 



// login 
// register 
// show 
