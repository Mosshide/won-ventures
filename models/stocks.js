// connect mongoose to mongoDB + test connection
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/wonVentures', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => { 
        console.log("Connection Open!")
    })
    .catch(err => {
        console.log("Error!")
        console.log(err)
    })

// defining schema 
const stockSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    price:{
        type: Number
    },
    category:{
        type: String,
        enum: ['Financial Services', 'Healthcare', 'Technology']  //sample industries  
     },
})

// mongoose takes first param and creates a collection named Stocks. 
const Stock = mongoose.model('Stock', stockSchema);

// Add single instance to mongoDB 
    // const amd = new Stock({name: 'AMD', price: 82.04, category: 'Technology'})
    // Nothing in mongoDB at this point -> to save we must do amd.save() 

// // insert many instances - sample stocks added to DB 
Stock.insertMany([
    {name: 'AMD', price: 82.04, category: 'Technology'},
    {name: 'MU', price: 85.14, category: 'Technology'},
    {name: 'JPM', price: 151.12, category: 'Financial Services'},
    {name: 'JNJ', price: 165.52, category: 'Healthcare'},
    {name: 'PFE', price: 38.66, category: 'Healthcare'},
    {name: 'WFC', price: 44, category: 'Financial Services'},
])
    .then(securities=>{
        console.log("Stocks inputted to database")
        console.log(securities);
    })