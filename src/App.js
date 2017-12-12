import React, { Component } from 'react';

import Navbar from './Navbar';
import GameBoard from './GameBoard';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Navbar />
        <GameBoard /> 
      </div>
    );
  }
}

export default App;
