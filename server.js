// packages required
const express = require('express')
const app = express(); 
const methodOverride = require('method-override');
const session = require('express-session');

const controllers = require("./controllers");

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
app.get("/", (req,res) => {
    if (req.session.currentUser) res.render("index");
    else res.redirect("/login");
})

// auth routes
app.use("/", controllers.user);

app.listen(3000, (req,res) => {
    console.log("Is this thing on?");
});
