import React from 'react'

export default React.createContext({
    household:[],
    members: [],
    chores: [],
    pendingApproval: [],
    prize: '',
    addHousehold: () => {},
    addFamilyMember: () => {},
    addChore: () => {},
    updateChore: () =>{},
    updateChores: () =>{},
    updateMembers: () =>{},
    updateCurrentUser: () =>{},
    updateHouseholdPoints: () =>{},
    setFamilyPrize: ()=>{},
    removeMember:() =>{},
    removeChore:()=>{},
    addToPendingApproval: ()=>{},
    removeFromPendingApproval: ()=>{},
    updatePendingApproval: ()=>{}


})
