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
var ml_service_1 = require("../../service/ml.service");
var common_1 = require("../../../model/common");
var package_order_1 = require("../../../model/package-order");
var package_1 = require("../../../model/package");
var lang = document.querySelector('html').getAttribute('lang') || 'en';
var PackageListComponent = (function () {
    function PackageListComponent(router, apiService, mlService) {
        this.router = router;
        this.apiService = apiService;
        this.mlService = mlService;
        this.packages = [];
        this._pointA = null;
        this.ratingsList = [1, 2, 3, 4, 5];
        this.rating = [];
        this.pointB = null;
        this.anyDate = false;
        this.departureDateDatepicker = null;
        this.departureDate = new Date();
        this.ml = {};
        this.kidsAges = [];
        this.adults = 1;
        this.kids = 0;
    }
    Object.defineProperty(PackageListComponent.prototype, "pointA", {
        get: function () {
            return this._pointA;
        },
        set: function (value) {
            this._pointA = value;
            this.pointB = null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PackageListComponent.prototype, "APoints", {
        get: function () {
            return this.packages.reduce(function (prev, value) {
                return !prev.find(function (prevValue) { return prevValue.id.equal(value.pointA.id); }) ?
                    prev.concat(value.pointA) : prev;
            }, []);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PackageListComponent.prototype, "BPoints", {
        get: function () {
            var _this = this;
            if (!this.pointA)
                return [];
            return this.packages.reduce(function (prev, value) {
                return value.pointA && value.pointA.id.equal(_this.pointA.id) &&
                    !prev.find(function (prevValue) { return prevValue.id.equal(value.pointB.id); }) ?
                    prev.concat(value.pointB) : prev;
            }, []);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PackageListComponent.prototype, "packageList", {
        get: function () {
            var _this = this;
            return this.packages.filter(function (value) {
                return (!_this.pointA || value.pointA === _this.pointA) &&
                    (!_this.pointB || value.pointB === _this.pointB);
            });
        },
        enumerable: true,
        configurable: true
    });
    PackageListComponent.prototype.resetKidsAges = function () {
        this.kidsAges = Array.apply(null, { length: this.kids }).map(function () { return ({ value: 0 }); });
    };
    Object.defineProperty(PackageListComponent.prototype, "ageList", {
        get: function () {
            var result = [];
            for (var i = 0; i < this.adults; i++)
                result.push(999);
            for (var i = 0; i < this.kidsAges.length; i++)
                result.push(this.kidsAges[i].value);
            return result;
        },
        enumerable: true,
        configurable: true
    });
    PackageListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.mlService.get().then(function (ml) { return _this.ml = ml; });
        var searchData = null;
        try {
            searchData = JSON.parse(localStorage.getItem('searchData'));
        }
        catch (error) {
            searchData = null;
        }
        localStorage.removeItem('searchData');
        this.apiService.get(package_1.Package).then(function (response) {
            _this.packages = response.filter(function (value) { return !!value.hotel; });
            if (searchData) {
                _this.anyDate = !!searchData.anyDate;
                var date = common_1.newDate(searchData.departureDate || null) || new Date();
                _this.departureDate = date;
                var pointAuuid_1 = searchData.pointA.trim().toLowerCase();
                if (pointAuuid_1) {
                    _this.pointA = _this.APoints.find(function (value) { return value.id.uuid === pointAuuid_1; });
                    var pointBuuid_1 = searchData.pointB.trim().toLowerCase();
                    if (pointBuuid_1)
                        _this.pointB = _this.BPoints.find(function (value) { return value.id.uuid === pointBuuid_1; });
                }
                _this.adults = searchData.adults || 0;
                _this.kidsAges = searchData.kidsAges || [];
                _this.kids = _this.kidsAges.length;
            }
        });
        this.departureDateDatepicker = UIkit.datepicker(this.departureDateRef.nativeElement, {
            weekstart: 1,
            format: 'DD.MM.YYYY'
        });
        this.departureDateDatepicker.on('hide.uk.datepicker', function (event) {
            return _this.departureDate = common_1.str2Date(event.target.value);
        });
    };
    PackageListComponent.prototype.select = function (pack) {
        var order = new package_order_1.PackageOrder({
            package: pack,
            peopleInRoom: [],
            departureDate: this.departureDate,
            anyDate: this.anyDate
        });
        localStorage.setItem('currentOrder', order.toString());
        window.location.href = "/" + lang + "/order-package";
    };
    return PackageListComponent;
}());
__decorate([
    core_1.ViewChild('departureDateNode'),
    __metadata("design:type", core_1.ElementRef)
], PackageListComponent.prototype, "departureDateRef", void 0);
PackageListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'package-list',
        templateUrl: '/app/component/packagelist/packagelist.component.html'
    }),
    __metadata("design:paramtypes", [router_1.Router, api_service_1.APIService, ml_service_1.MLService])
], PackageListComponent);
exports.PackageListComponent = PackageListComponent;
//# sourceMappingURL=packagelist.component.js.map