"use strict";
exports.__esModule = true;
exports.authRouter = void 0;
//import * as express from 'express';
//const app = express()
var express = require("express");
var auth_1 = require("../controllers/auth");
var authRouter = express.Router();
exports.authRouter = authRouter;
authRouter.post('/login', auth_1.login);
authRouter.post('/register', auth_1.register);
