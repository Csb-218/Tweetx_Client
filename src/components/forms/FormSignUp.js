
import { useState, useEffect } from 'react'
import Cookies from 'universal-cookie'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import PreviewImage from '@/utils/Preview'
import { registerUser } from '@/services/services'
import { useMutation } from 'react-query'
import * as yup from 'yup'
import Link from 'next/link'


const FormSignUp = () => {

    const [error, setError] = useState()
    const router = useRouter()

    const { isLoading, mutate: Register } = useMutation({
        mutationFn: (values) => {
            return registerUser(values)
        },
        onSuccess: async(response) => {
            const token = await response?.data?.token

            token && router?.replace({
                pathname: '/auth/Authenticate',
                query: { token: token },
            })
            // cookie.set("jwt", token, { path: '/', maxAge: 3600 })
            // token && router.replace('/feed')
        },
        onError: (error) => {
            error?.response?.status === 409 && setError("username or email already exists !")
        }
    })


    const initialValues = {
        email: "",
        userName: '',
        password: '',
        profilePicture: '',
        confirmPassword: ''
    }

    const validationSchema = yup?.object({
        "email": yup.string().email('Invalid email').required('provide an email'),
        "userName": yup.string().max(20, 'max 20 characters').required('username cannot be blank'),
        "password": yup.string().required("password cannot be empty"),
        "confirmPassword": yup.string().required('Please confirm your password'),
        "profilePicture": yup.mixed().required('please upload a profile picture')
            .test("File Type", "Only image(.jpeg ,.jpg,.svg and .png) supported!", value => value && ['image/png', 'image/jpeg', 'image/jpg', 'image/svg'].includes(value.type))
            .test("File Size", "File size too big! Try to upload a file less than 5 Mb .", value => value?.size < 1024 * 1024 * 1024 * 5),
    })




    const onSubmit = async (values) => {

        if (values?.password === values?.confirmPassword) {
            const formData = new FormData()

            Object.keys(values).forEach(key => formData.append(key, formik.values[key]));

            Register(formData)
        }


    }


    const formik = useFormik({ initialValues, validationSchema, onSubmit })


    return (

        <>

            <div className="flex flex-col z-50 space-y-10 ml-6 ">
                {/* logo */}
                <p className="text-4xl text-rose-400">TweetX</p>
                {/* signup button */}
                <Link href="/auth/Login">
                    <button className="btn btn-outline btn-accent w-full max-w-48">
                        Login
                    </button>
                </Link>
            </div>

            <div className="mx-6 z-50">

                <p className='text-3xl ml-6 text-slate-600 '>Create Account</p>
                <form
                    onSubmit={formik?.handleSubmit}
                    className='flex flex-col items-center space-y-5 py-5  w-full max-w-sm'
                >

                    <div
                        className="h-28 w-28 bg-stone-300 rounded-full overflow-hidden relative"

                    >
                        <label htmlFor="upload" className=" " >
                            <PreviewImage file={formik?.values?.profilePicture} />
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
                    {
                        formik?.touched?.profilePicture &&
                        formik?.errors?.profilePicture &&
                        <p className='text-red-500 w-auto'>
                            {formik?.errors?.profilePicture}!
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

                    {/* password */}
                    <input
                        name='password'
                        onChange={formik?.handleChange}
                        type="password"
                        placeholder="Password"
                        className="input  w-full max-w-sm bg-zinc-100"
                    />
                    {
                        formik?.touched?.password &&
                        formik?.errors?.password &&
                        <p className='text-red-500'>
                            {formik?.errors?.password}!
                        </p>
                    }

                    {/* confirm password */}
                    <input
                        name='confirmPassword'
                        onChange={formik?.handleChange}
                        type="password"
                        placeholder="confirmPassword"
                        className="input  w-full max-w-sm bg-zinc-100"
                    />

                    {
                        formik?.touched?.confirmPassword &&
                        formik?.errors?.confirmPassword &&
                        <p className='text-red-500'>
                            {formik?.errors?.confirmPassword}!
                        </p>
                    }


                    {
                        formik?.touched?.confirmPassword &&
                        formik?.values.password !== formik?.values.confirmPassword &&
                        <p className='text-red-500'>
                            Passwords not matching!
                        </p>
                    }

                    {/* error text */}
                    <p className='text-center text-red-500 '>{error}</p>


                    <div className='flex flex-col items-center w-full max-w-sm'>

                        {
                            isLoading ?
                                <button
                                    className="btn bg-rose-400 text-white w-1/2"
                                    disabled={isLoading}

                                >
                                    <span className="loading loading-spinner"></span>
                                    signing up ...
                                </button>
                                :
                                <button
                                    type='submit'
                                    className="btn bg-rose-400 text-white w-1/2"
                                >
                                    Sign up
                                </button>
                        }
                        {/* <p className='my-3 text-stone-500'>Forgot Password ?</p> */}
                    </div>
                </form>
            </div>
        </>


    )
}

export default FormSignUp