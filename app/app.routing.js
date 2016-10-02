"use strict";
const router_1 = require('@angular/router');
const grid_component_1 = require('../grid/grid.component');
const gird_orderable_component_1 = require('../grid/gird.orderable.component');
const appRoutes = [
    {
        path: '',
        redirectTo: '/grid',
        pathMatch: 'full'
    },
    {
        path: 'grid',
        component: grid_component_1.GridComponent
    },
    {
        path: 'gridorder',
        component: gird_orderable_component_1.GridOrderableComponent
    }
];
exports.routedComponents = [grid_component_1.GridComponent, gird_orderable_component_1.GridOrderableComponent];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map