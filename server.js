const express = require('express')
const app = express(); 
const methodOverride = require('method-override');

app.set('view engine', 'ejs');

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