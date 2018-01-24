import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { TypeaheadInput } from './components/typeahead/components/typeahead.component';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Byhiras Typeahead Component</h1>
        </header>
        <TypeaheadInput />
      </div>
    );
  }
}

export default App;
