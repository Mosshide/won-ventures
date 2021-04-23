const portfolioSchema = new mongoose.Schema({
    stock: [{
        id: a,          // need to update 
        name: String, 
        pricePerShare: Number,
        amountOwned: Number, 
    }],
})