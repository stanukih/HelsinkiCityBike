"use strict";
exports.__esModule = true;
exports.app = void 0;
//import * as express from 'express';
//const app = express()
var express = require("express");
var app = express();
exports.app = app;
var auth_1 = require("./routes/auth");
var upload_1 = require("./routes/upload");
var bodyParser = require("body-parser");
var cors = require("cors");
var morgan = require("morgan");
var mongoose_1 = require("mongoose");
var keys_1 = require("./config/keys");
var passport = require("passport");
var passport_1 = require("./middleware/passport");
var path = require("path");
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(passport.initialize());
(0, passport_1.passportfun)(passport);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(md5)
app.use(morgan('dev'));
app.use(cors());
app.use('/api/upload', upload_1.uploadRouter);
app.use('/api/auth', auth_1.authRouter);
mongoose_1["default"].connect(keys_1.setings.mongoURI)
    .then(function () { return console.log('mongodb connect'); })["catch"](function (error) { return console.log(error); });
