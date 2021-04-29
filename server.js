// packages required
const express = require('express')
const app = express(); 
const methodOverride = require('method-override');
const session = require('express-session');

const controllers = require("./controllers");
const Stock = require('./models/stocks.js');
const user = require('./models/user.js')
const authCheck = require('./controllers/authCheck.js');


app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// view ejs files in models 
app.set('view engine', 'ejs')


app.use(session({
    secret: "won",
    resave: false,
    saveUninitialized: false
}));

// Index route 
app.get("/", authCheck, async (req,res) => {
    try{
        const findUser = await user.findById(req.session.currentUser);
        const stockArray = [];
    
    if(findUser){
        for (let index = 0; index < findUser.watchlist.length; index++) {
            const element = await Stock.findById(findUser.watchlist[index]);
            stockArray.push(element);
        }
        res.render("index", {findUser:findUser, stockArray:stockArray});
    }
}
    catch(err){
        console.log(err);
        console.log("Didn't work")
    }
});

// routes - STOCKS 
    // Index: Made a route for all available stocks 
app.get('/stock', async(req,res) => { 
    const stocks = await Stock.find({});
    res.render('stock/index', {stocks})
})


app.get('/stock/watchlist', authCheck, async(req,res) => {
    try {
        const findUser = await user.findOne({_id: req.session.currentUser});
        const stockArray = [];
    
        if(findUser){
            for (let index = 0; index < findUser.watchlist.length; index++) {
                const element = await Stock.findById(findUser.watchlist[index]);
                stockArray.push(element);
            }
            res.render('stock/watchlist', {stockArray: stockArray})
        }    
    }
    catch(err){
        console.log(err);
        console.log("Didn't work")
    }
});    


app.post('/stock/:id/watchlist', authCheck, async(req,res) => {
    try {
        const findUser = await user.findOne({_id: req.session.currentUser});
        
        if(findUser){
            findUser.watchlist.push(req.params.id);
            await findUser.save(); 
            res.redirect('/stock/watchlist');
        }
        else {
            console.log("no stock");
            res.redirect("/");
        }
    }
    catch (err) {
        console.log(err);
    }
});


    // Show: route for stock by ID - also the new route 
    app.get('/stock/:id', async(req,res) => {
        const stocks = await Stock.findById(req.params.id)
        res.render('stock/show', {stocks})
    })

// Routes - Portfolio 
    
// user 
//         stocks: [{
//             stock:
//             amount: 
//         }]


//         stocks = user.stocks.stock
//         amount = user.stocks.amount 

app.get('/stock/portfolio', authCheck, async(req,res) => {
    try {
        const findUser = await user.findOne({_id: req.session.currentUser});
    
        if(findUser){
            for (let index = 0; index < findUser.stocks.length; index++) {
                const findStock = await Stock.findById(findUser.stocks[index]);
                findUser.stocks.push({stock: findStock.id, amount: findStock.req.body.amount});
            }
            res.render('stock/portfolio', {stockArray: stockArray})
        }    
    }
    catch(err){
        console.log(err);
        console.log("Didn't work")
    }
});    

app.put('/stock/:id/portfolio', authCheck, (async(req,res) => {
    try{
        const findUser = await user.findOne({_id: req.session.currentUser});
        const findStock = await Stock.findOne(req.params.id)

        if(findUser){
            if(findStock){
                findUser.stocks.push({stock: findStock.id, amount: findStock.req.body.amount})
            }
            else{
                findUser.stocks.pop({stock: findStock.id, amount: findStock.req.body.amount})
            }
        }
        res.redirect('/stock/portfolio')
    }
    catch(err){
        console.log(err);
    }
}))


// app.post('/stock/:id/portfolio', authCheck, async(req,res) => {
//     try {
//         const findUser = await user.findOne({_id: req.session.currentUser});
        
//         if(findUser){
//             findUser.watchlist.push(req.params.id);
//             await findUser.save(); 
//             res.redirect('/stock/portfolio');
//         }
//         else {
//             console.log("no stock");
//             res.redirect("/");
//         }
//     }
//     catch (err) {
//         console.log(err);
//     }
// });










    // const newPortfolio = await myUser.watchlist.push(stocks)
    // newPortfolio.save()
    // const myUser = await user.findById(req.session.currentUser)
    // app.get('/stock/:id/watch', (req,res) =>{ 
    //     const stock = req.params.id 
    //     res.render('stock/watch', {stock})
    // })
    
    // portfolio 
    // watchlist.push(stock._id)


// auth routes
app.use("/", controllers.user);


app.listen(3000, (req,res) => {
    console.log("Is this thing on?");
});

