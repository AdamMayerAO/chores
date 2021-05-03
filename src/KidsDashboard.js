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

    constructor (props) {
        super(props)
        this.state = {
            token: ""
        }
    }
        
    checked = ()=>{

    }

    finished =(value) =>{
        const chore0 = this.context.chores.filter(chore => chore.choreID === parseInt(value))
        const chore = chore0[0]
        if (chore.done ===false) { 
            //Set chore.done ===true
            const doneChore = this.context.chores.filter(chore => chore.choreID !== parseInt(value))
            chore.done = true
            doneChore.push(chore)
            this.context.updateChore(doneChore)
            
            // update points
            const member = this.context.householdMembers.filter(member => member.id === parseInt(Object.values(this.props.match.params)))
            const points = chore.points
            let updatedMember = member
            let currentPoints = parseInt(updatedMember[0].points)
            updatedMember[0].points = parseInt(currentPoints) + parseInt(points)
            this.forceUpdate()


        //     const index = this.context.householdMembers.findIndex((member) => member.id === this.context.householdMembers.filter(member => member.id === parseInt(Object.values(this.props.match.params)))[0].id);
        //     const u = this.context.householdMembers
        //     console.log(u)
        //    // u[index] = updatedMember[0]
        //     console.log(u)
                
        } 
    }
    render(){
        const member = this.context.householdMembers.filter(
            member => member.id === parseInt(
                Object.values(
                    this.props.match.params
                )))
        const name = member[0].name
        const points = member[0].points
        const totalPoints = []  
        this.context.householdMembers.forEach(member => 
            totalPoints.push(member.points))
        const familyPoints = totalPoints.reduce(function(a, b){return a+b;}, 0)
        const remainingPoints = parseInt(this.context.prize.goal) - parseInt(familyPoints)
        console.log(remainingPoints)
       
        return (
            <div>
                <h1>{name}'s Dashboard</h1>
                <section>
                    <h2>Here are chores for today:</h2>
                        {this.context.chores.filter(chore => chore.assignedTo === name).map((chore, idx) =>
                            <li
                                key = {idx}
                            >
                                {chore.chore} - {chore.points} points
                                
                                <br/><br/><button
                                    name = "finished"  
                                    value = {chore.choreID}
                                    
                                    onClick = {(e)=>this.finished(e.target.value)}
                                >
                                    Finished!
                                </button>
                            </li>  
                        )}
                    
                    {/*Display active chores + point values
                    Single Click: turn color, in progress, start timer
                    Double Click: turn color, done */}
                </section>
                <section>
                    <h2>{name}'s Points:</h2>
                        {points}
                    <br/>                    
                    <div>Total family points: {familyPoints}
                    <br/> 
                    <section>
                    
                        <CheckGoal />
                       
                    </section>
                    </div> <br/>

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
