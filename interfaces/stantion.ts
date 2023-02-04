interface stantionFieldsAllExistOrNot {
        "_id"?:0, 
        "fileLoad"?:0, 
        "__v"?:0,
        "fid"?: 0,
        "id"?: 0,
        "nimi"?: 0,
        "namn"?: 0,
        "name"?: 0,
        "osoite"?: 0,
        "adress"?: 0,
        "kaupunki"?: 0,
        "stad"?: 0,
        "operaattor"?: 0,
        "kapasiteet"?: 0,
        "positionX"?: 0,
        "positionY"?: 0,
    }

interface stantionFieldsRequire{
    "fid": number,
    "id": number,
    "nimi": string,
    "namn": string,
    "name": string,
    "osoite": string,
    "adress": string,
    "kapasiteet": number,
    "positionX": number,
    "positionY": number, 
}

interface stantionFieldsAll extends stantionFieldsRequire{    
    "kaupunki"?: string,
    "stad"?: string,
    "operaattor"?: string,
    "fileLoad"?:string, 
    "user"?:any   
}

interface stantionFieldsImportPack extends stantionFieldsRequire{    
    "kaupunki"?: string,
    "stad"?: string,
    "operaattor"?: string,
    "fileLoad":string, 
    "user"?:any   
}

interface stantionFieldsImport extends stantionFieldsRequire{    
    "kaupunki"?: string,
    "stad"?: string,
    "operaattor"?: string,
    "user"?:any   
}
interface statusAll{
    status_add:"success"|"failed",
    codeFailed?:number,
    message?:string|Error
}

interface ErrorSaveIntarface {
    string_to_load?: string,
    doctype?: "Stantion",
    error?: number,
    fileLoad?: string
}

function typeImportPack(id:stantionFieldsImport|stantionFieldsImportPack):id is stantionFieldsImportPack{
    return ("fileLoad" in id)
}

export {stantionFieldsRequire, stantionFieldsAll, stantionFieldsImportPack, stantionFieldsImport, stantionFieldsAllExistOrNot, typeImportPack, statusAll, ErrorSaveIntarface}

