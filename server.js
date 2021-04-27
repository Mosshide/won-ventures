const express = require('express')
const app = express(); 
const methodOverride = require('method-override');
const session = require('express-session');

const controllers = require("./controllers");

app.set('view engine', 'ejs');

app.use(express.urlencoded ({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static('public'));

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
