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
var Vehicle = (function (_super) {
    __extends(Vehicle, _super);
    function Vehicle(value) {
        if (value === void 0) { value = {}; }
        var _this = _super.call(this, value) || this;
        _this.edited = false;
        _this.title = new common_1.MLString(value.title);
        return _this;
    }
    Vehicle.prototype.toObject = function () {
        return Object.assign({}, _super.prototype.toObject.call(this), {
            title: this.title
        });
    };
    return Vehicle;
}(common_1.Model));
Vehicle.__api = 'objects/vehicle';
exports.Vehicle = Vehicle;
//# sourceMappingURL=vehicle.js.map