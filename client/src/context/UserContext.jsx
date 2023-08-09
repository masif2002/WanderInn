import { useEffect } from "react";
import { createContext, useState } from "react";

import axios from 'axios'

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
    useEffect(() => {
        axios.get('/profile').then((response) => {
            const { data } = response
            setUser(data)
        })
    }, [])

    
    const [user, setUser] = useState(null)

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}