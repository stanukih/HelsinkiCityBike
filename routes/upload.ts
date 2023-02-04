import express = require('express')
import { uploadStantions, uploadTravel, htmlUpload } from '../controllers/upload';
const uploadRouter = express.Router()
import * as passport from 'passport'
import {upload} from "../middleware/upload"

//uploadRouter.get('/',passport.authenticate('jwt',{session: false}),htmlUpload)
//uploadRouter.post('/Stantions', passport.authenticate('jwt',{session: false}), uploadStantions)
//uploadRouter.post('/Travel', passport.authenticate('jwt',{session: false}), uploadTravel)

uploadRouter.get('/', htmlUpload)
uploadRouter.post('/Stantions', upload.single('filedata'),  uploadStantions)
uploadRouter.post('/Travel', upload.single('filedata'), uploadTravel)


export{uploadRouter}