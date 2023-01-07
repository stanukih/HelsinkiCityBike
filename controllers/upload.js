"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.htmlUpload = exports.uploadTravel = exports.uploadStantions = void 0;
var Stantions_1 = require("../models/Stantions");
var Travel_1 = require("../models/Travel");
var lineReader = require("line-reader");
var ErrorLoad_1 = require("../models/ErrorLoad");
function saveBaseStantions(csv, index, fileLoad) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var temp_data, data, i, temp_data2, j, errorLoad, errorLoad, StantionSearch, Stantion;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (index === 0) {
                        return [2 /*return*/];
                    }
                    temp_data = csv.split('"');
                    data = [];
                    for (i = 0; i < temp_data.length; i++) {
                        if (i % 2 === 0) {
                            temp_data2 = temp_data[i].split(',');
                            for (j = 0; j < temp_data2.length; j++) {
                                if (temp_data2[j] != "") {
                                    data.push(temp_data2[j]);
                                }
                            }
                        }
                        else {
                            data.push(temp_data[i]);
                        }
                    }
                    if ((isNaN(Number(data[0]))) ||
                        (isNaN(Number(data[1]))) ||
                        (isNaN(Number(data[10]))) ||
                        (isNaN(Number(data[11]))) ||
                        (isNaN(Number(data[12])))) {
                        try {
                            errorLoad = new ErrorLoad_1.errorModel({
                                string_to_load: csv,
                                doctype: 'Stantion',
                                error: 'E01101112',
                                fileLoad: fileLoad
                            });
                            errorLoad.save();
                        }
                        catch (e) {
                            throw "Ecorrect";
                        }
                        console.log("E01101112");
                        return [2 /*return*/];
                    }
                    //const data = csv.split(',')
                    if (data.length != 13) {
                        try {
                            errorLoad = new ErrorLoad_1.errorModel({
                                string_to_load: csv,
                                doctype: 'Stantion',
                                error: 'E13',
                                fileLoad: fileLoad
                            });
                            errorLoad.save();
                        }
                        catch (e) {
                            throw "Ecorrect";
                        }
                        console.log("E13");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, Stantions_1.stantionModel.findOne({
                            $or: [{ id: data[1] }, { fid: data[0] }]
                        })];
                case 1:
                    StantionSearch = _d.sent();
                    if ((StantionSearch)) {
                        console.log("EDubl");
                        return [2 /*return*/];
                    }
                    try {
                        Stantion = new Stantions_1.stantionModel({
                            fid: data[0],
                            id: data[1],
                            nimi: data[2],
                            namn: data[3],
                            name: data[4],
                            osoite: data[5],
                            adress: data[6],
                            kaupunki: (_a = data[7]) !== null && _a !== void 0 ? _a : '',
                            stad: (_b = data[8]) !== null && _b !== void 0 ? _b : '',
                            operaattor: (_c = data[9]) !== null && _c !== void 0 ? _c : '',
                            kapasiteet: data[10],
                            positionX: data[11],
                            positionY: data[12],
                            fileLoad: fileLoad
                        });
                        Stantion.save();
                    }
                    catch (e) {
                        throw "Ecorrect";
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function saveBaseTravel(csv, index, fileLoad) {
    return __awaiter(this, void 0, void 0, function () {
        var temp_data, data, i, temp_data2, j, errorLoad, errorLoad, errorLoad, Travel;
        return __generator(this, function (_a) {
            if (index === 0) {
                return [2 /*return*/];
            }
            temp_data = csv.split('"');
            data = [];
            for (i = 0; i < temp_data.length; i++) {
                if (i % 2 === 0) {
                    temp_data2 = temp_data[i].split(',');
                    for (j = 0; j < temp_data2.length; j++) {
                        if (temp_data2[j] != "") {
                            data.push(temp_data2[j]);
                        }
                    }
                }
                else {
                    data.push(temp_data[i]);
                }
            }
            if (data.length != 8) {
                try {
                    errorLoad = new ErrorLoad_1.errorModel({
                        string_to_load: csv,
                        doctype: 'Travel',
                        error: 'E8'
                    });
                    errorLoad.save();
                }
                catch (e) {
                    throw "Ecorrect";
                }
                console.log("E8");
                return [2 /*return*/];
            }
            if ((isNaN(Number(data[2]))) ||
                (isNaN(Number(data[4]))) ||
                (isNaN(Number(data[6]))) ||
                (isNaN(Number(data[7])))) {
                try {
                    errorLoad = new ErrorLoad_1.errorModel({
                        string_to_load: csv,
                        doctype: 'Travel',
                        error: 'E01101112',
                        fileLoad: fileLoad
                    });
                    errorLoad.save();
                }
                catch (e) {
                    throw "Ecorrect";
                }
                console.log("E01101112");
                return [2 /*return*/];
            }
            if ((isNaN(Date.parse(data[0]))) ||
                (isNaN(Date.parse(data[1])))) {
                try {
                    errorLoad = new ErrorLoad_1.errorModel({
                        string_to_load: csv,
                        doctype: 'Travel',
                        error: 'E01101112',
                        fileLoad: fileLoad
                    });
                    errorLoad.save();
                }
                catch (e) {
                    throw "Ecorrect";
                }
                console.log("E01101112");
                return [2 /*return*/];
            }
            //const data = csv.split(',')   
            if ((Number(data[7]) < 10) || (Number(data[8]) < 10)) {
                console.log("E10");
            }
            /*Ability to store mongo id*/
            /*
            const StantionSearch1 = await stantionModel.findOne({
                id:data[2]
            })
            if (!(StantionSearch1)){
                console.log("ESN1")
                console.log("data", data)
                return
            }
            const StantionSearch2 = await stantionModel.findOne({
                id:data[2]
            })
            if (!(StantionSearch2)){
                console.log("ESN2")
                console.log("data", data)
                return
            }*/
            try {
                Travel = new Travel_1.travelModel({
                    departure_time: data[0],
                    return_time: data[1],
                    departure_station_id: data[2],
                    departure_station_name: data[3],
                    return_station_id: data[4],
                    return_station_name: data[5],
                    distance: data[6],
                    duration: data[7],
                    fileLoad: fileLoad
                });
                Travel.save();
            }
            catch (e) {
                throw "Ecorrect";
            }
            return [2 /*return*/];
        });
    });
}
function uploadStantions(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var index;
        return __generator(this, function (_a) {
            if (!(req.file)) {
                res.status(409).json({
                    message: "File upload error. The file must be less than 300 megabytes and have *.csv extension"
                });
                return [2 /*return*/];
            }
            index = 0;
            lineReader.eachLine("./".concat(req.file.path), function (line) {
                try {
                    saveBaseStantions(line, index, req.file.path);
                }
                catch (e) {
                    res.status(409).json({
                        message: "File filling error"
                    });
                }
                index++;
            });
            res.status(200).json({
                message: "Data load"
            });
            return [2 /*return*/];
        });
    });
}
exports.uploadStantions = uploadStantions;
function uploadTravel(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var index;
        return __generator(this, function (_a) {
            if (req.file.path.slice(-4) != ".csv") {
                res.status(409).json({
                    message: "Error"
                });
                return [2 /*return*/];
            }
            index = 0;
            lineReader.eachLine("./".concat(req.file.path), function (line) {
                try {
                    saveBaseTravel(line, index, req.file.path);
                }
                catch (e) {
                    res.status(409).json({
                        message: "File filling error"
                    });
                }
                index++;
            });
            res.status(200).json({
                message: "Data load"
            });
            return [2 /*return*/];
        });
    });
}
exports.uploadTravel = uploadTravel;
function htmlUpload(req, res) {
    res.render('htmlUpload');
}
exports.htmlUpload = htmlUpload;
