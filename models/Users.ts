import mongoose = require("mongoose")
const Shema = mongoose.Schema
const userShema = new Shema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    admin:{
        type:Boolean,
        required:true
    }

})

const userModel = mongoose.model('users',userShema)
export{userModel}