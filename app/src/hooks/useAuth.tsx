import { useContext } from 'react'
import { AuthContext } from '../Provider/AuthProvider'

const useAuth = () => {
    const {user,tokenStr,login , logut} = useContext(AuthContext)
  return {
    tokenStr, user , login ,logut
  }
}

export default useAuth