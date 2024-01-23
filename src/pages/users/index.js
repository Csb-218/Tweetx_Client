import React from 'react'
import { UserXCard } from '@/components/containers';
import { useMutation,useQuery } from 'react-query'
import { getUsers ,follow,unfollow,getUserInfo } from '@/services/services';
import { useAuth } from '@/context/AuthContext';
import LoadingSpinner from '@/components/loaders/LoadingSpinner';

const index = () => {

  const userObject = useAuth()

  const token = userObject?.user?.token

  const {isLoading:loggedUserLoading, data:loggedUserData , refetch} = useQuery({
    queryKey:['loggedUser'],
    queryFn:()=>{
      return getUserInfo(token)
    },
    enabled:!!token,
    onSuccess:(res)=>{}
  })

  const {isLoading:usersLoading, data:usersData,isRefetching} = useQuery({
    queryKey:['users'],
    queryFn:()=>{
      return getUsers(token)
    },
    enabled:!!token,
    onSuccess:(res)=>{}
  })

  const {isLoading:followLoading,mutate:Follow} = useMutation({

    mutationFn:(user_id)=>{
       return follow(token,user_id)
    },
    onSuccess:()=>{
      // console.log('followed')
      refetch()
    },
    onError:()=>{

    },
    
})

const {isLoading:unfollowLoading,mutate:unFollow} = useMutation({

    mutationFn:(user_id)=>{
        // console.log('hi')
       return unfollow(token,user_id)
    },
    onSuccess:()=>{
        // console.log('unfollowed')
        refetch()
    },
    onError:()=>{

    }
})

  const loading = followLoading || unfollowLoading


  return (
    <div className=' flex justify-center'>
      <div className='w-1/2 '>
        {
          usersLoading || isRefetching?

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
                 loading={loading}
                 />
                 )
          })
          
        }
      </div>

    </div>
  )
}

export default index