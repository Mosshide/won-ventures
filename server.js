const express = require('express')
const app = express(); 
const methodOverride = require('method-override');

const controllers = require("./controllers");

app.set('view engine', 'ejs');

app.use(express.urlencoded ({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static('public'));


// Index route 
app.get('/', (req,res) => {
    res.render('index')
})

// auth routes
app.use("/", controllers.user);

app.listen(3000, (req,res) => {
    console.log("Is this thing on?")
});