"use strict";
exports.__esModule = true;
exports.travelRouter = void 0;
var express = require("express");
var travel_1 = require("../controllers/travel");
var travelRouter = express.Router();
exports.travelRouter = travelRouter;
var passport = require("passport");
//stantionRouter.get('/stantion:page.:size.:sort.:filter',  receiving_stations)
travelRouter.get('/travel', passport.authenticate('jwt', { session: false }), travel_1.receiving_travel);
travelRouter.get('/travel_quantity', passport.authenticate('jwt', { session: false }), travel_1.receiving_travels_quantity);
