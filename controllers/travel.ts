//const multer  = require("multer");
//const upload = multer({dest:"uploads"})
import { travelModel } from "../models/Travel";
import { errorModel } from '../models/ErrorLoad';
import jwt = require('jsonwebtoken')

function filterNotCorrect(FilterString:string):boolean{
    if (FilterString.match(`[^A-Z0-9\_]`)){
        return true
    }
    else {
    return false
}
}

function parseFilter(FilterString:string):string{
    if (filterNotCorrect(FilterString)){
        return "{}"        
    }    
    let filter_split:string[]=FilterString.split("_")
    if ((filter_split.length!==3)){
        return "{}"        
    }
    let filter_end:string=''
            switch (filter_split[1]) {
//comparison operation number for mongo                
                case "1":
                    filter_end=`{"${fieldFromNumber(filter_split[0])}": "${filter_split[2]}}"`                    
                    break;
                case "2":
                    filter_end=`{"${fieldFromNumber(filter_split[0])}": {"$ne":"${filter_split[2]}"}}`                    
                    break;
                case "3":
                    filter_end=`{"${fieldFromNumber(filter_split[0])}": {"$gte":"${filter_split[2]}"}}`                    
                    break;
                case "4":
                    filter_end=`{"${fieldFromNumber(filter_split[0])}": {"$lte":"${filter_split[2]}"}}`                    
                    break;
                case "5":
                    filter_end=`{"${fieldFromNumber(filter_split[0])}": {"$gt":"${filter_split[2]}"}}`                    
                    break;
                case "6":
                    filter_end=`{"${fieldFromNumber(filter_split[0])}": {"$lt":"${filter_split[2]}"}}`                    
                    break;
                case "7":
                    filter_end=`{"${fieldFromNumber(filter_split[0])}": {"$regex":"${filter_split[2]}"}}`                
                    break;
                case "8":
                    filter_end=`{"${fieldFromNumber(filter_split[0])}": {"$not":{"$regex":"${filter_split[2]}"}}}`                
                    break;            
                default:
                    filter_end=`{}`
                    break;
            }        
            return filter_end

}

function fieldFromNumber(fieldsNumber:string){
    switch (fieldsNumber) {                
        case "0":
            return "departure_time"
        case "1":
            return "return_time"
        case "2":
            return "departure_station_id"
        case "3":
            return "departure_station_name"
        case "4":
            return "return_station_id"
        case "5":
            return "return_station_name"
        case "6":
            return "distance"
        case "7":
            return "duration"
    }
}

function parseFields(FieldsString:string):string{
    let fields_end:string=''
    if (FieldsString.length===0){
        return `{"_id":0, fileLoad:0, "__v":0}`       
    }
    for (let index = 0; index < FieldsString.length; index++) {
        fields_end += `, "${fieldFromNumber(FieldsString[index])}":0`
    }
    return `{"_id":0, "fileLoad":0, "__v":0 ${fields_end}}`

}

async function receiving_travel (req,res){
    try {
        //const stantion = await stantionModel.find(req.params.id)
        let page: number=2
        let size:number=100
        let sort:string=`"_id"`
        let filter:JSON=JSON.parse("{}")
        let fields:JSON=JSON.parse("{}")
        
        if (req.query.page!=''){
            page=req.query.page
        }
        if ((req.query.size!='')&&(req.query.size<100)){
            size=req.query.size
        }
        if (req.query.sort!=''){
            sort=req.query.sort
        }
        if (req.query.filter!=''){            
            filter=JSON.parse(parseFilter(req.query.filter))
        } 
        if (req.query.fields!=''){        
            fields=JSON.parse(parseFields(req.query.fields))
        }
        
        const dataTravel=await travelModel.find(filter,fields).sort(sort).skip((page-1)*size).limit(size)

        

        res.status(200).json(dataTravel)
    }
    catch(e){
        //res.status(200).json("error","Error getting from database")
        console.log(e)
    }
}

async function receiving_travels_quantity (req,res){
    try {
        let page: number=2
        let size:number=100
        let sort:string="_id"
        let filter:JSON=JSON.parse("{}")
        if (req.query.page!=''){
            page=req.query.page
        }
        if (req.query.filter!=''){
            filter=JSON.parse(parseFilter(req.query.filter))            
        }        
        const dataTravel=await travelModel.find(filter,{_id:0, fileLoad:0, __v:0 }).count() 
              
        res.status(200).json(dataTravel)
        
    }
    catch(e){
        //res.status(200).json("error","Error getting from database")
        console.log(e)
    }
}

//interface 


export { receiving_travel, receiving_travels_quantity};