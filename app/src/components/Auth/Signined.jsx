import React from 'react'
import useAuth from '../../hooks/useAuth'
import { Navigate } from 'react-router-dom'

const Signined = ({ children }) => {

  const { tokenStr } = useAuth()
  return (
    <>{!tokenStr ? children : <Navigate to={"/"} />}</>
  )
}

export default Signined