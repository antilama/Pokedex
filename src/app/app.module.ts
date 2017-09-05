import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PokedexService } from './services/pokedex.service';
import { GridComponent } from './grid/grid.component';
import { RouteRoutingModule } from './routing/routing.module';
import { DetailsComponent } from './details/details.component';
import { LoaderComponent } from './loader/loader.component';


@NgModule({
    declarations: [
        GridComponent,
        DetailsComponent,
        AppComponent,
        LoaderComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        RouteRoutingModule
    ],
    providers: [PokedexService, LoaderComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
