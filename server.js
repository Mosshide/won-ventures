// packages required
const express = require('express')
const app = express();
const methodOverride = require('method-override')
const mongoose = require('mongoose');
// models required
const Portfolio = require('./models/portfolio')
const Stock = require('./models/stock')
const User = require('./models/user')
const Watchlist = require('./models/watchlist')
// connect mongoose 
mongoose.connect('mongodb://localhost:27017/solodb', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
})
    .then(() => {
        console.log("Connection successful")
    })
    .catch(err => {
        console.log('failure')
        console.log(err)
    })

// Middleware Parse body and form data in POST request body 
app.use(express.urlencoded({extended:true}))

// Middleware Put/patch/delete requests 
app.use(methodOverride('_method'))

// view ejs files in models 
app.set('view engine', 'ejs')

// routes - STOCKS 
    // Index: Made a route for all available stocks 
    app.get('/stock', async(req,res) => {
        const stocks = await Stock.find({});
        res.render('stock/index', {stocks})
    })

    // Show: route for stock by ID 
    app.get('/stock/:id', async(req,res) => {
        const stocks = await Stock.findById(req.params.id)
        res.render('stock/show', {stocks})
    })

    // Edit: route for buying/selling
    // buy
    app.get('/stock/:id/buy', async(req,res) =>{
        const stocks = await Stock.findById(req.params.id)
        if(Portfolio.stock !== stocks){
            Portfolio.insert(stocks);
            Portfolio.save();
        } else {}
        res.render('stock/buy', {stocks}) 
    })
    // sell 
    app.get('/stock/:id/sell', async(req,res) =>{
        const stocks = await Stock.findById(req.params.id)
        const portfolios = Portfolio.
        res.render('stock/sell', {stocks}) 
    })

// Root Route - Load Home page -> Log in 
app.get('/', (req,res) => {
    res.render('home')
})

// User Routes - wyatt 
// Index
    // render multiple of a resource 
app.get('/user', (req,res) => {
    res.render('user/index')
})

// Create - Add positions to portfolio
app.get('/user/new', (req,res) => {
    res.render('user/new')
})


app.listen(3000, (req,res) => {
    console.log("Listening on Port 3000!")
})
