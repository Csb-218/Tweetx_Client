import React from 'react'
import { ProfileXCard } from '@/components/containers'
import { ProfileXTab } from '@/components/tabs'
import { getUserInfo, getUserPosts, deletePost } from '../../services/services'
import { useMutation, useQuery } from 'react-query'
import { useAuth } from '@/context/AuthContext'

const index = () => {

  const userObject = useAuth()
  const token = userObject?.user?.token

  // user posts
  const { isLoading: loadingPosts, data: postResponse, refetch: refetchPosts } = useQuery({
    queryKey: ['posts'],
    queryFn: () => getUserPosts(token),
    enabled: !!token,
    onSuccess: (res) => {},
    onError: (err) => console.error(err, 19)
  })

  // user info
  const { isLoading: loadingUser, data: userResponse, refetch: refetchUser } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserInfo(token),
    enabled: !!token,
    onSuccess: (res) => {},
    onError: (err) => console.error(err, 28)
  })


  // delete a post
  const { isLoading: deleting, mutate } = useMutation({

    mutationFn: (tweet_id) => {
      // console.log('hi')
      return deletePost(token, tweet_id)
    },
    onSuccess: () => {
      refetchPosts()
      refetchUser()
    },
    onError: () => {
      console.error(error)
    }
  })


  return (
    <>
      <div className='grid grid-cols-1 justify-items-center '>

        <ProfileXCard
          user={userResponse?.data?.user}
          loadingUser={loadingUser}
        />

        <ProfileXTab
          posts={postResponse?.data?.posts}
          loggedUser={userResponse?.data?.user}
          loadingPosts={loadingPosts}
          refetchPosts={refetchPosts}
          deletePost={mutate}
          refetchUser={refetchUser}
        />

      </div>
    </>


  )
}

export default index