import mongoose = require("mongoose")
const Shema = mongoose.Schema
const ErrorShema = new Shema({
    string_to_load:{
        type:String,
        required:true,
    },
    doctype:{
        type:String,
        required:true
    },
    error:{
        type:String,
        required:true
    }
})

const errorModel = mongoose.model('errors',ErrorShema)
export{errorModel}