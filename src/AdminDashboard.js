import React, {Component} from 'react'
import { Link} from 'react-router-dom';
import Context from './Context'
import './AdminDashboard.css'
import CheckGoal from './CheckGoal'
import config from './config'

//import user name, chores, points from context

export default class AdminDashboard extends Component{
    static defaultProps = {
        history: {
            push: ()=>{}
        },
    }
    static contextType = Context;

    notFinished = (value)=>{
        //add chore back to chores
        const chore = this.context.pendingApproval.find(chore=> chore.id ===parseInt(value))
        chore.done = false
        //this.context.addChore(chore)
        
        //remove chore from pendingApproval
        const returnChore = this.context.pendingApproval.filter(chore => chore.id !== parseInt(value))
        this.context.removeFromPendingApproval(returnChore)
        
       
        // update points
        const points = parseInt(chore.points)
        let total = parseInt(this.context.household.points)? parseInt(this.context.household.points) : 0;
        total = total-points
        this.context.updateHouseholdPoints(total) 
        
        //update backEnd
        console.log("Chore to be returned: ", chore)
        const updatedChore = {
            done: false,
            householdId: chore.householdId
            }
        console.log(updatedChore)
          fetch(`${config.API_ENDPOINT}/chores/id/${chore.id}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(updatedChore)
          })
          .then(res => {
            if (!res.ok)
            return res.json().then(e => Promise.reject(e))
            return res.json()
          })
          .then(chore => {
            
            let a = (Object.entries(chore)[0])
            let h = (a[1])
            this.context.addChore(h)
          })
          .catch(error => {
              console.error('add chore ',{ error })
          })
    }
    approved = (value)=>{
        //remove from backEnd
        const chore = this.context.pendingApproval.find(chore => chore.id === parseInt(value))
        const completed = this.context.pendingApproval.filter(chore => chore.id !== parseInt(value))
        const updatedChore = {
            householdId: chore.householdId
        }
        console.log("Updated Chore to be approved:", updatedChore, "Chore id: ", value, "completed, empty array", completed)
        fetch(`${config.API_ENDPOINT}/chores/id/${value}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(updatedChore)
        })
        .then(res => {
            console.log(res)
            if (!res.ok)
                return res.json().then(e => Promise.reject(e))
        })
        .then(() => {
            console.log("I have gotten past the response, ")
            this.context.removeFromPendingApproval(completed)
            console.log(chore, "should not be in pending approval", this.context.pendingApproval)
        })
        .catch(error => {
              console.error('chore Not approved ',{ error })
        });
    }


    finished =(value) =>{
        //remove chore from chores
        const chore = this.context.chores.find(chore => chore.id === parseInt(value))
        chore.done = true
        const doneChore = this.context.chores.filter(chore => chore.id !== parseInt(value))
        this.context.updateChore(doneChore)
        //this.context.addToPendingApproval(chore)

        
        // update points
        const points = parseInt(chore.points)
        let total = parseInt(this.context.household.points)? parseInt(this.context.household.points) : 0;
        total = total+points
        this.context.updateHouseholdPoints(total)  
        
        //update backEnd
        const updatedChore = {
            done: true,
            householdId: chore.householdId

            }
          fetch(`${config.API_ENDPOINT}/chores/id/${chore.id}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(updatedChore)
          })
          .then(res => {
            if (!res.ok)
            return res.json().then(e => Promise.reject(e))
            return res.json()
          })
          .then(chore => {
            
            let a = (Object.entries(chore)[0])
            let h = (a[1])
            this.context.addToPendingApproval(h)
          })
          .catch(error => {
              console.error('add chore ',{ error })
          })
    } 
    render(){
        const member = this.context.members.find(
            member => member.id === parseInt(
                Object.values(
                    this.props.match.params
                )))
        const name = member.name
        const familyPoints = this.context.household.points

        return (
        <div>
            <h1>{name}'s Dashboard</h1>
            <section>
               <section className = 'familyMembers'>  My Family:
                    <ul>
                        {this.context.members.map((member, idx) =>
                            <li key = {idx}>
                                {member.name}
                            </li>  
                        )}
                    </ul> 
                </section>
               
                <section className = 'Chores'>  Family Chores:
                    <ul>
                        {this.context.chores.map((chore, idx) =>
                            <li key = {idx}>
                                {chore.member_name} - {chore.chore}
                            </li>  
                        )}
                    </ul>
                </section>

                <section>
                    <h4>Here are your chores for today:</h4>
                        {this.context.chores.filter(chore => chore.member_name === name).map((chore, idx) =>
                            <li key = {idx} >
                                {chore.chore} - {chore.points} points
                                <br/><br/>
                                <button
                                    name = "finished"  
                                    value = {chore.id}
                                    id = {chore.id}
                                    onClick = {()=>this.finished(chore.id)}
                                >   
                                    Finished!
                                </button>
                            </li>  
                        )}
                </section>
                <section>
                    <h3>My Completed Chores: </h3>
                    {this.context.pendingApproval.filter(chore => chore.member_name === name).map((chore, idx) =>
                            <li
                                key = {idx}
                            >
                                {chore.chore}  -~-~-
                                <button
                                    name = "notFinished"  
                                    value = {chore.id}
                                    id = {chore.id}
                                    onClick = {(e)=>this.notFinished(e.target.value) }
                                >
                                    OOPS, I'm not finished!
                                </button>
                            </li>  
                    ) }
                </section>
                <section className = 'pendingApproval'>  Pending:
                    <ul>
                        {this.context.pendingApproval.map((chore, idx) =>
                            <li key = {idx}>
                                {chore.member_name} - {chore.chore}
                                <button
                                    name = "approved"  
                                    value = {chore.id}
                                    id = {chore.id}
                                    onClick = {(e)=>this.approved(e.target.value) }
                                >
                                    Approved!
                                </button>
                                <button
                                    name = "unApproved"  
                                    value = {chore.id}
                                    id = {chore.id}
                                    onClick = {(e)=>this.notFinished(e.target.value) }
                                >
                                    Not Approved :(
                                </button>
                            </li>  
                        )}
                    </ul>
                </section>
                <section>
                    <h2>{this.context.household.householdName} Family's Points:<br/>{familyPoints}</h2>
                    <h3>
                        <CheckGoal />
                    </h3>
                </section>
            </section>
             <br/>
            <div>
               <Link to = '/landing'>
                   <button>
                       Back to Family Dashboard
                   </button>
               </Link>
           </div><br/>
           <section>
                <Link to = '/setup'>
                    Update Family Settings
                </Link>
            </section>
        </div>
    )
}}
