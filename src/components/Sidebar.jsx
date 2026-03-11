import { Bot, CirclePlus, PanelLeftClose, SquarePen, Trash } from 'lucide-react'
import { useContext, useEffect } from 'react'
import { ContextProvider } from './ContextWrapper'

const Sidebar = () => {

    const { sidebarOpen, handleSidebar, conversations, handleChatId, handleDelete, handleNewChat } = useContext(ContextProvider)

    return (
        <>
            <section className='w-full'>
                <aside className={`h-screen w-100 fixed top-0 z-50 bg-(--color-bg) transition-all ease-linear  ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className='flex items-center justify-between px-5 py-2'>
                        <h2 className='font-bold text-2xl text-(--color-text)'>BuddyChat</h2>
                        <span onClick={handleSidebar} className='cursor-pointer text-(--color-comp) hover:text-(--color-hovered) hover:-translate-x-1 transition-all ease-linear'>
                            <PanelLeftClose size={26} />
                        </span>
                    </div>

                    <section className='my-7 px-7 space-y-7'>
                        <div onClick={() => { handleSidebar(), handleNewChat() }} className='ring-2 ring-(--color-chat) px-3 py-2 rounded-sm text-lg cursor-pointer text-gray-500 hover:text-(--color-text) hover:ring-4 transition-all ease-linear flex items-center gap-2 relative group overflow-hidden'>
                            <span><CirclePlus size={20} /></span>
                            New Conversation
                            <span className='absolute -right-10 group-hover:right-5 transition-all ease-in-out'><Bot /></span>
                        </div>

                        <div className='w-full h-px bg-(--color-chat)'></div>

                        <div className='space-y-5'>
                            <h4 className='text-(--color-text) text-xl font-semibold'>Conversations</h4>
                            <div className='space-y-3 h-120 py-2 overflow-y-scroll border-2 rounded-lg border-(--color-chat) bg-(--color-chat)/30'>
                                {conversations.length === 0 && <h4 className='text-(--color-text)/50 text-center text-sm font-semibold'>No chat history</h4>}
                                {conversations.map(chat => {
                                    return <div key={chat.id} onClick={() => { handleSidebar(), handleChatId(chat.id) }} className='relative flex gap-2 items-center ring-1 ring-(--color-chat) hover:bg-(--color-chat) text-(--color-text) rounded-sm py-2 px-3 mx-1 group overflow-hidden'>
                                        <span className=''><Bot /></span>
                                        <h5 className='text-sm text-clip'>{chat.messages[0].text}</h5>
                                        <div className='flex items-center gap-1 absolute -right-12 group-hover:right-5 transition-all ease-in-out cursor-pointer'>
                                            <SquarePen size={20} className='text-(--color-comp) hover:text-(--color-hovered) transition-colors ease-in-out' />
                                            <Trash onClick={(e) => {
                                                e.stopPropagation()
                                                handleDelete(chat.id)
                                            }} size={20} className='text-red-500 transition-colors ease-in-out' />
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>
                    </section>
                </aside >
                {sidebarOpen &&
                    <section onClick={handleSidebar} className='w-[calc(100%-400px)] h-screen bg-(--color-bg)/20 backdrop-blur-2xl z-50 fixed right-0 to-0'></section>
                }
            </section >
        </>
    )
}

export default Sidebar
