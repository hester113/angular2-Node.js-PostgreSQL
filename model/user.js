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
var Role = (function () {
    function Role(value) {
        if (value === void 0) { value = {}; }
        this.id = String(value.id || '');
        this.title = String(value.title || '');
        this.icon = String(value.icon || '');
    }
    Role.getRole = function (id) {
        return Role.List.find(function (value) { return value.id === id; }) || Role.List[0];
    };
    return Role;
}());
Role.List = [
    new Role({ id: 'user', title: 'User', icon: null }),
    new Role({ id: 'admin', title: 'Administrator', icon: 'uk-icon-bolt' }),
    new Role({ id: 'hotel', title: 'Hotel manager', icon: 'uk-icon-building' })
];
exports.Role = Role;
var User = (function (_super) {
    __extends(User, _super);
    function User(value) {
        if (value === void 0) { value = {}; }
        var _this = _super.call(this, value) || this;
        _this.title = String(value.title || '');
        _this.description = String(value.description || '');
        _this.email = String(value.email || '');
        _this.phone = String(value.phone || '');
        _this.roles = [Role.List[0]];
        if (value.roles && value.roles instanceof Array)
            _this.roles = _this.roles.concat(value.roles.reduce(function (prev, value) {
                var role = Role.getRole(value);
                return role ? prev.concat(role) : prev;
            }, [])).filter(function (item, pos, self) { return self.indexOf(item) == pos; });
        _this.image = value.image ? (value.image instanceof common_1.File ? value.image : new common_1.File(value.image)) : null;
        return _this;
    }
    User.prototype.toObject = function () {
        return Object.assign(_super.prototype.toObject.call(this), {
            title: this.title,
            description: this.description,
            phone: this.phone,
            email: this.email,
            roles: this.roles.reduce(function (prev, value) { return prev.concat(value.id); }, []),
            image: this.image && this.image.toObject() || null
        });
    };
    return User;
}(common_1.Model));
User.__api = 'user';
exports.User = User;
//# sourceMappingURL=user.js.map