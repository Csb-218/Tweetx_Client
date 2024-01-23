import React from 'react'
import FormSignUp from '@/components/forms/FormSignUp'
import Link from 'next/link'
import { authPageBg } from '@/assets/ImageLinks'

const Signup = () => {
  return (

    <>
    <div className=" h-full flex flex-col lg:space-y-16 space-y-10 ">

      <div className="flex flex-col space-y-10 ml-6 ">
        {/* logo */}
        <p className="text-4xl text-rose-400">TweetX</p>
        {/* signup button */}
        <Link href="/auth/Login">
          <button className="btn btn-outline btn-accent w-full max-w-48">
            Login
          </button>
        </Link>
      </div>

      {/* login form */}
      <FormSignUp />

    </div>
    <img src={authPageBg} className='absolute top-0 right-0 object-cover h-full bg-red-200  z-10 w-8/12 '/>
    </>
    
  )
}

export default Signup

