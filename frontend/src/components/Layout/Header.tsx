import { ChevronDown, ChevronUp, CircleUserRound, Search } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const Header = () => {
    const [searchInput, setSearchInput] = useState('')
    const [isDropDownOpen, setIsDropDownOpen] = useState(false)
    const [results, setResults] = useState(1)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const isLoggedIn = true

    const handleDropDown = () => {
        setResults(0)
        setIsDropDownOpen(prev => !prev)

    }

    useEffect(() => {
        if (searchInput.length > 3) {
            const timeoutId = setTimeout(() => {
                setResults(3)
                setIsSearchOpen(true)
            }, 500)
            return () => clearTimeout(timeoutId)
        }
    }, [searchInput])

    useEffect(() => {
        const handleMouseDown = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsSearchOpen(false)
            }
        }

        window.addEventListener('mousedown', handleMouseDown)
        return () => window.removeEventListener('mousedown', handleMouseDown)
    }, [])
    return (
        <div className='fixed left-22 right-0 top-0 h-22 p-3 flex items-center gap-4'>
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
            {isSearchOpen && <div className='bg-red-500 rounded-2xl p-3 mt-3'>
                <p>No Results to show</p> {results}
            </div>}
        </div>
        <div className='w-24 flex items-center justify-center box-border'>
            {isLoggedIn? <div className='flex items-center' onClick={handleDropDown}>
                <CircleUserRound size={40}/>
                { !isDropDownOpen ? <ChevronDown/>:<ChevronUp />}
                
                
            </div>:<div>
                <button className='border border-mist-500 p-2 rounded-2xl' >Login</button>
                </div>}
        </div>
        
    </div>
  )
}

export default Header