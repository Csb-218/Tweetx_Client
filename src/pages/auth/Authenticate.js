import {useEffect} from 'react'
import { useRouter } from 'next/router'

const Authenticate = () => {

    const router = useRouter()
    useEffect(()=>{
       router.replace('/feed')
    },[])
  return (
    <></>
  )
}

export default Authenticate