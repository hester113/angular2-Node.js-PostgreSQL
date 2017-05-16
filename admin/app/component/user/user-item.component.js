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
var common_1 = require("@angular/common");
var api_service_1 = require("../../service/api.service");
var file_service_1 = require("../../service/file.service");
var common_2 = require("../../../../model/common");
var user_1 = require("../../../../model/user");
var UserItemComponent = (function () {
    function UserItemComponent(route, location, apiService, fileService) {
        this.route = route;
        this.location = location;
        this.apiService = apiService;
        this.fileService = fileService;
        this.Roles = user_1.Role.List;
        this.item = new user_1.User();
        this.submitted = false;
        this.passwordDialog = null;
        this.password1 = '';
        this.password2 = '';
    }
    Object.defineProperty(UserItemComponent.prototype, "valid", {
        get: function () {
            return this.item.title.length > 0 && this.item.email.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    UserItemComponent.prototype.ngOnInit = function () {
        var _this = this;
        var id = this.route.snapshot.params['id'] || null;
        if (!id)
            return;
        this.passwordDialog = UIkit.modal(this.passwordDialogRef.nativeElement);
        if (id.toLowerCase() !== 'new')
            this.apiService.get(user_1.User, id)
                .then(function (response) { return _this.item = response; })
                .catch(function (error) { return _this.item = null; });
    };
    UserItemComponent.prototype.back = function () {
        this.location.back();
    };
    UserItemComponent.prototype.isRole = function (role) {
        return !!this.item.roles.find(function (value) { return value.id === role.id; });
    };
    UserItemComponent.prototype.toggleRole = function (role) {
        if (this.isRole(role))
            this.item.roles = this.item.roles.filter(function (value) { return value.id !== role.id; });
        else
            this.item.roles.push(role);
    };
    UserItemComponent.prototype.setImage = function (fileSelector) {
        var _this = this;
        if (fileSelector.files.length) {
            this.fileService.uploadImage(fileSelector.files[0])
                .then(function (response) { return _this.item.image = response.link && new common_2.File(response) || null; });
            fileSelector.value = null;
        }
    };
    UserItemComponent.prototype.showPasswordDialog = function (event) {
        event.preventDefault();
        this.password1 = '';
        this.password2 = '';
        this.passwordDialog.show();
    };
    Object.defineProperty(UserItemComponent.prototype, "validPassword", {
        get: function () {
            return this.password1 === this.password2 && this.password1.length >= 7;
        },
        enumerable: true,
        configurable: true
    });
    UserItemComponent.prototype.setPassword = function () {
        var _this = this;
        this.apiService.command(user_1.User, this.item, 'password', { id: this.item.id.toString(), password: this.password1 }).then(function (response) {
            UIkit.notify("<i class='uk-icon-check'></i>&emsp;Password changed");
            _this.passwordDialog.hide();
        });
    };
    UserItemComponent.prototype.submit = function () {
        var _this = this;
        if (this.submitted)
            return;
        this.submitted = true;
        this.apiService.update(user_1.User, this.item).then(function (response) { return _this.back(); });
    };
    return UserItemComponent;
}());
__decorate([
    core_1.ViewChild('passwordDialog'),
    __metadata("design:type", core_1.ElementRef)
], UserItemComponent.prototype, "passwordDialogRef", void 0);
UserItemComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'user-item',
        templateUrl: '/app/component/user/user-item.component.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        common_1.Location,
        api_service_1.APIService,
        file_service_1.FileService])
], UserItemComponent);
exports.UserItemComponent = UserItemComponent;
//# sourceMappingURL=user-item.component.js.map