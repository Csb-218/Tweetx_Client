import React from 'react'

const UserXCardButton = ({ Follow, unFollow, userId, includes, unfollowing, following }) => {
    return (
        <>
            {
                includes ?
                    <button
                        className="btn "
                        onClick={() => unFollow(userId)}
                        disabled={unfollowing?.includes(userId)}
                    >
                        {
                            unfollowing?.includes(userId) ?
                            <span className="loading loading-spinner"></span>
                            :
                            'unfollow'
                        }
                        
                    </button>
                    :
                    <button
                        className="btn "
                        onClick={() => Follow(userId)}
                        disabled={following?.includes(userId)}
                    >
                        {
                             following?.includes(userId) ?
                             <span className="loading loading-spinner"></span>
                             :
                             'follow'
                        }
                    </button>



            }



        </>


    )
}

export default UserXCardButton