import React, { Component } from 'react';

// laoding external components
import GifChat from './gifChat';
import SpotifyArtists from './spotifyArtists';

//loading stylesheets

import './App.css';

class App extends Component {
  render() {
    return (

      <div className="App"> 
        <GifChat/>
        <SpotifyArtists />
      </div>
    );
  }
}

export default App;
