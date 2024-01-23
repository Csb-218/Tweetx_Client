import {useEffect} from 'react'
import { useRouter } from 'next/router'


const LogOut = () => {

    const router = useRouter()

    useEffect(()=>{
       router.replace('/auth/Login')
    },[])

  return (
   <>
   </>
  )
}

export default LogOut