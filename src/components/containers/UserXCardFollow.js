import React from 'react'
import UserXCardButton from '../buttons/UserXCardButton';

const UserXCardFollow = ({ user, loggedUser, tab, unFollow, Follow, following, unfollowing }) => {

  return (
    <div className="card w-full bg-white  shadow-xl my-2">
            <div className=" m-4 grid grid-cols-3">
                <div className='flex space-x-5 col-span-2 '>
                    <img
                        src={
                            user?.profilePicture ?
                                user?.profilePicture
                                :
                                "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                        }
                        alt=""
                        className='h-14 w-14 rounded-full object-cover'
                    />
                    <h2 className="card-title">{user?.userName}</h2>
                </div>



                {
                    ((tab && tab===3) || !tab ) &&
                        <UserXCardButton
                            Follow={Follow}
                            unFollow={unFollow}
                            userId={user?._id}
                            includes={loggedUser?.following?.includes(user?._id)}
                            unfollowing={unfollowing}
                            following={following}
                        />


                }






            </div>
        </div>
  )
}

export default UserXCardFollow