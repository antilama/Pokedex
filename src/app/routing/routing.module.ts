import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsComponent } from '../details/details.component';
import { GridComponent } from '../grid/grid.component';

const routes: Routes = [
    {
        path: 'details/:id',
        component: DetailsComponent
    },
    {
        path: 'grid',
        component: GridComponent
    },
    {
        path: '', redirectTo: 'grid', pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class RouteRoutingModule { }
