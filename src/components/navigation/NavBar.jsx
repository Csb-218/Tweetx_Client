import { useState, useEffect } from 'react'
import { pages } from '../../utils/constants'
import { useNav } from '@/context/NavigationContext'
import { useRouter, } from 'next/router'
import Link from 'next/link'


const NavBar = () => {

    const { page, setPage } = useNav();
    const router = useRouter()
    const currentPage = router?.pathname?.replace("/", "")
    const [hide, setHide] = useState(false)

    const navigate = (page) => {
        setPage(page);
        router.push(page);
    }

    useEffect(() => {

        if (currentPage.includes('Signup') || currentPage.includes('Login')) {
            setHide(true)
        }
        else{
            setHide(false)
        }

    }, [currentPage])


    return (
        <div className={hide?"hidden":'block relative'}>
             <div className="navbar fixed z-50 bg-white top-0 flex flex-row justify-between shadow-md">
            <div className="navbar-start ">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {pages?.map(page => {
                            return (
                                <li key={page}>
                                    <a
                                        className={page === currentPage ? 'text-rose-400 cursor-pointer' : 'text-zinc-500 cursor-pointer'}
                                        onClick={() => navigate(page)}>
                                        {page}
                                    </a>
                                    </li>
                            )
                        })}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl text-rose-400" href='feed'>TweetX</a>
            </div>
            <div className="navbar-center hidden lg:flex ">
                <ul className="flex space-x-5 px-1 mx-5">
                    {pages?.map(page => {
                        return (
                            <li key={page}>
                                <a
                                    onClick={() => navigate(page)}
                                    className={page === currentPage ? 'text-rose-400 cursor-pointer' : 'text-zinc-500 cursor-pointer'}
                                >
                                    {page}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
        </div>
       
    )
}

export default NavBar