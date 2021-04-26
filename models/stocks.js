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
        enum: ['Financial Services', 'Healthcare', 'Technology', 'Consumer Goods']  //sample industries  
     },
})

// mongoose takes first param and creates a collection named Stocks. 
const Stock = mongoose.model('Stock', stockSchema);
module.exports = Stock 