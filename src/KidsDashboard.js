import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import Context from './Context'
import './KidsDashboard.css'
import CheckGoal from './CheckGoal'
import config from './config'


export default class KidsDashboard extends Component{
    static defaultProps = {
        history: {
            push: ()=>{}
        },
    }
    static contextType = Context;
    notFinished = (value)=>{
        //add chore back to chores
        const chore = this.context.pendingApproval.find(chore=> chore.id ===parseInt(value))
        console.log("Chore not finished: ", chore)
        //chore.done = false
        //this.context.addChore(chore)
        
        //remove chore from pendingApproval
        const returnChore = this.context.pendingApproval.filter(chore => chore.id !== parseInt(value))
        console.log("Chore to be returned: This should be empty[] if there are none left", returnChore)

        
       
        // update points
        const points = parseInt(chore.points)
        let total = parseInt(this.context.household.points)? parseInt(this.context.household.points) : 0;
        total = total-points
        this.context.updateHouseholdPoints(total) 
        
        //update backEnd
        const updatedChore = {
            done: false,
            householdId: chore.householdId
            }
            console.log("updated chore: ", updatedChore)
          fetch(`${config.API_ENDPOINT}/chores/id/${chore.id}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(updatedChore)
          })
          .then(res => {
              console.log(res)
            if (!res.ok)
            return res.json().then(e => Promise.reject(e))
            return res.json()
          })
          .then(chore => {
            
            let a = (Object.entries(chore)[0])
            let h = (a[1])
            this.context.addChore(h)
            this.context.removeFromPendingApproval(returnChore)

            console.log("chores: ", this.context.chores, "pendingApproval: ", this.context.pendingApproval)
          })
          .catch(error => {
              console.error('add chore ',{ error })
          })
    }
    finished =(value) =>{
        //remove chore from chores
        const chore = this.context.chores.find(chore => chore.id === parseInt(value))
        console.log("Chore which is finished: ", chore)
        const doneChore = this.context.chores.filter(chore => chore.id !== parseInt(value))
        //this.context.updateChore(doneChore)
        //this.context.addToPendingApproval(chore)

        
        // update points
        const points = parseInt(chore.points)
        let total = parseInt(this.context.household.points)? parseInt(this.context.household.points) : 0;
        total = total+points
        this.context.updateHouseholdPoints(total)  
        
        //update backEnd
        const updatedChore = {
            done: true,
            householdId: parseInt(chore.householdId)

            }
        console.log("update chore: ", updatedChore)
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
            console.log("Chore has been updated: ", h)
            this.context.addToPendingApproval(h)
            this.context.updateChore(doneChore)
            console.log("chores: ", this.context.chores, "pendingApproval: ", this.context.pendingApproval)

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
                    <h2>Here are your chores for today:</h2>
                        {this.context.chores.filter(chore => chore.member_name === name).map((chore, idx) =>
                            <li
                                key = {idx}
                            >
                                {chore.chore} - {chore.points} points
                                <br/><br/>
                                <button
                                    name = "finished"  
                                    value = {chore.id}
                                    id = {chore.id}
                                    onClick = {(e)=>this.finished(e.target.value) }
                                >
                                    Finished!
                                </button>
                            </li>  
                        )}
                </section>
                <section>
                    <h3>I think I am finished: </h3>
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
                <section>
                    <h2>{this.context.household.householdName} Family's Points:<br/>{familyPoints}</h2>
                    <h3>
                        <CheckGoal />
                    </h3>
                </section>
                <div>
                    <Link to = '/landing'>
                        <button>
                            Back to Family Dashboard
                        </button>
                    </Link>
                </div>
            </div>
    )
}}