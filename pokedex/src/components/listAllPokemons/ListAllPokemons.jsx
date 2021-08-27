import React, {useState , useEffect} from 'react';

export default function ListAllPokemons() {
    // created a variable that gets the element by ID
    const [pokemon, setpokemon] = useState({})

    const pokemons_number = 251;


    const fetchPokemons = async () => {
        for (let i = 1; i <= pokemons_number; i++) {
            await getPokemon(i);
        }
    }

    const getPokemon = async (id) => {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const res = await fetch(url);
        const pokemon = await res.json();
        setpokemon(pokemon)
    }

    useEffect(() => {
        fetchPokemons();
    })


    return (
        <div className="pokedex-container">
            <h1>PokeDex</h1>
            <div id="poke_container" className="poke_container">
                <div className="poKemon">
                    {pokemon.id}
                </div>
            </div>
        </div>
    )
}
