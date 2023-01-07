//const multer  = require("multer");
//const upload = multer({dest:"uploads"})
import { parse } from 'csv-parse';
import fs = require("fs")
import { ReadLine } from 'readline';
import { stantionModel } from "../models/Stantions";
import { travelModel } from "../models/Travel";
import lineReader = require('line-reader');

async function saveBaseStantions(csv: String, index: Number, fileLoad:String) {
    if (index === 0) { return }
    const temp_data = csv.split('"')
    let data: String[] = []
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
    if (
        (isNaN(Number(data[0]))) ||
        (isNaN(Number(data[1]))) ||
        (isNaN(Number(data[10]))) ||
        (isNaN(Number(data[11]))) ||
        (isNaN(Number(data[12])))
        
    ) {
        console.log("E01101112")
        return
        
    }
    //const data = csv.split(',')
    if (data.length != 13) {
        console.log("E13")
        return        
    }

    const StantionSearch = await stantionModel.findOne({
        $or:[{id:data[1]},{fid: data[0]}]
    })
    if ((StantionSearch)){
        console.log("EDubl")
        return        
    }

    try {
        const Stantion = new stantionModel({
            fid: data[0],
            id: data[1],
            nimi: data[2],
            namn: data[3],
            name: data[4],
            osoite: data[5],
            adress: data[6],
            kaupunki: data[7] ?? '',
            stad: data[8] ?? '',
            operaattor: data[9] ?? '',
            kapasiteet: data[10],
            positionX: data[11],
            positionY: data[12],
            fileLoad:fileLoad
        })
        Stantion.save()
    }
    catch (e) {
        throw "Ecorrect"
    }
}

async function saveBaseTravel(csv: String, index: number, fileLoad:string) {
    if (index === 0) { return }
    const temp_data = csv.split('"')
    let data: String[] = []
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
    if (
        (isNaN(Number(data[2]))) ||
        (isNaN(Number(data[4]))) ||
        (isNaN(Number(data[6]))) ||
        (isNaN(Number(data[7])))       
    ) {
        console.log("E01101112")
        console.log("data", data)
        
        return
        
    }
    //const data = csv.split(',')
    if (data.length != 8) {
        console.log("E8")
        return        
    }

    
    if ((Number(data[7])<10)||(Number(data[8])<10)){
        console.log("E10")
    }

    /*Ability to store mongo id*/
    /*
    const StantionSearch1 = await stantionModel.findOne({
        id:data[2]
    })
    if (!(StantionSearch1)){
        console.log("ESN1")
        console.log("data", data)
        return        
    }
    const StantionSearch2 = await stantionModel.findOne({
        id:data[2]
    })
    if (!(StantionSearch2)){
        console.log("ESN2")
        console.log("data", data)
        return        
    }*/    
    try {
        const Travel = new travelModel({
            departure_time: data[0],
            return_time: data[1],
            departure_station_id: data[2],
            departure_station_name:data[3],
            return_station_id: data[4],
            return_station_name:data[5],
            distance:data[6],
            duration:data[7],
            fileLoad:fileLoad
        })
        Travel.save()
    }
    catch (e) {
        throw "Ecorrect"
    }
}


async function uploadStantions(req, res) {
    if (!(req.file)){
        res.status(409).json({
            message: "File upload error. The file must be less than 300 megabytes and have *.csv extension"
        })
        return
    }
    let index = 0

    lineReader.eachLine(`./${req.file.path}`, function (line) {
        try {
            saveBaseStantions(line, index, req.file.path);
        } catch (e) {
            res.status(409).json({
                message: "File filling error"
            });
        }
        index++;
    })
    res.status(200).json({
        message: "Data load"
    })
}


async function uploadTravel(req, res) {
    if (req.file.path.slice(-4)!=".csv"){
        res.status(409).json({
            message: "Error"
        })
        return
    }
    let index = 0    

    lineReader.eachLine(`./${req.file.path}`, function (line) {
        try {
            saveBaseTravel(line, index,req.file.path)
        } catch (e) {
            res.status(409).json({
                message: "File filling error"
            })
        }
        index++
    })
    res.status(200).json({
        message: "Data load"
    })

}

function htmlUpload(req, res) {

    res.render('htmlUpload')
}

export { uploadStantions, uploadTravel, htmlUpload };