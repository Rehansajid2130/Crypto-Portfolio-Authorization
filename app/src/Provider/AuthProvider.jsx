import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import {useCookies} from "react-cookie";


export const AuthContext = createContext()
export default function AuthProvider({children}){

const [user, setUser] = useState("")
const [tokenStr, setToken] = useState("")

const [cookies , setCookie , removeCookie] = useCookies();

// const storeToken = () =>{
    // }
    

const login = (tokenStr)=>{
    
    if(tokenStr){
        setToken(tokenStr)
        const {exp} = jwtDecode(tokenStr);
        console.log(exp);
        if(exp){

            setCookie(
                "jwt" , tokenStr ,{
                    path: "/",
                    maxAge: exp,
                    sameSite: true,
                }
            )
            return
        }
        logout()
    }
 
}

const logout= ()=>{
    setToken("")
    setUser("")
    removeCookie("jwt", {path : "/"})
}

    return(
        <AuthContext.Provider
            value = {
                {
                    user,
                    tokenStr,
                    login,
                    logout
                }
            }>
            {children}
        </AuthContext.Provider>
    )
}