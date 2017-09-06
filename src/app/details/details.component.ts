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

    prevPokemon: number;
    nextPokemon: number;

    pokemon: Pokemon;

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

        if (this.pokedex.pokemon === undefined) {
            this.activeroute.params.subscribe((params) => {
                this.pokedex.getPokemonByID(params.id).then(
                    result => this.pokemon = result as Pokemon
                ).then(() => {
                    this.pokemon = this.validatePokemon();
                    this.isLoading = false;
                });
            });
        } else {
            this.pokemon = this.pokedex.pokemon;
            this.pokemon = this.validatePokemon();
            this.isLoading = false;
        }
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
        this.isLoading = true;
        if (dir === 'next') {
            let nextID = this.pokemon.id;
            nextID++;

            this.router.navigate(['/details/', nextID]);
        } else {
            let prevID = this.pokemon.id;
            prevID--;

            this.router.navigate(['/details/', prevID]);
        }
    }

}
