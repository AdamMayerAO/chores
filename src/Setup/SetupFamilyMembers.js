import React, {Component} from 'react'
import './SetupFamilyMembers.css'
import Context from '../Context'

const createID = ()=>{
    return(
        Math.floor(Math.random()*100000)
    )
}
export default class SetupFamilyMembers extends Component{
   
    static defaultProps = {
        history: {
            push: ()=>{}
        },
    }
    static contextType = Context;

    
    
    handleSubmitAdult= (e)=>{
        e.preventDefault()
        this.context.addFamilyMember({
                name: e.target['name'].value, 
                age: 'adult',
                id: createID(),
                points: 0
        })
        document.getElementById("aForm").reset();
    }
    handleSubmitKid= (e)=>{
        e.preventDefault()
        this.context.addFamilyMember({
                name: e.target['name'].value, 
                age: 'kid',
                id: createID(),
                points: 0
        })
        document.getElementById("kForm").reset();
    }

    remove = (e) =>{
        
        const removed = this.context.householdMembers.filter(member => member.id !== parseInt(e))

        this.context.removeMember(removed)
    }
   render(){
        return (
        
            <div className = 'AddFamilyMember'>
                <h3 className = 'header'>Add Family Members</h3>
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
                                //onChange={(e) => this.setAdult(e.target.value)} 
                            /><br/>
                        </div>
                        <button type = 'submit'>
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
                              
                                //onChange={(e) => this.setKid(e.target.value)} 
                            /><br/>
                        </div>
                
                        <button type = 'submit'>
                            Add Kid
                        </button>
                    </form>
                </section>
                <section className = 'familyMembers'> 
                    <ul>
                        {this.context.householdMembers.map((member, idx) =>
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