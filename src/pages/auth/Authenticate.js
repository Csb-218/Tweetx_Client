import {useEffect} from 'react'
import { useRouter } from 'next/router'

const Authenticate = () => {

    const router = useRouter()
    useEffect(()=>{
       router.replace('/')
    },[])
  return (
    <></>
  )
}

export default Authenticate