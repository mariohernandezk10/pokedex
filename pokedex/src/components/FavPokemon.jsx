import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function FavPokemon({pokemon}) {
    const [data, setData] = useState({});

    useEffect(() => {
        axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        // .then(data => console.log(data))
        .then(setData)
    }, [pokemon]);

    console.log(data.data);
    return (
        <div className="pokedex">
            <h1>Favorite Pokemon: {}</h1>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/150.svg`} alt="fav pokemon" />
        </div>
    )
}
