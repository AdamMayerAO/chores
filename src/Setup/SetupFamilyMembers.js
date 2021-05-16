import React, {Component} from 'react'
import './SetupFamilyMembers.css'
import Context from '../Context'
import config from '../config'

export default class SetupFamilyMembers extends Component{
   
    static defaultProps = {
        history: {
            push: ()=>{}
        },
    }
    static contextType = Context;
    
    handleSubmitAdult= (e)=>{
        e.preventDefault()
        console.log(this.context)

        const member = {
                name: e.target['name'].value, 
                age: 'adult',
                points: 0,
                householdId: this.context.household.id
        }
        fetch(`${config.API_ENDPOINT}/members/add-member`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(member)
          })
          .then(res => {
            if (!res.ok)
            return res.json().then(e => Promise.reject(e))
            return res.json()
          })
          .then(member => {

            let a = (Object.entries(member)[0])
            let m = (a[1])

            this.context.addFamilyMember(m)
            console.log(this.context)

          })
          .catch(error => {
              console.error('add chore ',{ error })
          })
        document.getElementById("aForm").reset();
    }
    handleSubmitKid= (e)=>{
        e.preventDefault()
        console.log(this.context.household.id)
        const member = {
            name: e.target['name'].value, 
            age: 'kid',
            points: 0,
            householdId: this.context.household.id
    }
    fetch(`${config.API_ENDPOINT}/members/add-member`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(member)
      })
      .then(res => {
        if (!res.ok)
        return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(member => {

        let a = (Object.entries(member)[0])
        let m = (a[1])

        this.context.addFamilyMember(m)
        console.log("members: ", this.context.members)
        

      })
      .catch(error => {
          console.error('add chore ',{ error })
      })
        document.getElementById("kForm").reset();
    }

    remove = (e) =>{
        const member = this.context.members.find(member => member.id === parseInt(e))
        fetch(`${config.API_ENDPOINT}/members/remove-member`, {
            method: 'DELETE',
            headers: {
            'content-type': 'application/json'
            },  
            body: JSON.stringify(member)
        })
            .then(res => {
            if (!res.ok)
                return res.json().then(e => Promise.reject(e))
            })
            .then(() => {
            this.context.removeMember(member.id)
            console.log(this.context.members)
            })
            .catch(error => {
            console.error({ error })
            })
        }
    
   render(){
        return (
        
            <div className = 'AddFamilyMember'>
                <h3 className = 'title'>Family Members:</h3>
                <section>
                    <form className='setup-family-members' id = 'aForm' onSubmit={this.handleSubmitAdult}>
                        <div className ='input'>
                            <label htmlFor="adult">+ Add Adult</label>
                            <input
                                required 
                                placeholder='First Name' 
                                type="text" 
                                name='name' 
                                id ='kid' 
                            /><br/>
                        </div>
                        <button 
                            className = 'button'
                            type = 'submit'>
                            Add Adult
                        </button>
                    </form> <br/>
                    <form className='setup-family-members' id = 'kForm' onSubmit={this.handleSubmitKid}>
                        <div className ='input'>
                            <label htmlFor="kid">+ Add Kid</label>
                            <input
                                required 
                                placeholder='First Name' 
                                type="text" 
                                name='name' 
                                id ='adult' 
                            /><br/>
                        </div>
                
                        <button 
                        className = 'button'
                        type = 'submit'>
                            Add Kid
                        </button>
                    </form>
                </section>
                <section className = 'familyMembers'> 
                    <ul>
                        {this.context.members.map((member, idx) =>
                            <li
                            key = {idx}>
                                {member.name} - {member.age} {`           `}
                                <button
                                    value = {member.id}
                                    onClick = {(e) => this.remove(e.target.value)}>
                                Remove
                                </button>
                                
                            </li>
                              
                        )}
                        
                    </ul> 
                </section>
            </div>
        );
    }   
}