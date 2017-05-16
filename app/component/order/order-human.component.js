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
var ml_service_1 = require("../../service/ml.service");
var human_1 = require("../../../model/human");
var common_1 = require("../../../model/common");
var OrderHumanComponent = (function () {
    function OrderHumanComponent(mlService) {
        this.mlService = mlService;
        this.nationality = human_1.Nationality.List;
        this._item = new human_1.Human();
        this.itemChange = new core_1.EventEmitter();
        this.dobDatepicker = null;
        this.ml = {};
    }
    Object.defineProperty(OrderHumanComponent.prototype, "item", {
        get: function () {
            return this._item;
        },
        set: function (value) {
            this._item = value;
            this.itemChange.emit(this._item);
        },
        enumerable: true,
        configurable: true
    });
    OrderHumanComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.mlService.get().then(function (ml) { return _this.ml = ml; });
        this.dobDatepicker = UIkit.datepicker(this.dobRef.nativeElement, {
            weekstart: 1,
            format: 'DD.MM.YYYY'
        });
        this.dobDatepicker.on('hide.uk.datepicker', function (event) {
            return _this.item.dob = common_1.str2Date(event.target.value);
        });
    };
    return OrderHumanComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], OrderHumanComponent.prototype, "itemChange", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [human_1.Human])
], OrderHumanComponent.prototype, "item", null);
__decorate([
    core_1.ViewChild('dobNode'),
    __metadata("design:type", core_1.ElementRef)
], OrderHumanComponent.prototype, "dobRef", void 0);
OrderHumanComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'order-human',
        templateUrl: '/app/component/order/order-human.component.html'
    }),
    __metadata("design:paramtypes", [ml_service_1.MLService])
], OrderHumanComponent);
exports.OrderHumanComponent = OrderHumanComponent;
//# sourceMappingURL=order-human.component.js.map