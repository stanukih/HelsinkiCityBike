import multer =require ('multer')
//import {diskStorage, Multer, Options} from 'multer'
import moment = require('moment')
import { setings } from '../config/keys'

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'temp_file/')
    },
    filename(req, file, cb){
        cb(null, moment().format('DDMMYYYY-HHmmss_SSS')+file.originalname)
        //cb(null, 'test')
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'text/csv'){
        cb(null,true)
    } else {
        cb(null, false)
    }
}

const optionsMulter={
    storage:storage, 
    fileFilter:fileFilter, 
    fileSize:setings.limits_file_upload
}
const upload = multer({ storage });
export{upload}