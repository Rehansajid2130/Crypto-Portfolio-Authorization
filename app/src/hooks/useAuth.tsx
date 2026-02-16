import { useContext } from 'react'
import { AuthContext } from '../Provider/AuthProvider'

const useAuth = () => {
  const { user, tokenStr, login, logout } = useContext(AuthContext)
  return {
    tokenStr, user, login, logout
  }
}

export default useAuth