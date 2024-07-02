import {useState,useReducer} from 'react'
import { UserXCard } from '@/components/containers';
import { useMutation,useQuery } from 'react-query'
import { getUsers ,follow,unfollow,getUserInfo } from '@/services/services';
import { useAuth } from '@/context/AuthContext';
import LoadingSpinner from '@/components/loaders/LoadingSpinner';


const index = () => {

  const userObject = useAuth()
  const [following,setFollowing] = useState([])
  const [unfollowing,setunFollowing] = useState([])
  const token = userObject?.user?.token



  const {isLoading:loggedUserLoading, data:loggedUserData , refetch} = useQuery({
    queryKey:['loggedUser'],
    queryFn:()=>{
      return getUserInfo(token)
    },
    enabled:!!token,
    onSuccess:(res)=>{}
  })

  const {isLoading:usersLoading, data:usersData,isRefetching,} = useQuery({
    queryKey:['users'],
    queryFn:()=>{
      return getUsers(token)
    },
    enabled:!!token,
    onSuccess:(res)=>{}
  })

  const {isLoading:followLoading,mutate:Follow} = useMutation({

    mutationFn:(user_id)=>{
       setFollowing([user_id,...following])
       return follow(token,user_id)
    },
    onSuccess:(res)=>{
      setFollowing(following?.filter(ele => ele !== res?.data?.followed))
      console.log('followed',res)
      refetch()
    },
    onError:()=>{
    },
})



const {isLoading:unfollowLoading,mutate:unFollow} = useMutation({
    mutationFn:(user_id)=>{
       setunFollowing([user_id,...unfollowing])
       return unfollow(token,user_id)
    },
    onSuccess:(res)=>{
        setunFollowing(unfollowing?.filter(ele => ele !== res?.data?.unfollowed))
        console.log('unfollowed',res)
        refetch()
    },
    onError:()=>{

    }
})

  


  return (
    <div className=' flex justify-center '>
      <div className='w-full '>
        {
          usersLoading ?

          <LoadingSpinner/>
          :
          usersData?.data?.users?.map((user,index)=> {

              return (
                 <UserXCard 
                 key={index}
                 user={user} 
                 loggedUser={loggedUserData?.data?.user} 
                 Follow={Follow} 
                 unFollow={unFollow}
                 following={following}
                 unfollowing={unfollowing}
                 />
                 )
          })
          
        }
      </div>

    </div>
  )
}

export default index