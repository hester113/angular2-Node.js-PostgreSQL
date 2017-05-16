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
var hotel_1 = require("./hotel");
var price_1 = require("./price");
var Package = (function (_super) {
    __extends(Package, _super);
    function Package(value) {
        if (value === void 0) { value = {}; }
        var _this = _super.call(this, value) || this;
        _this.prices = [];
        _this.title = new common_1.MLString(value.title);
        _this.description = new common_1.MLString(value.description);
        _this.content = new common_1.MLString(value.content);
        _this.pointA = value.pointA ? (value.pointA instanceof point_1.Point ? value.pointA : new point_1.Point(value.pointA)) : null;
        _this.pointB = value.pointB ? (value.pointB instanceof point_1.Point ? value.pointB : new point_1.Point(value.pointB)) : null;
        _this.image = value.image ? (value.image instanceof common_1.File ? value.image : new common_1.File(value.image)) : null;
        _this.hotel = value.hotel ? (value.hotel instanceof hotel_1.Hotel ? value.hotel : new hotel_1.Hotel(value.hotel)) : null;
        _this.durations = value.durations instanceof Array ?
            value.durations.reduce(function (prev, value) { return prev.concat(parseInt(value)); }, [])
                .filter(function (value, index, self) { return value && value > 0 && self.indexOf(value) === index; })
            : [];
        _this.prices = value.prices instanceof Array ?
            value.prices.reduce(function (prev, value) {
                return value ? prev.concat(value instanceof price_1.Price ? value : new price_1.Price(value)) : prev;
            }, []) : [];
        return _this;
    }
    Package.prototype.getPrice = function (date) {
        if (date === void 0) { date = new Date(); }
        if (this.prices.length <= 0)
            return null;
        var currentDate = Number(date);
        return this.prices.find(function (value) {
            return Number(value.startDate) <= currentDate &&
                Number(value.endDate) >= currentDate;
        }) || null;
    };
    Object.defineProperty(Package.prototype, "minimalDuration", {
        get: function () {
            if (this.durations.length <= 0)
                return 1;
            return Math.min.apply(Math, this.durations);
        },
        enumerable: true,
        configurable: true
    });
    Package.prototype.getMinimalCost = function (date, ages) {
        if (date === void 0) { date = new Date(); }
        if (ages === void 0) { ages = []; }
        var sum = 0;
        if (this.hotel)
            sum += this.hotel.getMinumalCost(ages) * this.minimalDuration;
        var price = this.getPrice(date);
        if (price && price.costs.length > 0)
            sum += ages.reduce(function (prev, age) { return prev + price.getCost(age); }, 0);
        return sum;
    };
    Package.prototype.toObject = function () {
        return Object.assign(_super.prototype.toObject.call(this), {
            title: this.title,
            description: this.description,
            content: this.content,
            pointA: this.pointA && this.pointA.toObject() || null,
            pointB: this.pointB && this.pointB.toObject() || null,
            hotel: this.hotel && this.hotel.toObject() || null,
            durations: this.durations,
            prices: this.prices.reduce(function (prev, value) { return prev.concat(value.toObject()); }, []),
            image: this.image && this.image.toObject() || null
        });
    };
    return Package;
}(common_1.Model));
Package.__api = 'objects/package';
exports.Package = Package;
//# sourceMappingURL=package.js.map