import { useEffect } from "react";
import { createContext, useState } from "react";

import axios from 'axios'

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    useEffect(() => {
        setFetchingUser(true)

        axios.get('/profile').then((response) => {
            const { data } = response
            setUser(data)
            setFetchingUser(false)
        })
    }, [])

    
    const [user, setUser] = useState(null)
    const [fetchingUser, setFetchingUser] = useState(true)

    return (
        <UserContext.Provider value={{user, setUser, fetchingUser}}>
            {children}
        </UserContext.Provider>
    )
}