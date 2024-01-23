
import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import PreviewImage from '@/utils/Preview'

import * as yup from 'yup'
import { userIcon } from '@/assets/ImageLinks'




const UpdateProfile = () => {

    const router = useRouter()

    const initialValues = {
        email: "",
        userName: '',
        profilePicture: ''
    }

    const validationSchema = yup?.object({
        "email": yup.string().email('Invalid email').required('provide an email'),
        "userName": yup.string('username cannot contain more than 20 characters').max(20),
        "profilePicture": yup.mixed()
            .test("File Type", "Only image(.jpeg ,.jpg,.svg and .png) supported!", value => value && ['image/png', 'image/jpeg', 'image/jpg', 'image/svg'].includes(value.type))
            .test("File Size", "File size too big! Try to upload a file less than 5 Mb .", value => value?.size < 1024 * 1024 * 1024 * 5),
    })

    const onSubmit = async (values) => {

        // try {
        //     const response = await fetch(`/api/auth/login`, {
        //         method: 'POST',
        //         body: JSON.stringify(values),
        //         headers: {
        //             "Content-Type": "application/json",
        //         }
        //     })

        //     const data = await response.json()
        //     // console.log(data)
        //     const { token } = data?.data

        //     cookie.set("jwt", token, { path: '/', maxAge: 3600, sameSite: true })

        //     router.replace('/feed')

        // }
        // catch (error) {
        //     console.error(error)
        // }
    }


    const formik = useFormik({ initialValues, validationSchema, onSubmit })


    return (
        <div className=" w-1/3  ">

            <p className='text-3xl text-slate-600 '>Create Account</p>
            <form
                onSubmit={formik?.handleSubmit}
                className='flex flex-col items-center space-y-5 py-5  w-full '
            >

                <div
                    className="h-28 w-28 bg-stone-300 rounded-full relative"
                    style={{ backgroundImage: user }}

                >
                    <PreviewImage file={formik?.values?.profilePicture} />

                    <label for="upload" className=" w-10 absolute bottom-0 right-0 " >
                        <img src={userIcon}
                            className=" w-8 h-8 object-cover rounded-full " alt=''
                        />
                    </label>

                    <input
                        name='profilePicture'
                        type="file"
                        accept='image/*'
                        id='upload'
                        onChange={e => {
                            const file = e.target.files[0];
                            formik.setFieldValue('profilePicture', file)

                        }
                        }
                        hidden
                    />

                </div>

                <input
                    name='email'
                    onChange={formik?.handleChange}
                    type="text"
                    placeholder="Email"
                    className="input  w-full max-w-sm bg-zinc-100"
                />
                {
                    formik?.touched?.email &&
                    formik?.errors?.email &&
                    <p className='text-red-500'>
                        {formik?.errors?.email}!
                    </p>
                }

                <input

                    name='userName'
                    onChange={formik?.handleChange}
                    type="text"
                    placeholder="userName"
                    className="input  w-full max-w-sm bg-zinc-100"
                />
                {
                    formik?.touched?.userName &&
                    formik?.errors?.userName &&
                    <p className='text-red-500'>
                        {formik?.errors?.userName}!
                    </p>
                }






                {
                    formik?.touched?.profilePicture &&
                    formik?.errors?.profilePicture &&
                    <p className='text-red-500'>
                        {formik?.errors?.profilePicture}!
                    </p>
                }

                <div className='flex flex-col items-center w-full max-w-sm'>

                    <button
                        type='submit'
                        className="btn bg-rose-400 text-white w-1/2"

                    >Save changes
                    </button>
                    <p className='my-3 text-stone-500'>Forgot Password ?</p>
                </div>
            </form>
        </div>

    )
}

export default UpdateProfile