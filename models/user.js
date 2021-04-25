

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