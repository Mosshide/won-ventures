    // viewing the stock
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
        // creating user profiles 
    const userSchema = new mongoose.Schema({
        name:{
            type: String,
        },
        password:{
            type: String,
        },
        cashBalance:{
            type: Number, 
        }
    })

        // portfolio schema 
    
        const portfolioSchema = new mongoose.Schema({
            stock: [{
                id: a,          // need to update 
                name: String, 
                pricePerShare: Number,
                amountOwned: Number, 
            }],
        })
