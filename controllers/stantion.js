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
exports.saveBaseStantions = exports.receiving_stations_quantity = exports.receiving_stations = void 0;
//const multer  = require("multer");
//const upload = multer({dest:"uploads"})
var Stantions_1 = require("../models/Stantions");
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
                        console.log(parseFields(req.query.fields));
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
//interface 
function saveBaseStantions(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var dataStantionount, stantion, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
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
                        res.status(400).json({
                            status_add: "failed",
                            codeFailed: 1015,
                            message: "Not all required fields are present in the request"
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
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    console.log(req.body);
                    stantion = new Stantions_1.stantionModel({
                        fid: req.body.fid,
                        id: req.body.id,
                        nimi: req.body.nimi,
                        namn: req.body.namn,
                        name: req.body.name,
                        osoite: req.body.osoite,
                        adress: req.body.adress,
                        kaupunki: req.body.kaupunki ? req.body.kaupunki : null,
                        stad: req.body.stad ? req.body.stad : null,
                        operaattor: req.body.operaattor ? req.body.operaattor : null,
                        kapasiteet: req.body.kapasiteet,
                        positionX: req.body.positionX,
                        positionY: req.body.positionY
                    });
                    console.log("---------3");
                    return [4 /*yield*/, stantion.save()];
                case 3:
                    _a.sent();
                    res.status(200).json({
                        status_add: "success"
                    });
                    return [2 /*return*/];
                case 4:
                    e_3 = _a.sent();
                    console.log(e_3);
                    res.status(400).json({
                        status_add: "failed",
                        codeFailed: 1100,
                        message: "Record creation error."
                    });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.saveBaseStantions = saveBaseStantions;
