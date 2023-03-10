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
        while (_) try {
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
exports.saveBaseStantionsPack = exports.saveBaseStantions = exports.receiving_stations_quantity = exports.receiving_stations = void 0;
//const multer  = require("multer");
//const upload = multer({dest:"uploads"})
var Stantions_1 = require("../models/Stantions");
var ErrorLoad_1 = require("../models/ErrorLoad");
var stantion_1 = require("../interfaces/stantion");
var lineReader = require("line-reader");
function filterNotCorrect(FilterString) {
    if (FilterString.match("[^A-Z0-9_]")) {
        return true;
    }
    else {
        return false;
    }
}
function parseFilter(FilterString) {
    if (filterNotCorrect(FilterString)) {
        return "{}";
    }
    var filter_split = FilterString.split("_");
    if (filter_split.length !== 3) {
        return "{}";
    }
    var filter_end = '';
    switch (filter_split[1]) {
        case "1":
            filter_end = "{\"".concat(fieldFromNumber(filter_split[0]), "\": \"").concat(filter_split[2], "\"}");
            break;
        case "2":
            filter_end = "{\"".concat(fieldFromNumber(filter_split[0]), "\": {\"$ne\":\"").concat(filter_split[2], "\"}}");
            break;
        case "3":
            filter_end = "{\"".concat(fieldFromNumber(filter_split[0]), "\": {\"$gte\":\"").concat(filter_split[2], "\"}}");
            break;
        case "4":
            filter_end = "{\"".concat(fieldFromNumber(filter_split[0]), "\": {\"$lte\":\"").concat(filter_split[2], "\"}}");
            break;
        case "5":
            filter_end = "{\"".concat(fieldFromNumber(filter_split[0]), "\": {\"$gt\":\"").concat(filter_split[2], "\"}}");
            break;
        case "6":
            filter_end = "{\"".concat(fieldFromNumber(filter_split[0]), "\": {\"$lt\":\"").concat(filter_split[2], "\"}}");
            break;
        case "7":
            filter_end = "{\"".concat(fieldFromNumber(filter_split[0]), "\": {\"$regex\":\"").concat(filter_split[2], "\"}}");
            break;
        case "8":
            filter_end = "{\"".concat(fieldFromNumber(filter_split[0]), "\": {\"$not\":{\"$regex\":\"").concat(filter_split[2], "\"}}}");
            break;
        default:
            filter_end = "{}";
            break;
    }
    return filter_end;
}
function fieldFromNumber(fieldsNumber) {
    switch (fieldsNumber) {
        case "0":
            return "fid";
        case "1":
            return "id";
        case "2":
            return "nimi";
        case "3":
            return "namn";
        case "4":
            return "name";
        case "5":
            return "osoite";
        case "6":
            return "adress";
        case "7":
            return "kaupunki";
        case "8":
            return "stad";
        case "9":
            return "operaattor";
        case "A":
            return "kapasiteet";
        case "B":
            return "positionX";
        case "C":
            return "positionY";
        default:
            return "fid";
    }
}
function parseFields(FieldsString) {
    if (FieldsString.length === 0) {
        return { "_id": 0, "fileLoad": 0, "__v": 0 };
    }
    var fields = {
        "_id": 0,
        "fileLoad": 0,
        "__v": 0,
        "fid": 0,
        "id": 0,
        "nimi": 0,
        "namn": 0,
        "name": 0,
        "osoite": 0,
        "adress": 0,
        "kaupunki": 0,
        "stad": 0,
        "operaattor": 0,
        "kapasiteet": 0,
        "positionX": 0,
        "positionY": 0
    };
    for (var index = 0; index < FieldsString.length; index++) {
        delete fields[fieldFromNumber(FieldsString[index])];
    }
    return fields;
}
function receiving_stations(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var page, size, sort, filter, fields, dataStantion, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    page = 2;
                    size = 100;
                    sort = "_id";
                    filter = JSON.parse("{}");
                    fields = {};
                    if (req.query.page != '') {
                        page = req.query.page;
                    }
                    if ((req.query.size != '') && (req.query.size < 100)) {
                        size = req.query.size;
                    }
                    if (req.query.sort != '') {
                        sort = req.query.sort;
                    }
                    if (req.query.filter != '') {
                        filter = JSON.parse(parseFilter(req.query.filter));
                    }
                    if (req.query.fields != '') {
                        fields = parseFields(req.query.fields);
                    }
                    return [4 /*yield*/, Stantions_1.stantionModel.find(filter, fields).sort(fieldFromNumber(sort)).skip((page - 1) * size).limit(size)];
                case 1:
                    dataStantion = _a.sent();
                    res.status(200).json(dataStantion);
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    //res.status(200).json("error","Error getting from database")
                    console.log(e_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.receiving_stations = receiving_stations;
function receiving_stations_quantity(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var page, size, sort, filter, dataStantionount, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    page = 3;
                    size = 100;
                    sort = "_id";
                    filter = JSON.parse("{}");
                    if (req.query.page != '') {
                        page = req.query.page;
                    }
                    if (req.query.size != '') {
                        size = req.query.size;
                    }
                    if (req.query.sort != '') {
                        sort = req.query.sort;
                    }
                    if (req.query.filter != '') {
                        filter = JSON.parse(parseFilter(req.query.filter));
                    }
                    return [4 /*yield*/, Stantions_1.stantionModel.find(filter, { _id: 0, fileLoad: 0, __v: 0 }).count()];
                case 1:
                    dataStantionount = _a.sent();
                    res.status(200).json(dataStantionount);
                    return [3 /*break*/, 3];
                case 2:
                    e_2 = _a.sent();
                    //res.status(200).json("error","Error getting from database")
                    console.log(e_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.receiving_stations_quantity = receiving_stations_quantity;
function validationOfFields(req) {
    if ((!(req.body.fid)) || (isNaN(Number(req.body.fid))) ||
        (!(req.body.id)) || (isNaN(Number(req.body.id))) ||
        (!(req.body.nimi)) || ((req.body.nimi === "")) ||
        (!(req.body.namn)) || ((req.body.namn === "")) ||
        (!(req.body.name)) || ((req.body.name === "")) ||
        (!(req.body.osoite)) || ((req.body.osoite === "")) ||
        (!(req.body.adress)) || ((req.body.adress === "")) ||
        (!(req.body.kapasiteet)) || (isNaN(Number(req.body.kapasiteet))) ||
        (!(req.body.positionX)) || (isNaN(Number(req.body.positionX))) ||
        (!(req.body.positionY)) || (isNaN(Number(req.body.positionY)))) {
        return {
            status_add: "failed",
            codeFailed: 1015,
            message: "Not all required fields are present in the request"
        };
    }
    else
        return { status_add: "success" };
}
function saveBaseStantions(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var resultvalidationOfFields, dataStantionount, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    resultvalidationOfFields = validationOfFields(req);
                    if (resultvalidationOfFields.status_add === "failed") {
                        res.status(400).json({
                            status_add: resultvalidationOfFields.status_add,
                            codeFailed: resultvalidationOfFields.codeFailed,
                            message: resultvalidationOfFields.message
                        });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, Stantions_1.stantionModel.findOne({ $or: [{ fid: req.body.fid }, { id: req.body.id }] })];
                case 1:
                    dataStantionount = _a.sent();
                    if (!dataStantionount) return [3 /*break*/, 2];
                    res.status(400).json({
                        status_add: "failed",
                        codeFailed: 1020,
                        message: "Record creation error. Record conflict",
                        record: dataStantionount
                    });
                    return [2 /*return*/];
                case 2: return [4 /*yield*/, saveFromDatabase(req.body)];
                case 3:
                    result = _a.sent();
                    if (result.status_add === "success") {
                        res.status(200).json({
                            status_add: "success"
                        });
                    }
                    else {
                        res.status(400).json({
                            status_add: "failed",
                            codeFailed: result.codeFailed,
                            message: result.message
                        });
                    }
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.saveBaseStantions = saveBaseStantions;
function saveFromDatabase(data) {
    return __awaiter(this, void 0, void 0, function () {
        var stantion, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    stantion = new Stantions_1.stantionModel({
                        fid: data.fid,
                        id: data.id,
                        nimi: data.nimi,
                        namn: data.namn,
                        name: data.name,
                        osoite: data.osoite,
                        adress: data.adress,
                        kaupunki: data.kaupunki,
                        stad: data.stad,
                        operaattor: data.operaattor,
                        kapasiteet: data.kapasiteet,
                        positionX: data.positionX,
                        positionY: data.positionY,
                        user: data.user
                    });
                    if ((0, stantion_1.typeImportPack)(data)) {
                        stantion.fileLoad = data.fileLoad;
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, stantion.save()];
                case 2:
                    _a.sent();
                    return [2 /*return*/, { status_add: "success" }];
                case 3:
                    e_3 = _a.sent();
                    return [2 /*return*/, {
                            status_add: "failed",
                            message: e_3
                        }];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function saveBaseStantionsPack(req, res) {
    var _this = this;
    if (!(req.file)) {
        res.status(409).json({
            status_add: "failed",
            codeFailed: 1053,
            message: "File not loaded"
        });
        return;
    }
    var filePath = req.file.path;
    res.status(200).json({
        status_add: "success",
        message: "File received. Its processing"
    });
    var index = 0;
    lineReader.eachLine("./".concat(filePath), function (line) { return __awaiter(_this, void 0, void 0, function () {
        var dataFromString, statusDataFromString, statusSave;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(index > 0)) return [3 /*break*/, 5];
                    dataFromString = lineParce(line);
                    return [4 /*yield*/, correctLine(dataFromString)];
                case 1:
                    statusDataFromString = _a.sent();
                    if (!(statusDataFromString.status_add === "success")) return [3 /*break*/, 3];
                    return [4 /*yield*/, saveFromDatabase({
                            fid: Number(dataFromString[0]),
                            id: Number(dataFromString[1]),
                            nimi: dataFromString[2],
                            namn: dataFromString[3],
                            name: dataFromString[4],
                            osoite: dataFromString[5],
                            adress: dataFromString[6],
                            kaupunki: dataFromString[7],
                            stad: dataFromString[8],
                            operaattor: dataFromString[9],
                            kapasiteet: Number(dataFromString[10]),
                            positionX: Number(dataFromString[11]),
                            positionY: Number(dataFromString[12]),
                            fileLoad: filePath
                        })];
                case 2:
                    statusSave = _a.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, saveFromDatabaseError({
                        string_to_load: line,
                        doctype: "Stantion",
                        error: statusDataFromString.codeFailed,
                        fileLoad: filePath
                    })];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    index++;
                    return [2 /*return*/];
            }
        });
    }); });
}
exports.saveBaseStantionsPack = saveBaseStantionsPack;
function lineParce(line) {
    var temp_data = line.split('"');
    var data = [];
    for (var i = 0; i < temp_data.length; i++) {
        if (i % 2 === 0) {
            var temp_data2 = temp_data[i].split(',');
            for (var j = 0; j < temp_data2.length; j++) {
                if (temp_data2[j] != "") {
                    data.push(temp_data2[j]);
                }
            }
        }
        else {
            data.push(temp_data[i]);
        }
    }
    return data;
}
function correctLine(data) {
    return __awaiter(this, void 0, void 0, function () {
        var StantionSearch;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (data.length != 13) {
                        return [2 /*return*/, {
                                status_add: "failed",
                                codeFailed: 13
                            }];
                    }
                    if ((isNaN(Number(data[0]))) ||
                        (isNaN(Number(data[1]))) ||
                        (isNaN(Number(data[10]))) ||
                        (isNaN(Number(data[11]))) ||
                        (isNaN(Number(data[12])))) {
                        return [2 /*return*/, {
                                status_add: "failed",
                                codeFailed: 1101112
                            }];
                    }
                    return [4 /*yield*/, Stantions_1.stantionModel.findOne({
                            $or: [{ id: data[1] }, { fid: data[0] }]
                        })];
                case 1:
                    StantionSearch = _a.sent();
                    if ((StantionSearch)) {
                        return [2 /*return*/, {
                                status_add: "failed",
                                codeFailed: 9669
                            }];
                    }
                    return [2 /*return*/, {
                            status_add: "success"
                        }];
            }
        });
    });
}
function saveFromDatabaseError(data) {
    return __awaiter(this, void 0, void 0, function () {
        var errorToSave, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errorToSave = new ErrorLoad_1.errorModel(data);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, errorToSave.save()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_4 = _a.sent();
                    console.log(e_4);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
