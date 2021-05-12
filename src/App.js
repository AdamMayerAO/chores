import React, { Component } from 'react';
import './App.css';
import Navigation from "./Navigation";
import Context from './Context'
import { BrowserRouter } from 'react-router-dom';
class App extends Component {

  state = {
    household: [],  
    members: [],
    chores: [],
    pendingApproval: [],
    prize: '',
  }

  addHousehold = (household) =>{
    let tempState = this.state;
    tempState.household = household;
    this.setState(tempState)
  }
  setFamilyPrize = (prize) =>{
    let tempState = this.state;
    tempState.prize = prize;
    this.setState(tempState)
  }
  addFamilyMember = (name) =>{
    let tempState = this.state;
    tempState.members.push(name);
    this.setState(tempState)
  }
  updateMembers = (m) =>{
    let tempState = this.state;
    tempState.members = m;
    this.setState(tempState)
  }

  //adds chores from database
  updateChores = (c) =>{
    let tempState = this.state;
    tempState.chores = c;
    this.setState(tempState)
  }
  addChore = (chore) =>{
    let tempState = this.state;
    tempState.chores.push(chore);
    this.setState(tempState)
  }
  updateChore = (doneChore) =>{
    //updates with array from backend
    let tempState = this.state;
    tempState.chores = doneChore;
    this.setState(tempState)
  }
  updatePendingApproval = (addToPA) =>{
    //updates with array from backend
    let tempState = this.state;
    tempState.pendingApproval = addToPA;
    this.setState(tempState)
  }
  addToPendingApproval = (chore)=>{
    let tempState = this.state;
    tempState.pendingApproval.push(chore);
    this.setState(tempState)
  }

  removeFromPendingApproval = (returnChore)=>{
    let tempState = this.state;
    tempState.pendingApproval = returnChore;
    this.setState(tempState)
  }
  updateHouseholdPoints = (totalPoints)=>{
    let tempState = this.state;
    tempState.household.points = totalPoints;
    this.setState(tempState)
  }
  
  updateCurrentUser =(user) =>{
    let tempState = this.state;
    tempState.members.push(user);
    this.setState(tempState) 
  }
  
  removeChore = (choreId) =>{
    let tempState = this.state;
    tempState.chores = this.state.chores.filter(chore => chore.id !== choreId);
    this.setState(tempState)
    }
  
  removeMember = (memberId) =>{
    let tempState = this.state;
    tempState.members = this.state.members.filter(member => member.id !== memberId);
    this.setState(tempState)
  }

  render(){
    const value = {
      household: this.state.household,      
      members: this.state.members,
      chores: this.state.chores,
      prize: this.state.prize,
      pendingApproval: this.state.pendingApproval,
      addHousehold: this.addHousehold,
      addFamilyMember: this.addFamilyMember,
      addChore: this.addChore,
      setFamilyPrize: this.setFamilyPrize,
      removeChore: this.removeChore,
      removeMember: this.removeMember,
      updateChores: this.updateChores,
      updateChore: this.updateChore,
      updateMembers: this.updateMembers,
      updateHouseholdPoints: this.updateHouseholdPoints,
      addToPendingApproval: this.addToPendingApproval,
      removeFromPendingApproval: this.removeFromPendingApproval,
      updatePendingApproval: this.updatePendingApproval
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
