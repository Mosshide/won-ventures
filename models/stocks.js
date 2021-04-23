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