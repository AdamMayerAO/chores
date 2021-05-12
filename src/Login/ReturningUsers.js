import React, { Component} from 'react'
import { Link } from 'react-router-dom';
import Context from '../Context'
import config from '../config'

export default class ReturningUsers extends Component {
   
    static defaultProps = {
        history: {
            push: ()=>{}
        },
    }
    static contextType = Context;
    
 
    handleSubmit=(e) => {
        e.preventDefault()

        const household = {
            email:  e.target['email'].value,
            password: e.target['password'].value,
        }
        fetch(`${config.API_ENDPOINT}/household/login`, {
            method: 'POST',
            headers: {
            'content-type': 'application/json'
            },
            body: JSON.stringify(household)
        })
        .then(res => {
            if (!res.ok)
                //throw error({error: "email already exists"})
                return res.json().then(e => Promise.reject(e))
            return res.json()
        })
        .then(household => {
            let a = (Object.entries(household)[0])
            let h = (a[1])
            console.log("household: ", h)
            this.context.addHousehold(h)
            this.context.updateHouseholdPoints(0)
            this.context.setFamilyPrize({
                prize: h.prize,
                goal: h.goal
            })
            fetch(`${config.API_ENDPOINT}/members/${this.context.household.id}`, {
                method: 'GET',
                headers: {
                'content-type': 'application/json'
                },
            })
            .then(res => {
                if (!res.ok)
                    return res.json().then(e => Promise.reject(e))
                return res.json()
            })
            .then(members => {
                let f = (Object.entries(members)[0])
                let m = f[1]
                this.context.updateMembers(m)
            });
            
            fetch(`${config.API_ENDPOINT}/chores/id/${this.context.household.id}`, {
                method: 'GET',
                headers: {
                'content-type': 'application/json'
                },
            })
            .then(res => {
                if (!res.ok)
                    //throw error({error: "email already exists"})
                    return res.json().then(e => Promise.reject(e))
                return res.json()
            })
            .then(chores => {
                let g = (Object.entries(chores)[0])
                let c = g[1]

                const addToChores = c.filter(chore => chore.done === false)
                const addToPA = c.filter(chore => chore.done === true)

                this.context.updateChores(addToChores)
                this.context.updatePendingApproval(addToPA)
            })

            this.props.history.push('/landing')
        })
        .catch(error => {
            console.error('add household ',{ error })
        })
    }
    

    render(){
    return(
        <div>
            <form className='SignIn-form' id='household-name'  onSubmit={this.handleSubmit} >
                <div>Welcome Back! Please Sign In:</div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        required 
                        placeholder='email' 
                        defaultValue = 'r.adammayer@gmail.com'
                        type="text" 
                        name='email' 
                        id='email' 
                        //onChange={(e) => this.setHouseholdName(e.target.value)} 
                    />
                </div>
                
                
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        required
                        placeholder = 'password'
                        defaultValue = 'a'
                        type="password" 
                        name='password' 
                        id='password' 
                        // onChange={e => updateContent(e.target.value)}                
                    />
                </div>


                <button 
                    type = 'submit'   
                >
                    Sign In
                </button>
                <br/><br/><br/>
                <Link to = '/signupform'>
                    <button>
                        New Users: Sign Up Here
                    </button>
                </Link>
            </form>
        </div>
    )
}}
