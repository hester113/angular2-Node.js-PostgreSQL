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
var package_1 = require("./package");
var hotel_1 = require("./hotel");
var human_1 = require("./human");
var ONE_DAY = 24 * 60 * 60 * 1000;
var PeolpeInRoom = (function () {
    function PeolpeInRoom(value) {
        if (value === void 0) { value = {}; }
        this.room = value.room ? (value.room instanceof hotel_1.Room ? value.room : new package_1.Package(value.room)) : null;
        this.people = value.people instanceof Array ?
            value.people.reduce(function (prev, value) {
                return value ? prev.concat(value instanceof human_1.Human ? value : new human_1.Human(value)) : prev;
            }, []) : [];
    }
    PeolpeInRoom.prototype.toObject = function () {
        return {
            room: this.room && this.room.toObject() || null,
            people: this.people.reduce(function (prev, value) { return prev.concat(value.toObject()); }, [])
        };
    };
    PeolpeInRoom.prototype.getAges = function (date) {
        if (date === void 0) { date = new Date(); }
        return this.people.reduce(function (prev, human) { return prev.concat(human.getAge(date)); }, []);
    };
    return PeolpeInRoom;
}());
exports.PeolpeInRoom = PeolpeInRoom;
var PackageOrder = (function (_super) {
    __extends(PackageOrder, _super);
    function PackageOrder(value) {
        if (value === void 0) { value = {}; }
        var _this = _super.call(this, value) || this;
        _this._duration = 1;
        _this.type = order_1.OrderType.getOrderType('package');
        _this.package = value.package ? (value.package instanceof package_1.Package ? value.package : new package_1.Package(value.package)) : null;
        _this.peopleInRoom = value.peopleInRoom instanceof Array ?
            value.peopleInRoom.reduce(function (prev, value) {
                return value ? prev.concat(value instanceof PeolpeInRoom ? value : new PeolpeInRoom(value)) : prev;
            }, []) : [];
        _this.anyDate = !!value.anyDate;
        _this.duration = Number.parseInt(value.duration) || 1;
        return _this;
    }
    Object.defineProperty(PackageOrder.prototype, "duration", {
        get: function () {
            var _this = this;
            if (this.package && this.package.durations.length > 0)
                return this.package.durations.sort(function (a, b) { return a - b; })
                    .reduce(function (prev, value) { return value <= _this._duration ? value : prev; }, 1);
            return this._duration;
        },
        set: function (value) {
            this._duration = Math.max(1, value);
        },
        enumerable: true,
        configurable: true
    });
    PackageOrder.prototype.toObject = function () {
        return Object.assign({}, _super.prototype.toObject.call(this), {
            package: this.package && this.package.toObject() || null,
            people: this.peopleInRoom.reduce(function (prev, value) { return prev.concat(value.toObject()); }, []),
            anyDate: this.anyDate,
            duration: this.duration
        });
    };
    Object.defineProperty(PackageOrder.prototype, "returnDate", {
        get: function () {
            if (!this.departureDate)
                return null;
            var date = new Date(this.departureDate);
            if (!this.package)
                return date;
            date.setDate(date.getDate() + this.duration);
            return date;
        },
        set: function (date) { },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PackageOrder.prototype, "ages", {
        get: function () {
            var _this = this;
            return this.peopleInRoom.reduce(function (prev, peopleInRoom) { return prev.concat(peopleInRoom.getAges(_this.departureDate)); }, []);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PackageOrder.prototype, "roadCost", {
        get: function () {
            var _this = this;
            if (!this.price)
                return 0;
            return this.ages.reduce(function (prev, age) { return prev + _this.price.getCost(age); }, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PackageOrder.prototype, "hotelCost", {
        get: function () {
            // if (!this.package || !this.package.hotel || !this.room)
            // return 0
            return 0;
            // return this.package.hotel.getCost(this.ages)
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PackageOrder.prototype, "cost", {
        get: function () {
            return this.roadCost + this.hotelCost;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PackageOrder.prototype, "totalCost", {
        get: function () {
            return this.cost + this.processingFee;
        },
        enumerable: true,
        configurable: true
    });
    return PackageOrder;
}(order_1.Order));
PackageOrder.__api = order_1.Order.__api;
exports.PackageOrder = PackageOrder;
//# sourceMappingURL=package-order.js.map