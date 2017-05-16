"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var common_component_1 = require("./component/common/common.component");
var order_list_component_1 = require("./component/order/order-list.component");
var order_item_component_1 = require("./component/order/order-item.component");
var user_list_component_1 = require("./component/user/user-list.component");
var user_item_component_1 = require("./component/user/user-item.component");
var point_list_component_1 = require("./component/point/point-list.component");
var vehicle_list_component_1 = require("./component/vehicle/vehicle-list.component");
var hotel_list_component_1 = require("./component/hotel/hotel-list.component");
var hotel_item_component_1 = require("./component/hotel/hotel-item.component");
var trip_list_component_1 = require("./component/trip/trip-list.component");
var trip_item_component_1 = require("./component/trip/trip-item.component");
var package_list_component_1 = require("./component/package/package-list.component");
var package_item_component_1 = require("./component/package/package-item.component");
var static_list_component_1 = require("./component/static/static-list.component");
var static_item_component_1 = require("./component/static/static-item.component");
var appRoutes = [
    {
        path: '',
        redirectTo: '/orders',
        pathMatch: 'full'
    },
    {
        path: 'common',
        component: common_component_1.CommonComponent
    },
    {
        path: 'orders',
        component: order_list_component_1.OrderListComponent
    },
    {
        path: 'orders/:type/:id',
        component: order_item_component_1.OrderItemComponent
    },
    {
        path: 'users',
        component: user_list_component_1.UserListComponent
    },
    {
        path: 'users/:id',
        component: user_item_component_1.UserItemComponent
    },
    {
        path: 'points',
        component: point_list_component_1.PointListComponent
    },
    {
        path: 'vehicle',
        component: vehicle_list_component_1.VehicleListComponent
    },
    {
        path: 'hotels',
        component: hotel_list_component_1.HotelListComponent
    },
    {
        path: 'hotels/:id',
        component: hotel_item_component_1.HotelItemComponent
    },
    {
        path: 'trips',
        component: trip_list_component_1.TripListComponent
    },
    {
        path: 'trips/:id',
        component: trip_item_component_1.TripItemComponent
    },
    {
        path: 'packages',
        component: package_list_component_1.PackageListComponent
    },
    {
        path: 'packages/:id',
        component: package_item_component_1.PackageItemComponent
    },
    {
        path: 'static',
        component: static_list_component_1.StaticListComponent
    },
    {
        path: 'static/:id',
        component: static_item_component_1.StaticItemComponent
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map