import React, { Component } from 'react';
import './App.css';
import Navigation from "./Navigation";
import Context from './Context'
import { BrowserRouter } from 'react-router-dom';
class App extends Component {

  state = {
      householdID: null,      
      householdName:  "",
      householdMembers: [],
      chores: [],
  }
  static contextType = Context
  
  
  render(){
    return (
      <BrowserRouter>
      <main className='App'>
        <Context.Provider
        value = {this.state}
        >       
        <Navigation></Navigation>
        </Context.Provider>
      </main>
      </BrowserRouter>
    );
  }
}

export default App;
