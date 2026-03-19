import { ChevronDown, ChevronUp, CircleUserRound, LogOutIcon, Search } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import AuthLayout from './AuthLayout'
import { useAuth } from '@/contexts/AuthContent'
import useTitles from '@/lib/titlesDataProvider'
import { useNavigate } from 'react-router'

const Header = () => {
    const [searchInput, setSearchInput] = useState('')
    const [isDropDownOpen, setIsDropDownOpen] = useState(false)
    const [results, setResults] = useState<string[]>([])
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [isModalOpen,setIsModalOpen] = useState(false) 
    const containerRef = useRef<HTMLDivElement | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const dropDownContainerRef= useRef<HTMLDivElement | null>(null)
    const navigate = useNavigate()
    const {userDetails, handleLogout} = useAuth()
    const titles = useTitles()
    const isLoggedIn = userDetails?true:false

    const handleDropDown = () => {
        setIsDropDownOpen(prev => !prev)
    }

    const handleModalClose = ()=>{
        setIsModalOpen(false)
    }

    const handleModalOpen = ()=>{
        setIsModalOpen(true)
    }

    useEffect(() => {
        if (searchInput.length > 3) {
            const timeoutId = setTimeout(() => {
                const filteredTitle = titles?.filter(title=>title.toLowerCase().replaceAll(" ","").includes(searchInput.toLowerCase().replaceAll(" ",""))) ??[]
                setResults(filteredTitle)
                setIsSearchOpen(true)
            }, 300)
            return () => clearTimeout(timeoutId)
        }
    }, [searchInput,titles])

    useEffect(() => {
        const handleMouseDown = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsSearchOpen(false)
            }

            if(dropDownContainerRef.current && !dropDownContainerRef.current.contains(event.target as Node)){
                setIsDropDownOpen(false)
            }
        }

        window.addEventListener('mousedown', handleMouseDown)
        return () => window.removeEventListener('mousedown', handleMouseDown)
    }, [])

    const handleNavigation=(item:string)=>{
        const modsearch = item.replaceAll(" ","-")
        setIsSearchOpen(false)
        navigate(`?search=${modsearch}`)
    }
    return (
        <div className='fixed left-22 right-0 top-0 h-22 p-3 flex items-center gap-4 bg-mist-50'>
                <div ref={containerRef} className='h-full w-full relative'>
                    <div className='h-full w-full rounded-2xl bg-mist-200 p-3 flex'>
                                <input
                                    ref={inputRef}
                                    className='ml-5 w-full text-2xl outline-none focus:outline-none bg-transparent'
                                    value={searchInput}
                                    onChange={(e) => {
                                        const nextValue = e.target.value
                                        setSearchInput(nextValue)
                                        if (nextValue.length <= 3) {
                                            setIsSearchOpen(false)
                                        }
                                    }}
                                />
                        <Search size={40} color='#67787c'/>
                    </div>
                    {isSearchOpen && <div className='bg-mist-200 rounded-2xl p-5 mt-3'>
                        {results.length>0?<div>{results.map(item=>
                            <p onClick={()=>handleNavigation(item)} className='w-full p-3 rounded-2xl flex items-center gap-2 cursor-pointer text-xl hover:bg-mist-50 text-mist-800'>
                                 <Search size={20} color='#22292b'/>
                                {item}
                            </p>
                        )}</div>:
                        <p>No Results to show</p>}
                        
                    </div>}
                </div>
                <div ref={dropDownContainerRef} className='w-24 h-full flex flex-col items-center justify-center box-border'>
                    {isLoggedIn? 
                    <div className='relative flex flex-col items-center' onClick={handleDropDown}>
                        <div className='flex items-center'>
                            <CircleUserRound size={40}/>
                            { !isDropDownOpen ? <ChevronDown/>:<ChevronUp />}
                        </div>
                        {isDropDownOpen &&  <div className='absolute top-10 right-0 w-52 bg-mist-50 rounded-2xl shadow-lg p-5'>
                            <p className='text-2xl '>Hello, {userDetails?.firstName}</p>
                            <ul className='mt-3'>
                                <li className='flex items-center gap-2 text-lg rounded-2xl p-3 hover:bg-mist-200' onClick={handleLogout}>
                                    <LogOutIcon size={22}/>    
                                    Logout
                                </li>
                            </ul>
                    </div>}
                        
                    </div>:<div>
                        <button className='border-2 p-2 text-lg border-mist-800 rounded-2xl hover:bg-mist-200' onClick={handleModalOpen} >Login</button>
                    </div>}
                    
                   
                        
                </div>
                <AuthLayout isOpen={isModalOpen} onClose={handleModalClose}/>
        
    </div>
  )
}

export default Header