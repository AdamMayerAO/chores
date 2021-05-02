import React, {Component} from 'react'
import { Link} from 'react-router-dom';
import Context from './Context'
import './Landing.css'
import UserButton from './UserButton'


export default class Landing extends Component{
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
        const users = this.context.householdMembers
        const kids = users.filter(kid => kid.age ==='kid')
        const adults = users.filter(adult => adult.age ==='adult')
        return(
            <div>
                <h1>Welcome {this.context.householdID} Family</h1>
                <h2>Click on your name to start</h2>
                <div className = 'family'>
                    <div className='kids'> Kids:
                        { kids.map((kid, idx)=> (
                            <UserButton
                                key = {idx}
                                name={kid.name}
                                age={kid.age}
                                chores={this.context.chores}
                                id = {kid.id}
                            />
                            ))
                        }
                    </div>
                    <div className='adults'> Adults:
                        { adults.map((adult, idx)=> (
                            <UserButton
                                key = {idx}    
                                name={adult.name}
                                age ={adult.age}
                                id = {adult.id}
                            />
                            ))
                        }
                    </div>
                </div><br/>
                <section>
                    <Link to = '/setup'>
                        <button>Update Family Settings</button>
                    </Link>
                </section>
            </div>
        )
    }
}
//if user is logged in, GET users associated with that Household, 
//For each user: If Adult, display with <adultButton> If kid dislapy with <kidButton>and dispaly them
//If user is not logged in, redirect to login
