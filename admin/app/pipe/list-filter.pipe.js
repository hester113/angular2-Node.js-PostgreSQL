"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("../../../model/common");
var ListFilterPipe = (function () {
    function ListFilterPipe() {
    }
    ListFilterPipe.prototype.transform = function (array, filter, fields) {
        if (!filter.trim())
            return array;
        var filterStr = filter.toLowerCase();
        return array.filter(function (item) {
            return fields.reduce(function (prev, value) {
                if (item[value] === undefined)
                    throw new TypeError("Field " + value + " is not found");
                var str = typeof item[value] === 'string' ?
                    item[value] :
                    (item[common_1.MLString.Languages[0]] || String(item[value]));
                return prev || str.toLowerCase().indexOf(filterStr) >= 0;
            }, false);
        });
    };
    return ListFilterPipe;
}());
ListFilterPipe = __decorate([
    core_1.Pipe({
        name: 'listFilter',
        pure: false
    })
], ListFilterPipe);
exports.ListFilterPipe = ListFilterPipe;
//# sourceMappingURL=list-filter.pipe.js.map