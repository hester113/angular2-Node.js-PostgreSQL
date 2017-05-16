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
var trip_1 = require("../../../../model/trip");
var price_1 = require("../../../../model/price");
var point_1 = require("../../../../model/point");
var TripItemComponent = (function () {
    function TripItemComponent(route, location, apiService, fileService) {
        this.route = route;
        this.location = location;
        this.apiService = apiService;
        this.fileService = fileService;
        this.types = trip_1.TripType.List;
        this.points = [];
        this.item = new trip_1.Trip();
        this.submitted = false;
    }
    Object.defineProperty(TripItemComponent.prototype, "valid", {
        get: function () {
            return this.item.pointA &&
                this.item.pointB &&
                this.item.prices.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    TripItemComponent.prototype.ngOnInit = function () {
        var _this = this;
        var id = this.route.snapshot.params['id'] || null;
        if (!id) {
            return;
        }
        this.apiService.get(point_1.Point).then(function (response) {
            _this.points = response;
            if (id.toLowerCase() !== 'new')
                _this.apiService.get(trip_1.Trip, id)
                    .then(function (response) {
                    _this.item = response;
                    _this.item.pointA = _this.item.pointA
                        && _this.points.find(function (value) { return value.id.uuid === _this.item.pointA.id.uuid; })
                        || null;
                    _this.item.pointB = _this.item.pointB
                        && _this.points.find(function (value) { return value.id.uuid === _this.item.pointB.id.uuid; })
                        || null;
                })
                    .catch(function (error) { return _this.item = null; });
        });
        this.departureTimeRef.nativeElement.addEventListener('change', function (event) {
            var date = new Date(_this.item.departureTime);
            date.setHours(event.target.valueAsDate.getUTCHours());
            date.setMinutes(event.target.valueAsDate.getUTCMinutes());
            _this.item.departureTime = date;
        });
        this.returnTimeRef.nativeElement.addEventListener('change', function (event) {
            var date = new Date(_this.item.returnTime);
            date.setHours(event.target.valueAsDate.getUTCHours());
            date.setMinutes(event.target.valueAsDate.getUTCMinutes());
            _this.item.returnTime = date;
        });
    };
    TripItemComponent.prototype.addPrice = function () {
        this.item.prices.push(new price_1.Price());
    };
    TripItemComponent.prototype.deletePrice = function (price) {
        this.item.prices = this.item.prices.filter(function (value) { return value !== price; });
    };
    TripItemComponent.prototype.back = function () {
        this.location.back();
    };
    TripItemComponent.prototype.submit = function () {
        var _this = this;
        if (this.submitted)
            return;
        this.submitted = true;
        this.apiService.update(trip_1.Trip, this.item).then(function (response) { return _this.back(); });
    };
    return TripItemComponent;
}());
__decorate([
    core_1.ViewChild('departureTimeNode'),
    __metadata("design:type", core_1.ElementRef)
], TripItemComponent.prototype, "departureTimeRef", void 0);
__decorate([
    core_1.ViewChild('returnTimeNode'),
    __metadata("design:type", core_1.ElementRef)
], TripItemComponent.prototype, "returnTimeRef", void 0);
TripItemComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'trip-item',
        templateUrl: '/app/component/trip/trip-item.component.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        common_1.Location,
        api_service_1.APIService,
        file_service_1.FileService])
], TripItemComponent);
exports.TripItemComponent = TripItemComponent;
//# sourceMappingURL=trip-item.component.js.map