"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("./common");
var vehicle_1 = require("./vehicle");
var Cost = (function () {
    function Cost(value) {
        if (value === void 0) { value = {}; }
        this.key = typeof value.key === 'object' ?
            (value.key instanceof vehicle_1.Vehicle ? value.key : new vehicle_1.Vehicle(value.key)) :
            Math.max(0, Number.parseInt(value.key || 0) || 0);
        this.cost = Math.max(0, Number.parseFloat(value.cost || 0) || 0);
    }
    Cost.prototype.toObject = function () {
        return {
            key: this.key instanceof vehicle_1.Vehicle ? this.key.toObject() : this.key,
            cost: this.cost
        };
    };
    return Cost;
}());
exports.Cost = Cost;
var Refund = (function () {
    function Refund(value) {
        if (value === void 0) { value = {}; }
        this.months = Math.max(0, Number.parseInt(value.months || 0) || 0);
        this.days = Math.max(0, Math.min(Number.parseFloat(value.days || 0) || 0, 31));
        this.percent = Math.max(0, Math.min(Number.parseFloat(value.percent || 0) || 0, 100));
        this.sum = Math.max(0, Number.parseFloat(value.sum || 0) || 0);
    }
    Refund.prototype.toObject = function () {
        return {
            months: this.months,
            days: this.days,
            percent: this.percent,
            sum: this.sum
        };
    };
    return Refund;
}());
exports.Refund = Refund;
var Price = (function () {
    function Price(value) {
        if (value === void 0) { value = {}; }
        var _this = this;
        this.costs = [];
        this.startDate = common_1.newDate(value.startDate || null);
        this.endDate = value.endDate && common_1.newDate(value.endDate) || (function () {
            var date = common_1.newDate(_this.startDate);
            date.setFullYear(1 + date.getFullYear());
            return date;
        })();
        this.costs = value.costs instanceof Array ?
            value.costs.reduce(function (prev, value) { return value ? prev.concat(new Cost(value)) : prev; }, []) : [];
        this.refunds = value.refund instanceof Array ?
            value.refund.reduce(function (prev, value) { return prev.concat(new Refund(value)); }, []) : [];
    }
    Price.prototype.getCost = function (arg) {
        if (arg instanceof vehicle_1.Vehicle) {
            var cost = this.costs
                .find(function (value) { return value.key instanceof vehicle_1.Vehicle ? value.key.id.equal(arg.id) : false; });
            return cost && cost.cost || 0;
        }
        else if (typeof arg === 'number') {
            return this.costs.sort(function (a, b) { return a.cost - b.cost; }).reduce(function (prev, value) { return typeof value.key === 'number' &&
                (value.key === 0 || value.key < arg) ? value.cost : prev; }, 0);
        }
        else {
            return 0;
        }
    };
    Price.prototype.toObject = function () {
        return {
            startDate: this.startDate,
            endDate: this.endDate,
            costs: this.costs.reduce(function (prev, value) { return prev.concat(value.toObject()); }, []),
            refunds: this.refunds.reduce(function (prev, value) { return prev.concat(value.toObject()); }, [])
        };
    };
    return Price;
}());
exports.Price = Price;
//# sourceMappingURL=price.js.map