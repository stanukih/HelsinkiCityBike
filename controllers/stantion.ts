//const multer  = require("multer");
//const upload = multer({dest:"uploads"})
import { stantionModel } from "../models/Stantions";
import { travelModel } from "../models/Travel";
import { errorModel } from '../models/ErrorLoad';


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
            console.log("req.query.filter",FilterString)
        console.log("filter_end",filter_end )
        console.log("filter",filter_end)
        
            return filter_end

}

async function receiving_stations (req,res){
    try {
        //const stantion = await stantionModel.find(req.params.id)
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
        
        const dataStantion=await stantionModel.find(filter,{_id:0, fileLoad:0, __v:0 }).sort(sort).skip((page-1)*size).limit(size)

        

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

export { receiving_stations, receiving_stations_quantity};