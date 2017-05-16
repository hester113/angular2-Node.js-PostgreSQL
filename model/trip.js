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
var common_1 = require("./common");
var point_1 = require("./point");
var price_1 = require("./price");
var TripType = (function () {
    function TripType(value) {
        if (value === void 0) { value = {}; }
        this.id = String(value.id || '');
        this.title = new common_1.MLString(value.title);
        this.icon = String(value.icon || '');
        this.letter = String(value.letter || '');
    }
    TripType.getTripType = function (id) {
        if (id === void 0) { id = ''; }
        return TripType.List.find(function (value) { return value.id === id; }) || TripType.List[0];
    };
    return TripType;
}());
TripType.List = [
    new TripType({
        id: 'oneway',
        title: new common_1.MLString({
            en: 'One Way',
            ar: 'اتجاه واحد'
        }),
        icon: 'uk-icon-long-arrow-right',
        letter: '→'
    }),
    new TripType({
        id: 'twoway',
        title: new common_1.MLString({
            en: 'Two Way',
            ar: 'اتجاهين'
        }),
        icon: 'uk-icon-exchange',
        letter: '↔'
    })
];
exports.TripType = TripType;
var Trip = (function (_super) {
    __extends(Trip, _super);
    function Trip(value) {
        if (value === void 0) { value = {}; }
        var _this = _super.call(this, value) || this;
        _this.prices = [];
        _this.description = new common_1.MLString(value.description);
        _this.type = TripType.getTripType(value.type || null);
        _this.pointA = value.pointA ? (value.pointA instanceof point_1.Point ? value.pointA : new point_1.Point(value.pointA)) : null;
        _this.pointB = value.pointB ? (value.pointB instanceof point_1.Point ? value.pointB : new point_1.Point(value.pointB)) : null;
        _this.departureTime = value.departureTime && new Date(value.departureTime) || common_1.newDate();
        _this.returnTime = value.returnTime && new Date(value.returnTime) || common_1.newDate();
        _this.content = new common_1.MLString(value.content);
        _this.prices = value.prices instanceof Array ?
            value.prices.reduce(function (prev, value) {
                return value ? prev.concat(value instanceof price_1.Price ? value : new price_1.Price(value)) : prev;
            }, []) : [];
        return _this;
    }
    Object.defineProperty(Trip.prototype, "title", {
        get: function () {
            return (this.pointA && this.pointA.title['en'] || 'A') + ' ' + (this.type.letter) + ' ' + (this.pointB && this.pointB.title['en'] || 'B') + ' (' + this.description['en'] + ')';
        },
        enumerable: true,
        configurable: true
    });
    Trip.prototype.getPrice = function (date) {
        if (date === void 0) { date = new Date(); }
        if (this.prices.length <= 0)
            return null;
        var currentDate = Number(date);
        return this.prices.find(function (value) {
            return Number(value.startDate) <= currentDate &&
                Number(value.endDate) >= currentDate;
        }) || null;
    };
    Trip.prototype.toObject = function () {
        return Object.assign(_super.prototype.toObject.call(this), {
            description: this.description,
            type: this.type.id,
            pointA: this.pointA.toObject(),
            pointB: this.pointB.toObject(),
            departureTime: this.departureTime,
            returnTime: this.returnTime,
            content: this.content,
            prices: this.prices.reduce(function (prev, value) { return prev.concat(value.toObject()); }, [])
        });
    };
    return Trip;
}(common_1.Model));
Trip.__api = 'objects/trip';
exports.Trip = Trip;
//# sourceMappingURL=trip.js.map