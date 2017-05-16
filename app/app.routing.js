"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var tripselector_form_component_1 = require("./component/tripselector/tripselector-form.component");
var order_trip_component_1 = require("./component/order/order-trip.component");
var order_package_component_1 = require("./component/order/order-package.component");
var packagelist_component_1 = require("./component/packagelist/packagelist.component");
var user_page_component_1 = require("./component/user/user-page.component");
var appRoutes = [
    {
        path: 'en',
        component: tripselector_form_component_1.TripSelectorFormComponent
    },
    {
        path: 'ar',
        component: tripselector_form_component_1.TripSelectorFormComponent
    },
    {
        path: 'en/order',
        component: order_trip_component_1.OrderTripComponent
    },
    {
        path: 'ar/order',
        component: order_trip_component_1.OrderTripComponent
    },
    {
        path: 'en/order-package',
        component: order_package_component_1.OrderPackageComponent
    },
    {
        path: 'ar/order-package',
        component: order_package_component_1.OrderPackageComponent
    },
    {
        path: 'en/package-list',
        component: packagelist_component_1.PackageListComponent
    },
    {
        path: 'ar/package-list',
        component: packagelist_component_1.PackageListComponent
    },
    {
        path: 'en/user',
        component: user_page_component_1.UserPageComponent
    },
    {
        path: 'ar/user',
        component: user_page_component_1.UserPageComponent
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map