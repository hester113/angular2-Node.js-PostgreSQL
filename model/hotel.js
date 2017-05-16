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
var user_1 = require("./user");
var Cost = (function () {
    function Cost(value) {
        if (value === void 0) { value = {}; }
        this.ages = value.ages instanceof Array ?
            value.ages.map(function (value) { return ({
                min: Math.max(0, Number.parseFloat(value && value.min || 0) || 0) || 0,
                max: Math.max(0, Number.parseFloat(value && value.max || 0) || 0) || 0
            }); }).map(function (value) { return ({
                min: Math.min(value.min, value.max),
                max: Math.max(value.min, value.max)
            }); }) : [];
        if (this.ages.length <= 0)
            this.ages = [{ min: 0, max: 999 }];
        this.cost = Math.max(0, Number.parseFloat(value.cost || 0) || 0);
    }
    Cost.prototype.toObject = function () {
        return {
            ages: this.ages,
            cost: this.cost
        };
    };
    return Cost;
}());
exports.Cost = Cost;
var Room = (function () {
    function Room(value) {
        if (value === void 0) { value = {}; }
        this.title = new common_1.MLString(value.title);
        this.content = new common_1.MLString(value.content),
            this.image = value.image ? (value.image instanceof common_1.File ? value.image : new common_1.File(value.image)) : null;
        this.costs = value.costs instanceof Array ?
            value.costs.reduce(function (prev, value) {
                return value ? prev.concat(value instanceof Cost ? value : new Cost(value)) : prev;
            }, []) : [];
    }
    Room.prototype.toObject = function () {
        return {
            title: this.title,
            content: this.content,
            image: this.image && this.image.toObject() || null,
            costs: this.costs.reduce(function (prev, value) { return prev.concat(value.toObject()); }, [])
        };
    };
    Room.prototype.getMinumalCost = function (ages) {
        if (ages === void 0) { ages = []; }
        return 0;
        // const checkAges = (ages: number[], room: number[]) => {
        // 	if (ages.length > room.length)
        // 		return false
        // 	let a = ages.slice().sort( (a, b) => b-a )
        // 	let r = room.slice().sort( (a, b) => b-a )
        // 	for (let i = 0; i < a.length; i++)
        // 		if (a[i] < r[i])
        // 			return false
        // 	return true
        // }
        // return this.costs.reduce( (prev: number, line: Cost) => {
        // 	if (!checkAges(ages, line.ages.slice().map( value => value.value )))
        // 		return prev
        // 	if (prev === null)
        // 		return line.cost
        // 	return Math.min(prev, line.cost)
        // }, null)
    };
    return Room;
}());
exports.Room = Room;
var Hotel = (function (_super) {
    __extends(Hotel, _super);
    function Hotel(value) {
        if (value === void 0) { value = {}; }
        var _this = _super.call(this, value) || this;
        _this.owner = null;
        _this.title = new common_1.MLString(value.title);
        _this.description = new common_1.MLString(value.description);
        if (value.owner && value.owner.id)
            _this.owner = new user_1.User(value.owner);
        _this.content = new common_1.MLString(value.content);
        _this.rooms = value.rooms instanceof Array ?
            value.rooms.reduce(function (prev, value) {
                return value ? prev.concat(value instanceof Room ? value : new Room(value)) : prev;
            }, []) : [];
        _this.images = value.images instanceof Array ?
            value.images.reduce(function (prev, value) {
                return value ? prev.concat(value instanceof common_1.File ? value : new common_1.File(value)) : prev;
            }, []) : [];
        return _this;
    }
    Hotel.prototype.getRoom = function (ages) {
        if (ages === void 0) { ages = []; }
        return this.rooms.reduce(function (prev, room) {
            var cost = room.getMinumalCost(ages);
            if (cost === null)
                return prev;
            if (prev === null || prev.cost > cost)
                return { room: room, cost: cost };
            return prev;
        }, null);
    };
    Hotel.prototype.getVariants = function (ages) {
        var _this = this;
        if (ages === void 0) { ages = []; }
        return common_1.getAllUniqueCombinations(ages)
            .map(function (value) { return value.map(function (value) { return _this.getRoom(value); }); })
            .filter(function (value) { return value.reduce(function (prev, value) { return value === null ? false : prev; }, true); });
    };
    Hotel.prototype.getMinumalCost = function (ages) {
        if (ages === void 0) { ages = []; }
        return this.getVariants(ages).reduce(function (prev, variant) {
            var sum = variant.reduce(function (prev, value) { return prev + value.cost; }, 0);
            if (prev === null)
                return sum;
            return Math.min(prev, sum);
        }, null);
    };
    Hotel.prototype.toObject = function () {
        return Object.assign({}, _super.prototype.toObject.call(this), {
            title: this.title,
            description: this.description,
            owner: this.owner && this.owner.id.uuid || null,
            content: this.content,
            rooms: this.rooms.reduce(function (prev, value) { return prev.concat(value.toObject()); }, []),
            images: this.images.reduce(function (prev, value) { return prev.concat(value.toObject()); }, [])
        });
    };
    return Hotel;
}(common_1.Model));
Hotel.__api = 'objects/hotel';
exports.Hotel = Hotel;
//# sourceMappingURL=hotel.js.map