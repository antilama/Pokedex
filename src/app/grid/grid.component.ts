import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';

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
    inifiniteScrollOn: Boolean = false;
    progress = 0;
    total = 12;

    constructor(
        private pokedex: PokedexService,
    ) { }

    @HostListener('window:scroll', ['$event'])
    onScroll(e: Event): void {
        if (!this.isLoading && this.inifiniteScrollOn) {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 30) {
                this.loadMore();
            }
        }
    }

    ngOnInit(): void {
        window.scrollTo(0, 0);

        this.pokedex.getAPICount()
            .then(result => {
                // API returns 3 empty IDS
                this.APICount = +result - 3;
                this.randomIDsList = this.generateRandomPool(this.APICount);

                this.loadRandomSet(12);
            });
    }

    loadMore(): void {
        this.progress = 0;
        this.inifiniteScrollOn = true;
        this.loadRandomSet(12);
    }

    loadRandomSet(setSize: number): void {
        this.total = setSize;

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

    passPokemon(index: number): void {
        this.pokedex.pokemon = this.pokemons[index];
    }
}
