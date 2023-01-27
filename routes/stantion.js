"use strict";
exports.__esModule = true;
exports.stantionRouter = void 0;
var express = require("express");
var stantion_1 = require("../controllers/stantion");
var stantionRouter = express.Router();
exports.stantionRouter = stantionRouter;
var passport = require("passport");
//stantionRouter.get('/stantion:page.:size.:sort.:filter',  receiving_stations)
stantionRouter.get('/stantion', passport.authenticate('jwt', { session: false }), stantion_1.receiving_stations);
stantionRouter.get('/stantion_quantity', passport.authenticate('jwt', { session: false }), stantion_1.receiving_stations_quantity);
stantionRouter.post('/add_stantion_one', stantion_1.saveBaseStantions);
