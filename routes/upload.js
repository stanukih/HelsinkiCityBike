"use strict";
exports.__esModule = true;
exports.uploadRouter = void 0;
var express = require("express");
var upload_1 = require("../controllers/upload");
var uploadRouter = express.Router();
exports.uploadRouter = uploadRouter;
var upload_2 = require("../middleware/upload");
//uploadRouter.get('/',passport.authenticate('jwt',{session: false}),htmlUpload)
//uploadRouter.post('/Stantions', passport.authenticate('jwt',{session: false}), uploadStantions)
//uploadRouter.post('/Travel', passport.authenticate('jwt',{session: false}), uploadTravel)
uploadRouter.get('/', upload_1.htmlUpload);
uploadRouter.post('/Stantions', upload_2.upload.single('filedata'), upload_1.uploadStantions);
uploadRouter.post('/Travel', upload_2.upload.single('filedata'), upload_1.uploadTravel);
