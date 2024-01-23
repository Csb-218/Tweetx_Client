import React from 'react'
import { FormCreatePost } from '../forms'

const CreatePostModal = ({ addPost,isLoading }) => {

    const closeModal = () => document.getElementById('my_modal_2').showModal()

    return (
        <>
            <button className="btn" onClick={() => document.getElementById('my_modal_2').showModal()}>open modal</button>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    {/* <FormCreatePost addPost={addPost} isLoading={isLoading}/> */}
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            
        </>
    )
}

export default CreatePostModal