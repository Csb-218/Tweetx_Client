import { useState, useImperativeHandle, forwardRef } from 'react'
import Image from 'next/image'
import { useFormik } from 'formik'
import PreviewImage from '@/utils/Preview'
import * as Yup from 'yup'

const FormCreatePost = ({ addPost, isLoading }, ref) => {

    const initialValues = {
        postContent: '',
        postPicture: null
    }

    const validationSchema = Yup.object({
        postContent: Yup.string('Max 100 characters allowed').max(100),
        postPicture: Yup.mixed().notRequired()
        // .test("File Type", "Only image(.jpeg ,.jpg,.svg and .png) supported!", value => value && ['image/png', 'image/jpeg', 'image/jpg', 'image/svg'].includes(value.type))
        // .test("File Size", "File size too big! Try to upload a file less than 5 Mb .", value => value?.size < 1024 * 1024 * 1024 * 5),
    })

    const onSubmit = async (values) => {

        const formData = new FormData()
        Object.keys(values).forEach(key => formData.append(key, formik.values[key]));
        addPost(formData)

    }

    const formik = useFormik({ initialValues, validationSchema, onSubmit })

    const reset = () => formik?.resetForm()

    useImperativeHandle(ref, () => {
        return {
            reset
        }
    })

    console.log(formik.values)

    return (


        <form
            onSubmit={formik?.handleSubmit}
            className='flex flex-col items-center space-y-5 lg:py-5  lg:w-full w-11/12   p-1'
        >

            <div className={`lg:w-6/12 w-full overflow-hidden rounded-xl relative flex justify-center ${formik?.values?.postPicture && 'border-2'} `}>

                <label htmlFor="upload" >
                    <PreviewImage file={formik?.values?.postPicture} type={'post'} />
                </label>

                <input
                    name='postPicture'
                    type="file"
                    accept='image/*'
                    id='upload'
                    onChange={e => {
                        const file = e.target.files[0];
                        formik.setFieldValue('postPicture', file)
                    }}
                    hidden
                />

            </div>
            {
                formik?.touched?.postPicture &&
                formik?.errors?.postPicture &&
                <p className='text-red-500 w-48 h-20'>
                    {formik?.errors?.postPicture}!
                </p>
            }


            <div className='lg:w-10/12 w-full rounded-md relative '>

                <textarea
                    name='postContent'
                    htmlFor='postContent'
                    onChange={formik?.handleChange}
                    value={formik?.values?.postContent}
                    placeholder="Thoughts..."
                    className="textarea pb-10 w-full max-h-40 min-h-20 "
                />
                
                <div className='flex flex-row justify-between absolute lg:h-auto lg:w-auto h-10 bottom-2 right-0 '>
                    {/* image upload button */}
                    <label htmlFor="upload" className="overflow-hidden bg-stone-600 lg:h-10 h-auto w-10 mx-1 my-1 rounded-lg " >
                        <img
                            src={"https://res.cloudinary.com/dz3aj0ti8/image/upload/v1705952399/360_F_481134373_0W4kg2yKeBRHNEklk4F9UXtGHdub3tYk_x9qejp.jpg"}
                            className=' object-cover h-full w-full'
                        />
                    </label>

                    {/* create button */}
                    <div className='grid grid-cols-1 items-center mr-1 '>
                        {
                            isLoading ?
                                <button
                                    className="p-2 text-xs rounded-2xl bg-rose-400 text-white "
                                    disabled={isLoading}

                                >
                                    <span className="loading loading-spinner"></span>
                                    
                                </button>
                                :
                                <button
                                    type='submit'
                                    className="p-2 text-xs rounded-2xl bg-rose-400 text-white hover:text-red-500 hover:bg-white "
                                    disabled={formik?.values?.postContent==='' && !formik?.values?.postPicture}
                                >
                                    Create
                                </button>
                        }
                    </div>
                </div>



            </div>


            {/* error text */}

        </form>

    )
}

export default forwardRef(FormCreatePost)