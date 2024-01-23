import {useState,useRef} from 'react'
import { useAuth } from '@/context/AuthContext';
import { TweetXCard, UserXCard } from '@/components/containers';
import { getUserFeed, createPost } from '@/services/services';
import { CreatePostModal } from '@/components/modals';
import { FormCreatePost } from '@/components/forms';

import { useMutation } from 'react-query';

export async function getServerSideProps(context) {

  const { jwt } = context?.req?.cookies
  const response = await getUserFeed(jwt)
  const feed = response?.feed

  return {
    props: {
      feed: feed || []
    }
  }

}

const index = ({ feed }) => {
  
  const formRef = useRef();
  const userObject = useAuth();
  
  const [tweets,setTweets] = useState([...feed])

  const token = userObject?.user?.token

  const { isLoading, mutate: addPost } = useMutation({
    mutationFn: (data) => {
      return createPost(token, data)
    },
    onSuccess: (res) => {
      // console.log('created post successfully!', res?.data)
      setTweets([res?.data?.post,...tweets])
      // console.log(formRef?.current)
      formRef?.current?.reset()
    },
    onError: (error) => {
      console.error('created post successfully!', error)
    }
  })

  return (

    <div className=' mt-20 flex flex-col items-center'>

      <FormCreatePost addPost={addPost} isLoading={isLoading} ref={formRef}/>

      {/* <CreatePostModal addPost={addPost} isLoading={isLoading}/> */}
      <div className=' flex justify-center  w-10/12'>
      
        
        {
          tweets ?
          tweets?.length >= 1 ?
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