import React from 'react'
import { Link, BrowserRouter as Router } from 'react-router-dom';

const AdminDashboard = (props) =>{
    return (
        <div>
            <h1>`${props.name}'s Dashboard`</h1>
            <section>
               List of Kids
                {/*display kids + points, recently done, in progress, to do, 
                total family points*/}
            </section>
            <section>Assign Chores</section>
            <section>
                Admin: Update Family Settings
                <Link to = '/setup'/>
            </section>
        </div>
    )
}

export default AdminDashboard
