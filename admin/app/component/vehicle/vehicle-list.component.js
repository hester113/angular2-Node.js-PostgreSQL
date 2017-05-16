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
var vehicle_1 = require("../../../../model/vehicle");
var VehicleListComponent = (function () {
    function VehicleListComponent(router, apiService) {
        this.router = router;
        this.apiService = apiService;
        this.items = [];
    }
    VehicleListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.apiService.get(vehicle_1.Vehicle)
            .then(function (response) { return _this.items = response; });
    };
    VehicleListComponent.prototype.add = function () {
        var _this = this;
        this.apiService.update(vehicle_1.Vehicle, new vehicle_1.Vehicle())
            .then(function (item) { return _this.items.push(item); });
    };
    VehicleListComponent.prototype.enable = function (item) {
        this.apiService.command(vehicle_1.Vehicle, item, 'enable')
            .then(function (response) { return item.enable = response.enable; });
    };
    VehicleListComponent.prototype.update = function (item) {
        this.apiService.update(vehicle_1.Vehicle, item)
            .then(function (newItem) {
            for (var key in newItem)
                item[key] = newItem[key];
        });
    };
    VehicleListComponent.prototype.delete = function (item) {
        var _this = this;
        UIkit.modal.confirm("Vehicle &laquo;" + item.title['en'] + "&raquo; can be deleted.<br>Are you sure?", function () {
            return _this.apiService.delete(vehicle_1.Vehicle, item).then(function () {
                return _this.items = _this.items.filter(function (value) { return value !== item; });
            });
        });
    };
    return VehicleListComponent;
}());
VehicleListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'vehicle-list',
        templateUrl: '/app/component/vehicle/vehicle-list.component.html'
    }),
    __metadata("design:paramtypes", [router_1.Router, api_service_1.APIService])
], VehicleListComponent);
exports.VehicleListComponent = VehicleListComponent;
//# sourceMappingURL=vehicle-list.component.js.map