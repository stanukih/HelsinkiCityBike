import express = require('express')
import { receiving_travel, receiving_travels_quantity} from '../controllers/travel';
const travelRouter = express.Router()
import * as passport from 'passport'

//stantionRouter.get('/stantion:page.:size.:sort.:filter',  receiving_stations)
travelRouter.get('/travel',passport.authenticate('jwt',{session: false}),  receiving_travel)
travelRouter.get('/travel_quantity',passport.authenticate('jwt',{session: false}),  receiving_travels_quantity)

export{travelRouter}