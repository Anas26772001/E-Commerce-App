
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import React from 'react'
import toast from "react-hot-toast";
export let AuthContext = createContext(null)
export default function AuthContextProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [userId, setUserId] = useState(localStorage.getItem('userId'))
    async function verifyPass() {
        if (localStorage.getItem('token')) {
            try {
                const { data } = await axios("https://ecommerce.routemisr.com/api/v1/auth/verifyToken",
                    {
                        headers: {
                            token: localStorage.getItem('token')
                        }
                    }
                )
                localStorage.setItem('userId', data.decoded.id)
                setUserId(data.decoded.id)
            } catch (error) {
                toast.error('حرامييييييييييييييييييييييييي')
                console.log(error.response.message)
                localStorage.removeItem('token')
                setToken(null)
                localStorage.removeItem('userId')
                setUserId(null)
            }
        }
    }
    useEffect(() => {
        verifyPass()
    }, [])
    return (
        <AuthContext.Provider value={{ token, userId, verifyPass, setToken }}>
            {children}
        </AuthContext.Provider>
    )
}



