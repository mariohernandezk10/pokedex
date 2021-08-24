import './App.css';
import React, {Component} from 'react';
import Pokemon from "./components/Pokemon";
import FavPokemon from "./components/FavPokemon"

class App extends Component {
  render() {
    return (
      // should I add the link to AllPokemon here?
      
        <div className="app-wrapper">
          <Pokemon />
          <hr />
          <FavPokemon pokemon={150} />
          {/* useReducer may be better for this component because 
          when the pokemon changes so does the background */}
        </div>
    );
  }
}

export default App;