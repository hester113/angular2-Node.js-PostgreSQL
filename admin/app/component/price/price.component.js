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
var price_1 = require("../../../../model/price");
var vehicle_1 = require("../../../../model/vehicle");
var PriceComponent = (function () {
    function PriceComponent(apiService) {
        this.apiService = apiService;
        this.item = new price_1.Price();
        this.priceChange = new core_1.EventEmitter();
        this._hideVehicle = false;
        this.hideVehicleChange = new core_1.EventEmitter();
        this.startDateDatepicker = null;
        this.endDateDatepicker = null;
        this.vehicleList = [];
    }
    Object.defineProperty(PriceComponent.prototype, "price", {
        get: function () {
            return this.item;
        },
        set: function (value) {
            this.item = value;
            this.priceChange.emit(this.item);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PriceComponent.prototype, "hideVehicle", {
        get: function () {
            return this._hideVehicle;
        },
        set: function (value) {
            this._hideVehicle = value;
            this.hideVehicleChange.emit(this._hideVehicle);
        },
        enumerable: true,
        configurable: true
    });
    PriceComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.apiService.get(vehicle_1.Vehicle).then(function (response) { return _this.vehicleList = response; });
        this.startDateDatepicker = UIkit.datepicker(this.startDateRef.nativeElement, {
            weekstart: 1,
            format: 'DD.MM.YYYY'
        });
        this.startDateDatepicker.on('hide.uk.datepicker', function (event) {
            return _this.item.startDate = common_1.str2Date(event.target.value);
        });
        this.endDateDatepicker = UIkit.datepicker(this.endDateRef.nativeElement, {
            weekstart: 1,
            format: 'DD.MM.YYYY'
        });
        this.endDateDatepicker.on('hide.uk.datepicker', function (event) {
            return _this.item.endDate = common_1.str2Date(event.target.value);
        });
    };
    Object.defineProperty(PriceComponent.prototype, "ageCosts", {
        get: function () {
            return this.item.costs.filter(function (value) { return !(value.key instanceof vehicle_1.Vehicle); }).sort(function (a, b) { return a.cost - b.cost; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PriceComponent.prototype, "vehicleCosts", {
        get: function () {
            return this.item.costs.filter(function (value) { return value.key instanceof vehicle_1.Vehicle; });
        },
        enumerable: true,
        configurable: true
    });
    PriceComponent.prototype.addAgeCost = function () {
        this.item.costs.push(new price_1.Cost());
    };
    PriceComponent.prototype.addVehicleCost = function () {
        this.item.costs.push(new price_1.Cost({ key: this.vehicleList[0] }));
    };
    PriceComponent.prototype.deleteCost = function (cost) {
        this.item.costs = this.item.costs.filter(function (value) { return value !== cost; });
    };
    PriceComponent.prototype.addRefund = function () {
        this.item.refunds.push(new price_1.Refund());
    };
    PriceComponent.prototype.deleteRefund = function (refund) {
        this.item.refunds = this.item.refunds.filter(function (value) { return value !== refund; });
    };
    return PriceComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], PriceComponent.prototype, "priceChange", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [price_1.Price])
], PriceComponent.prototype, "price", null);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], PriceComponent.prototype, "hideVehicleChange", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Boolean])
], PriceComponent.prototype, "hideVehicle", null);
__decorate([
    core_1.ViewChild('startDate'),
    __metadata("design:type", core_1.ElementRef)
], PriceComponent.prototype, "startDateRef", void 0);
__decorate([
    core_1.ViewChild('endDate'),
    __metadata("design:type", core_1.ElementRef)
], PriceComponent.prototype, "endDateRef", void 0);
PriceComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'price',
        templateUrl: '/app/component/price/price.component.html'
    }),
    __metadata("design:paramtypes", [api_service_1.APIService])
], PriceComponent);
exports.PriceComponent = PriceComponent;
//# sourceMappingURL=price.component.js.map