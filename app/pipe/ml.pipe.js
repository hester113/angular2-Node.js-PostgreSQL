"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("../../model/common");
var globalLang = document.querySelector('html').getAttribute('lang');
var MLPipe = (function () {
    function MLPipe() {
    }
    MLPipe.prototype.transform = function (value, lang) {
        if (lang === void 0) { lang = null; }
        if (!value)
            return '';
        if (typeof value === 'string')
            return value;
        if (!lang)
            lang = globalLang;
        if (common_1.MLString.Languages.includes(lang))
            return value[lang];
        return value[common_1.MLString.Languages[0]];
    };
    return MLPipe;
}());
MLPipe = __decorate([
    core_1.Pipe({
        name: 'ml'
    })
], MLPipe);
exports.MLPipe = MLPipe;
//# sourceMappingURL=ml.pipe.js.map