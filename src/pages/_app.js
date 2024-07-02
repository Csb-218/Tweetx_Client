import NavBar from "@/components/navigation/NavBar";
import "@/styles/globals.css";
import NavigationProvider from "@/context/NavigationContext";
import { AuthProvider } from "@/context/AuthContext";
import { QueryClientProvider,QueryClient } from "react-query";
import SideBar from "@/components/navigation/SideBar";

const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <NavigationProvider>
              {/* <NavBar /> */}
              <div className='overflow-scroll relative   flex'>
                  <SideBar/>
                <div className="lg:w-1/2 lg:mt-0 mt-16">
                  <a className="btn btn-ghost absolute top-5 left-1/3 text-xl text-rose-400 lg:hidden" href='/feed'>TweetX</a>
                  <Component {...pageProps} />
                </div>
                
              </div>
          </NavigationProvider>
        </AuthProvider>
      </QueryClientProvider>

    </>

  )
}
