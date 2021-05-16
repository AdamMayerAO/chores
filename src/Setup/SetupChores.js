import React, {Component} from 'react'
import './SetupChores.css'
import Context from '../Context'
import config from '../config'


export default class SetupChores extends Component{
   
  static defaultProps = {
      history: {
          push: ()=>{}
      },
  }
  static contextType = Context;

  handleSubmit= (e)=>{
    e.preventDefault()
    const chore = {
      householdId: this.context.household.id,
      points: parseInt(e.target['points'].value),
      chore: e.target['chore'].value,
      done: false,
      member_name: e.target['assign'].value
    }
    fetch(`${config.API_ENDPOINT}/chores/add-chore`, {
      method: 'POST',
      headers: {
          'content-type': 'application/json',
      },
      body: JSON.stringify(chore)
    })
    .then(res => {
      if (!res.ok)
      return res.json().then(e => Promise.reject(e))
      return res.json()
    })
    .then(chore => {
      
      let a = (Object.entries(chore)[0])
      let h = (a[1])
      console.log(h)
      this.context.addChore(h)
    })
    .catch(error => {
        console.error('add chore ',{ error })
    })
    document.getElementById("chores").reset();
  }
  
  remove = (e) =>{
    const chore = this.context.chores.find(chore => chore.id === parseInt(e))
    const toDelete = {
      householdId: chore.householdId
    }
    fetch(`${config.API_ENDPOINT}/chores/id/${chore.id}`, {
      method: 'DELETE',
      headers: {
          'content-type': 'application/json',
      },
      body: JSON.stringify(toDelete)
      })
      .then(res => {
          if (!res.ok)
              return res.json().then(e => Promise.reject(e))
      })
      .then(() => {
        this.context.removeChore(chore.id)
      })
      .catch(error => {
        console.error("Chore not removed!", { error })
      })
  }

 render(){
  return (
    <main className='chores'>
      <header className='Chores-header'>
      <h3 className = 'title'>Family Chores:</h3>
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
                {this.context.members.map((member, idx) =>
                  <option 
                    value={member.name}
                    key = {idx}
                  >
                    {member.name}
                  </option>
                )}
            </select>
          </div>
          <button className = 'button' type = 'submit'>
              OK!
          </button>
        </form> <br/>
              
      </section>
      <section className = 'familyChores'>
        <ul>
          {this.context.chores.map((chore, idx) =>
          <li
          key = {idx}>
              {chore.chore} ({chore.points}pts) -- {chore.member_name}
              <button
                  value = {chore.id}
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