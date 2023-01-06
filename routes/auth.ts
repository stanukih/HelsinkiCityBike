//import * as express from 'express';
//const app = express()
import express = require('express')
import { login,register } from '../controllers/auth';
const authRouter = express.Router()

authRouter.post('/login',login)
authRouter.post('/register',register)

export{authRouter}