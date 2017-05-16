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
var common_1 = require("../../../../model/common");
var MLInputComponent = (function () {
    function MLInputComponent() {
        this.Languages = common_1.MLString.Languages;
        this.item = new common_1.MLString();
        this.valueChange = new core_1.EventEmitter();
        this._size = 'large';
        this.sizeChange = new core_1.EventEmitter();
    }
    Object.defineProperty(MLInputComponent.prototype, "value", {
        get: function () {
            return this.item;
        },
        set: function (value) {
            this.item = new common_1.MLString(value);
            this.valueChange.emit(this.item);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MLInputComponent.prototype, "size", {
        get: function () {
            return this._size;
        },
        set: function (value) {
            this._size = value;
            this.sizeChange.emit(this.size);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MLInputComponent.prototype, "class", {
        get: function () {
            return "uk-form-width-" + this._size;
        },
        enumerable: true,
        configurable: true
    });
    return MLInputComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], MLInputComponent.prototype, "valueChange", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [common_1.MLString])
], MLInputComponent.prototype, "value", null);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], MLInputComponent.prototype, "sizeChange", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [String])
], MLInputComponent.prototype, "size", null);
MLInputComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'mlinput',
        templateUrl: '/app/component/mlinput/mlinput.component.html'
    })
], MLInputComponent);
exports.MLInputComponent = MLInputComponent;
//# sourceMappingURL=mlinput.component.js.map