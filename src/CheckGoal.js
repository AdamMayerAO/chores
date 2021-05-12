import React, { Component } from 'react'
import Context from './Context'


export default class CheckGoal extends Component{
    static contextType = Context;

    render(){
        const remainingPoints = parseInt(this.context.prize.goal) - parseInt(this.context.household.points)
        if (remainingPoints <=0) {
            return(
                `Hooray!  We have reached our goal! Time for ${this.context.prize.prize}`
            )
        } else {
            return(
                remainingPoints? 
                `We need ${remainingPoints} more points until we can get ${this.context.prize.prize? this.context.prize.prize: 'get a prize'}`
                :
                'Update your family settings to set up your Family Goal'
            )
        }
    }
}