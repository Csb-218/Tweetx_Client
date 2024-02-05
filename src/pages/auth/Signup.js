import React from 'react'
import FormSignUp from '@/components/forms/FormSignUp'
import Link from 'next/link'
import { authPageBg } from '@/assets/ImageLinks'

const Signup = () => {
  return (

    <>
    <div className=" h-full flex flex-col lg:space-y-16 space-y-10 ">

      {/* login form */}
      <FormSignUp />

    </div>
    <div className='fixed top-0 right-0    '>
        <img src={authPageBg} className='h-screen lg:w-auto w-full' />
      </div>
    </>
    
  )
}

export default Signup

