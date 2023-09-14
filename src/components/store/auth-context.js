import React from "react";
import { useState } from "react";

const AuthContext = React.createContext({
    token:'',
    email:'',
    isLoggedIn:false,
    login:(token,endpoint)=>{},
    logout:()=>{}
});

export const AuthContextProvider = (props) => {
    const initialToken=localStorage.getItem('token');
    const [token,setToken]=useState(initialToken);

    const userIsLoggedIn=!!token;
    console.log(userIsLoggedIn);

    const initialEndpoint = localStorage.getItem('endpoint');
    const [endpoint,setEndpoint]=useState(initialEndpoint);

    

    const loginHandler=(token,endpoint)=>{
        localStorage.setItem('token',token)
        setToken(token);
        localStorage.setItem('endpoint',endpoint)
        setEndpoint(endpoint);
    }

    const logoutHandler=()=>{
        setToken(null);
        localStorage.removeItem('token')
    }

    const conextValue={
        token:token,
        email:endpoint,
        isLoggedIn:userIsLoggedIn,
        login:loginHandler,
        logout:logoutHandler
    };

    return <AuthContext.Provider value={conextValue}>{props.children}</AuthContext.Provider>
}
 
export default AuthContext;