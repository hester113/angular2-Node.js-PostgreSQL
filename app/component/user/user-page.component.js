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
var ml_service_1 = require("../../service/ml.service");
var order_1 = require("../../../model/order");
var lang = document.querySelector('html').getAttribute('lang') || 'en';
var UserPageComponent = (function () {
    function UserPageComponent(router, apiService, mlService) {
        this.router = router;
        this.apiService = apiService;
        this.mlService = mlService;
        this.orders = [];
        this.user = null;
        this.ml = {};
        this._currency = 'usd';
        this.currency = localStorage && localStorage.getItem('currency') || null;
    }
    Object.defineProperty(UserPageComponent.prototype, "currency", {
        get: function () {
            return (this.ml && this._currency in this.ml) ? this.ml[this._currency][lang] : this._currency;
        },
        set: function (value) {
            this._currency = value ? value : 'usd';
            // this.ref.detectChanges()
        },
        enumerable: true,
        configurable: true
    });
    UserPageComponent.prototype.exchangeRate = function (order) {
        if (order === void 0) { order = null; }
        if (this._currency === 'jod')
            return 1;
        return order && order.exchangeRate || 0;
    };
    UserPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.mlService.get().then(function (ml) { return _this.ml = ml; });
        this.apiService.me().then(function (user) { return _this.user = user; });
        this.apiService.get(order_1.Order).then(function (orders) { return _this.orders = orders; });
        Array.prototype.forEach.call(document.querySelectorAll('[currency-set]'), function (currencySetNode) { return currencySetNode.addEventListener('click', function (event) {
            event.preventDefault();
            _this.currency = currencySetNode.getAttribute('currency-set') || null;
        }); });
    };
    return UserPageComponent;
}());
UserPageComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'user-page',
        templateUrl: '/app/component/user/user-page.component.html'
    }),
    __metadata("design:paramtypes", [router_1.Router, api_service_1.APIService, ml_service_1.MLService])
], UserPageComponent);
exports.UserPageComponent = UserPageComponent;
//# sourceMappingURL=user-page.component.js.map