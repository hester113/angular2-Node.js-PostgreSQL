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
var router_1 = require("@angular/router");
var api_service_1 = require("../../service/api.service");
var defaultConfig = {
    exchangeRate: 1,
    exchangeRateSAR: 1,
    exchangeRateEGP: 1,
    processingFee: 10,
    sessionDuration: 300000,
    egyptianMarkUp: 0
};
var CommonComponent = (function () {
    function CommonComponent(router, apiService) {
        this.router = router;
        this.apiService = apiService;
        this.item = {};
    }
    CommonComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.apiService.config().then(function (response) { return _this.item = Object.assign({}, defaultConfig, response); });
    };
    CommonComponent.prototype.update = function (key) {
        var _this = this;
        if (!(key in this.item))
            return;
        this.apiService.config((_a = {}, _a[key] = this.item[key], _a)).then(function (response) { return _this.item = Object.assign({}, _this.item, response); });
        var _a;
    };
    return CommonComponent;
}());
CommonComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'common-item',
        templateUrl: '/app/component/common/common.component.html'
    }),
    __metadata("design:paramtypes", [router_1.Router,
        api_service_1.APIService])
], CommonComponent);
exports.CommonComponent = CommonComponent;
//# sourceMappingURL=common.component.js.map