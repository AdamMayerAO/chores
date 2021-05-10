import React, {Component} from 'react'
import './SetupChores.css'
import Context from '../Context'
import config from '../config'

// const createID = ()=>{
//   return(
//       Math.floor(Math.random()*100000)
//   )
// }
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
      chore: e.target['chore'].value,
      points: e.target['points'].value,
      assignedTo: e.target['assign'].value,
      done: false,
      householdId: this.context.household.id
    }
    console.log(chore)
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
    fetch(`${config.API_ENDPOINT}/chores/remove-chore`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },  
      body: JSON.stringify(chore)
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
      })
      .then(() => {
        this.context.removeChore(chore.id)
      })
      .catch(error => {
        console.error({ error })
      })
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