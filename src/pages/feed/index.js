import { useState, useRef } from 'react'
import { useAuth } from '@/context/AuthContext';
import { TweetXCard, UserXCard } from '@/components/containers';
import { getUserFeed, createPost } from '@/services/services';
import { FormCreatePost } from '@/components/forms';

import { useMutation, useQuery } from 'react-query';
import LoadingBars from '@/components/loaders/LoadingBars';
import LoadingSpinner from '@/components/loaders/LoadingSpinner';


const index = () => {

  const formRef = useRef();
  const userObject = useAuth();

  // const [tweets, setTweets] = useState([])

  const token = userObject?.user?.token

  const { isLoading, mutate: addPost } = useMutation({
    mutationFn: (data) => {
      return createPost(token, data)
    },
    onSuccess: (res) => {
      refetch()
      formRef?.current?.reset()
    },
    onError: (error) => {
      console.error('create post error', error)
    }
  })

  const { isLoading: tweetsLoading,data:tweetsResponse, isSuccess,isRefetching,refetch } = useQuery({
    queryKey: ['tweets'],
    queryFn: () => getUserFeed(token),
    enabled: !!token,
    onSuccess: (res => {
    })
  })

  const tweets = tweetsResponse?.data?.feed

  return (

    <div className=' flex flex-col items-center'>

      <FormCreatePost addPost={addPost} isLoading={isLoading} ref={formRef} />

      {/* <CreatePostModal addPost={addPost} isLoading={isLoading}/> */}
      <div className=' flex justify-center  lg:w-10/12 w-11/12'>


        {
          tweetsLoading ?
            <LoadingSpinner/>
            :
            isSuccess ?
            tweets?.length > 0 ?
                <div>
                  {
                    tweets?.map((tweet, index) => {
                      return (
                        <TweetXCard key={index} tweet={tweet} />
                      )
                    })
                  }
                </div>
                :
                <div>
                  Follow some users to see your feed.
                </div>
              :
              'Could not fetch feed posts !'

        }




      </div>

    </div>


  )
}

export default index