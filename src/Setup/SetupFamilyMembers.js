import React from 'react'
import './SetupFamilyMembers.css'

const SetupFamilyMembers = () => {
    //Add additional family member
    //input chores
    const addPerson = () =>{
        console.log("Person Added")
    }
    const handleSubmit= (e)=>{
        e.preventDefault()
        //Display Family members instead of the form, update users table, button for add additional family memebers
    console.log("Family Members Added")
   }
    return (
        <div>
            <h2 className = 'header'>Setup Family Members</h2>
            <form className='setup-family-members' onSubmit={handleSubmit}>
                <div>Please add all participating family members</div><br/>
                  <div className ='input'>
                    <label htmlFor="member">Adult 1</label>
                    <input
                        required 
                        placeholder='First Name' 
                        type="text" 
                        name='name' 
                        id='name' 
                        onChange={(e) => addPerson(e.target.value)} 
                    /><br/>
                    <label htmlFor="member">Adult 2</label>
                    <input 
                        placeholder='First Name' 
                        type="text" 
                        name='name' 
                        id='name' 
                        onChange={(e) => addPerson(e.target.value)} 
                    /><br/>
                    <label htmlFor="member">Kid 1</label>
                    <input 
                        placeholder='First Name' 
                        type="text" 
                        name='name' 
                        id='name' 
                        onChange={(e) => addPerson(e.target.value)} 
                    /><br/>
                    <label htmlFor="member">Kid 2</label>
                    <input 
                        placeholder='First Name' 
                        type="text" 
                        name='name' 
                        id='name' 
                        onChange={(e) => addPerson(e.target.value)} 
                    /><br/>
                    <label htmlFor="member">Kid 3</label>
                    <input 
                        placeholder='First Name' 
                        type="text" 
                        name='name' 
                        id='name' 
                        onChange={(e) => addPerson(e.target.value)} 
                    /><br/>

                </div>
           
                <button type = 'submit'>
                    Add Family Members
                </button>
            </form>
        </div>
    );
}

export default SetupFamilyMembers