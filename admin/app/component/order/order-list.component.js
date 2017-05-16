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
var order_1 = require("../../../../model/order");
var OrderListComponent = (function () {
    function OrderListComponent(router, apiService) {
        this.router = router;
        this.apiService = apiService;
        this.items = [];
    }
    OrderListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.apiService.get(order_1.Order).then(function (response) { return _this.items = response; });
    };
    OrderListComponent.prototype.add = function (type) {
        if (type === void 0) { type = 'trip'; }
        this.router.navigate(['/orders', type, 'new']);
    };
    OrderListComponent.prototype.select = function (item) {
        this.router.navigate(['/orders', item.type.id, item.id.uuid]);
    };
    OrderListComponent.prototype.enable = function (item) {
        this.apiService.command(order_1.Order, item, 'enable')
            .then(function (response) { return item.enable = response.enable; });
    };
    OrderListComponent.prototype.delete = function (item) {
        var _this = this;
        UIkit.modal.confirm("Order can be deleted.<br>Are you sure?", function () {
            return _this.apiService.delete(order_1.Order, item).then(function () {
                return _this.items = _this.items.filter(function (value) { return value !== item; });
            });
        });
    };
    return OrderListComponent;
}());
OrderListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'order-list',
        templateUrl: '/app/component/order/order-list.component.html'
    }),
    __metadata("design:paramtypes", [router_1.Router, api_service_1.APIService])
], OrderListComponent);
exports.OrderListComponent = OrderListComponent;
//# sourceMappingURL=order-list.component.js.map