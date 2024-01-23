import { createContext, useEffect, useState, useContext } from 'react'
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const router = useRouter()
  const { userState } = router.query
  const [user, setUser] = useState(null)
  const cookies = new Cookies

  useEffect(() => {
    const token = cookies.get('jwt')
    const tokenDetails = token && jwtDecode(token)
    // const {userName,email,id} = tokenDetails && tokenDetails?.data

    if (tokenDetails) {
      const user = {
        userId:tokenDetails?.data?.id,
        username:tokenDetails?.data?.userName,
        email:tokenDetails?.data?.email,
        token:token
      }
      // console.log(user)
      setUser(user)
    }

    else{
      userState && setUser(null)
    }

  },[router])


  return <AuthContext.Provider value={{ user }} >{children}</AuthContext.Provider>
}


export const useAuth = () => {
  return useContext(AuthContext)
};
