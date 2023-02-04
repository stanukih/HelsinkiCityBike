import express = require('express')
import { receiving_travel, receiving_travels_quantity, saveBaseTravelPack} from '../controllers/travel';
const travelRouter = express.Router()
import * as passport from 'passport'
import {upload} from "../middleware/upload"

//stantionRouter.get('/stantion:page.:size.:sort.:filter',  receiving_stations)
travelRouter.get('/travel',passport.authenticate('jwt',{session: false}),  receiving_travel)
travelRouter.get('/travel_quantity',passport.authenticate('jwt',{session: false}),  receiving_travels_quantity)
travelRouter.post('/import_travels', upload.single('filedata'), saveBaseTravelPack)
export{travelRouter}