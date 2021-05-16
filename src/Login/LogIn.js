import React from 'react'
import {Link} from 'react-router-dom';
import logo from './cleanhome.png'
import './Login.css'

const LogIn = () => {
    return(
        <div className = "loginPage">
            <header className = 'header'>Family Chores Made Fun!</header>
            <img className = 'image' src={logo} alt = "logo: clean home icon"/>
            <div className = 'loginButtons'>
                <section className = "signup">
                    <Link to="/signupform">
                        <button>New Users: Sign Up</button>
                    </Link>
                </section>
                <section className = "returning">
                    <Link to="/returningusers">
                        <button>Returning Users: Log In</button>
                    </Link>
                </section>
            </div>
            
        </div>
    );
}
export default LogIn