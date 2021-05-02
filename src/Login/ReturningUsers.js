import React, { Component } from 'react'
import Context from '../Context'

export default class ReturningUsers extends Component {
    // constructor(props){
    //     super(props)
    //     this.state = {
    //         householdName: ''
    //     }
    // }
    static defaultProps = {
        history: {
            push: ()=>{}
        },
    }
    static contextType = Context;
    
    // setHouseholdName(householdName){
    //     this.setState({householdName})
    // };

    handleSubmit= (e) => {
        e.preventDefault()
        this.context.addHousehold(e.target['household-name'].value)
        this.props.history.push('/landing')

        // const Household = {
        //     householdName:  e.target['household-name'].value,
        //     password: e.target['password'].value,
        // }
    //   fetch(`${config.API_ENDPOINT}/ENDPOINT`, {
    //     method: 'POST',
    //     headers: {
    //       'content-type': 'application/json'
    //     },
    //     body: JSON.stringify(Household)
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
        <div>
            <form className='SignIn-form' id='household-name'  onSubmit={this.handleSubmit} >
                <div>Welcome Back! Please Sign In:</div>
                <div>
                    <label htmlFor="household-name">Household name</label>
                    <input
                        required 
                        placeholder='Last Name' 
                        type="text" 
                        name='household-name' 
                        id='household-name' 
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
