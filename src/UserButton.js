import React from 'react';
import { Link } from 'react-router-dom';

import './UserButton.css'


export default function UserButton (props){
    switch (props.age) {
       case "adult":
        return (
            <div className = 'adult'>
                <Link to ={{
                    pathname: `/admindashboard/${props.id}`
                }}>
                    <button className = 'adult-button'>
                        {props.name}
                    </button>
                </Link>
                <br/>
            </div>
        );
   
       default:
        return(
            <div className = 'kid'>
                <Link to={{
                    pathname: `/kidsdashboard/${props.id}`
                }}>
                    <button className = 'kid-button'>
                       {props.name}
                    </button>
                </Link>
                <br/>
            </div>
        );
    }
}       
