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
var common_1 = require("../../../model/common");
var trip_1 = require("../../../model/trip");
var package_1 = require("../../../model/package");
var order_1 = require("../../../model/order");
var trip_order_1 = require("../../../model/trip-order");
var vehicle_1 = require("../../../model/vehicle");
var human_1 = require("../../../model/human");
var lang = document.querySelector('html').getAttribute('lang') || 'en';
var TripSelectorFormComponent = (function () {
    function TripSelectorFormComponent(router, apiService, mlService) {
        this.router = router;
        this.apiService = apiService;
        this.mlService = mlService;
        this.ml = {};
        this.orderType = order_1.OrderType.List[0];
        this.tripType = trip_1.TripType.List[0];
        this.packages = [];
        this.trips = [];
        this.departureDateDatepicker = null;
        this.departureDate = new Date();
        this.returnDateDatepicker = null;
        this.returnDate = new Date();
        this._pointA = null;
        this._pointB = null;
        this.vehicle = null;
        this.anyDate = false;
        this.kidsAges = [];
        this.adults = 1;
        this.kids = 0;
        this.submitted = false;
    }
    TripSelectorFormComponent.prototype.checkType = function (typeId, tripTypeId) {
        if (tripTypeId === void 0) { tripTypeId = null; }
        return this.orderType === order_1.OrderType.getOrderType(typeId) &&
            (tripTypeId === null || this.tripType === trip_1.TripType.getTripType(tripTypeId));
    };
    TripSelectorFormComponent.prototype.setType = function (type, tripTypeId) {
        if (tripTypeId === void 0) { tripTypeId = null; }
        this.orderType = order_1.OrderType.getOrderType(type);
        if (tripTypeId)
            this.tripType = trip_1.TripType.getTripType(tripTypeId);
    };
    TripSelectorFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.mlService.get().then(function (ml) { return _this.ml = ml; });
        this.apiService.get(trip_1.Trip).then(function (response) { return _this.trips = response; });
        this.apiService.get(package_1.Package).then(function (response) { return _this.packages = response; });
        this.departureDateDatepicker = UIkit.datepicker(this.departureDateRef.nativeElement, {
            weekstart: 1,
            format: 'DD.MM.YYYY'
        });
        this.returnDateDatepicker = UIkit.datepicker(this.returnDateRef.nativeElement, {
            weekstart: 1,
            format: 'DD.MM.YYYY'
        });
        this.departureDateDatepicker.on('hide.uk.datepicker', function (event) {
            return _this.departureDate = common_1.str2Date(event.target.value);
        });
        this.returnDateDatepicker.on('hide.uk.datepicker', function (event) {
            return _this.returnDate = common_1.str2Date(event.target.value);
        });
    };
    Object.defineProperty(TripSelectorFormComponent.prototype, "pointA", {
        get: function () {
            return this._pointA;
        },
        set: function (value) {
            this._pointA = value;
            this.pointB = null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TripSelectorFormComponent.prototype, "pointB", {
        get: function () {
            return this._pointB;
        },
        set: function (value) {
            this._pointB = value;
            this.vehicle = null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TripSelectorFormComponent.prototype, "APoints", {
        get: function () {
            var _this = this;
            switch (this.orderType) {
                case order_1.OrderType.getOrderType('trip'):
                    return this.trips.reduce(function (prev, value) {
                        return value.type === _this.tripType &&
                            !prev.find(function (prevValue) { return prevValue.id.equal(value.pointA.id); }) ?
                            prev.concat(value.pointA) : prev;
                    }, []);
                case order_1.OrderType.getOrderType('package'):
                    return this.packages.reduce(function (prev, value) {
                        return !prev.find(function (prevValue) { return prevValue.id.equal(value.pointA.id); }) ?
                            prev.concat(value.pointA) : prev;
                    }, []);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TripSelectorFormComponent.prototype, "BPoints", {
        get: function () {
            var _this = this;
            if (!this.pointA)
                return [];
            switch (this.orderType) {
                case order_1.OrderType.getOrderType('trip'):
                    return this.trips.reduce(function (prev, value) {
                        return value.type === _this.tripType && value.pointA &&
                            value.pointA.id.equal(_this.pointA.id) ? prev.concat(value.pointB) : prev;
                    }, []);
                case order_1.OrderType.getOrderType('package'):
                    return this.packages.reduce(function (prev, value) {
                        return value.pointA && value.pointA.id.equal(_this.pointA.id) &&
                            !prev.find(function (prevValue) { return prevValue.id.equal(value.pointB.id); }) ?
                            prev.concat(value.pointB) : prev;
                    }, []);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TripSelectorFormComponent.prototype, "trip", {
        get: function () {
            var _this = this;
            if (!this.pointA || !this.pointB)
                return null;
            if (this.orderType !== order_1.OrderType.getOrderType('trip'))
                return null;
            return this.trips.find(function (value) {
                return value.type === _this.tripType &&
                    value.pointA.id.equal(_this.pointA.id) &&
                    value.pointB.id.equal(_this.pointB.id);
            }) || null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TripSelectorFormComponent.prototype, "vehicleList", {
        get: function () {
            if (!this.trip)
                return [];
            var price = this.trip.getPrice(this.departureDate || null);
            return price.costs.reduce(function (prev, value) {
                return value.key instanceof vehicle_1.Vehicle ? prev.concat(value.key) : prev;
            }, []);
        },
        enumerable: true,
        configurable: true
    });
    TripSelectorFormComponent.prototype.resetKidsAges = function () {
        this.kidsAges = Array.apply(null, { length: this.kids }).map(function () { return ({ value: 0 }); });
    };
    Object.defineProperty(TripSelectorFormComponent.prototype, "valid", {
        get: function () {
            return !!this.pointA
                && !!this.pointB
                && this.adults > 0;
        },
        enumerable: true,
        configurable: true
    });
    TripSelectorFormComponent.prototype.submit = function () {
        if (this.submitted)
            return;
        this.submitted = true;
        switch (this.orderType) {
            case order_1.OrderType.getOrderType('trip'):
                var tripOrder = new trip_order_1.TripOrder({
                    trip: this.trip,
                    people: Array.apply(null, { length: this.adults }).map(function () { return new human_1.Human(); })
                        .concat(this.kidsAges.map(function (value) { return new human_1.Human({ age: value.value }); })),
                    departureDate: this.departureDate,
                    returnDate: this.returnDate,
                    price: this.trip.getPrice(this.departureDate),
                    vehicle: this.vehicle
                });
                localStorage.setItem('currentOrder', tripOrder.toString());
                window.location.href = "/" + lang + "/order";
                return;
            case order_1.OrderType.getOrderType('package'):
                var searchData = {
                    pointA: this.pointA && this.pointA.id.uuid || null,
                    pointB: this.pointB && this.pointB.id.uuid || null,
                    departureDate: this.departureDate,
                    anyDate: this.anyDate,
                    adults: this.adults,
                    kidsAges: this.kidsAges
                };
                localStorage.setItem('searchData', JSON.stringify(searchData));
                window.location.href = "/" + lang + "/package-list";
        }
    };
    return TripSelectorFormComponent;
}());
__decorate([
    core_1.ViewChild('departureDateNode'),
    __metadata("design:type", core_1.ElementRef)
], TripSelectorFormComponent.prototype, "departureDateRef", void 0);
__decorate([
    core_1.ViewChild('returnDateNode'),
    __metadata("design:type", core_1.ElementRef)
], TripSelectorFormComponent.prototype, "returnDateRef", void 0);
TripSelectorFormComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'tripselector-form',
        templateUrl: '/app/component/tripselector/tripselector-form.component.html'
    }),
    __metadata("design:paramtypes", [router_1.Router, api_service_1.APIService, ml_service_1.MLService])
], TripSelectorFormComponent);
exports.TripSelectorFormComponent = TripSelectorFormComponent;
//# sourceMappingURL=tripselector-form.component.js.map