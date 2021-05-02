import React, {Component} from 'react'

import './SetupChores.css'
import Context from '../Context'

const createID = ()=>{
  return(
      Math.floor(Math.random()*100000)
  )
}
export default class SetupChores extends Component{
   
  static defaultProps = {
      history: {
          push: ()=>{}
      },
  }
  static contextType = Context;

  handleSubmit= (e)=>{
      e.preventDefault()
      this.context.addChore({
        chore: e.target['chore'].value,
        points: e.target['points'].value,
        assignedTo: e.target['assign'].value,
        choreID: createID(),
        done: false
      })
      document.getElementById("chores").reset();
  }
  remove = (e) =>{
    const removed = this.context.chores.filter(chore => chore.choreID !== parseInt(e))

    this.context.removeChore(removed)
}

 render(){
  return (
    <main className='chores'>
      <header className='Chores-header'>
        <h1>Choose Family Chores</h1>
      </header>
      <section>
        <form className='setup-family-chores' id = 'chores' onSubmit={this.handleSubmit}>
          <div className ='input'>
            <label htmlFor="chores">+ Add Chores</label>
              <input
                required 
                placeholder='Vacuum' 
                type="text" 
                name='chore' 
                id='chore' 
              /><br/>
            <label htmlFor="chores">+ Assign Points</label>
              <input
                required 
                placeholder='5' 
                defaultValue = '1'
                type="number" 
                name='points' 
                id='points' 
              /><br/>
          </div>
          <div> Assign Chore
            <select 
              id ='assign' 
              name='assign'
            >
              Assign To:
                {this.context.householdMembers.map((member, idx) =>
                  <option 
                    value={member.name}
                    key = {idx}
                  >
                    {member.name}
                  </option>
                )}
            </select>
          </div>
          <button type = 'submit'>
              OK!
          </button>
        </form> <br/>
              
      </section>
      <section className = 'familyChores'>
        <ul>
          {this.context.chores.map((chore, idx) =>
          <li
          key = {idx}>
              {chore.chore} ({chore.points}pts) -- {chore.assignedTo}
              <button
                  value = {chore.choreID}
                  onClick = {(e) => this.remove(e.target.value)}>
              Remove
              </button>
          </li>  
          )}
        </ul>
      </section>
    </main>
  );
}}