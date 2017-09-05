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
        path: '', component: GridComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class RouteRoutingModule { }
