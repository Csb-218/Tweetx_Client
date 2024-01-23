import { userIcon } from '@/assets/ImageLinks';
import { useEffect, useState } from 'react'

const PreviewImage = ({ file, type }) => {

    const [preview, setPriview] = useState(null)
    
    useEffect(() => {

        const reader = new FileReader();
        file && reader.readAsDataURL(file);
        reader.onload = () => {
            // console.log(file)
            file && setPriview(reader.result);
        };

        !file && setPriview(null)

    }, [file])

   

    return (
        <>
        {
            // preview &&
        <img
            src={
                preview? 
                preview 
                : type === 'post' ? 
                null
                :
                userIcon
            }
            alt=""
            className={
                type === 'post' ?
                    'object-cover max-h-60 '
                    :
                    'object-cover w-full h-full border-2 rounded-full'
            }
        />
        }
        
        </>
        
       
        
    )
}

export default PreviewImage