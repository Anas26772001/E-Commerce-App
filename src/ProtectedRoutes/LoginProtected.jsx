import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { Navigate } from 'react-router-dom'

export default function LoginProtected({ children }) {
    let { token } = useContext(AuthContext)
    return (
        <>
            {!token ? children : <Navigate to="/" />}
        </>
    )
}
