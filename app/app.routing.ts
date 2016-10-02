import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GridComponent }     from '../grid/grid.component';
import { GridOrderableComponent }   from '../grid/gird.orderable.component';

const appRoutes: Routes = [
	{
		path: '',
		redirectTo: '/grid',
		pathMatch: 'full'
	},
	{
		path: 'grid',
		component: GridComponent
    },
    {
		path: 'gridorder',
		component: GridOrderableComponent
    }
];

export const routedComponents = [GridComponent, GridOrderableComponent];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
