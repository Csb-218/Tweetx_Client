import NavBar from "@/components/navigation/NavBar";
import "@/styles/globals.css";
import NavigationProvider from "@/context/NavigationContext";
import { AuthProvider } from "@/context/AuthContext";
import { QueryClientProvider,QueryClient } from "react-query";

const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <NavigationProvider>
              <NavBar />
              <div className='mt-16'>
                <Component {...pageProps} />
              </div>
          </NavigationProvider>
        </AuthProvider>
      </QueryClientProvider>

    </>

  )
}
