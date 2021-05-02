import React from 'react'
import './Setup.css'
import SetupFamilyMembers from './SetupFamilyMembers'
import SetupChores from './SetupChores'
import ChooseFamilyPrize from './ChooseFamilyPrize'

const Setup = (props) => {
    const handlesubmit = (e) =>{
        props.history.push(`/landing`)
        
    }
    
    return(
        <div className = "section-headers">
            <h2>Let's get you set up</h2>
            <section>
                <SetupFamilyMembers/>
            </section>
            <section> <SetupChores /></section>
            <section><ChooseFamilyPrize/></section>
            <br/><button
            type = 'submit'
            onClick= {() => handlesubmit()}
            >
                All Set, Let's Go!

            </button>
        </div>
    )
}
export default Setup