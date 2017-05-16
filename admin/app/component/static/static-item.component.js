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
var static_1 = require("../../../../model/static");
var StaticItemComponent = (function () {
    function StaticItemComponent(route, location, apiService, fileService) {
        this.route = route;
        this.location = location;
        this.apiService = apiService;
        this.fileService = fileService;
        this.item = new static_1.Static();
        this.submitted = false;
    }
    Object.defineProperty(StaticItemComponent.prototype, "valid", {
        get: function () {
            return common_2.MLString.checkValid(this.item.title)
                && this.item.url.length > 0
                && /[a-z0-9\-]+/.test(this.item.url);
        },
        enumerable: true,
        configurable: true
    });
    StaticItemComponent.prototype.ngOnInit = function () {
        var _this = this;
        var id = this.route.snapshot.params['id'] || null;
        if (!id)
            return;
        if (id.toLowerCase() !== 'new')
            this.apiService.get(static_1.Static, id)
                .then(function (response) { return _this.item = response; })
                .catch(function (error) { return _this.item = null; });
    };
    StaticItemComponent.prototype.back = function () {
        this.location.back();
    };
    StaticItemComponent.prototype.setImage = function (fileSelector) {
        var _this = this;
        if (fileSelector.files.length) {
            this.fileService.uploadImage(fileSelector.files[0])
                .then(function (response) { return _this.item.image = response.link && new common_2.File(response) || null; });
            fileSelector.value = null;
        }
    };
    StaticItemComponent.prototype.submit = function () {
        var _this = this;
        if (this.submitted)
            return;
        this.submitted = true;
        var ts = '';
        this.apiService.update(static_1.Static, this.item).then(function (response) { return _this.back(); });
    };
    return StaticItemComponent;
}());
StaticItemComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'static-item',
        templateUrl: '/app/component/static/static-item.component.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        common_1.Location,
        api_service_1.APIService,
        file_service_1.FileService])
], StaticItemComponent);
exports.StaticItemComponent = StaticItemComponent;
//# sourceMappingURL=static-item.component.js.map