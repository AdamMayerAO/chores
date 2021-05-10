import React, { Component } from 'react'
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
            console.log(h)

            this.context.addHousehold(h)
            this.context.updateHouseholdPoints(0)
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
            </form>
        </div>
    )
}}
