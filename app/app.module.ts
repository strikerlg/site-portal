import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule }    from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent }             from './app.component';
import { GridComponent }            from '../grid/grid.component';
import { GridOrderableComponent }   from '../grid/gird.orderable.component';


import { routing }              from './app.routing';

import '../shared/rxjs-extensions';

import { Ng2Bs3ModalModule }    from 'ng2-bs3-modal/ng2-bs3-modal';
import { DragulaModule }        from 'ng2-dragula/ng2-dragula';
import { PopoverModule }        from "ng2-popover";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
	HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    routing,
    Ng2Bs3ModalModule,
    DragulaModule,
    PopoverModule
  ],
  declarations: [
    AppComponent,
    GridComponent,
    GridOrderableComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
