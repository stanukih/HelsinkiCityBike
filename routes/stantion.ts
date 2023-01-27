import express = require('express')
import { receiving_stations, receiving_stations_quantity, saveBaseStantions} from '../controllers/stantion';
const stantionRouter = express.Router()
import * as passport from 'passport'

//stantionRouter.get('/stantion:page.:size.:sort.:filter',  receiving_stations)
stantionRouter.get('/stantion',passport.authenticate('jwt',{session: false}),  receiving_stations)
stantionRouter.get('/stantion_quantity',passport.authenticate('jwt',{session: false}),  receiving_stations_quantity)
stantionRouter.post('/add_stantion_one',   saveBaseStantions)


export{stantionRouter}