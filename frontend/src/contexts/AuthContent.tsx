import React, { createContext, useContext, useEffect, useState } from 'react'
import type {UserData} from '../types'
import api from '@/lib/axiosConfig'
import axios from 'axios'

const baseUrl  = import.meta.env.VITE_API_URL


type AuthContextType = {
    userDetails: UserData|null,
    handleLogin:(userData: UserData)=>void,
    handleLogout:()=>void,
    isAuthLoading:boolean,
}
type AuthContextProviderType = {
    children: React.ReactNode
}

const defaultUser = {
    userDetails: null ,
    handleLogin:()=>{},
    handleLogout:()=>{},
    isAuthLoading:false,
}

const AuthContext = createContext<AuthContextType>(defaultUser)

const AuthContextProvider = ({children}:AuthContextProviderType)=>{
    const [userDetails,setUserDetails] = useState<UserData|null>(null)
    const [isAuthLoading,setIsAuthLoading] = useState(true)
    const handleLogin = (userData:UserData | null)=>{
        setUserDetails(userData)
        setIsAuthLoading(false)
    }

    const handleLogout = ()=>{
        setUserDetails(null)
        localStorage.removeItem("nomadToken")
    }

    useEffect(()=>{
        const checkUserSession = async()=>{
            const token = localStorage.getItem('nomadToken')
            if(!token){
                setUserDetails(null)
                setIsAuthLoading(false)
                return
            }
            try{
                const {data} =await api.get(`${baseUrl}/api/protectedRoutes/userDetails`)
                if(!data.payload){
                    setUserDetails(null)
                    setIsAuthLoading(false)
                    return
                }
                setUserDetails(data as UserData)
                setIsAuthLoading(false)
                return

            }catch(error){
                if(axios.isAxiosError(error)){
                    console.log(error.response?.data.errorMessage)
                }else{
                   console.log("Unexpected Error: Session verification failed")
                }
                setIsAuthLoading(false)
                localStorage.removeItem("nomadToken")
                setUserDetails(null)
            }

        }
        checkUserSession()
    },[])

    return(<AuthContext.Provider value={{ userDetails, handleLogin, handleLogout, isAuthLoading}}>
        {children}
    </AuthContext.Provider>)
}

export const useAuth = () => {
    return useContext(AuthContext)
}

export default AuthContextProvider
