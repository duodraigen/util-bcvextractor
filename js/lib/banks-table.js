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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBanksTable = getBanksTable;
exports.getBankFromTable = getBankFromTable;
const axios_1 = __importDefault(require("axios"));
const node_html_parser_1 = require("node-html-parser");
const config_1 = require("./config");
const utils_1 = require("./utils");
const enums_1 = require("./enums");
function getBanksTable() {
    return __awaiter(this, void 0, void 0, function* () {
        const bankTable = {};
        try {
            return yield axios_1.default
                .get(config_1.BANKS_TABLE_SRC, { httpsAgent: config_1.REQ_AGENT })
                .then(({ data }) => {
                var _a;
                const docTree = (0, node_html_parser_1.parse)(data);
                const rows = (_a = docTree.querySelector("tbody")) === null || _a === void 0 ? void 0 : _a.childNodes;
                if (rows) {
                    for (const row of rows) {
                        const cells = (0, utils_1.decodeRow)(row.innerText);
                        bankTable[cells[1]] = {
                            published: cells[0],
                            buy: (0, utils_1.toFloat)(cells[2]),
                            sell: (0, utils_1.toFloat)(cells[3]),
                        };
                    }
                }
                return bankTable;
            });
        }
        catch (except) {
            console.error(except);
            for (const info of Object.values(enums_1.Banks)) {
                bankTable[info] = config_1.FALLBACK_BANK_DATA;
            }
            return bankTable;
        }
    });
}
function getBankFromTable(bank) {
    return __awaiter(this, void 0, void 0, function* () {
        const bankInfo = {};
        try {
            return yield axios_1.default
                .get(config_1.BANKS_TABLE_SRC, { httpsAgent: config_1.REQ_AGENT })
                .then(({ data }) => {
                const docTree = (0, node_html_parser_1.parse)(data);
                let row = docTree.querySelector("tbody > tr");
                while (row) {
                    const cells = (0, utils_1.decodeRow)(row.innerText);
                    if (bank === cells[1]) {
                        bankInfo[bank] = {
                            published: cells[0],
                            buy: (0, utils_1.toFloat)(cells[2]),
                            sell: (0, utils_1.toFloat)(cells[3]),
                        };
                        break;
                    }
                    row = row.nextElementSibling;
                }
                return bankInfo;
            });
        }
        catch (except) {
            console.error(except);
            bankInfo[bank] = config_1.FALLBACK_BANK_DATA;
            return bankInfo;
        }
    });
}
