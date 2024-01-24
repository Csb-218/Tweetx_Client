import { useState } from 'react'
import { useMutation } from 'react-query'
import Cookies from 'universal-cookie'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { loginUser } from '@/services/services'
import Link from 'next/link'
const cookie = new Cookies

import * as yup from 'yup'




const FormLogin = () => {

    const router = useRouter()
    const [error, setError] = useState()

    const { isLoading, mutate: Login } = useMutation({
        mutationFn: (values) => {
            return loginUser(values)
        },
        onSuccess: (response) => {
            const token = response?.data?.token

            router?.replace({
                pathname: '/auth/Authenticate',
                query: { token: token },
            })


            // cookie.set("jwt", token, { path: '/', maxAge: 3600*12 })
            // token && router.replace('/feed')
        },
        onError: (error) => {

            error?.response?.status === 404 && setError("Incorrect credentials!")
        }
    })

    const initialValues = {
        email: "",
        password: ""
    }

    const validationSchema = yup?.object({
        "email": yup.string().email('Invalid email').required('provide an email'),
        "password": yup.string().required('provide a password')
    })

    const onSubmit = async (values) => {
        Login(values)
    }


    const formik = useFormik({ initialValues, validationSchema, onSubmit })

    return (

        <>
            <div className="flex z-50 flex-col space-y-10 ml-6">
                {/* logo */}
                <p className="text-4xl text-rose-400">TweetX</p>
                {/* signup button */}
                <Link href="/auth/Signup" >
                    <button className="btn btn-outline btn-accent w-full max-w-48">
                        Create Account
                    </button>
                </Link>
            </div>

            <div className='mx-6 z-50'>
                <p className='text-3xl text-slate-600'>Login</p>
                <form
                    onSubmit={formik?.handleSubmit}
                    className='flex flex-col space-y-5  py-5  w-full max-w-sm'
                >

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

                        name='password'
                        onChange={formik?.handleChange}
                        type="text"
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

                    <p className="text-center text-red-500">
                        {error}
                    </p>

                    <div className='flex flex-col items-center w-full max-w-sm'>
                        {
                            isLoading ?
                                <button
                                    className="btn bg-rose-400 text-white w-1/2"
                                    disabled={isLoading}

                                >
                                    <span className="loading loading-spinner"></span>
                                    logging in ...
                                </button>
                                :
                                <button
                                    type='submit'
                                    className="btn bg-rose-400 text-white w-1/2"
                                >
                                    Login
                                </button>
                        }

                        <p className='my-3 text-stone-500'>Forgot Password ?</p>
                    </div>
                </form>
            </div>
        </>


    )
}

export default FormLogin