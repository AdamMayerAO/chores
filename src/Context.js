import React from 'react'

export default React.createContext({
    household:[],
    members: [],
    chores: [],
    prize: '',
    addHousehold: () => {},
    addFamilyMember: () => {},
    addChore: () => {},
    updateChore: () =>{},
    updateCurrentUser: () =>{},
    updateHouseholdPoints: () =>{},
    setFamilyPrize: ()=>{},
    removeMember:() =>{},
    removeChore:()=>{}
})
