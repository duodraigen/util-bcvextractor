"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Currencies = exports.Banks = void 0;
var Banks;
(function (Banks) {
    Banks["bnc"] = "Banco Nacional de Cr\u00E9dito BNC";
    Banks["bbva"] = "BBVA Provincial";
    Banks["other"] = "Otras Instituciones";
    Banks["merca"] = "Banco Mercantil";
    Banks["exter"] = "Banco Exterior";
    Banks["banes"] = "Banesco";
})(Banks || (exports.Banks = Banks = {}));
var Currencies;
(function (Currencies) {
    Currencies["usd"] = "dolar";
    Currencies["rub"] = "rublo";
    Currencies["try"] = "lira";
    Currencies["eur"] = "euro";
    Currencies["yen"] = "yuan";
})(Currencies || (exports.Currencies = Currencies = {}));
