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
var ml_service_1 = require("../../service/ml.service");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var options = new http_1.RequestOptions({
    headers: new http_1.Headers({
        'Content-Type': 'application/json'
    })
});
var ContactFormComponent = (function () {
    function ContactFormComponent(mlService, http) {
        this.mlService = mlService;
        this.http = http;
        this.ml = {};
        this.name = '';
        this.email = '';
        this.message = '';
    }
    ContactFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.mlService.get().then(function (ml) { return _this.ml = ml; });
    };
    ContactFormComponent.prototype.submit = function (event) {
        event.preventDefault();
        console.log(this.name, this.email, this.message);
        var postData = JSON.stringify({
            name: this.name,
            email: this.email,
            message: this.message
        });
        this.http.post('/en/api/message', postData, options).toPromise()
            .then(function () {
            UIkit.notify("Your message have been sent", { status: 'success', pos: 'bottom-center' });
        }).catch(function (response) {
            var resp = response.json() || { error: 'unknown error' };
        });
    };
    return ContactFormComponent;
}());
ContactFormComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'contact-form',
        templateUrl: '/app/component/contact/contact-form.component.html'
    }),
    __metadata("design:paramtypes", [ml_service_1.MLService, http_1.Http])
], ContactFormComponent);
exports.ContactFormComponent = ContactFormComponent;
//# sourceMappingURL=contact-form.component.js.map