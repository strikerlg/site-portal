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
const core_1 = require('@angular/core');
const platform_browser_1 = require('@angular/platform-browser');
const forms_1 = require('@angular/forms');
const http_1 = require('@angular/http');
// Imports for loading & configuring the in-memory web api
const angular2_in_memory_web_api_1 = require('angular2-in-memory-web-api');
const in_memory_data_service_1 = require('./in-memory-data.service');
const app_component_1 = require('./app.component');
const grid_component_1 = require('../grid/grid.component');
const gird_orderable_component_1 = require('../grid/gird.orderable.component');
const app_routing_1 = require('./app.routing');
require('../shared/rxjs-extensions');
const ng2_bs3_modal_1 = require('ng2-bs3-modal/ng2-bs3-modal');
const ng2_dragula_1 = require('ng2-dragula/ng2-dragula');
const ng2_popover_1 = require("ng2-popover");
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            angular2_in_memory_web_api_1.InMemoryWebApiModule.forRoot(in_memory_data_service_1.InMemoryDataService),
            app_routing_1.routing,
            ng2_bs3_modal_1.Ng2Bs3ModalModule,
            ng2_dragula_1.DragulaModule,
            ng2_popover_1.PopoverModule
        ],
        declarations: [
            app_component_1.AppComponent,
            grid_component_1.GridComponent,
            gird_orderable_component_1.GridOrderableComponent
        ],
        bootstrap: [app_component_1.AppComponent]
    }), 
    __metadata('design:paramtypes', [])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map