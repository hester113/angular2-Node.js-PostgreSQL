"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var order_1 = require("./order");
var trip_1 = require("./trip");
var vehicle_1 = require("./vehicle");
var human_1 = require("./human");
var TripOrder = (function (_super) {
    __extends(TripOrder, _super);
    function TripOrder(value) {
        if (value === void 0) { value = {}; }
        var _this = _super.call(this, value) || this;
        _this.type = order_1.OrderType.getOrderType('trip');
        _this.trip = value.trip ? (value.trip instanceof trip_1.Trip ? value.trip : new trip_1.Trip(value.trip)) : null;
        _this.vehicle = value.vehicle ? (value.vehicle instanceof vehicle_1.Vehicle ? value.vehicle : new vehicle_1.Vehicle(value.vehicle)) : null;
        _this.people = value.people instanceof Array ?
            value.people.reduce(function (prev, value) {
                return value ? prev.concat(value instanceof human_1.Human ? value : new human_1.Human(value)) : prev;
            }, []) : [];
        return _this;
    }
    TripOrder.prototype.toObject = function () {
        return Object.assign({}, _super.prototype.toObject.call(this), {
            trip: this.trip && this.trip.toObject() || null,
            vehicle: this.vehicle && this.vehicle.toObject() || null,
            people: this.people.reduce(function (prev, value) { return prev.concat(value.toObject()); }, [])
        });
    };
    Object.defineProperty(TripOrder.prototype, "ages", {
        get: function () {
            var _this = this;
            return this.people.reduce(function (prev, human) { return prev.concat(human.getAge(_this.departureDate)); }, []);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TripOrder.prototype, "cost", {
        get: function () {
            var _this = this;
            if (!this.trip || !this.price)
                return 0;
            var sum = this.ages.reduce(function (prev, age) { return prev + _this.price.getCost(age); }, 0);
            if (this.vehicle)
                sum += this.price.getCost(this.vehicle);
            return sum;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TripOrder.prototype, "totalCost", {
        get: function () {
            return this.cost + this.processingFee;
        },
        enumerable: true,
        configurable: true
    });
    return TripOrder;
}(order_1.Order));
TripOrder.__api = order_1.Order.__api;
exports.TripOrder = TripOrder;
//# sourceMappingURL=trip-order.js.map