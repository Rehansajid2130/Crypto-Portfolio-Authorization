import React from 'react'
import useAuth from '../../hooks/useAuth'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {

    const {tokenStr} = useAuth()
  return (
    <>{tokenStr ? children : <Navigate to={"/signin"} /> }</>
  )
}

export default ProtectedRoute