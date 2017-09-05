import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { HostListener } from '@angular/core';

import 'rxjs/add/operator/throttle';

import { PokedexService } from '../services/pokedex.service';
import { Pokemon } from '../types/pokemon';

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss']
})

export class GridComponent implements OnInit {
    pokemons: Array<Pokemon> = [];
    randomIDsList: Array<number>;
    lastPokemon = 700;
    APICount: number;

    // Loader
    isLoading: Boolean = true;
    isLoadingMore: Boolean = false;
    progress = 0;
    total = 12;

    constructor(
        private pokedex: PokedexService,
    ) { }

    @HostListener('window:scroll', ['$event'])
    onScroll(e: Event): void {
        if (!this.isLoading && this.isLoadingMore) {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
                this.loadMore();
            }
        }
    }

    ngOnInit(): void {
        this.pokedex.getAPICount()
            .then(result => {
                // API returns 3 empty IDS
                this.APICount = +result - 3;
                this.randomIDsList = this.generateRandomPool(this.APICount);

                this.loadRandomSet(12);
            });
    }

    loadMore(): void {
        this.isLoadingMore = true;
        this.loadRandomSet(12);
    }

    loadRandomSet(setSize: number): void {
        this.total = setSize;
        this.progress = 0;

        for (let i = 0; i < setSize; i++) {
            // overflow prevention
            this.lastPokemon = (this.lastPokemon > this.APICount - 1) ? 0 : this.lastPokemon;

            ((id) => {
                this.pokedex.getPokemonByID(this.randomIDsList[id])
                .then(pokemon => {
                    this.pokemons.push(pokemon as Pokemon);
                    this.progress++;
                    this.isLoading = (this.progress >= setSize) ? false : this.isLoading;
                });
            })(this.lastPokemon);

            this.lastPokemon++;
        }
    }

    randomIDOffset(length: number, limit: number): number {
        return Math.floor((Math.random() * length) - limit) + 1;
    }

    generateRandomPool(poolsize: number): Array<number> {
        const idset: Array<number> = [];

        for (let index = 0; index < poolsize; index++) {
            idset.push(index + 1);
        }

        ((length) => {
            for (let i = length; i; i--) {
                const j = Math.floor(Math.random() * i);
                [idset[i - 1], idset[j]] = [idset[j], idset[i - 1]];
            }
        })(idset.length);

        return idset;
    }

    // generateRandomSet(length: number, poolsize: number): Array<number> {
    //     const idset: Array<number> = [];

    //     for (let i = 0; i < length; i++) {
    //         idset[i] = Math.floor(Math.random() * poolsize) + 1;
    //     }

    //     console.log(idset);
    //     return idset;
    // }
}
