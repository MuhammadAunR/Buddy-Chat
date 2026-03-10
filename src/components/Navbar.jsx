import { PanelRightClose } from 'lucide-react'
import { useContext } from 'react'
import { ContextProvider } from './ContextWrapper'

const Navbar = () => {

    const { handleSidebar } = useContext(ContextProvider)
    return (
        <nav className='flex items-center justify-between py-5 px-10 text-(--color-text) fixed z-30 w-full '>
            <h1 className='font-bold text-3xl'>BuddyChat</h1>
            <span onClick={handleSidebar} className='text-(--color-comp) bg-black/30 p-2 rounded-full hover:text-(--color-hovered) hover:translate-x-1 transition-all ease-linear'>
                <PanelRightClose size={28} />
            </span>
        </nav>
    )
}

export default Navbar
