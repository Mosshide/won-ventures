const portfolioSchema = new mongoose.Schema({
    stock: [{
        name: String, 
        pricePerShare: Number,
        amountOwned: Number, 
    }],
})

