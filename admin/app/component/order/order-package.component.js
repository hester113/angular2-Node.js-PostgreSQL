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
var api_service_1 = require("../../service/api.service");
var common_1 = require("../../../../model/common");
var package_order_1 = require("../../../../model/package-order");
var package_1 = require("../../../../model/package");
var price_1 = require("../../../../model/price");
var OrderPackageComponent = (function () {
    function OrderPackageComponent(apiService) {
        this.apiService = apiService;
        this.packages = [];
        this.item = new package_order_1.PackageOrder();
        this.orderChange = new core_1.EventEmitter();
        this.departureDateDatepicker = null;
    }
    Object.defineProperty(OrderPackageComponent.prototype, "order", {
        get: function () {
            return this.item;
        },
        set: function (value) {
            this.item = value;
            this.orderChange.emit(this.item);
        },
        enumerable: true,
        configurable: true
    });
    OrderPackageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.apiService.get(package_1.Package).then(function (response) {
            return _this.packages = response.filter(function (value) { return value.enable; });
        });
        this.departureDateDatepicker = UIkit.datepicker(this.departureDateRef.nativeElement, {
            weekstart: 1,
            format: 'DD.MM.YYYY'
        });
        this.departureDateDatepicker.on('hide.uk.datepicker', function (event) {
            _this.item.departureDate = common_1.str2Date(event.target.value);
            _this.reloadPrice();
        });
    };
    OrderPackageComponent.prototype.reloadPrice = function () {
        this.item.price = this.item.package && this.item.package.getPrice(this.item.date) || new price_1.Price();
    };
    OrderPackageComponent.prototype.packageChange = function () {
        var _this = this;
        if (this.item.package)
            this.apiService.get(package_1.Package, this.item.package).then(function (response) {
                _this.item.package = response;
                _this.reloadPrice();
            });
        else
            this.reloadPrice();
    };
    OrderPackageComponent.prototype.addRoom = function () {
        if (!this.item.package || !this.item.package.hotel || this.item.package.hotel.rooms.length <= 0)
            return;
        this.item.peopleInRoom.push(new package_order_1.PeolpeInRoom({ room: this.item.package.hotel.rooms[0] }));
    };
    OrderPackageComponent.prototype.deleteRoom = function (peolpeInRoom) {
        this.item.peopleInRoom = this.item.peopleInRoom.filter(function (value) { return value !== peolpeInRoom; });
    };
    return OrderPackageComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], OrderPackageComponent.prototype, "orderChange", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [package_order_1.PackageOrder])
], OrderPackageComponent.prototype, "order", null);
__decorate([
    core_1.ViewChild('departureDateNode'),
    __metadata("design:type", core_1.ElementRef)
], OrderPackageComponent.prototype, "departureDateRef", void 0);
OrderPackageComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'order-package',
        templateUrl: '/app/component/order/order-package.component.html'
    }),
    __metadata("design:paramtypes", [api_service_1.APIService])
], OrderPackageComponent);
exports.OrderPackageComponent = OrderPackageComponent;
//# sourceMappingURL=order-package.component.js.map