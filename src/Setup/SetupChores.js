import React from 'react'
import Choose from './Choose'
import CHORES from '../chores-list'
import './SetupChores.css'
const SetupChores = () =>{
    const handleCheckchore = () =>{
        console.log("Chore has been checked")
        //<AssignTo />
    }
    let allChores = CHORES
    return (
        <main className='chores'>
            <header className='Chores-header'>
              <h1>Choose Family Chores</h1>
              <p>Look through the list and choose the chores that need to be done in your house</p>
            </header>
           
            <div className='chores-list'>
              {allChores.map(chore => (
                <Choose
                  key = {chore.id}
                  id = {chore.id}
                  chore={chore}
                  onClick = {handleCheckchore}
                />
              ))}
            </div>
        </main>
      );
}
export default SetupChores