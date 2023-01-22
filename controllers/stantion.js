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
exports.receiving_stations_quantity = exports.receiving_stations = void 0;
//const multer  = require("multer");
//const upload = multer({dest:"uploads"})
var Stantions_1 = require("../models/Stantions");
function filterNotCorrect(FilterString) {
    if (FilterString.match("[^A-Za-z\u00C4\u00D6\u00C5\u00E4\u00F6\u00E50-9s.,_]")) {
        console.log("FilterString", FilterString);
        console.log("filterNotCorrect", FilterString.match(".*[^A-Za-z\u00C4\u00D6\u00C5\u00E4\u00F6\u00E50-9s.,_]*.*"));
        return true;
    }
    else
        return false;
}
function parseFilter(FilterString) {
    var filter_end = '';
    var filter_split = FilterString.split("_");
    if ((filter_split.length !== 3) || (filterNotCorrect(filter_split[2]))) {
        return "{}";
    }
    switch (filter_split[1]) {
        case "1":
            filter_end = "{\"".concat(filter_split[0], "\": \"").concat(filter_split[2], "\"}");
            break;
        case "2":
            filter_end = "{\"".concat(filter_split[0], "\": {\"$ne\":\"").concat(filter_split[2], "\"}}");
            break;
        case "3":
            filter_end = "{\"".concat(filter_split[0], "\": {\"$gte\":\"").concat(filter_split[2], "\"}}");
            break;
        case "4":
            filter_end = "{\"".concat(filter_split[0], "\": {\"$lte\":\"").concat(filter_split[2], "\"}}");
            break;
        case "5":
            filter_end = "{\"".concat(filter_split[0], "\": {\"$gt\":\"").concat(filter_split[2], "\"}}");
            break;
        case "6":
            filter_end = "{\"".concat(filter_split[0], "\": {\"$lt\":\"").concat(filter_split[2], "\"}}");
            break;
        case "7":
            filter_end = "{\"".concat(filter_split[0], "\": {\"$regex\":\"").concat(filter_split[2], "\"}}");
            break;
        case "8":
            filter_end = "{\"".concat(filter_split[0], "\": {\"$not\":{\"$regex\":\"").concat(filter_split[2], "\"}}}");
            break;
        default:
            filter_end = "{}";
            break;
    }
    return filter_end;
}
function parseFields(FieldsString) {
    var fields_end = '';
    if (FieldsString.length === 0) {
        return "{_id:0, fileLoad:0, __v:0}";
    }
    for (var index = 0; index < FieldsString.length; index++) {
        fields_end += ', ';
        console.log(FieldsString[index]);
        switch (FieldsString[index]) {
            case "0":
                fields_end += "\"fid\":0";
                break;
            case "1":
                fields_end += "\"id\":0";
                break;
            case "2":
                fields_end += "\"nimi\": 0";
                break;
            case "3":
                fields_end += "\"namn\": 0";
                break;
            case "4":
                fields_end += "\"name\": 0";
                break;
            case "5":
                fields_end += "\"osoite\":0";
                break;
            case "6":
                fields_end += "\"adress\":0";
                break;
            case "7":
                fields_end += "\"kaupunki\":0";
                break;
            case "8":
                fields_end += "\"stad\":0";
                break;
            case "9":
                fields_end += "\"operaattor\":0";
                break;
            case "A":
                fields_end += "\"kapasiteet\":0";
                break;
            case "B":
                fields_end += "\"positionX\":0";
                break;
            case "C":
                fields_end += "\"positionY\":0";
                break;
        }
    }
    return "{\"_id\":0, \"fileLoad\":0, \"__v\":0" + fields_end + "}";
}
function receiving_stations(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var page, size, sort, filter, fields, dataStantion, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    page = 3;
                    size = 100;
                    sort = "_id";
                    filter = void 0;
                    fields = void 0;
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
                    if (req.query.fields != '') {
                        console.log(parseFields(req.query.fields));
                        fields = JSON.parse(parseFields(req.query.fields));
                    }
                    return [4 /*yield*/, Stantions_1.stantionModel.find(filter, fields).sort(sort).skip((page - 1) * size).limit(size)];
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
                    filter = void 0;
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
