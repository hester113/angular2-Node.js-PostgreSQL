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
var common_1 = require("@angular/common");
var api_service_1 = require("../../service/api.service");
var file_service_1 = require("../../service/file.service");
var order_1 = require("../../../../model/order");
var trip_order_1 = require("../../../../model/trip-order");
var package_order_1 = require("../../../../model/package-order");
var OrderItemComponent = (function () {
    function OrderItemComponent(route, location, apiService, fileService) {
        this.route = route;
        this.location = location;
        this.apiService = apiService;
        this.fileService = fileService;
        this.months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.years = [];
        this.statusList = order_1.OrderStatus.List;
        this.paymentTypeList = order_1.PaymentType.List;
        this.types = order_1.OrderType.List;
        this.item = new order_1.Order();
        this.submitted = false;
        var thisYear = (new Date()).getFullYear();
        for (var i = thisYear; i <= thisYear + 10; i++)
            this.years.push(i);
    }
    Object.defineProperty(OrderItemComponent.prototype, "valid", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    OrderItemComponent.prototype.ngOnInit = function () {
        var _this = this;
        var type = this.route.snapshot.params['type'] || null;
        var id = this.route.snapshot.params['id'] || null;
        if (!type || !id)
            return;
        if (id.toLowerCase() !== 'new') {
            switch (type) {
                case 'trip':
                    this.apiService.get(trip_order_1.TripOrder, id)
                        .then(function (response) { return _this.item = response; })
                        .catch(function (error) { return _this.item = null; });
                    break;
                case 'package':
                    this.apiService.get(package_order_1.PackageOrder, id)
                        .then(function (response) { return _this.item = response; })
                        .catch(function (error) { return _this.item = null; });
                    break;
            }
        }
        else {
            switch (type) {
                case 'trip':
                    this.item = new trip_order_1.TripOrder();
                    break;
                case 'package':
                    this.item = new package_order_1.PackageOrder();
                    break;
            }
            this.apiService.config().then(function (response) {
                _this.item.processingFee = response.processingFee;
                _this.item.exchangeRate = response.exchangeRate;
                _this.item.egyptianMarkUp = response.egyptianMarkUp;
            });
        }
    };
    OrderItemComponent.prototype.back = function () {
        this.location.back();
    };
    OrderItemComponent.prototype.setType = function (type) {
        this.item.type = type;
        switch (this.item.type) {
            case order_1.OrderType.getOrderType('trip'):
                this.item = new trip_order_1.TripOrder(this.item.toObject());
                break;
            case order_1.OrderType.getOrderType('package'):
                this.item = new package_order_1.PackageOrder(this.item.toObject());
                break;
        }
    };
    OrderItemComponent.prototype.submit = function () {
        var _this = this;
        if (this.submitted)
            return;
        this.submitted = true;
        switch (this.item.type) {
            case order_1.OrderType.getOrderType('trip'):
                this.apiService.update(trip_order_1.TripOrder, this.item).then(function (response) { return _this.back(); });
                break;
            case order_1.OrderType.getOrderType('package'):
                this.apiService.update(package_order_1.PackageOrder, this.item).then(function (response) { return _this.back(); });
                break;
        }
    };
    return OrderItemComponent;
}());
OrderItemComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'order-item',
        templateUrl: '/app/component/order/order-item.component.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        common_1.Location,
        api_service_1.APIService,
        file_service_1.FileService])
], OrderItemComponent);
exports.OrderItemComponent = OrderItemComponent;
//# sourceMappingURL=order-item.component.js.map