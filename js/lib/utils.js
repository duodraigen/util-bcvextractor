"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toFloat = toFloat;
exports.decodeRow = decodeRow;
function toFloat(str) {
    var _a;
    if (!str)
        return Number.NaN;
    const FLOAT_REGEX = /[0-9]+(?:\.|,)?[0-9]*/;
    const num = (_a = str.match(FLOAT_REGEX)) === null || _a === void 0 ? void 0 : _a[0];
    if (!num)
        return Number.NaN;
    return Number.parseFloat(num.replace(",", "."));
}
function decodeRow(rawStr) {
    const FILL_REGEX = /\n|\s{2,}/gm;
    return rawStr.split(FILL_REGEX).filter((item) => item !== "");
}
