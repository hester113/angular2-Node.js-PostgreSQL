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
var trip_order_1 = require("../../../../model/trip-order");
var trip_1 = require("../../../../model/trip");
var price_1 = require("../../../../model/price");
var vehicle_1 = require("../../../../model/vehicle");
var human_1 = require("../../../../model/human");
var OrderTripComponent = (function () {
    function OrderTripComponent(apiService) {
        this.apiService = apiService;
        this.trips = [];
        this.vehicles = [];
        this.item = new trip_order_1.TripOrder();
        this.orderChange = new core_1.EventEmitter();
        this.departureDateDatepicker = null;
        this.returnDateDatepicker = null;
    }
    Object.defineProperty(OrderTripComponent.prototype, "order", {
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
    OrderTripComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.apiService.get(trip_1.Trip).then(function (response) {
            return _this.trips = response.filter(function (value) { return value.enable && value.pointA && value.pointB; });
        });
        this.apiService.get(vehicle_1.Vehicle).then(function (response) {
            return _this.vehicles = response.filter(function (value) { return value.enable; });
        });
        this.departureDateDatepicker = UIkit.datepicker(this.departureDateRef.nativeElement, {
            weekstart: 1,
            format: 'DD.MM.YYYY'
        });
        this.departureDateDatepicker.on('hide.uk.datepicker', function (event) {
            _this.item.departureDate = common_1.str2Date(event.target.value);
            _this.reloadPrice();
        });
        this.returnDateDatepicker = UIkit.datepicker(this.returnDateRef.nativeElement, {
            weekstart: 1,
            format: 'DD.MM.YYYY'
        });
        this.returnDateDatepicker.on('hide.uk.datepicker', function (event) {
            _this.item.returnDate = common_1.str2Date(event.target.value);
            _this.reloadPrice();
        });
    };
    OrderTripComponent.prototype.reloadPrice = function () {
        this.item.price = this.item.trip && this.item.trip.getPrice(this.item.date) || new price_1.Price();
    };
    OrderTripComponent.prototype.addHuman = function () {
        this.item.people.push(new human_1.Human());
    };
    OrderTripComponent.prototype.deleteHuman = function (human) {
        this.item.people = this.item.people.filter(function (value) { return value !== human; });
    };
    OrderTripComponent.prototype.changeTrip = function () {
        var _this = this;
        if (this.item.trip)
            this.apiService.get(trip_1.Trip, this.item.trip).then(function (response) {
                _this.item.trip = response;
                _this.reloadPrice();
            });
        else
            this.reloadPrice();
    };
    return OrderTripComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], OrderTripComponent.prototype, "orderChange", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [trip_order_1.TripOrder])
], OrderTripComponent.prototype, "order", null);
__decorate([
    core_1.ViewChild('departureDateNode'),
    __metadata("design:type", core_1.ElementRef)
], OrderTripComponent.prototype, "departureDateRef", void 0);
__decorate([
    core_1.ViewChild('returnDateNode'),
    __metadata("design:type", core_1.ElementRef)
], OrderTripComponent.prototype, "returnDateRef", void 0);
OrderTripComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'order-trip',
        templateUrl: '/app/component/order/order-trip.component.html'
    }),
    __metadata("design:paramtypes", [api_service_1.APIService])
], OrderTripComponent);
exports.OrderTripComponent = OrderTripComponent;
//# sourceMappingURL=order-trip.component.js.map