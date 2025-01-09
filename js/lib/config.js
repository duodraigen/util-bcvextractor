"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BANKS_TABLE_SRC = exports.CURRENCIES_SRC = exports.FALLBACK_BANK_DATA = exports.REQ_AGENT = void 0;
const node_https_1 = require("node:https");
exports.REQ_AGENT = new node_https_1.Agent({
    rejectUnauthorized: false,
});
exports.FALLBACK_BANK_DATA = {
    published: "",
    buy: Number.NaN,
    sell: Number.NaN,
};
exports.CURRENCIES_SRC = "https://www.bcv.org.ve/";
exports.BANKS_TABLE_SRC = "https://www.bcv.org.ve/tasas-informativas-sistema-bancario";
