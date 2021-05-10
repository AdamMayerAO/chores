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
    prize: '',
  }
//   componentDidMount() {
//     Promise.all([
//         fetch(`${config.API_ENDPOINT}/chores`),
//         fetch(`${config.API_ENDPOINT}/household`),
//         fetch(`${config.API_ENDPOINT}/members`)

//     ])
//       .then(([choresRes, householdRes, membersRes]) => {
//             if (!choresRes.ok)
//                 return choresRes.json().then(e => Promise.reject(e));
//             if (!householdRes.ok)
//                 return householdRes.json().then(e => Promise.reject(e));
//             if (!membersRes.ok)
//                 return membersRes.json().then(e => Promise.reject(e));

//             return Promise.all([choresRes.json(), householdRes.json(), membersRes.json()]);
//         })
//         .then(([chores, household, members]) => {
//             this.setState({chores, household, members});
//         })
//         .catch(error => {
//             console.error({error});
//         });
// }; 
  addHousehold = (household) =>{
    this.setState({household})
  }
  setFamilyPrize = (prize) =>{
    this.setState(prize)
  }
  addFamilyMember = (name) =>{
    let tempState = this.state;
    tempState.members.push(name);
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
      addHousehold: this.addHousehold,
      addFamilyMember: this.addFamilyMember,
      addChore: this.addChore,
      setFamilyPrize: this.setFamilyPrize,
      removeChore: this.removeChore,
      removeMember: this.removeMember,
      updateChore: this.updateChore,
      updateHouseholdPoints: this.updateHouseholdPoints

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
