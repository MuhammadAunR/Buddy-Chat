import { PanelRightClose } from 'lucide-react'
import { useContext } from 'react'
import { ContextProvider } from './ContextWrapper'

const Navbar = () => {

    const { handleSidebar } = useContext(ContextProvider)
    return (
        <nav className='flex items-center justify-between py-5 px-10 text-(--color-text) fixed z-30 w-full max-w-400 left-1/2 -translate-x-1/2'>
            <h1 className='font-bold text-3xl flex items-center gap-1'>
                <span>Buddy<span className='text-(--color-comp)'>Chat</span></span>
                <span>
                    <lord-icon
                        src="https://cdn.lordicon.com/kdduutaw.json"
                        trigger="loop"
                        delay="1000"
                        stroke="bold"
                        state="hover-looking-around"
                        colors="primary:#3080e8,secondary:#9cc2f4">
                    </lord-icon>
                </span>
            </h1>
            <span onClick={handleSidebar} className='text-(--color-comp) bg-black/30 p-2 rounded-full hover:text-(--color-hovered) hover:translate-x-1 transition-all ease-linear'>
                <PanelRightClose size={28} />
            </span>
        </nav>
    )
}

export default Navbar
