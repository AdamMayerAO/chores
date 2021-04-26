import React from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import AdultButton from './AdultButton';
import KidButton from './KidButton';


export default function UserButton (props){
   switch (props.age) {
       case "adult":
        return (
            <div>
                <Link to ='/admindashboard'>
                    <AdultButton
                    name = {props.name}>{props.name}</AdultButton>
                </Link>
                <br/>
            </div>
        );
           break;
   
       default:
        return(
            <div>
                <Link to ='/kidsdashboard'>
                    <KidButton
                    name = {props.name}>{props.name}</KidButton>
                </Link>
                <br/>
            </div>
        );
    }
}       
