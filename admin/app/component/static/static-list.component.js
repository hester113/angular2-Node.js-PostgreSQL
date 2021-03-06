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
var static_1 = require("../../../../model/static");
var StaticListComponent = (function () {
    function StaticListComponent(router, apiService) {
        this.router = router;
        this.apiService = apiService;
        this.items = [];
    }
    StaticListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.apiService.get(static_1.Static).then(function (response) { return _this.items = response; });
    };
    StaticListComponent.prototype.add = function () {
        this.router.navigate(['/static', 'new']);
    };
    StaticListComponent.prototype.select = function (item) {
        this.router.navigate(['/static', item.id.uuid]);
    };
    StaticListComponent.prototype.enable = function (item) {
        this.apiService.command(static_1.Static, item, 'enable')
            .then(function (response) { return item.enable = response.enable; });
    };
    StaticListComponent.prototype.delete = function (item) {
        var _this = this;
        UIkit.modal.confirm("Static page &laquo;" + item.title['en'] + "&raquo; can be deleted.<br>Are you sure?", function () {
            return _this.apiService.delete(static_1.Static, item).then(function () {
                return _this.items = _this.items.filter(function (value) { return value !== item; });
            });
        });
    };
    return StaticListComponent;
}());
StaticListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'static-list',
        templateUrl: '/app/component/static/static-list.component.html'
    }),
    __metadata("design:paramtypes", [router_1.Router, api_service_1.APIService])
], StaticListComponent);
exports.StaticListComponent = StaticListComponent;
//# sourceMappingURL=static-list.component.js.map