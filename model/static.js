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
var Static = (function (_super) {
    __extends(Static, _super);
    function Static(value) {
        if (value === void 0) { value = {}; }
        var _this = _super.call(this, value) || this;
        _this.title = new common_1.MLString(value.title);
        _this.description = new common_1.MLString(value.description);
        _this.url = String(value.url || '');
        _this.content = new common_1.MLString(value.content);
        _this.image = value.image ? (value.image instanceof common_1.File ? value.image : new common_1.File(value.image)) : null;
        return _this;
    }
    Static.prototype.toObject = function () {
        return Object.assign(_super.prototype.toObject.call(this), {
            title: this.title,
            description: this.description,
            url: this.url,
            content: this.content,
            image: this.image && this.image.toObject() || null
        });
    };
    return Static;
}(common_1.Model));
Static.__api = 'objects/static';
exports.Static = Static;
//# sourceMappingURL=static.js.map