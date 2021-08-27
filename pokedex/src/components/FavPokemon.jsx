import React from 'react';

// You can use props or destructor {pokemon} from component
// I CAN SEE IF I CAN GET AS MUCH INFO AS I CAN FROM ONE POKEMON AND ADD IT DYNAMICALLY
// BASE EXPERIENCE, HEIGHT, NAME, SPRITE, ALL STATS, TYPES, AND WEIGHT
export default function FavPokemon() {

    return (
        <div className="pokedex">
            <h1>Favorite Pokemon: MEWTWO</h1>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/150.svg`} alt="fav pokemon" />
        </div>
    )
}
