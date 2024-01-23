import React from 'react'
import { getDisplayDate } from '@/utils/helper'
import { deleteIcon } from '@/assets/ImageLinks'
const TweetXCard = ({ tweet, page ,deletePost}) => {

    const date = getDisplayDate(tweet?.updatedAt)
    return (
        <div className="card w-full bg-base-100 shadow-xl my-2 flex flex-col items-center">
            {/* heading of the card */}
            <div className=" mt-6 mx-4 grid grid-cols-3 ">
                <div className='flex space-x-5 col-span-2 '>
                    <img
                        src={tweet?.postCreator?.profilePicture}
                        alt=""
                        className='h-14 w-14 object-cover rounded-full'
                    />
                    <h2 className="card-title">{tweet?.postCreator?.userName}</h2>
                </div>

                <div className='flex '>
                    {/* date */}
                    <p className='my-4 text-sm'>posted on {date}</p>

                    {/* delete button */}
                    {
                        page==='profile' && 
                        <button 
                       className="btn btn-circle btn-sm  mt-3 mx-1"
                       onClick={()=>{
                        deletePost(tweet?._id)
                       }}
                       
                       >
                        <img 
                        src={deleteIcon} 
                        alt=''
                        className='rounded-full'
                        />
                    </button>
                    }
                    
                </div>


            </div>

            <div className=" w-4/6 mt-2 mb-8">

                <div className='my-2'>

                    <p>{tweet?.postContent}</p>
                    {/* <div className="card-actions">
                    <button className="btn btn-primary">Buy Now</button>
                </div> */}
                </div>
                {
                    tweet?.postPicture &&
                    <figure className=" ">
                        <img src={tweet?.postPicture} alt="Shoes" className="rounded-xl object-cover h-60  " />
                    </figure>
                }
            </div>




        </div>
    )
}

export default TweetXCard