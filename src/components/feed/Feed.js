import React from 'react'
// import { useAuth } from '@/context/AuthContext'

// export async function getServerSideProps() {
//     const {token} = useAuth()
    
//     const feedResult = await fetch(`/api/feed/feed`, {
//       method: 'POST',
//       body:{
//         token:token
//       },
//       headers: {
//           "Content-Type": "application/json",
//       }
//     })
//     console.log(feedResult)
//     // axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/feed`)
// }

export const Feed = () => {
  return (
    <div>Feed</div>
  )
}

