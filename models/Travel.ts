import mongoose = require("mongoose")
const Shema = mongoose.Schema
const travelShema = new Shema({
    departure_time:{
        type: Date,
        required:true
    },
    return_time:{
        type: Date,
        required:true
    },
    departure_station_id:{
        type: Number,
        required:true
    },
    departure_station_name:{
        type:String,
        required:true
    },
    return_station_id:{
        type: Number,
        required:true
    },
    return_station_name:{
        type:String,
        required:true
    },
    distance:{
        type: Number,
        required:true
    },
    duration:{
        type: Number,
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

const travelModel = mongoose.model('travels',travelShema)
export{travelModel}