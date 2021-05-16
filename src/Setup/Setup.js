import React, { Component } from 'react'
import './Setup.css'
import SetupFamilyMembers from './SetupFamilyMembers'
import SetupChores from './SetupChores'
import ChooseFamilyPrize from './ChooseFamilyPrize'
import Context from '../Context'

export default class Setup extends Component {
    static defaultProps = {
        history: {
            push: ()=>{}
        },
    }
    static contextType = Context;

    render(){
        console.log(this.context)
    const handlesubmit = (e) =>{
        this.props.history.push(`/landing`)
        
    }

    return(
        <div className = "section-headers">
            <h2 className = 'center'>Hello {this.context.household.householdName}'s!<br/> Let's get you set up</h2>
            <section>
                <SetupFamilyMembers/>
            </section>
            <section> <SetupChores /></section>
            <section><ChooseFamilyPrize/></section>
            <br/>
            <button
                className = 'submit'
                type = 'submit'
                onClick= {() => handlesubmit()}
            >
                All Set, Let's Go!

            </button>
        </div>
    )
}}
