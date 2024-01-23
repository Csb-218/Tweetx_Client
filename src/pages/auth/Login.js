import React from 'react'
import Link from 'next/link'
import FormLogin from '@/components/forms/FormLogin'
import { authPageBg } from '@/assets/ImageLinks'


const Login = () => {

    return (
        <>
        <div className=" h-full  z-20 flex flex-col lg:space-y-24 space-y-10 ">

            <div className="flex flex-col space-y-10 ml-6">
                {/* logo */}
                <p className="text-4xl text-rose-400">TweetX</p>
                {/* signup button */}
                <Link href="/auth/Signup" >
                    <button className="btn btn-outline btn-accent w-full max-w-48">
                        Create Account
                    </button>
                </Link>
            </div>

            {/* login form */}
            <FormLogin />

        </div>

        <img src={authPageBg} className='absolute top-0 right-0 object-cover h-full  z-10 w-8/12 '/>
        </>
        
    )
}

export default Login

