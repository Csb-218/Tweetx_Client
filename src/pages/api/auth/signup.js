
export default async function signUp(req,res){


    const {method,body} = req 

    res.status(200).json({data:'nice'})

    //     const options = {
    //         url:`${process.env.NEXT_PUBLIC_BASE_URL}/user/register`,
    //         method : 'POST',
    //         data:body,
    //         headers: {"Content-Type": "multipart/form-data"},

    //     }
    //    const response = await axios.request(options)
 
    //    if(response?.status!==200){
    //       res.status(400).json({data:'ERR_BAD_REQUEST'})
    //    }
    //    else{
    //     const {data} =  response
    //     res.status(200).json({data:data})
    //    }

       
    
   
}