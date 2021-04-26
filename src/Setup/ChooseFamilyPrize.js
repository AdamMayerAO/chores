import React from 'react'
import './ChooseFamilyPrize.css'

const ChooseFamilyPrize = () =>{
    const handleSubmit = () =>{
        console.log("Prize Chosen")
    }
    return(
        <div>
            <h2>Family Prize</h2> 
            <form className='setup-family-prize' onSubmit={handleSubmit}>
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
                        name='points' 
                        id='points' 
                    /><br/>
                    
                    <button type = 'submit'>
                        Set Family Prize!
                    </button>
                </div>
            </form>
        </div>
        
    )
}
export default ChooseFamilyPrize