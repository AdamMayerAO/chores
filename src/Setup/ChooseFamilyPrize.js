import React, {Component} from 'react'
import './ChooseFamilyPrize.css'
import Context from '../Context'
import config from '../config'

export default class ChooseFamilyPrize extends Component{
    static defaultProps = {
        history: {
            push: ()=>{}
        },
    }
    static contextType = Context;

     handleSubmit = (e) =>{
        e.preventDefault()
        const prize = {
            prize: e.target['prize'].value, 
            householdId: this.context.household.id,
            goal: e.target['goal'].value
        }
    fetch(`${config.API_ENDPOINT}/household/prize`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(prize)
      })
      .then(res => {
        if (!res.ok)
        return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then( () => {
        console.log(prize)
        this.context.setFamilyPrize({prize})
        //alert("All Set")
        document.getElementById("setup-family-prize").reset();
        console.log(this.context.prize)
      })
      .catch(error => {
          console.error('add chore ',{ error })
      })

    }
    reset = ()=>{
        this.context.setFamilyPrize({
            prize: '',
            goal: ''
        })
        document.getElementById("setup-family-prize").reset();

    }
    render(){
    return(
        <div>
            <h2>Family Prize</h2> 
            <form className='setup-family-prize' id = "setup-family-prize" onSubmit={this.handleSubmit}>
                <div><br/>
                    <label>Please Choose a Prize for your family</label>
                    <input
                        required 
                        placeholder='Go For Icecream!' 
                        type="text" 
                        name='prize' 
                        id='prize' 
                    /><br/>
                    <label>Points Goal to Reach:</label>

                    <input
                        required 
                        placeholder='50 Points' 
                        type="text" 
                        name='goal' 
                        id='goal' 
                    /><br/>
                    
                    <button type = 'submit'>
                        Set Family Prize!
                    </button>
                    <section>
                        Our Family Prize: {this.context.prize.prize}
                        <br></br>
                        When we reach: {this.context.prize.goal} points
                    </section>
                    
                </div>
            </form>
            <button className = 'resetButton'
                    onClick = {this.reset}
                    >
                        Reset Family Prize
                    </button>
        </div>
        
    )
}}
