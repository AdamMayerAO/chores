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
      prize: '',
  }
  static contextType = Context
  
  addHousehold = (householdID) =>{
    this.setState({householdID})
  }

  addFamilyMember = (name) =>{
    let tempState = this.state;
    tempState.householdMembers.push(name);
    this.setState(tempState)
  }

  addChore = (chore) =>{
    let tempState = this.state;
    tempState.chores.push(chore);
    this.setState(tempState)
  }
  updateChore = (doneChore) =>{
    let tempState = this.state;
    tempState.chores = doneChore;
    this.setState(tempState)
  }
  
  updateCurrentUser =(user) =>{
    let tempState = this.state;
    tempState.householdMembers.push(user);
    this.setState(tempState) 
  }
  setFamilyPrize = (prize) =>{
    this.setState({prize})

  }
  removeChore = (remove) =>{
    let tempState = this.state;
    tempState.chores = remove;
    this.setState(tempState)
    }
  
  removeMember = (remove) =>{
    let tempState = this.state;
    tempState.householdMembers = remove;
    this.setState(tempState)
  }
  render(){
    const value = {
      householdID: this.state.householdID,      
      householdName:  this.state.householdID,
      householdMembers: this.state.householdMembers,
      chores: this.state.chores,
      prize: this.state.prize,
      addHousehold: this.addHousehold,
      addFamilyMember: this.addFamilyMember,
      addChore: this.addChore,
      setFamilyPrize: this.setFamilyPrize,
      removeChore: this.removeChore,
      removeMember: this.removeMember,
      updateChore: this.updateChore

    }
    return (
      <main className='App'>
        <Context.Provider value = {value} >
          <BrowserRouter>      
            <Navigation />
          </BrowserRouter> 
        </Context.Provider>
      </main>
    );
  }
}

export default App;
