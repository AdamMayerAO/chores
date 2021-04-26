import React from 'react'
const KidsDashboard = (props) =>{
    return (
       <div>
           <h1>`${props.name}'s Dashboard`</h1>
           <section>
               <h2>Here are chores for today:</h2>
               {/*Display active chores + point values
               Single Click: turn color, in progress, start timer
               Double Click: turn color, done */}
           </section>
           <section>
               <h2>`${props.name}'s Points:`</h2>
               <h3>Recently completed chores:</h3>

           </section>
       </div>
    )
}

export default KidsDashboard