"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CurrencyPipe = (function () {
    function CurrencyPipe() {
    }
    CurrencyPipe.prototype.transform = function (value, exchangeRate) {
        if (exchangeRate === void 0) { exchangeRate = 1; }
        var val = 0;
        if (typeof value === 'string')
            val = parseFloat(value);
        else
            val = Number(value);
        if (0 === val)
            return 0;
        return val * exchangeRate;
    };
    return CurrencyPipe;
}());
CurrencyPipe = __decorate([
    core_1.Pipe({
        name: 'currency'
    })
], CurrencyPipe);
exports.CurrencyPipe = CurrencyPipe;
//# sourceMappingURL=currency.pipe.js.map