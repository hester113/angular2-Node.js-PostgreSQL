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
var hotel_1 = require("../../../../model/hotel");
var HotelPriceComponent = (function () {
    function HotelPriceComponent() {
        this.item = new hotel_1.Room();
        this.roomChange = new core_1.EventEmitter();
    }
    Object.defineProperty(HotelPriceComponent.prototype, "room", {
        get: function () {
            return this.item;
        },
        set: function (value) {
            this.item = value;
            this.roomChange.emit(this.room);
        },
        enumerable: true,
        configurable: true
    });
    HotelPriceComponent.prototype.addColumn = function (row) {
        row.ages.push({ min: 0, max: 999 });
        this.roomChange.emit(this.room);
    };
    HotelPriceComponent.prototype.deleteColumn = function (row) {
        if (row.ages.length <= 1)
            row.ages = [{ min: 0, max: 999 }];
        else
            row.ages.pop();
        this.roomChange.emit(this.room);
    };
    HotelPriceComponent.prototype.addRow = function () {
        this.item.costs.push(new hotel_1.Cost());
        this.roomChange.emit(this.room);
    };
    HotelPriceComponent.prototype.deleteRow = function (row) {
        this.item.costs = this.item.costs.filter(function (value) { return value !== row; });
        this.roomChange.emit(this.room);
    };
    HotelPriceComponent.prototype.ngOnInit = function () {
    };
    return HotelPriceComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], HotelPriceComponent.prototype, "roomChange", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [hotel_1.Room])
], HotelPriceComponent.prototype, "room", null);
HotelPriceComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'hotel-price',
        templateUrl: '/app/component/hotel/hotel-price.component.html'
    }),
    __metadata("design:paramtypes", [])
], HotelPriceComponent);
exports.HotelPriceComponent = HotelPriceComponent;
//# sourceMappingURL=hotel-price.component.js.map