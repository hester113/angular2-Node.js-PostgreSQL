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
var package_order_1 = require("../../../model/package-order");
var human_1 = require("../../../model/human");
var lang = document.querySelector('html').getAttribute('lang') || 'en';
var OrderPackageComponent = (function () {
    // peopleCount: PeopleCount[] = AgeGroup.List.reduce(
    // 	( prev:PeopleCount[], value:AgeGroup ) =>
    // 		prev.concat({
    // 			ageGroup: value,
    // 			count: value.id === 'adults' ? 1 : 0
    // 		}),
    // 	[]
    // )
    function OrderPackageComponent(router, apiService, mlService, ref) {
        this.router = router;
        this.apiService = apiService;
        this.mlService = mlService;
        this.ref = ref;
        this.item = new package_order_1.PackageOrder();
        this.submitting = false;
        this.submitted = false;
        this.ml = {};
        this.lang = lang;
        this._currency = 'usd';
        this.primaryContact = new human_1.Human();
        this.currency = localStorage && localStorage.getItem('currency') || null;
        var currentOrderObj = null;
        try {
            currentOrderObj = JSON.parse(localStorage.getItem('currentOrder'));
        }
        catch (error) {
            currentOrderObj = null;
        }
        if (!currentOrderObj)
            window.location.href = '/' + lang;
        else {
            this.item = new package_order_1.PackageOrder(currentOrderObj);
            this.item.price = this.item.package.getPrice(this.item.anyDate ? undefined : this.item.departureDate);
        }
    }
    Object.defineProperty(OrderPackageComponent.prototype, "currency", {
        get: function () {
            return (this.ml && this._currency in this.ml) ? this.ml[this._currency][lang] : this._currency;
        },
        set: function (value) {
            this._currency = value ? value : 'usd';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderPackageComponent.prototype, "exchangeRate", {
        get: function () {
            if (this._currency === 'jod')
                return 1;
            return this.item && this.item.exchangeRate || 0;
        },
        enumerable: true,
        configurable: true
    });
    OrderPackageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.mlService.get().then(function (ml) { return _this.ml = ml; });
        this.apiService.config().then(function (response) {
            _this.item.processingFee = response.processingFee;
            _this.item.exchangeRate = response.exchangeRate;
            _this.item.egyptianMarkUp = response.egyptianMarkUp;
        });
        Array.prototype.forEach.call(document.querySelectorAll('[currency-set]'), function (currencySetNode) { return currencySetNode.addEventListener('click', function (event) {
            event.preventDefault();
            _this.currency = currencySetNode.getAttribute('currency-set') || null;
        }); });
    };
    OrderPackageComponent.prototype.regenPeople = function () {
        // this.item.people = this.peopleCount.reduce(
        // 	(prev: Human[], value:PeopleCount) => {
        // 		for(let i = 0; i < value.count; i++)
        // 			prev.push(new Human({ defaultAgeGroup: value.ageGroup }))
        // 		return prev
        // 	},
        // 	[]
        // )
    };
    OrderPackageComponent.prototype.submit = function () {
        var _this = this;
        if (this.submitting)
            return;
        this.submitting = true;
        this.apiService.order(this.item, this.primaryContact).then(function (value) {
            _this.item = new package_order_1.PackageOrder(value);
            UIkit.notify('Order sucess', { status: 'success' });
            _this.submitted = true;
            localStorage.removeItem('currentOrder');
            _this.submitting = false;
        }).catch(function (error) {
            if (error.code && error.code === 401) {
                var loginForm = document.querySelector('#login-form-modal form');
                loginForm.elements.email.value = _this.primaryContact && _this.primaryContact.email;
                UIkit.modal('#login-form-modal').show();
                _this.submitting = false;
                return;
            }
            UIkit.notify('Server error', { status: 'warning' });
            _this.submitting = false;
        });
    };
    return OrderPackageComponent;
}());
OrderPackageComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'order-package',
        templateUrl: '/app/component/order/order-package.component.html'
    }),
    __metadata("design:paramtypes", [router_1.Router, api_service_1.APIService, ml_service_1.MLService, core_1.ChangeDetectorRef])
], OrderPackageComponent);
exports.OrderPackageComponent = OrderPackageComponent;
//# sourceMappingURL=order-package.component.js.map