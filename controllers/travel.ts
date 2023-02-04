//const multer  = require("multer");
//const upload = multer({dest:"uploads"})
import { travelModel } from "../models/Travel";
import { errorModel } from '../models/ErrorLoad';
import jwt = require('jsonwebtoken')
import { travelFieldsAllExistOrNot, travelFieldsImport, travelFieldsImportPack, typeImportPack, statusAll, ErrorSaveIntarface } from "../interfaces/travel";
import lineReader = require('line-reader');

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
        default:
            return "departure_time"  
    }
}

function parseFields(FieldsString:string):travelFieldsAllExistOrNot{
    if (FieldsString.length===0){
        return {"_id":0, "fileLoad":0, "__v":0}
    }
    let fields:travelFieldsAllExistOrNot = {
        "_id":0, 
        "fileLoad":0, 
        "__v":0,
        "departure_time": 0,
        "return_time": 0,
        "departure_station_id": 0,
        "departure_station_name": 0,
        "return_station_id": 0,
        "return_station_name": 0,
        "distance": 0,
        "duration": 0
    }
    for (let index = 0; index < FieldsString.length; index++) {
        delete fields[fieldFromNumber(FieldsString[index])]    }
    return fields

}

async function receiving_travel (req,res){
    try {
        //const stantion = await stantionModel.find(req.params.id)
        let page: number=2
        let size:number=100
        let sort:string=`"_id"`
        let filter:JSON=JSON.parse("{}")
        let fields:travelFieldsAllExistOrNot={}
        
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
            fields=parseFields(req.query.fields)
        }
        
        const dataTravel=await travelModel.find(filter,fields).sort(fieldFromNumber(sort)).skip((page-1)*size).limit(size)

        

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
async function saveFromDatabase(data: travelFieldsImport | travelFieldsImportPack): Promise<statusAll> {
    let travel = new travelModel({
        
        departure_time: data.departure_time,
            return_time: data.return_time,
            departure_station_id: data.departure_station_id,
            departure_station_name:data.departure_station_name,
            return_station_id: data.return_station_id,
            return_station_name:data.return_station_name,
            distance:data.distance,
            duration:data.duration,
            
    })
    if (typeImportPack(data)) {
        fileLoad:data.fileLoad
    }
    try {
        await travel.save()
        return { status_add: "success" }
    }
    catch (e) {
        return {
            status_add: "failed",
            message: e as Error,
        }
    }
}

function saveBaseTravelPack(req, res) {

    if (!(req.file)) {
        res.status(409).json({
            status_add: "failed",
            codeFailed: 1053,
            message: "File not loaded",
        })
        return
    }
    const filePath: string = req.file.path
    res.status(200).json({
        status_add: "success",
        message: "File received. Its processing"
    })

    let index = 0

    lineReader.eachLine(`./${filePath}`, async (line) => {
        if (index > 0) {
            const dataFromString: string[] = lineParce(line)
            const statusDataFromString = await correctLine(dataFromString)
            if (statusDataFromString.status_add === "success") {
                const statusSave = await saveFromDatabase({
                    departure_time: new Date(dataFromString[0]),
                    return_time: new Date(dataFromString[1]),
                    departure_station_id: Number(dataFromString[2]),
                    departure_station_name: dataFromString[3],
                    return_station_id: Number(dataFromString[4]),
                    return_station_name: dataFromString[5],
                    distance: Number(dataFromString[6]),
                    duration: Number(dataFromString[7]),
                    fileLoad: filePath
                })
            }
            else {
                await saveFromDatabaseError({
                    string_to_load: line,
                    doctype: "Travel",
                    error: statusDataFromString.codeFailed,
                    fileLoad: filePath
                })
            }

        }
        index++;
    })
}

function lineParce(line: string): string[] {
    const temp_data = line.split('"')
    let data: string[] = []
    for (let i = 0; i < temp_data.length; i++) {
        if (i % 2 === 0) {
            let temp_data2 = temp_data[i].split(',')
            for (let j = 0; j < temp_data2.length; j++) {
                if (temp_data2[j] != "") {
                    data.push(temp_data2[j])
                }
            }
        }
        else {
            data.push(temp_data[i])
        }
    }    
    return data
}

async function correctLine(data: string[]): Promise<statusAll> {
    if (data.length != 8) {
        return{
            status_add:"failed",
            codeFailed:8            
        }       
    }
    if (
        (isNaN(Date.parse(data[0]))) ||
        (isNaN(Date.parse(data[1]))) ||
        (isNaN(Number(data[2]))) ||
        (isNaN(Number(data[4]))) ||
        (isNaN(Number(data[6]))) ||
        (isNaN(Number(data[7])))               
    ) {
        return{
            status_add:"failed",
            codeFailed:1101112            
        }    
    }
    return {
        status_add:"success"
    }
}
async function saveFromDatabaseError(data: ErrorSaveIntarface){
    let errorToSave = new errorModel(data)
    try {
        await errorToSave.save()        
    }
    catch (e) {
        console.log(e)
    }
}

export { receiving_travel, receiving_travels_quantity, saveBaseTravelPack};