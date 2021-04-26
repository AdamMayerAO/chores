import React, {createContext} from 'react'

const Context = React.createContext({
    householdID: null,      
    householdName:  "",
    householdMembers: [],
    chores: [],
    addHousehold: () => {},
    addFamilyMember: () => {},
    addChore: () => {},
})
export const ContextProvider = Context.Provider
export default Context