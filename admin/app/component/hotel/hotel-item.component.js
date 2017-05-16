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
// import { Hotel, Room, BeachDistance, AllInclusive } from '../../../../model/hotel'
var hotel_1 = require("../../../../model/hotel");
var HotelItemComponent = (function () {
    function HotelItemComponent(route, location, apiService, fileService) {
        this.route = route;
        this.location = location;
        this.apiService = apiService;
        this.fileService = fileService;
        this.item = new hotel_1.Hotel();
        // beachDistanceList = BeachDistance.List
        // allInclusiveList = AllInclusive.List
        this.ratingsList = [1, 2, 3, 4, 5];
        this.submitted = false;
    }
    Object.defineProperty(HotelItemComponent.prototype, "valid", {
        get: function () {
            return common_2.MLString.checkValid(this.item.title)
                && this.item.rooms.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    HotelItemComponent.prototype.ngOnInit = function () {
        var _this = this;
        var id = this.route.snapshot.params['id'] || null;
        if (!id)
            return;
        if (id.toLowerCase() !== 'new')
            this.apiService.get(hotel_1.Hotel, id)
                .then(function (response) { return _this.item = response; })
                .catch(function (error) { return _this.item = null; });
    };
    HotelItemComponent.prototype.addRoom = function () {
        this.item.rooms.push(new hotel_1.Room());
    };
    HotelItemComponent.prototype.deleteRoom = function (room) {
        this.item.rooms = this.item.rooms.filter(function (value) { return value !== room; });
    };
    HotelItemComponent.prototype.setRoomImage = function (fileSelector, room) {
        if (fileSelector.files.length) {
            this.fileService.uploadImage(fileSelector.files[0])
                .then(function (response) { return room.image = response.link && new common_2.File(response) || null; });
            fileSelector.value = null;
        }
    };
    HotelItemComponent.prototype.addImage = function (fileSelector) {
        var _this = this;
        if (fileSelector.files.length) {
            this.fileService.uploadImage(fileSelector.files[0])
                .then(function (response) { return response.link && _this.item.images.push(new common_2.File(response)); });
            fileSelector.value = null;
        }
    };
    HotelItemComponent.prototype.deleteImage = function (image) {
        this.item.images = this.item.images.filter(function (value) { return value !== image; });
    };
    HotelItemComponent.prototype.back = function () {
        this.location.back();
    };
    HotelItemComponent.prototype.submit = function () {
        var _this = this;
        if (this.submitted)
            return;
        this.submitted = true;
        this.apiService.update(hotel_1.Hotel, this.item).then(function (response) { return _this.back(); });
    };
    return HotelItemComponent;
}());
HotelItemComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'hotel-item',
        templateUrl: '/app/component/hotel/hotel-item.component.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        common_1.Location,
        api_service_1.APIService,
        file_service_1.FileService])
], HotelItemComponent);
exports.HotelItemComponent = HotelItemComponent;
//# sourceMappingURL=hotel-item.component.js.map