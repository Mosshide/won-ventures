// packages required
require('dotenv').config();
const express = require('express')
const app = express(); 
const methodOverride = require('method-override');
const session = require('express-session');

const controllers = require("./controllers");
const Stock = require('./models/stocks.js');

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// view ejs files in models 
app.set('view engine', 'ejs')

// routes - STOCKS 
    // Index: Made a route for all available stocks 
    app.get('/stock', async(req,res) => {
        const stocks = await Stock.find({});
        res.render('stock/index', {stocks})
    })

app.use(session({
    secret: process.env.SECRET || "won",
    resave: false,
    saveUninitialized: false
}));

// Index route 
app.get("/", (req,res) => {
    if (req.session.currentUser) res.render("index");
    else res.redirect("/login");
})
// routes - STOCKS 
    // Index: Made a route for all available stocks 
    app.get('/stock', async(req,res) => {
        const stocks = await Stock.find({});
        res.render('stock/index', {stocks})
    })

    // New: Add a new stock to portfolio 
    app.get('/stock/new', (req,res) => {
        res.render('stock/new')
    })
    // Show: route for stock by ID 
    app.get('/stock/:id', async(req,res) => {
        const stocks = await Stock.findById(req.params.id)
        res.render('stock/show', {stocks})
    })

    // Edit: route for buying/selling !STUCK
    // buy/sell
    app.post('/stock/:id/edit', async(req,res) =>{
        res.render('stock/edit')
    })


// auth routes
app.use("/", controllers.user);

app.listen(process.env.PORT || 3000, (req,res) => {
    console.log("Is this thing on?");
});
