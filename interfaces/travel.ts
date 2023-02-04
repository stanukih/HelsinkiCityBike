interface travelFieldsAllExistOrNot {
    "_id"?:0, 
    "__v"?:0,
    "departure_time"?:0,
    "return_time"?:0,
    "departure_station_id"?:0,
    "departure_station_name"?:0,
    "return_station_id"?:0,
    "return_station_name"?:0,
    "distance"?:0,
    "duration"?:0,
    "fileLoad"?:0,
    }

interface travelFieldsRequire{
    "departure_time":Date,
    "return_time":Date,
    "departure_station_id":number,
    "departure_station_name":string,
    "return_station_id":number,
    "return_station_name":string,
    "distance":number,
    "duration":number,
}

interface travelFieldsAll extends travelFieldsRequire{    
    "fileLoad"?:string, 
    "user"?:any   
}

interface travelFieldsImportPack extends travelFieldsRequire{    
    "fileLoad":string, 
    "user"?:any     
}

interface travelFieldsImport extends travelFieldsRequire{        
    "user"?:any   
}
interface statusAll{
    status_add:"success"|"failed",
    codeFailed?:number,
    message?:string|Error
}

interface ErrorSaveIntarface {
    string_to_load?: string,
    doctype?: "Travel",
    error?: number,
    fileLoad?: string
}

function typeImportPack(id:travelFieldsImport|travelFieldsImportPack):id is travelFieldsImportPack{
    return ("fileLoad" in id)
}

export {travelFieldsRequire, travelFieldsAll, travelFieldsImportPack, travelFieldsImport, travelFieldsAllExistOrNot, typeImportPack, statusAll, ErrorSaveIntarface}

