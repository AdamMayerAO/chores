import React, { Component } from 'react'
import Context from '../Context'
import config from '../config'
import {Link} from 'react-router-dom';
import './SignupForm.css'
import logo from './cleandrop.png'


export default class SignupForm extends Component {
    static defaultProps = {
        history: {
            push: () =>{}
        },
    }
    static contextType = Context;

    
    handleSubmit= (e) => {
        e.preventDefault()
        const newHousehold = {
            householdName:  e.target['household-name'].value,
            email: e.target['username'].value,
            password: e.target['newPassword'].value,
        }
      
        fetch(`${config.API_ENDPOINT}/household/signup`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                
            },
            body: JSON.stringify(newHousehold)
        })
        .then(res => {
            if (!res.ok)
                return res.json()
                //.then(res=> throw error("error resopnse?", res))
                .then(e => Promise.reject(e))
            return res.json()

        })
        .then(household => {
            let a = (Object.entries(household)[0])
            let h = (a[1])
            console.log(h)
            console.log("variable household being returned: ", h)
            this.context.addHousehold(h)  
            console.log("Household in Context: ", this.context.household)          
            this.props.history.push('/setup')
        })
        .catch(error => {
            console.error('add household ',{ error })
        })
    }
    
    render(){

    return(
        <div className='signup-form'>
        <form className= 'form' onSubmit={this.handleSubmit}>
            <div className='title'>Welcome! Please Sign Up:</div>
                <div>
                    <label htmlFor="household-name">Household name{"    "}</label>
                    <input
                        required 
                        placeholder='Last Name' 
                        type="text" 
                        name='household-name' 
                        id='household-name' 
                    />
                </div>
                <div>
                    <label htmlFor="username">Email{"    "}</label>
                    <input
                        required
                        type="email" 
                        placeholder='email' 
                        name='username' 
                        id='username' 
                        // onChange={e => updateContent(e.target.value)}                
                    />
                </div>
                <div>
                    <label htmlFor="newPassword">Password{"    "}</label>
                    <input
                        required
                        type="password" 
                        placeholder = 'create password'
                        name='newPassword' 
                        id='newPassword' 
                    />
                </div>
                <div>
                    <label htmlFor="repeatPassword">Repeat Password{"    "}</label>
                    <input
                        required
                        type="password" 
                        placeholder = 'repeat password'
                        name='repeatPassword' 
                        id='repeatPassword' 
                    />
                </div><br/>
                <span className = 'buttons'>
                    <button className ='button' type = 'submit'>
                        Sign Up! 
                    </button><br/><br/>
                    <Link to = '/'>
                        <button className = 'backButton'>Back</button>
                    </Link>
                </span>
            </form>
            <img className = 'image' src={logo} alt = "logo: clean home icon"/>

        </div>
    )
}}
