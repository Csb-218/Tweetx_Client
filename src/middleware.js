import { NextResponse } from 'next/server'
import { jwtDecode } from 'jwt-decode'
// This function can be marked `async` if using `await` inside
export async function middleware(req) {

  const { pathname  } = req?.nextUrl;
  const token = req?.cookies?.get("jwt");
  const nextResponse = NextResponse?.next();

  console.log(pathname.length,pathname,9990)


  let decoded

  try {
    decoded = token && jwtDecode(token?.value)
  }
  catch (error) {
    console.log(error, 15)
  }

  if(pathname === '/'){
    return nextResponse
  }

  if(pathname === '/auth/Authenticate'){
    const token = req?.nextUrl?.searchParams.get('token')
    nextResponse.cookies?.set('jwt',token)
    return nextResponse
  }

  else if (pathname === '/auth/Login' || pathname === '/auth/Signup') {
    return nextResponse
  }

  else if (pathname === '/auth/LogOut') {
    
    nextResponse.cookies.delete('jwt')
    return nextResponse

  }

  else {

    if(token){
      return nextResponse
    }


      const url = new URL('/auth/Login', req.url)
      return NextResponse.redirect(url)
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // '/video/:id*','/channel/:channelId*','/category/:category*','/search/:search_query*'
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ],
}