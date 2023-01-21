//import * as express from 'express';
//const app = express()
import express = require('express')
const app = express()

import { authRouter } from './routes/auth'
import { uploadRouter } from './routes/upload'
import * as bodyParser from 'body-parser'
import cors = require('cors')
import morgan = require('morgan')
import mongoose from 'mongoose';
import { setings } from './config/keys'
import * as passport from 'passport'
import {passportfun} from './middleware/passport'
import path = require("path");
import { stantionRouter } from './routes/stantion'


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(passport.initialize())
passportfun(passport)

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json())
//app.use(md5)
app.use(morgan('dev'))
app.use(cors())
app.use('/api/upload',uploadRouter)
app.use('/api/stantion',stantionRouter)
app.use('/api/auth',authRouter)


mongoose.connect(setings.mongoURI)
.then(()=>console.log('mongodb connect'))
.catch(error => console.log(error))



export{app}

