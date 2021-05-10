import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import Context from './Context'
import './KidsDashboard.css'
import CheckGoal from './CheckGoal'
//import user name, chores, points from context


export default class KidsDashboard extends Component{
    static defaultProps = {
        history: {
            push: ()=>{}
        },
    }
    static contextType = Context;
     
    finished =(value) =>{
        const chore = this.context.chores.find(chore => chore.id === parseInt(value))
        console.log(this.context.household.householdName)
        if (chore.done !==true) { 
            //Set chore.done ===true
            const doneChore = this.context.chores.filter(chore => chore.id !== parseInt(value))
            chore.done = true
            doneChore.push(chore)
            this.context.updateChore(doneChore)
            
            // update points
            const points = parseInt(chore.points)
            let total = parseInt(this.context.household.points)? parseInt(this.context.household.points) : 0;
            total = total+points
            this.context.updateHouseholdPoints(total)  
            
            //change button
            var button = document.getElementById(chore.id);
                button.onclick = function () {
                this.style.backgroundColor = "rgb(81, 189, 14)";
                };
        } 
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