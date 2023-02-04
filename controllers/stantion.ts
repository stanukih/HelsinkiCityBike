//const multer  = require("multer");
//const upload = multer({dest:"uploads"})
import { stantionModel } from "../models/Stantions";
import { travelModel } from "../models/Travel";
import { errorModel } from '../models/ErrorLoad';
import { stantionFieldsAllExistOrNot, stantionFieldsImport, stantionFieldsImportPack, typeImportPack, statusAll, ErrorSaveIntarface } from "../interfaces/stantion";
import jwt = require('jsonwebtoken')
import lineReader = require('line-reader');
import { pathToFileURL } from "url";

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
    if (filter_split.length!==3){
        return "{}"        
    }
    let filter_end:string=''
            switch (filter_split[1]) {
                case "1":
                    filter_end=`{"${fieldFromNumber(filter_split[0])}": "${filter_split[2]}"}`                    
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
            return "fid"
        case "1":
            return "id"
        case "2":
            return "nimi"
        case "3":
            return "namn"
        case "4":
            return "name"
        case "5":
            return "osoite"
        case "6":
            return "adress"
        case "7":
            return "kaupunki"
        case "8":
            return "stad"
        case "9":
            return "operaattor"
        case "A":
            return "kapasiteet"
        case "B":
            return "positionX"
        case "C":
            return "positionY"   
        default:
            return "fid"                                             
    }
}

function parseFields(FieldsString:string):stantionFieldsAllExistOrNot{    
    if (FieldsString.length===0){
        return {"_id":0, "fileLoad":0, "__v":0}
    }
    let fields:stantionFieldsAllExistOrNot = {
        "_id":0, 
        "fileLoad":0, 
        "__v":0,
        "fid": 0,
        "id": 0,
        "nimi": 0,
        "namn": 0,
        "name": 0,
        "osoite": 0,
        "adress": 0,
        "kaupunki": 0,
        "stad": 0,
        "operaattor": 0,
        "kapasiteet": 0,
        "positionX": 0,
        "positionY": 0,
    }
    for (let index = 0; index < FieldsString.length; index++) {
        delete fields[fieldFromNumber(FieldsString[index])]    }
    return fields

}


async function receiving_stations (req,res){
    try {
        //const stantion = await stantionModel.find(req.params.id)
        let page: number=2
        let size:number=100
        let sort:string="_id"
        let filter:JSON=JSON.parse("{}")
        let fields:stantionFieldsAllExistOrNot={}
        
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
        
        const dataStantion=await stantionModel.find(filter,fields).sort(fieldFromNumber(sort)).skip((page-1)*size).limit(size)

        

        res.status(200).json(dataStantion)
    }
    catch(e){
        //res.status(200).json("error","Error getting from database")
        console.log(e)
    }
}

async function receiving_stations_quantity (req,res){
    try {
        let page: number=3
        let size:number=100
        let sort:string="_id"
        let filter:JSON=JSON.parse("{}")
        if (req.query.page!=''){
            page=req.query.page
        }
        if (req.query.size!=''){
            size=req.query.size
        }
        if (req.query.sort!=''){
            sort=req.query.sort
        }
        if (req.query.filter!=''){
            filter=JSON.parse(parseFilter(req.query.filter))
            
        }        
        const dataStantionount=await stantionModel.find(filter,{_id:0, fileLoad:0, __v:0 }).count() 
              
        res.status(200).json(dataStantionount)
        
    }
    catch(e){
        //res.status(200).json("error","Error getting from database")
        console.log(e)
    }
}

function validationOfFields(req): statusAll {
    if (
        (!(req.body.fid)) || (isNaN(Number(req.body.fid))) ||
        (!(req.body.id)) || (isNaN(Number(req.body.id))) ||
        (!(req.body.nimi)) || ((req.body.nimi === "")) ||
        (!(req.body.namn)) || ((req.body.namn === "")) ||
        (!(req.body.name)) || ((req.body.name === "")) ||
        (!(req.body.osoite)) || ((req.body.osoite === "")) ||
        (!(req.body.adress)) || ((req.body.adress === "")) ||
        (!(req.body.kapasiteet)) || (isNaN(Number(req.body.kapasiteet))) ||
        (!(req.body.positionX)) || (isNaN(Number(req.body.positionX))) ||
        (!(req.body.positionY)) || (isNaN(Number(req.body.positionY)))) {
        return {
            status_add: "failed",
            codeFailed: 1015,
            message: "Not all required fields are present in the request"
        }

    }
    else return { status_add: "success", }
}

async function saveBaseStantions(req, res) {
    const resultvalidationOfFields = validationOfFields(req)
    if (resultvalidationOfFields.status_add==="failed"){
        res.status(400).json({
            status_add: resultvalidationOfFields.status_add,
            codeFailed: resultvalidationOfFields.codeFailed,
            message: resultvalidationOfFields.message
        })
        return
    }
    const dataStantionount = await stantionModel.findOne({ $or: [{ fid: req.body.fid }, { id: req.body.id }] })
    if (dataStantionount) {
        res.status(400).json({
            status_add: "failed",
            codeFailed: 1020,
            message: "Record creation error. Record conflict",
            record: dataStantionount
        })
        return
    }
    else {
        const result=await saveFromDatabase(req.body as stantionFieldsImport)
        if (result.status_add === "success") {
            res.status(200).json({
                status_add: "success",
            })
        }
        else {
            res.status(400).json({
                status_add: "failed",
                codeFailed: result.codeFailed,
                message: result.message,
            })
        }
    }
}

async function saveFromDatabase(data: stantionFieldsImport | stantionFieldsImportPack): Promise<statusAll> {
    let stantion = new stantionModel({
        fid: data.fid,
        id: data.id,
        nimi: data.nimi,
        namn: data.namn,
        name: data.name,
        osoite: data.osoite,
        adress: data.adress,
        kaupunki: data.kaupunki,
        stad: data.stad,
        operaattor: data.operaattor,
        kapasiteet: data.kapasiteet,
        positionX: data.positionX,
        positionY: data.positionY,
        user: data.user
    })
    if (typeImportPack(data)) {
        stantion.fileLoad = data.fileLoad
    }
    try {
        await stantion.save()
        return { status_add: "success" }
    }
    catch (e) {
        return {
            status_add: "failed",
            message: e as Error,
        }
    }
}

function saveBaseStantionsPack(req, res) {

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
                    fid: Number(dataFromString[0]),
                    id: Number(dataFromString[1]),
                    nimi: dataFromString[2],
                    namn: dataFromString[3],
                    name: dataFromString[4],
                    osoite: dataFromString[5],
                    adress: dataFromString[6],
                    kaupunki: dataFromString[7],
                    stad: dataFromString[8],
                    operaattor: dataFromString[9],
                    kapasiteet: Number(dataFromString[10]),
                    positionX: Number(dataFromString[11]),
                    positionY: Number(dataFromString[12]),
                    fileLoad: filePath
                })
            }
            else {
                await saveFromDatabaseError({
                    string_to_load: line,
                    doctype: "Stantion",
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
    if (data.length != 13) {
        return{
            status_add:"failed",
            codeFailed:13            
        }       
    }
    if (
        (isNaN(Number(data[0]))) ||
        (isNaN(Number(data[1]))) ||
        (isNaN(Number(data[10]))) ||
        (isNaN(Number(data[11]))) ||
        (isNaN(Number(data[12])))
    ) {
        return{
            status_add:"failed",
            codeFailed:1101112            
        }    
    }        
    const StantionSearch = await stantionModel.findOne({
        $or:[{id:data[1]},{fid: data[0]}]
    })
    if ((StantionSearch)){
        return     {
            status_add:"failed",
            codeFailed:9669            
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




export { receiving_stations, receiving_stations_quantity, saveBaseStantions, saveBaseStantionsPack};