import './App.css';
import React, {Component} from 'react';
import Pokemon from "./components/Pokemon"

class App extends Component {
  render() {
    return (
        <div className="app-wrapper">
          <Pokemon />
          {/* <FavPokemon pokemon="mew" /> */}
          {/* useReducer may be better for this component because 
          when the pokemon changes so does the background */}
        </div>
    );
  }
}

export default App;