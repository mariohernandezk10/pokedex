import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';

// Explaining "useState()"
// pokedex is the current

function App() {
    const [pokedex, setPokedex] = useState([]);
    const [wildPokemon, setWildPokemon] = useState({});

    useEffect(() => {
        encounterWildPokemon()
    }, [])

    const pokeId = () => {
        const min = Math.ceil(1);
        const max = Math.ceil(251);
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    const encounterWildPokemon = () => {
        axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokeId()}`)
        .then(res => {
            setWildPokemon(res.data);
        })

    }
    const catchPokemon = (pokemon) => {
        setPokedex(state => {
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
        setPokedex(state => state.filter(p => p.id !== id))
    }

    return (
      <>
      <div className="app-wrapper">
        <header>
                <h1 className="title">React Hooks</h1>
                <h3 className="subtitle">With Pokemon</h3>
            </header>

            <section className="wild-pokemon">
                <h2>Wild Encounter</h2>
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${wildPokemon.id}.svg`} alt="wild pokemon" className="sprite"/>
                <h3>{wildPokemon.name}</h3>
                <button className="catch-btn" onClick={() => catchPokemon(wildPokemon)}>CATCH THAT POKEMON</button>
            </section>

            <section className="pokedex">
                <h2>Pokedex</h2>
                <div className="pokedex-list">
                    {pokedex.map((pokemon) => (
                        <div className="pokemon" key={pokemon.id}>
                            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`} alt="caught pokemon" className="sprite"/>
                            <h3 className="pokemon-name">{pokemon.name}</h3>
                            <button className="remove" onClick={() => releasePokemon(pokemon.id)} >&times;</button>
                        </div>
                    ))}
                </div>
            </section>
      </div>
      </>
    )
}



ReactDOM.render(<App />, document.getElementById('root'));

