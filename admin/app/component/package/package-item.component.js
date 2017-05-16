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
var package_1 = require("../../../../model/package");
var point_1 = require("../../../../model/point");
var hotel_1 = require("../../../../model/hotel");
var price_1 = require("../../../../model/price");
var PackageItemComponent = (function () {
    function PackageItemComponent(route, location, apiService, fileService) {
        this.route = route;
        this.location = location;
        this.apiService = apiService;
        this.fileService = fileService;
        this.points = [];
        this.hotels = [];
        this.item = new package_1.Package();
        this.submitted = false;
    }
    Object.defineProperty(PackageItemComponent.prototype, "valid", {
        get: function () {
            return common_2.MLString.checkValid(this.item.title) &&
                this.item.pointA &&
                this.item.pointB &&
                this.item.prices.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    PackageItemComponent.prototype.ngOnInit = function () {
        var _this = this;
        var id = this.route.snapshot.params['id'] || null;
        if (!id)
            return;
        Promise.all([
            this.apiService.get(point_1.Point).then(function (response) { return _this.points = response; }),
            this.apiService.get(hotel_1.Hotel).then(function (response) { return _this.hotels = response; })
        ]).then(function () {
            if (id.toLowerCase() !== 'new')
                _this.apiService.get(package_1.Package, id)
                    .then(function (response) {
                    _this.item = response;
                    _this.item.pointA = _this.item.pointA
                        && _this.points.find(function (value) { return value.id.equal(_this.item.pointA.id); })
                        || null;
                    _this.item.pointB = _this.item.pointB
                        && _this.points.find(function (value) { return value.id.equal(_this.item.pointB.id); })
                        || null;
                    // this.hotelChange()
                })
                    .catch(function (error) { return _this.item = null; });
        });
    };
    PackageItemComponent.prototype.hotelChange = function () {
        var _this = this;
        if (this.item.hotel)
            this.apiService.get(hotel_1.Hotel, this.item.hotel).then(function (response) { return _this.item.hotel = response; });
    };
    PackageItemComponent.prototype.addPrice = function () {
        this.item.prices.push(new price_1.Price());
    };
    PackageItemComponent.prototype.deletePrice = function (price) {
        this.item.prices = this.item.prices.filter(function (value) { return value !== price; });
    };
    PackageItemComponent.prototype.back = function () {
        this.location.back();
    };
    PackageItemComponent.prototype.setImage = function (fileSelector) {
        var _this = this;
        if (fileSelector.files.length) {
            this.fileService.uploadImage(fileSelector.files[0])
                .then(function (response) { return _this.item.image = response.link && new common_2.File(response) || null; });
            fileSelector.value = null;
        }
    };
    PackageItemComponent.prototype.addDuration = function () {
        this.item.durations.push(1);
    };
    PackageItemComponent.prototype.deleteDuration = function (i) {
        this.item.durations.splice(i, 1);
    };
    PackageItemComponent.prototype.submit = function () {
        var _this = this;
        if (this.submitted)
            return;
        this.submitted = true;
        this.apiService.update(package_1.Package, this.item).then(function (response) { return _this.back(); });
    };
    return PackageItemComponent;
}());
PackageItemComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'package-item',
        templateUrl: '/app/component/package/package-item.component.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        common_1.Location,
        api_service_1.APIService,
        file_service_1.FileService])
], PackageItemComponent);
exports.PackageItemComponent = PackageItemComponent;
//# sourceMappingURL=package-item.component.js.map