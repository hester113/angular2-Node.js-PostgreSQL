"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./rxjs-extensions");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_routing_1 = require("./app.routing");
var api_service_1 = require("./service/api.service");
var ml_service_1 = require("./service/ml.service");
var app_component_1 = require("./component/app.component");
var ml_pipe_1 = require("./pipe/ml.pipe");
var currency_pipe_1 = require("./pipe/currency.pipe");
var tripselector_form_component_1 = require("./component/tripselector/tripselector-form.component");
var order_trip_component_1 = require("./component/order/order-trip.component");
var order_package_component_1 = require("./component/order/order-package.component");
var packagelist_component_1 = require("./component/packagelist/packagelist.component");
var order_human_component_1 = require("./component/order/order-human.component");
var user_page_component_1 = require("./component/user/user-page.component");
var contact_form_component_1 = require("./component/contact/contact-form.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            app_routing_1.routing
        ],
        declarations: [
            app_component_1.AppComponent,
            ml_pipe_1.MLPipe,
            currency_pipe_1.CurrencyPipe,
            tripselector_form_component_1.TripSelectorFormComponent,
            order_trip_component_1.OrderTripComponent,
            order_package_component_1.OrderPackageComponent,
            packagelist_component_1.PackageListComponent,
            order_human_component_1.OrderHumanComponent,
            user_page_component_1.UserPageComponent,
            contact_form_component_1.ContactFormComponent
        ],
        providers: [
            api_service_1.APIService,
            ml_service_1.MLService
        ],
        bootstrap: [
            app_component_1.AppComponent,
            contact_form_component_1.ContactFormComponent
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map