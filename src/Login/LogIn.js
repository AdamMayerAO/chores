import React from 'react'
import {Link} from 'react-router-dom';


const LogIn = () => {
    return(
        <div>
            <Link to="/signupform">
                <button>New Users: Sign Up</button>
            </Link>
            <Link to="/returningusers">
                <button>Returning Users: Log In</button>
            </Link>
            
        </div>
    );
}
export default LogIn