import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Pokemon } from '../types/pokemon';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PokedexService {
    pokemon: Pokemon;
    private pokemonURL = 'http://pokeapi.co/api/v1';

    constructor(private http: Http) { }

    getAPICount(): Promise<object> {
        const url = `http://pokeapi.co/api/v2/pokemon-species/?limit=0`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().count)
            .catch(this.handleError);
    }

    getPokemons(limit: number, offset: number): Promise<object> {
        const url = `${this.pokemonURL}/pokemon/?limit=${limit}&offset=${offset}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().results)
            .then(data => {
                return data.map((poke, id) => {
                    let realID: string = '00' + (id + offset);
                    realID = realID.substr(realID.length - 3);
                    return {
                        name: poke.name,
                        id: realID,
                        sprite: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/' + realID + '.png'
                    };
                });
            })
            .catch(this.handleError);
    }

    getPokemonByID(id: number): Promise<object> {
        const url = `${this.pokemonURL}/pokemon/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json())
            .then(data => {
                let realID: string = '00' + data.national_id;
                realID = realID.substr(realID.length - 3);
                return {
                    name: data.name,
                    id: realID,
                    sprite_small: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/' + realID + '.png',
                    sprite_large: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/' + realID + '.png',
                    types: data.types,

                    height: data.height,
                    weight: data.weight,
                    category: data.species,
                    abilities: data.abilities,
                    gender: data.male_female_ratio,

                    hp: data.hp,
                    attack: data.attack,
                    defense: data.defense,
                    special_attack: data.sp_atk,
                    special_defense: data.sp_def,
                    speed: data.speed,

                    moves: data.moves
                };
            })
            .catch(this.handleError);
    }

    getPokemon(id: number): Promise<object> {
        const url = `${this.pokemonURL}/pokemon/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
