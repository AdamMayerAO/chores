import React, {Component} from 'react'
import { Link} from 'react-router-dom';
import Context from './Context'

//import user name, chores, points from context

export default class AdminDashboard extends Component{
    static defaultProps = {
        history: {
            push: ()=>{}
        },
    }
    static contextType = Context;

    constructor (props) {
        super(props)
        this.state = {
        }
    }
    render(){
        const member = this.context.householdMembers.filter(member => member.id === parseInt(Object.values(this.props.match.params)))
        const name = member[0].name
        const totalPoints = []  
        this.context.householdMembers.forEach(member => 
            totalPoints.push(member.points))
        const familyPoints = totalPoints.reduce(function(a, b){return a+b;}, 0)

        return (
        <div>
            <h1>{name}'s Dashboard</h1>
            <section>
               My Family:
               <section className = 'familyMembers'> 
                    <ul>
                        {this.context.householdMembers.map((member, idx) =>
                            <li
                                key = {idx}
                            >
                                {member.name}
                            </li>  
                        )}
                        
                    </ul> 
                </section>
                Family Chores:
                <section className = 'Chores'> 
                    <ul>
                        {this.context.chores.map((chore, idx) =>
                            <li
                                key = {idx}
                            >
                                {chore.assignedTo} - {chore.chore}
                            </li>  
                        )}
                    </ul>
                    <div>Total family points: {familyPoints}</div> <br/>
                    <section>
                    {this.context.prize.goal - familyPoints} more points to reach our goal of {this.context.prize.prize}
                        <br></br>
                       
                    </section>
                </section>
                
                {/*display kids + points, recently done, in progress, to do, 
                total family points*/}
            </section>
            <section>
                <Link to = '/setup'>
                    Update Family Settings
                </Link>
            </section> <br/>
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
