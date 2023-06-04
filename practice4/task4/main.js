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
Object.defineProperty(exports, "__esModule", { value: true });
var os = require("os");
var si = require("systeminformation");
//Завдання 4
var frequencyInSeconds = parseInt(process.argv[2]);
function printSystemInfo() {
    var systemInfo = {
        'Operating System': os.platform(),
        'Architecture': os.arch(),
        'Current User': os.userInfo().username,
    };
    console.log('System Information:');
    Object.entries(systemInfo).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        console.log("".concat(key, ": ").concat(value));
    });
}
function printCPUInfo() {
    return __awaiter(this, void 0, void 0, function () {
        var cpuInfo, temperatureInfo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, si.cpu()];
                case 1:
                    cpuInfo = _a.sent();
                    console.log('CPU Cores:');
                    return [4 /*yield*/, si.cpuTemperature()];
                case 2:
                    temperatureInfo = _a.sent();
                    console.log("CPU Temperature: ".concat(temperatureInfo.main, " \u00B0C"));
                    return [2 /*return*/];
            }
        });
    });
}
function printGraphicsInfo() {
    return __awaiter(this, void 0, void 0, function () {
        var graphicsInfo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, si.graphics()];
                case 1:
                    graphicsInfo = _a.sent();
                    console.log('Graphics Controllers:');
                    graphicsInfo.controllers.forEach(function (controller, index) {
                        console.log("Controller ".concat(index + 1, ": ").concat(controller.vendor, " ").concat(controller.model));
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function printMemoryInfo() {
    return __awaiter(this, void 0, void 0, function () {
        var memoryInfo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, si.mem()];
                case 1:
                    memoryInfo = _a.sent();
                    console.log('Memory:');
                    console.log("Total: ".concat(Math.round(memoryInfo.total / Math.pow(1024, 3)), " GB"));
                    console.log("Used: ".concat(Math.round(memoryInfo.used / Math.pow(1024, 3)), " GB"));
                    console.log("Free: ".concat(Math.round(memoryInfo.free / Math.pow(1024, 3)), " GB"));
                    return [2 /*return*/];
            }
        });
    });
}
function printBatteryInfo() {
    return __awaiter(this, void 0, void 0, function () {
        var batteryInfo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, si.battery()];
                case 1:
                    batteryInfo = _a.sent();
                    console.log('Battery Information:');
                    console.log("Charging: ".concat(batteryInfo.isCharging));
                    console.log("Percent: ".concat(batteryInfo.percent));
                    console.log("Remaining Time: ".concat(batteryInfo.timeRemaining));
                    return [2 /*return*/];
            }
        });
    });
}
function runSystemInfo() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!true) return [3 /*break*/, 6];
                    printSystemInfo();
                    return [4 /*yield*/, printCPUInfo()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, printGraphicsInfo()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, printMemoryInfo()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, printBatteryInfo()];
                case 4:
                    _a.sent();
                    console.log('----------------------------------');
                    return [4 /*yield*/, sleep(frequencyInSeconds * 1000)];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 0];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
runSystemInfo();
