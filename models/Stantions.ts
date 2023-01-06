import mongoose = require("mongoose")
const Shema = mongoose.Schema
const stantionShema = new Shema({
    fid:{
        type:Number,
        required:true,
        unique:true
    },
    id:{
        type:Number,
        required:true,
        unique:true
    },
    nimi:{
        type:String,
        required:true
    },
    namn:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    osoite:{
        type:String,
        required:true
    },
    adress:{
        type:String,
        required:true
    },
    kaupunki:{
        type:String
    },
    stad:{
        type:String
    },
    operaattor:{
        type:String
    },
    kapasiteet:{
        type:Number,
        required:true
    },
    positionX:{
        type:Number,
        required:true
    },
    positionY:{
        type:Number,
        required:true
    },
    fileLoad:{
        type:String
    },
    user:{
        ref:'users',
        type: Shema.Types.ObjectId
    }
})

const stantionModel = mongoose.model('stantions',stantionShema)
export{stantionModel}