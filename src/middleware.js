import { NextResponse } from 'next/server'
import { jwtDecode } from 'jwt-decode'
// This function can be marked `async` if using `await` inside
export async function middleware(req) {

  const { pathname } = req?.nextUrl
  const token = req?.cookies?.get("jwt")

  let decoded

  try {
    decoded = token && jwtDecode(token?.value)
  }
  catch (error) {
    console.log(error, 15)
  }



  if (pathname === '/auth/Login' || pathname === '/auth/Signup') {
    return NextResponse?.next()
  }

  if (pathname === '/auth/LogOut') {

    const response = NextResponse?.next()
    response.cookies.delete('jwt')
    return response

  }

  else {
    if (!(token?.name === 'jwt' && decoded?.data?.id)) {

      const url = new URL('/auth/Login', req.url)
      return NextResponse.redirect(url)

    }
    else {

      if (pathname === '/') {
        const url = new URL('/feed', req.url)
        return NextResponse.redirect(url)
      }
      return NextResponse?.next()
    }
  }




}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // '/video/:id*','/channel/:channelId*','/category/:category*','/search/:search_query*'
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ],
}