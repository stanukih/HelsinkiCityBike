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
exports.saveBaseTravelPack = exports.receiving_travels_quantity = exports.receiving_travel = void 0;
//const multer  = require("multer");
//const upload = multer({dest:"uploads"})
var Travel_1 = require("../models/Travel");
var ErrorLoad_1 = require("../models/ErrorLoad");
var travel_1 = require("../interfaces/travel");
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
    if ((filter_split.length !== 3)) {
        return "{}";
    }
    var filter_end = '';
    switch (filter_split[1]) {
        //comparison operation number for mongo                
        case "1":
            filter_end = "{\"".concat(fieldFromNumber(filter_split[0]), "\": \"").concat(filter_split[2], "}\"");
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
            return "departure_time";
        case "1":
            return "return_time";
        case "2":
            return "departure_station_id";
        case "3":
            return "departure_station_name";
        case "4":
            return "return_station_id";
        case "5":
            return "return_station_name";
        case "6":
            return "distance";
        case "7":
            return "duration";
        default:
            return "departure_time";
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
        "departure_time": 0,
        "return_time": 0,
        "departure_station_id": 0,
        "departure_station_name": 0,
        "return_station_id": 0,
        "return_station_name": 0,
        "distance": 0,
        "duration": 0
    };
    for (var index = 0; index < FieldsString.length; index++) {
        delete fields[fieldFromNumber(FieldsString[index])];
    }
    return fields;
}
function receiving_travel(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var page, size, sort, filter, fields, dataTravel, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    page = 2;
                    size = 100;
                    sort = "\"_id\"";
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
                    return [4 /*yield*/, Travel_1.travelModel.find(filter, fields).sort(fieldFromNumber(sort)).skip((page - 1) * size).limit(size)];
                case 1:
                    dataTravel = _a.sent();
                    res.status(200).json(dataTravel);
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
exports.receiving_travel = receiving_travel;
function receiving_travels_quantity(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var page, size, sort, filter, dataTravel, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    page = 2;
                    size = 100;
                    sort = "_id";
                    filter = JSON.parse("{}");
                    if (req.query.page != '') {
                        page = req.query.page;
                    }
                    if (req.query.filter != '') {
                        filter = JSON.parse(parseFilter(req.query.filter));
                    }
                    return [4 /*yield*/, Travel_1.travelModel.find(filter, { _id: 0, fileLoad: 0, __v: 0 }).count()];
                case 1:
                    dataTravel = _a.sent();
                    res.status(200).json(dataTravel);
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
exports.receiving_travels_quantity = receiving_travels_quantity;
function saveFromDatabase(data) {
    return __awaiter(this, void 0, void 0, function () {
        var travel, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    travel = new Travel_1.travelModel({
                        departure_time: data.departure_time,
                        return_time: data.return_time,
                        departure_station_id: data.departure_station_id,
                        departure_station_name: data.departure_station_name,
                        return_station_id: data.return_station_id,
                        return_station_name: data.return_station_name,
                        distance: data.distance,
                        duration: data.duration
                    });
                    if ((0, travel_1.typeImportPack)(data)) {
                        fileLoad: data.fileLoad;
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, travel.save()];
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
function saveBaseTravelPack(req, res) {
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
                            departure_time: new Date(dataFromString[0]),
                            return_time: new Date(dataFromString[1]),
                            departure_station_id: Number(dataFromString[2]),
                            departure_station_name: dataFromString[3],
                            return_station_id: Number(dataFromString[4]),
                            return_station_name: dataFromString[5],
                            distance: Number(dataFromString[6]),
                            duration: Number(dataFromString[7]),
                            fileLoad: filePath
                        })];
                case 2:
                    statusSave = _a.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, saveFromDatabaseError({
                        string_to_load: line,
                        doctype: "Travel",
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
exports.saveBaseTravelPack = saveBaseTravelPack;
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
        return __generator(this, function (_a) {
            if (data.length != 8) {
                return [2 /*return*/, {
                        status_add: "failed",
                        codeFailed: 8
                    }];
            }
            if ((isNaN(Date.parse(data[0]))) ||
                (isNaN(Date.parse(data[1]))) ||
                (isNaN(Number(data[2]))) ||
                (isNaN(Number(data[4]))) ||
                (isNaN(Number(data[6]))) ||
                (isNaN(Number(data[7])))) {
                return [2 /*return*/, {
                        status_add: "failed",
                        codeFailed: 1101112
                    }];
            }
            /*const TravelSearch = await travelModel.findOne({
                $and:[{departure_time: new Date(data[0])},
                {return_time: new Date(data[1])},
                {departure_station_id: Number(data[2])},
                {departure_station_name: data[3]},
                {return_station_id: Number(data[4])},
                {return_station_name: data[5]},
                {distance: Number(data[6])},
                {duration: Number(data[7])}]
            })
            if ((TravelSearch)){
                return     {
                    status_add:"failed",
                    codeFailed:9669
                }
            }*/
            return [2 /*return*/, {
                    status_add: "success"
                }];
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
