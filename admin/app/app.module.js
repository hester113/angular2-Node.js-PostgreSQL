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
var file_service_1 = require("./service/file.service");
var list_filter_pipe_1 = require("./pipe/list-filter.pipe");
var list_orderby_pipe_1 = require("./pipe/list-orderby.pipe");
var ml_pipe_1 = require("./pipe/ml.pipe");
var froala_directives_1 = require("./directive/froala.directives");
var app_component_1 = require("./component/app.component");
var common_component_1 = require("./component/common/common.component");
var mlinput_component_1 = require("./component/mlinput/mlinput.component");
var mleditor_component_1 = require("./component/mlinput/mleditor.component");
var order_list_component_1 = require("./component/order/order-list.component");
var order_item_component_1 = require("./component/order/order-item.component");
var order_human_component_1 = require("./component/order/order-human.component");
var order_trip_component_1 = require("./component/order/order-trip.component");
var order_package_component_1 = require("./component/order/order-package.component");
var user_list_component_1 = require("./component/user/user-list.component");
var user_item_component_1 = require("./component/user/user-item.component");
var point_list_component_1 = require("./component/point/point-list.component");
var vehicle_list_component_1 = require("./component/vehicle/vehicle-list.component");
var hotel_list_component_1 = require("./component/hotel/hotel-list.component");
var hotel_item_component_1 = require("./component/hotel/hotel-item.component");
var hotel_price_component_1 = require("./component/hotel/hotel-price.component");
var trip_list_component_1 = require("./component/trip/trip-list.component");
var trip_item_component_1 = require("./component/trip/trip-item.component");
var package_list_component_1 = require("./component/package/package-list.component");
var package_item_component_1 = require("./component/package/package-item.component");
var price_component_1 = require("./component/price/price.component");
var static_list_component_1 = require("./component/static/static-list.component");
var static_item_component_1 = require("./component/static/static-item.component");
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
            list_filter_pipe_1.ListFilterPipe,
            list_orderby_pipe_1.ListOrderBy,
            ml_pipe_1.MLPipe,
            froala_directives_1.FroalaEditorDirective,
            froala_directives_1.FroalaViewDirective,
            common_component_1.CommonComponent,
            mlinput_component_1.MLInputComponent,
            mleditor_component_1.MLEditorComponent,
            order_list_component_1.OrderListComponent,
            order_item_component_1.OrderItemComponent,
            order_human_component_1.OrderHumanComponent,
            order_trip_component_1.OrderTripComponent,
            order_package_component_1.OrderPackageComponent,
            user_list_component_1.UserListComponent,
            user_item_component_1.UserItemComponent,
            point_list_component_1.PointListComponent,
            vehicle_list_component_1.VehicleListComponent,
            hotel_list_component_1.HotelListComponent,
            hotel_item_component_1.HotelItemComponent,
            hotel_price_component_1.HotelPriceComponent,
            trip_list_component_1.TripListComponent,
            trip_item_component_1.TripItemComponent,
            package_list_component_1.PackageListComponent,
            package_item_component_1.PackageItemComponent,
            price_component_1.PriceComponent,
            static_list_component_1.StaticListComponent,
            static_item_component_1.StaticItemComponent
        ],
        providers: [
            api_service_1.APIService,
            file_service_1.FileService
        ],
        bootstrap: [
            app_component_1.AppComponent
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map