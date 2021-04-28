// packages required
const express = require('express')
const app = express(); 
const methodOverride = require('method-override');
const session = require('express-session');

const controllers = require("./controllers");
const Stock = require('./models/stocks.js');
const user = require('./models/user.js')

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
    secret: "won",
    resave: false,
    saveUninitialized: false
}));

// Index route 
app.get("/", async (req,res) => {
    const userInfo = await user.findById(req.session.currentUser);
    if (req.session.currentUser) res.render("index", {userInfo});
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
// auth routes
app.use("/", controllers.user);


app.listen(3000, (req,res) => {
    console.log("Is this thing on?");
});
