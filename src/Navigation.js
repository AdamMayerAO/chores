import React from 'react'
import { Route, Link, Redirect, BrowserRouter as Router } from 'react-router-dom'
import Landing from './Landing'
import KidsDashboard from './KidsDashboard'
import AdminDashboard from './AdminDashboard'
import Setup from './Setup/Setup'
import LogIn from './Login/LogIn'
import SignupForm from './Login/SignupForm';
import ReturningUsers from './Login/ReturningUsers';

const Navigation = (props) =>{
    return( 
        <Router>
            <Route 
                exact path = '/'
                component = {LogIn}
                //sign up / sign in
            />
            <Route 
                path = '/returningusers'
                component = {ReturningUsers}
            />
            <Route 
                path = '/signupform'
                component = {SignupForm}
            />
            <Route
                path = '/setup'
                component = {Setup}
                //for parents to set up the family account
            />
            <Route 
                path = '/admindashboard'
                component ={AdminDashboard}
                //parent dashboard
            />
            <Route
                path = '/kidsdashboard'
                component = {KidsDashboard}
            />
            <Route 
                path = '/landing'
                component = {Landing}
                //once setup is complete, this will be the landing page after login
            />
        </Router>
    )
}
export default Navigation