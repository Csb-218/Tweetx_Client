import { useState, useEffect } from 'react'
import { TweetXCard, UserXCard } from '../containers'
import { useAuth } from '@/context/AuthContext'
import { useMutation, useQuery } from 'react-query'
import { getUserFollowers, getUserFollowing, follow, unfollow } from '@/services/services'

const ProfileXTab = ({ posts, loggedUser, loadingPosts, refetchPosts, refetchUser, deletePost }) => {

    const [active, setActive] = useState(1)
    const [unfollowing,setunFollowing] = useState([])
    const { user } = useAuth()
    const token = user?.token

    // fetching followers
    const { isLoading: followersLoading, data: followers, refetch: refetchFollowers } = useQuery({
        queryKey: ['followers'],
        queryFn: () => {
            return getUserFollowers(token)
        },
        onSuccess: (res) => {
        },
        enabled: !!token,
        onError: (err) => console.error('follower fetchError', err),
    })

    // fetching following
    const { isLoading: followingLoading, data: following, refetch: refetchFollowing } = useQuery({
        queryKey: ['following'],
        queryFn: () => {
            return getUserFollowing(token)
        },
        onSuccess: (res) => {

        },
        enabled: !!token,
        onError: (err) => console.error('following fetchError', err),
    })


    // unfollow a user
    const { isLoading: unfollowLoading, mutate: unFollow } = useMutation({

        mutationFn: (user_id) => {
            setunFollowing([user_id,...unfollowing])
            return unfollow(token, user_id)
        },
        onSuccess: (res) => {
            setunFollowing(unfollowing?.filter(ele => ele !== res?.data?.unfollowed))
            refetchFollowing()
            refetchUser()
        },
        onError: () => {
            console.error(error)
        }
    })




    return (
        <div className="w-11/12">
            {/* tabs */}
            <div className="grid grid-cols-3 w-full ">
                <button
                    onClick={() => setActive(1)}
                    className={active === 1 ? 'border-b-2 p-2' : ''}
                >
                    Posts
                </button>
                <button
                    onClick={() => setActive(2)}
                    className={active === 2 ? 'border-b-2 p-2' : ''}
                >
                    Followers
                </button>
                <button
                    onClick={() => setActive(3)}
                    className={active === 3 ? 'border-b-2 p-2' : ''}
                >
                    Following
                </button>
            </div>
            {/* tab content */}
            <div className=" w-full">
                {/* posts tab container */}
                {
                    active === 1 &&
                    <div>
                        {
                            posts?.map((post, index) => {
                                return (
                                    <TweetXCard key={index} tweet={post} page={'profile'} deletePost={deletePost} />
                                )
                            })
                        }
                    </div>
                }

                {
                    active === 2 &&
                    <div>
                        {
                            followers?.data?.followers?.map((follower, index) => {
                                return (
                                    <UserXCard key={index} user={follower} loggedUser={loggedUser} tab={2} />
                                )
                            })
                        }
                    </div>
                }

                {
                    active === 3 &&
                    <div>
                        {
                            following?.data?.following?.map((followed, index) => {
                                return (
                                    <UserXCard
                                        key={index}
                                        user={followed}
                                        loggedUser={loggedUser}
                                        unFollow={unFollow}
                                        unfollowing={unfollowing}
                                        tab={3}
                                    />
                                )
                            })
                        }
                    </div>
                }
            </div>
        </div>

    )
}

export default ProfileXTab