"use strict";
exports.__esModule = true;
exports.userModel = void 0;
var mongoose = require("mongoose");
var Shema = mongoose.Schema;
var userShema = new Shema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        required: true
    }
});
var userModel = mongoose.model('users', userShema);
exports.userModel = userModel;
