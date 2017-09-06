import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RouteRoutingModule } from './routing/routing.module';

import { PokedexService } from './services/pokedex.service';

import { DetailsComponent } from './details/details.component';
import { GridComponent } from './grid/grid.component';
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
    providers: [PokedexService],
    bootstrap: [AppComponent]
})
export class AppModule { }
