"use strict";
exports.__esModule = true;
exports.upload = void 0;
var multer = require("multer");
//import {diskStorage, Multer, Options} from 'multer'
var moment = require("moment");
var keys_1 = require("../config/keys");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'temp_file/');
    },
    filename: function (req, file, cb) {
        cb(null, moment().format('DDMMYYYY-HHmmss_SSS') + file.originalname);
        //cb(null, 'test')
    }
});
var upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype === 'text/csv') {
            cb(null, true);
        }
        else {
            cb(null, false);
        }
    },
    limits: { fileSize: keys_1.setings.limits_file_upload }
});
exports.upload = upload;
