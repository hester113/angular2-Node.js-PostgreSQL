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
var order_1 = require("../../../model/order");
var trip_order_1 = require("../../../model/trip-order");
var human_1 = require("../../../model/human");
var trip_1 = require("../../../model/trip");
var vehicle_1 = require("../../../model/vehicle");
var lang = document.querySelector('html').getAttribute('lang') || 'en';
var OrderTripComponent = (function () {
    function OrderTripComponent(router, apiService, mlService, ref) {
        this.router = router;
        this.apiService = apiService;
        this.mlService = mlService;
        this.ref = ref;
        this.tripType = trip_1.TripType.List[0];
        this.trips = [];
        this.departureDateDatepicker = null;
        this.returnDateDatepicker = null;
        this.months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.years = [];
        this.paymentTypes = order_1.PaymentType.List;
        this.item = new trip_order_1.TripOrder();
        this.primaryContact = null;
        this.submitting = false;
        this.submitted = false;
        this.ml = {};
        this._currency = 'USD';
        this._pointA = null;
        this._pointB = null;
        this.currency = localStorage && localStorage.getItem('currency') || null;
        var thisYear = (new Date()).getFullYear();
        for (var i = thisYear; i <= thisYear + 10; i++)
            this.years.push(i);
        var currentOrderObj = null;
        try {
            currentOrderObj = JSON.parse(localStorage.getItem('currentOrder'));
        }
        catch (error) {
            currentOrderObj = null;
        }
        if (!currentOrderObj)
            window.location.href = '/' + lang;
        else {
            this.item = new trip_order_1.TripOrder(currentOrderObj);
            this.tripType = this.item.trip.type;
        }
    }
    OrderTripComponent.prototype.checkType = function (tripTypeId) {
        return this.tripType === trip_1.TripType.getTripType(tripTypeId);
    };
    OrderTripComponent.prototype.setType = function (tripTypeId) {
        this.tripType = trip_1.TripType.getTripType(tripTypeId);
        this.pointA = null;
        this.item.trip = null;
    };
    Object.defineProperty(OrderTripComponent.prototype, "currency", {
        get: function () {
            return (this.ml && this._currency in this.ml) ? this.ml[this._currency][lang] : this._currency;
        },
        set: function (value) {
            this._currency = value ? value : 'USD';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderTripComponent.prototype, "exchangeRate", {
        get: function () {
            if (this._currency === 'JOD')
                return 1;
            if (this._currency === 'SAR')
                return this.item && this.item.exchangeRateSAR || 0;
            if (this._currency === 'EGP')
                return this.item && this.item.exchangeRateEGP || 0;
            return this.item && this.item.exchangeRate || 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderTripComponent.prototype, "pointA", {
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
    Object.defineProperty(OrderTripComponent.prototype, "pointB", {
        get: function () {
            return this._pointB;
        },
        set: function (value) {
            var _this = this;
            this._pointB = value;
            this.item.vehicle = null;
            if (this.pointA && this.pointB)
                this.item.trip = this.trips.find(function (value) {
                    return value.type === _this.tripType &&
                        value.pointA.id.equal(_this.pointA.id) &&
                        value.pointB.id.equal(_this.pointB.id);
                }) || null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderTripComponent.prototype, "APoints", {
        get: function () {
            var _this = this;
            return this.trips.reduce(function (prev, value) {
                return value.type === _this.tripType &&
                    !prev.find(function (prevValue) { return prevValue.id.equal(value.pointA.id); }) ?
                    prev.concat(value.pointA) : prev;
            }, this.item.trip ? [this.item.trip.pointA] : []);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderTripComponent.prototype, "BPoints", {
        get: function () {
            var _this = this;
            if (!this.pointA)
                return [];
            return this.trips.reduce(function (prev, value) {
                return value.type === _this.tripType && value.pointA &&
                    value.pointA.id.equal(_this.pointA.id) ? prev.concat(value.pointB) : prev;
            }, this.item.trip ? [this.item.trip.pointB] : []);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderTripComponent.prototype, "vehicleList", {
        get: function () {
            if (!this.item.trip)
                return [];
            var price = this.item.trip.getPrice(this.item.departureDate || null);
            return price.costs.reduce(function (prev, value) {
                return value.key instanceof vehicle_1.Vehicle ? prev.concat(value.key) : prev;
            }, []);
        },
        enumerable: true,
        configurable: true
    });
    OrderTripComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.mlService.get().then(function (ml) { return _this.ml = ml; });
        this.primaryContact = this.item.people.length > 0 ? this.item.people[0] : null;
        this.apiService.config().then(function (response) {
            _this.item.processingFee = response.processingFee;
            _this.item.exchangeRate = response.exchangeRate;
            _this.item.exchangeRateSAR = response.exchangeRateSAR;
            _this.item.exchangeRateEGP = response.exchangeRateEGP;
            _this.item.egyptianMarkUp = response.egyptianMarkUp;
        });
        this.apiService.get(trip_1.Trip).then(function (response) {
            _this.trips = response;
            if (_this.item.trip) {
                _this._pointA = _this.item.trip.pointA;
                _this._pointB = _this.item.trip.pointB;
            }
        });
        UIkit.sticky('#order-details', { boundary: '#sticky-boundary' });
        Array.prototype.forEach.call(document.querySelectorAll('[currency-set]'), function (currencySetNode) { return currencySetNode.addEventListener('click', function (event) {
            event.preventDefault();
            _this.currency = currencySetNode.getAttribute('currency-set') || null;
        }); });
        this.departureDateDatepicker = UIkit.datepicker(this.departureDateRef.nativeElement, {
            weekstart: 1,
            format: 'DD.MM.YYYY'
        });
        this.returnDateDatepicker = UIkit.datepicker(this.returnDateRef.nativeElement, {
            weekstart: 1,
            format: 'DD.MM.YYYY'
        });
        this.departureDateDatepicker.on('hide.uk.datepicker', function (event) {
            return _this.item.departureDate = common_1.str2Date(event.target.value);
        });
        this.returnDateDatepicker.on('hide.uk.datepicker', function (event) {
            return _this.item.returnDate = common_1.str2Date(event.target.value);
        });
    };
    OrderTripComponent.prototype.addHuman = function () {
        this.item.people.push(new human_1.Human());
        if (this.item.people.length === 1)
            this.primaryContact = this.item.people[0];
    };
    OrderTripComponent.prototype.deleteHuman = function (human) {
        this.item.people = this.item.people.filter(function (value) { return value !== human; });
        if (!this.item.people.includes(this.primaryContact))
            this.primaryContact = this.item.people.length > 0 ? this.item.people[0] : null;
    };
    OrderTripComponent.prototype.submit = function () {
        var _this = this;
        if (this.submitting)
            return;
        this.submitting = true;
        this.apiService.order(this.item, this.primaryContact).then(function (value) {
            _this.item = new trip_order_1.TripOrder(value);
            UIkit.notify('Order sucess', { status: 'success' });
            _this.submitted = true;
            localStorage.removeItem('currentOrder');
            _this.submitting = false;
        }).catch(function (error) {
            if (error.code && error.code === 401) {
                var loginForm = document.querySelector('#login-form-modal form');
                loginForm.elements.email.value = _this.primaryContact && _this.primaryContact.email;
                UIkit.modal('#login-form-modal').show();
                _this.submitting = false;
                return;
            }
            UIkit.notify('Server error', { status: 'warning' });
            _this.submitting = false;
        });
    };
    return OrderTripComponent;
}());
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
    __metadata("design:paramtypes", [router_1.Router, api_service_1.APIService, ml_service_1.MLService, core_1.ChangeDetectorRef])
], OrderTripComponent);
exports.OrderTripComponent = OrderTripComponent;
//# sourceMappingURL=order-trip.component.js.map