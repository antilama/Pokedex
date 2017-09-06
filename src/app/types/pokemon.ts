export class Pokemon {
    name: string;
    id: number;
    sprite_small: string;
    sprite_large: string;
    types: Array<object>;

    height: number;
    weight: number;
    category: string;
    abilities: Array<object>;
    gender: string;

    hp: number;
    attack: number;
    defense: number;
    special_attack: number;
    special_defense: number;
    speed: number;

    moves: Array<object>;
}
