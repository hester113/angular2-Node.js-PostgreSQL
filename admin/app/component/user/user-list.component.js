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
var router_1 = require("@angular/router");
var api_service_1 = require("../../service/api.service");
var user_1 = require("../../../../model/user");
var UserListComponent = (function () {
    function UserListComponent(router, apiService) {
        this.router = router;
        this.apiService = apiService;
        this.items = [];
    }
    UserListComponent.prototype.getIcons = function (item) {
        return item.roles.reduce(function (prev, value) { return value.icon ? prev.concat(value.icon) : prev; }, []);
    };
    UserListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.apiService.get(user_1.User).then(function (response) { return _this.items = response; });
    };
    UserListComponent.prototype.add = function () {
        this.router.navigate(['/users', 'new']);
    };
    UserListComponent.prototype.select = function (item) {
        this.router.navigate(['/users', item.id.uuid]);
    };
    UserListComponent.prototype.enable = function (item) {
        this.apiService.command(user_1.User, item, 'enable')
            .then(function (response) { return item.enable = response.enable; });
    };
    UserListComponent.prototype.delete = function (item) {
        var _this = this;
        UIkit.modal.confirm("Users &laquo;" + item.title + "&raquo; can be deleted.<br>Are you sure?", function () {
            return _this.apiService.delete(user_1.User, item).then(function () {
                return _this.items = _this.items.filter(function (value) { return value !== item; });
            });
        });
    };
    return UserListComponent;
}());
UserListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'user-list',
        templateUrl: '/app/component/user/user-list.component.html'
    }),
    __metadata("design:paramtypes", [router_1.Router,
        api_service_1.APIService])
], UserListComponent);
exports.UserListComponent = UserListComponent;
//# sourceMappingURL=user-list.component.js.map