import React from 'react'

export default React.createContext({
    householdID: null,      
    householdName:  "",
    householdMembers: [],
    chores: [],
    prize: '',
    addHousehold: () => {},
    addFamilyMember: () => {},
    addChore: () => {},
    updateChore: () =>{},
    updateCurrentUser: () =>{},
    updatePoints: () =>{},
    setFamilyPrize: ()=>{},
    removeMember:() =>{},
    removeChore:()=>{}
})
