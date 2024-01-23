import axios from 'axios'
export default async function handler(req, res) {

    const {method,body} = req 

    try{
        const options = {
            url:`${process.env.NEXT_PUBLIC_BASE_URL}/user/login`,
            method : 'GET',
            data:body,

        }
       const response = await axios.request(options)
       const {data} =  response
       res.status(200).json({data:data})
    }
    catch(error){
       console.error(error)
       res.status(400).json({data:'ERR_BAD_REQUEST'})
    }
    
    

}