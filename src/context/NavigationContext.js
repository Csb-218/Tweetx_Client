import {createContext,useContext,useState} from 'react'
import {pages} from '../utils/constants';



const NavContext = createContext()

const NavigationProvider = ({children}) => {

    const [page,setPage] = useState(pages[0])


  return <NavContext.Provider value={{page,setPage}} >{children}</NavContext.Provider>
}

export default NavigationProvider

export const useNav = () => {
    return useContext(NavContext)
}