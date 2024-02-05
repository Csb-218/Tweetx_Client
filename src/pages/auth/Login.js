import React from 'react'
import Link from 'next/link'
import FormLogin from '@/components/forms/FormLogin'
import { authPageBg } from '@/assets/ImageLinks'


const Login = () => {

    return (
        <>
            <div className=" h-full flex  flex-col lg:space-y-24 space-y-10  ">
                {/* login form */}
                <FormLogin />

            </div>

            <div className='relative z-0'>

                <div className='fixed top-0 right-0    '>
                    <img src={authPageBg} className='h-screen lg:w-auto w-full' />
                </div>

            </div>
        </>


    )
}

export default Login

