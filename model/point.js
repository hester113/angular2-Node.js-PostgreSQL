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
var Point = (function (_super) {
    __extends(Point, _super);
    function Point(value) {
        if (value === void 0) { value = {}; }
        var _this = _super.call(this, value) || this;
        _this.title = new common_1.MLString(value.title);
        return _this;
    }
    Point.prototype.toObject = function () {
        return Object.assign({}, _super.prototype.toObject.call(this), {
            title: this.title
        });
    };
    return Point;
}(common_1.Model));
Point.__api = 'objects/point';
exports.Point = Point;
//# sourceMappingURL=point.js.map