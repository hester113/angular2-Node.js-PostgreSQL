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
var ListOrderBy = (function () {
    function ListOrderBy() {
    }
    ListOrderBy.prototype.transform = function (array, fields) {
        return array.sort(function (a, b) {
            var i = 0;
            var result = 0;
            while (result === 0 && i < fields.length) {
                var field = fields[i];
                if (field[0] === '!') {
                    field = field.substr(1);
                    var aField = a[field] instanceof common_1.MLString ? a[field][common_1.MLString.Languages[0]] : a[field];
                    var bField = b[field] instanceof common_1.MLString ? b[field][common_1.MLString.Languages[0]] : b[field];
                    result = aField > bField ? -1 : aField < bField ? 1 : 0;
                }
                else {
                    var aField = a[field] instanceof common_1.MLString ? a[field][common_1.MLString.Languages[0]] : a[field];
                    var bField = b[field] instanceof common_1.MLString ? b[field][common_1.MLString.Languages[0]] : b[field];
                    result = aField > bField ? 1 : aField < bField ? -1 : 0;
                }
                i++;
            }
            return result;
        });
    };
    return ListOrderBy;
}());
ListOrderBy = __decorate([
    core_1.Pipe({
        name: 'listOrderBy',
        pure: false
    })
], ListOrderBy);
exports.ListOrderBy = ListOrderBy;
//# sourceMappingURL=list-orderby.pipe.js.map