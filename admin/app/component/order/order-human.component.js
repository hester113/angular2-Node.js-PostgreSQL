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
var common_1 = require("../../../../model/common");
var human_1 = require("../../../../model/human");
var file_service_1 = require("../../service/file.service");
var OrderHumanComponent = (function () {
    function OrderHumanComponent(fileService) {
        this.fileService = fileService;
        this.nationalityList = human_1.Nationality.List;
        this.item = new human_1.Human();
        this.humanChange = new core_1.EventEmitter();
        this.dobDatepicker = null;
    }
    Object.defineProperty(OrderHumanComponent.prototype, "human", {
        get: function () {
            return this.item;
        },
        set: function (value) {
            this.item = value;
            this.humanChange.emit(this.item);
        },
        enumerable: true,
        configurable: true
    });
    OrderHumanComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dobDatepicker = UIkit.datepicker(this.dobRef.nativeElement, {
            weekstart: 1,
            format: 'DD.MM.YYYY'
        });
        this.dobDatepicker.on('hide.uk.datepicker', function (event) {
            return _this.item.dob = common_1.str2Date(event.target.value);
        });
    };
    OrderHumanComponent.prototype.addTicket = function (fileSelector) {
        var _this = this;
        if (fileSelector.files.length) {
            this.fileService.uploadPdf(fileSelector.files[0])
                .then(function (response) {
                if (!response.link)
                    return;
                response.title = 'New ticket';
                _this.item.tickets.push(new common_1.File(response));
            });
            fileSelector.value = null;
        }
    };
    OrderHumanComponent.prototype.deleteTicket = function (ticket) {
        this.item.tickets = this.item.tickets.filter(function (value) { return value !== ticket; });
    };
    return OrderHumanComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], OrderHumanComponent.prototype, "humanChange", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [human_1.Human])
], OrderHumanComponent.prototype, "human", null);
__decorate([
    core_1.ViewChild('dobNode'),
    __metadata("design:type", core_1.ElementRef)
], OrderHumanComponent.prototype, "dobRef", void 0);
OrderHumanComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'order-human',
        templateUrl: '/app/component/order/order-human.component.html'
    }),
    __metadata("design:paramtypes", [file_service_1.FileService])
], OrderHumanComponent);
exports.OrderHumanComponent = OrderHumanComponent;
//# sourceMappingURL=order-human.component.js.map