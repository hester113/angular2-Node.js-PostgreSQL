"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var common_1 = require("../../model/common");
var MLService = MLService_1 = (function () {
    function MLService(http) {
        this.http = http;
    }
    MLService.prototype.get = function () {
        return this.http.get(MLService_1.mlPath)
            .toPromise()
            .then(function (response) { return response.json() || {}; })
            .then(function (response) {
            var data = {};
            for (var key in response)
                data[key] = new common_1.MLString(response[key]);
            return data;
        });
    };
    return MLService;
}());
MLService.mlPath = '/multilang.json';
MLService.options = new http_1.RequestOptions({
    headers: new http_1.Headers({
        'Content-Type': 'application/json'
    })
});
MLService = MLService_1 = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], MLService);
exports.MLService = MLService;
var MLService_1;
//# sourceMappingURL=ml.service.js.map