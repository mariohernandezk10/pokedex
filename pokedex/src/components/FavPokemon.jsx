import React, { useEffect, useState } from 'react';
import axios from 'axios';

// You can use props or destructor {pokemon} from component
export default function FavPokemon(props) {
    const [data, setData] = useState({});

    useEffect(() => {
        axios
        .get(`https://pokeapi.co/api/v2/pokemon/${props.pokemon}`)
        // .then(data => console.log(data))
        .then(setData)
    }, [props.pokemon]);

    console.log(data.data);
    return (
        <div className="pokedex" data={data.data}>
            <h1>Favorite Pokemon: {}</h1>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/150.svg`} alt="fav pokemon" />
        </div>
    )
}
