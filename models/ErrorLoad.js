"use strict";
exports.__esModule = true;
exports.errorModel = void 0;
var mongoose = require("mongoose");
var Shema = mongoose.Schema;
var ErrorShema = new Shema({
    string_to_load: {
        type: String,
        required: true
    },
    doctype: {
        type: String,
        required: true
    },
    error: {
        type: Number,
        required: true
    },
    fileLoad: {
        type: String,
        required: true
    }
});
var errorModel = mongoose.model('errors', ErrorShema);
exports.errorModel = errorModel;
