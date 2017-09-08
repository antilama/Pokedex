import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PokedexService } from '../services/pokedex.service';
import { Pokemon } from '../types/pokemon';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
    isLoading: Boolean = true;
    APICount = 718;

    pokemon: Pokemon;

    prevPokemon: Pokemon = new Pokemon;
    nextPokemon: Pokemon = new Pokemon;

    tutorMoves: Array<object> = [];
    levelupMoves: Array<object> = [];
    machineMoves: Array<object> = [];
    eggMoves: Array<object> = [];

    constructor(
        private pokedex: PokedexService,
        private activeroute: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        window.scrollTo(0, 0);
        this.nextPokemon.name = undefined;
        this.prevPokemon.name = undefined;

        this.loadDetails();
    }

    loadDetails() {
        if (this.pokedex.pokemon === undefined) {
            this.activeroute.params.subscribe((params) => {
                this.pokedex.getPokemonByID(params.id).then(
                    result => this.pokemon = result as Pokemon
                ).then(() => {
                    this.pokemon = this.validatePokemon();
                    this.isLoading = false;
                    this.preloadNeighborns(this.pokemon.id);
                });
            });
        } else {
            this.pokemon = this.pokedex.pokemon;
            this.pokemon = this.validatePokemon();
            this.isLoading = false;
            this.preloadNeighborns(this.pokemon.id);
        }
    }

    preloadNeighborns(currID: number): void {
        let nextID = currID, prevID = currID;
        nextID = (nextID >= this.APICount) ? 1 : nextID - (-1);
        prevID = (prevID <= 1) ? this.APICount : prevID - 1;

        this.pokedex.getPokemonByID(prevID).then(
            result => this.prevPokemon = result as Pokemon
        );
        this.pokedex.getPokemonByID(nextID).then(
            result => this.nextPokemon = result as Pokemon
        );
    }

    validatePokemon(): Pokemon {
        const correctPokemon = this.pokemon;
        function normalize(value: number): number {
            return Math.round((value / 180) * 116);
        }

        correctPokemon.hp = normalize(correctPokemon.hp);
        correctPokemon.attack = normalize(correctPokemon.attack);
        correctPokemon.defense = normalize(correctPokemon.defense);
        correctPokemon.special_attack = normalize(correctPokemon.special_attack);
        correctPokemon.special_defense = normalize(correctPokemon.special_defense);
        correctPokemon.speed = normalize(correctPokemon.speed);

        correctPokemon.gender = correctPokemon.gender || 'F / M';
        correctPokemon.category = correctPokemon.category || '-';

        this.pokedex.getDescription(correctPokemon['descriptionURL']).then(
            result => correctPokemon['description'] = result['description']
        );

        correctPokemon.moves.forEach(element => {
            switch (element['learn_type']) {
                case 'tutor':
                    this.tutorMoves.push(element);
                    break;

                case 'egg move':
                    this.eggMoves.push(element);
                    break;

                case 'machine':
                    this.machineMoves.push(element);
                    break;

                case 'level up':
                    this.levelupMoves.push(element);
                    break;

                default:
                    break;
            }

        });

        return correctPokemon;
    }

    changePage(dir: string): void {
        let newID: number = this.pokemon.id;

        this.pokedex.pokemon = undefined;
        this.isLoading = true;

        if (dir === 'next') {
            newID = (newID >= this.APICount) ? 1 : newID - (-1);
        } else {
            newID = (newID <= 1) ? this.APICount : newID - 1;
        }

        this.router.navigate(['/details/', newID]);
        this.loadDetails();
    }

}
