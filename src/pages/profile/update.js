import UpdateProfile from '@/components/forms/UpdateProfile'
import React from 'react'

const update = () => {
  return (
    <div className=" h-screen m-10 flex flex-col lg:space-y-24 space-y-10">

            <div className="flex flex-col space-y-10">
                {/* logo */}
                <p className="text-4xl text-rose-400">TweetX</p>
                {/* signup button */}
                <button className="btn btn-outline btn-accent w-full max-w-48">Log in</button>
            </div>

            {/* login form */}
            <UpdateProfile />

        </div>
    
  )
}

export default update