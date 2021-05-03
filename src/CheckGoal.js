import React, { Component } from 'react'
import Context from './Context'


export default class CheckGoal extends Component{
    static contextType = Context;

    render(){
        const totalPoints = []  
        this.context.householdMembers.forEach(member => 
            totalPoints.push(member.points))
        const familyPoints = totalPoints.reduce(function(a, b){return a+b;}, 0)
        const remainingPoints = parseInt(this.context.prize.goal) - parseInt(familyPoints)
        console.log("CheckGoal Remaining Points: ", remainingPoints)

        if (remainingPoints <=0) {
            return(
                `Hooray!  We have reached our goal! Time for ${this.context.prize}`
            )
        } else {
            return(
                `We need ${remainingPoints} more points to reach our goal of ${this.context.prize}`
            )
        }
    }
}

 // const checkGoal =() =>{ 
        //     ()<=0); 
        //         {
        //         return(
        //             `Hooray!  We have reached our goal! Time for ${this.context.prize}`
        //         ) else{
        //             return(
        //             `We need ${this.context.prize.goal - familyPoints} more points to reach our goal of ${this.context.prize.prize}`
        //         )
        //         }
        // }