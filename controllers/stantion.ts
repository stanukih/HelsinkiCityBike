//const multer  = require("multer");
//const upload = multer({dest:"uploads"})
import { stantionModel } from "../models/Stantions";
import { travelModel } from "../models/Travel";
import { errorModel } from '../models/ErrorLoad';
import jwt = require('jsonwebtoken')

function filterNotCorrect(FilterString:string):boolean{
    if (FilterString.match(`[^A-Za-zÄÖÅäöå0-9\s\.\,\_]`)){
        console.log("FilterString",FilterString)
        console.log("filterNotCorrect",FilterString.match(`.*[^A-Za-zÄÖÅäöå0-9\s\.\,\_]*.*`))
    return true
}
    else
    return false
}

function parseFilter(FilterString:string):string{
    let filter_end:string=''
    let filter_split:string[]=FilterString.split("_")
    if ((filter_split.length!==3)||(filterNotCorrect(filter_split[2]))){
        return "{}"        
    }
            switch (filter_split[1]) {
                case "1":
                    filter_end=`{"${filter_split[0]}": "${filter_split[2]}"}`                    
                    break;
                case "2":
                    filter_end=`{"${filter_split[0]}": {"$ne":"${filter_split[2]}"}}`                    
                    break;
                case "3":
                    filter_end=`{"${filter_split[0]}": {"$gte":"${filter_split[2]}"}}`                    
                    break;
                case "4":
                    filter_end=`{"${filter_split[0]}": {"$lte":"${filter_split[2]}"}}`                    
                    break;
                case "5":
                    filter_end=`{"${filter_split[0]}": {"$gt":"${filter_split[2]}"}}`                    
                    break;
                case "6":
                    filter_end=`{"${filter_split[0]}": {"$lt":"${filter_split[2]}"}}`                    
                    break;
                case "7":
                    filter_end=`{"${filter_split[0]}": {"$regex":"${filter_split[2]}"}}`                
                    break;
                case "8":
                    filter_end=`{"${filter_split[0]}": {"$not":{"$regex":"${filter_split[2]}"}}}`                
                    break;            
                default:
                    filter_end=`{}`
                    break;
            }        
            return filter_end

}

function parseFields(FieldsString:string):string{
    let fields_end:string=''
    if (FieldsString.length===0){
        return "{_id:0, fileLoad:0, __v:0}"        
    }
    for (let index = 0; index < FieldsString.length; index++) {
        fields_end += ', '
        console.log(FieldsString[index])
        switch (FieldsString[index]) {
            case "0":
                fields_end += `"fid":0`
                break;
            case "1":
                fields_end += `"id":0`
                break;
            case "2":
                fields_end += `"nimi": 0`
                break;
            case "3":
                fields_end += `"namn": 0`
                break;
            case "4":
                fields_end += `"name": 0`
                break;
            case "5":
                fields_end += `"osoite":0`
                break;
            case "6":
                fields_end += `"adress":0`
                break;
            case "7":
                fields_end += `"kaupunki":0`
                break;
            case "8":
                fields_end += `"stad":0`
                break;
            case "9":
                fields_end += `"operaattor":0`
                break;
            case "A":
                fields_end += `"kapasiteet":0`
                break;
            case "B":
                fields_end += `"positionX":0`
                break;
            case "C":
                fields_end += `"positionY":0`
                break;
        }
    }
    return `{"_id":0, "fileLoad":0, "__v":0` + fields_end + `}`

}

async function receiving_stations (req,res){
    try {
        //const stantion = await stantionModel.find(req.params.id)
        let page: number=3
        let size:number=100
        let sort:string="_id"
        let filter:JSON
        let fields:JSON
        
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
        if (req.query.fields!=''){        
            console.log(parseFields(req.query.fields))    
            fields=JSON.parse(parseFields(req.query.fields))
        }
        
        const dataStantion=await stantionModel.find(filter,fields).sort(sort).skip((page-1)*size).limit(size)

        

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
        let filter:JSON
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

//interface 

async function saveBaseStantions(req,res) {
    if (
    (!(req.body.fid))||(isNaN(Number(req.body.fid)))||
    (!(req.body.id))||(isNaN(Number(req.body.id)))||
    (!(req.body.nimi))||((req.body.nimi===""))||
    (!(req.body.namn))||((req.body.namn===""))||
    (!(req.body.name))||((req.body.name===""))||
    (!(req.body.osoite))||((req.body.osoite===""))||
    (!(req.body.adress))||((req.body.adress===""))||
    (!(req.body.kapasiteet))||(isNaN(Number(req.body.kapasiteet)))||
    (!(req.body.positionX))||(isNaN(Number(req.body.positionX)))||
    (!(req.body.positionY))||(isNaN(Number(req.body.positionY))))
    {
        res.status(400).json({
            status_add:"failed",
            codeFailed:1015,
            message:"Not all required fields are present in the request"
        })
        return
    }
    const dataStantionount=await stantionModel.findOne({$or:[{fid:req.body.fid},{id:req.body.id}]})
    
    if (dataStantionount){
        res.status(400).json({
            status_add:"failed",
            codeFailed:1020,
            message:"Record creation error. Record conflict",
            record:dataStantionount
        })
        return
    }
    else {
    try {
        console.log(req.body)
    const stantion = new stantionModel({
        fid:req.body.fid,
        id:req.body.id,
        nimi:req.body.nimi,
        namn:req.body.namn,
        name:req.body.name,
        osoite:req.body.osoite,
        adress:req.body.adress,
        kaupunki:req.body.kaupunki?req.body.kaupunki:null,
        stad:req.body.stad?req.body.stad:null,
        operaattor:req.body.operaattor?req.body.operaattor:null,
        kapasiteet:req.body.kapasiteet,
        positionX:req.body.positionX,
        positionY:req.body.positionY,
        }) 
        console.log("---------3")
        await stantion.save()
        res.status(200).json({
            status_add:"success",  
        })
        return
    }
    catch(e){
        console.log(e)
        res.status(400).json({
            status_add:"failed",
            codeFailed:1100,
            message:"Record creation error.",
        })
    }}
}

export { receiving_stations, receiving_stations_quantity, saveBaseStantions};