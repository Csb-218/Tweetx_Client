import React from 'react'
import { userIcon } from '@/assets/ImageLinks'
import Link from 'next/link'

const ProfileXCard = ({user}) => {

    return (
        <div className="card w-11/12 bg-base-100 mt-2 mx-1 p-2 flex flex-row">
            {/* card picture */}
            <div className="">
                <img src={user?.profilePicture? user?.profilePicture : userIcon}
                    className="lg:w-24 lg:h-24 w-16 h-16   object-cover rounded-full my-6"
                />
            </div>

            {/* card information */}
            <div className="card-body relative">
                <h2 className="card-title">{user?.userName}</h2>

                <div className="grid grid-cols-3 gap-x-1 mt-4 text-center lg:w-8/12 lg:text-sm text-xs ">
                    <p>{user?.posts?.length} </p>
                    <p>{user?.followers?.length} </p>
                    <p>{user?.following?.length} </p>
                </div>

                <div className="grid grid-cols-3 gap-x-1 text-center -mt-2 lg:w-8/12 lg:text-sm text-xs ">
                    <p>posts </p>
                    <p>followers </p>
                    <p>following</p>
                </div>
            {/* <Link  
              className="btn btn-ghost btn-sm absolute top-0 right-0" 
              href='/auth/LogOut'
              >
                Log out
            </Link> */}
            </div>

            
        </div>

    )
}

export default ProfileXCard