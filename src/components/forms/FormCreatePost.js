import { useState,useImperativeHandle,forwardRef} from 'react'
import Image from 'next/image'
import { useFormik } from 'formik'
import PreviewImage from '@/utils/Preview'
import * as Yup from 'yup'

const FormCreatePost = ({ addPost, isLoading },ref) => {

    const [error, setError] = useState()

    const initialValues = {
        postContent: '',
        postPicture: ''
    }

    const validationSchema = Yup.object({
        postContent: Yup.string('Max 100 characters allowed').max(100).required('Post text cannot be empty !'),
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

    const reset =()=>formik?.resetForm()

    useImperativeHandle(ref,()=>{
        return{
            reset
        } 
    })

    return (
        <div className=' w-4/6'>

            <form
                onSubmit={formik?.handleSubmit}
                className='flex flex-col items-center space-y-5 py-5  w-full '
            >

                <div 
                   className={`w-6/12 overflow-hidden rounded-xl relative flex justify-center ${formik?.values?.postPicture && 'border-2'} ` }>

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
                <div className='flex w-6/12 '>

                    <div className='w-3/4'>

                        <textarea
                        name='postContent'
                        htmlFor='postContent'
                        onChange={formik?.handleChange}
                        value={formik?.values?.postContent}
                        placeholder="write a description"
                        className="input w-full max-h-40 min-h-20  bg-slate-50"
                    />
                    {
                        formik?.touched?.postContent &&
                        formik?.errors?.postContent &&
                        <p className='text-red-500'>
                            {formik?.errors?.postContent}!
                        </p>
                    }
                    </div>
                   
                    
                    <label htmlFor="upload" className="overflow-hidden bg-stone-600 h-12 w-12 mx-1 " >
                        <img 
                          src={"https://res.cloudinary.com/dz3aj0ti8/image/upload/v1705952399/360_F_481134373_0W4kg2yKeBRHNEklk4F9UXtGHdub3tYk_x9qejp.jpg"}
                          className='h-12 w-12 object-cover'
                        />
                    </label>

                    <p className='text-center text-red-500 '>{error}</p>
                    <div className='flex flex-col items-center  w-1/4'>

                        {
                            isLoading ?
                                <button
                                    className="btn bg-rose-400 text-white w-full"
                                    disabled={isLoading}

                                >
                                    <span className="loading loading-spinner"></span>
                                    creating ...
                                </button>
                                :
                                <button
                                    type='submit'
                                    className="btn bg-rose-400 text-white w-full"
                                >
                                    Create
                                </button>
                        }
                        {/* <p className='my-3 text-stone-500'>Forgot Password ?</p> */}
                    </div>
                </div>


                {/* error text */}

            </form>
        </div>
    )
}

export default forwardRef(FormCreatePost)