import React from 'react'
import './Setup.css'
import SetupFamilyMembers from './SetupFamilyMembers'
import SetupChores from './SetupChores'
import ChooseFamilyPrize from './ChooseFamilyPrize'
import { Route, Link, Redirect, BrowserRouter as Router } from 'react-router-dom'

const Setup = (props) => {
    const handlesubmit = (e) =>{
        console.log("Family is setup")
        props.history.push(`/landing`)
    }
    
    return(
        <div className = "section-headers">
            Let's get your family set up
            <section>
                <SetupFamilyMembers/>
            </section>
            <section> <SetupChores /></section>
            <section><ChooseFamilyPrize/></section>
            <button
            type = 'submit'
            onClick= {() => handlesubmit()}
            >
                All Set, Let's Go!

            </button>
        </div>
    )
}
export default Setup