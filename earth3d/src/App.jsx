import React from 'react';
import './App.css';
import Earth from './Earth';

function App() {
    return (
      <div className="App">
        <h2>Welcome to EarthJS</h2>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div className="relative">
            <Earth/>
        </div>
      </div>
    );
}

export default App;
