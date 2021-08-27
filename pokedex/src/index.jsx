import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';

// Explaining "useState()"
// "wildPokemonState" is the first pokemon that pops up on the screen &
// the first pokemon to get automatically saved in the state, this
// state has a default value of an empty object because there will be 
// only one wild pokemon present at a time

export default function App() {
    // the "setPokedexState" function will be called when we 
    // click the catch that pokemon button
    // This grabs that pokemon which is currently saved in the 
    // "wildPokemonState" 
    const [pokedexState, setPokedexState] = useState([]);
    const [wildPokemonState, setwildPokemonState] = useState({});
    const [pokemonTypeState, setPokemonTypeState] = useState([]);
    const [pokemon2ndTypeState, setPokemon2ndTypeState] = useState([]);

    // I need to add a function that will reset the state once it is used
    // I thought about it and if I check it using the last it won't work
    // because the next pokemon could be the same type

    useEffect(() => {
        encounterWildPokemon();
    }, [])
    // In this case "useEffect()" has to be used because the 
    // "encounterWildPokemon()" will not be accessible w/o 
    // "useEffect()"
    // We don't have to listen to a state in this case but 
    // that empty array has to be present or it will render
    // over and over again

    const pokeId = () => {
        const min = Math.ceil(1);
        const max = Math.ceil(251);
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    const encounterWildPokemon = () => {
        axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokeId()}`)
        // .then(res => {console.log(res.data.types)})
        .then(res => {
            setwildPokemonState(res.data);
            if (res.data.types[0] && res.data.types[1]) {
                setPokemonTypeState(res.data.types[0].type.name);
                setPokemon2ndTypeState(res.data.types[1].type.name);
            } if (res.data.types[0] && !res.data.types[1]) {
                setPokemonTypeState(res.data.types[0].type.name);
                setPokemon2ndTypeState([]);
                // I need to reset "pokemon2ndTypeState" to []
                // console.log("First type has been updated")
            } else {
                // console.log("Both types have been updated");
            }
        })
    }
    // That's it for the only function that will be called as 
    // soon as the page loads, which is "encounterWildPokemon()"

    // All other functions below will be called by a button click

    const catchPokemon = (pokemon) => {
        setPokedexState(state => {
            const monExists = (state.filter(p => pokemon.id === p.id).length > 0);

            if (!monExists) {
                state = [...state, pokemon]
                state.sort(function (a, b) {
                    return a.id - b.id
                })
            }
            return state;
        })
        encounterWildPokemon();
    }
    const releasePokemon = (id) => {
        // "pokemon.id !== id" the id which is the pokemon id we just clicked on,
        // which is also going to be called the "independent id" or the "id to compare";
        // it's being used to evaluate each pokemon's id and return all pokemon's id
        // that is not the "independent id"

        // "pokemon.id === id" will deleted all the other pokemon's that do not have the matching
        // id to the "independent id"
        setPokedexState(state => state.filter(pokemon => pokemon.id !== id))
    }

    return (
      <>
      <div className="app-wrapper">
            <header>
                    <h1 className="title">React Hooks</h1>
                    <h3 className="subtitle">With Pokemon</h3>
            </header>

    {/* ------------------WHERE WE USE THE "wildPokemonState" and "pokemonTypeState" VARIABLE--------------------------------------------------------------------------------------------------------------------- */}
    {/* ------------------TO DYNAMICALLY ADD IT TO THE IMG AND ANYTHING ELSE--------------------------------------------------------------------------------------------------------------------- */}
            <section className="wild-pokemon">
                <h2>Wild Encounter</h2>
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${wildPokemonState.id}.svg`} alt="wild pokemon" className="sprite"/>
                <h3>{wildPokemonState.name}</h3>
                <h4>Base Experience: {wildPokemonState.base_experience}</h4>
                <h4 >Type 1: {pokemonTypeState}</h4>
                <h4>Type 2: {pokemon2ndTypeState}</h4>
                <button className="catch-btn" onClick={() => catchPokemon(wildPokemonState)}>CATCH THAT POKEMON</button>
            </section>

            {/* ADD A LINK THAT WILL SEND ME TO ANOTHER PAGE, POSSIBILY A FAVORITE POKEMON PAGE TO LEARN MORE ABOUT POKEMON
            THE H3 ELEMENT CAN BE A LINK WHERE THE LETTERS CAN BE CLICKED */}
            <section className="pokedex" >
                <h2>Pokedex</h2>
                <div className="pokedex-list">
                    {pokedexState.map((pokemon) => (
                        <div className="pokemon" key={pokemon.id} info={pokemon} >
                            {/* So each pokemon has more info in their attribute */}
                            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`} alt="caught pokemon" className="sprite"/>
                            <h3 className="pokemon-name">{pokemon.name}</h3>
                            <button className="remove" onClick={() => releasePokemon(pokemon.id)} >&times;</button>
                            {/* adding a button with an onClick function that will */}
                        </div>
                    ))}
                </div>
            </section>
      </div>
      </>
    )
}

// Try adding your FavPokemon component

ReactDOM.render(
    <React.StrictMode>
            <App />
    </React.StrictMode>,
    document.getElementById('root')
);