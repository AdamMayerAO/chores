import React, { Component } from 'react'
import Context from '../Context'


export default class SignupForm extends Component {
    static defaultProps = {
        history: {
            push: () =>{}
        },
    }
    static contextType = Context;

    constructor(props){
        super(props)
        this.state = {
            householdName: ''
        }
    }
    
    setHouseholdName(householdName){
        this.setState({householdName})
        this.context.addHousehold(householdName)
        console.log(this.context)

    };
    
    handleSubmit= e => {
        console.log(this.context)
        e.preventDefault()
        // const newHousehold = {
        //     householdName:  e.target['household-name'].value,
        //     email: e.target['username'].value,
        //     password: e.target['newPassword'].value,
        // }
        console.log("Submitted")
        this.props.history.push('/setup')


      // this.context.addHousehold(this.state)
      
    //   fetch(`${config.API_ENDPOINT}/ENDPOINT`, {
    //     method: 'POST',
    //     headers: {
    //       'content-type': 'application/json'
    //     },
    //     body: JSON.stringify(newHousehold)
    //   })
    //   .then(res => {
    //     if (!res.ok)
    //       return res.json().then(e => Promise.reject(e))
    //     return res.json()
    //   })
    //   .then(household => {
    //     this.context.addHoueshold(household)
    //   })
    //   .catch(error => {
    //     console.error('add household ',{ error })
    //   })
    }
    
    render(){

    return(
        <form className='signup-form' onSubmit={this.handleSubmit}>
            <div>Welcome, Please Sign Up:</div>
                <div>
                    <label htmlFor="household-name">Household name</label>
                    <input
                        required 
                        placeholder='Last Name' 
                        type="text" 
                        name='household-name' 
                        id='household-name' 
                        onChange={(e) => this.setHouseholdName(e.target.value)} 
                    />
                </div>
                
                <div>
                    <label htmlFor="username">Email</label>
                    <input
                        required
                        type="email" 
                        name='username' 
                        id='username' 
                        // onChange={e => updateContent(e.target.value)}                
                    />
                </div>
                <div>
                    <label htmlFor="newPassword">Password</label>
                    <input
                        required
                        type="password" 
                        name='newPassword' 
                        id='newPassword' 
                        // onChange={e => updateContent(e.target.value)}                
                    />
                </div>
                <div>
                    <label htmlFor="repeatPassword">Repeat Password</label>
                    <input
                        required
                        type="password" 
                        name='repeatPassword' 
                        id='repeatPassword' 
                        // onChange={e => updateContent(e.target.value)}                
                    />
                </div>

                <button type = 'submit'>
                    Sign Up!
                </button>
            </form>
    )
}}
