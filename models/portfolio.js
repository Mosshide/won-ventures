const mongoose = require('mongoose')

const portfolioSchema = new mongoose.Schema({
    stock: [{
        name: String, 
        pricePerShare: Number,
        amountOwned: Number, 
    }],
})

const Portfolio = mongoose.model('Portfolio', portfolioSchema);
module.exports = Portfolio; 