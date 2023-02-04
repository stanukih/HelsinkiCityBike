import express = require('express')
import { receiving_stations, receiving_stations_quantity, saveBaseStantions, saveBaseStantionsPack} from '../controllers/stantion';
import { uploadStantions } from '../controllers/upload';
const stantionRouter = express.Router()
import * as passport from 'passport'
import {upload} from "../middleware/upload"

//stantionRouter.get('/stantion:page.:size.:sort.:filter',  receiving_stations)
stantionRouter.get('/stantion',passport.authenticate('jwt',{session: false}),  receiving_stations)
stantionRouter.get('/stantion_quantity',passport.authenticate('jwt',{session: false}),  receiving_stations_quantity)
stantionRouter.post('/add_stantion_one',   saveBaseStantions)
stantionRouter.post('/import_stantions', upload.single('filedata'), saveBaseStantionsPack)


export{stantionRouter}