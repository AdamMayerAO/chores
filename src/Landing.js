import React from 'react'
import UserButton from './UserButton'
//if user is logged in, GET users associated with that Household, 
//For each user: If Adult, display with <adultButton> If kid dislapy with <kidButton>and dispaly them
//If user is not logged in, redirect to login
const users = [
    {
        name: "adam",
        age: "adult"
    
    },
    {
        name: "eden",
        age: "kid"
    }
]
const Landing = () =>{
    return (
        <div className='family-members'>
            {users.map(user => (
                <UserButton
                    age = {user.age}
                    name={user.name}
                />
                ))
            }
        </div>
    );   
}
export default Landing