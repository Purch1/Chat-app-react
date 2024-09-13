import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = {{children}} => {
    const [authUser, setAuthUser] = useState((JSON.parselocalStorage.getItem("chat-user")) || null)

    return <AuthContext.Provider value={{authUser, setAuthUser}}>
        
        {children}
        
        </AuthContext.Provider>;
}

