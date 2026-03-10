import { createContext, useEffect, useState } from "react";

export const ContextProvider = createContext()

const ContextWrapper = ({ children }) => {

    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [messages, setMessages] = useState([])
    const [conversations, setConversations] = useState(() => {
        const stored = localStorage.getItem('conversations')
        return stored ? JSON.parse(stored) : [];
    })
    const [ChatId, setChatId] = useState(null)


    const handleSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }

    const handleChatId = (id) => {
        setChatId(id)
        const chat = conversations.find(item => item.id === id)
        if (chat) setMessages(chat.messages)
    }

    const handleNewChat = () => {
        setMessages([])
        setChatId(null)
        saveConversation()
        alert('New Chat started')
    }

    const handleDelete = (id) => {
        const chatToBeDeleted = conversations.find(item => item.id === id)
        console.log(chatToBeDeleted)
    }

    // console.log(messages)
    // console.log(conversations)

    useEffect(() => {
        function saveConversation() {
            if (messages.length > 0) {
                const newConversation = {
                    id: Date.now(),
                    date: new Date().toLocaleDateString(),
                    time: new Date().toLocaleTimeString(),
                    messages: messages
                }
                const updatedConversations = [...conversations, newConversation]
                localStorage.setItem('conversations', JSON.stringify(updatedConversations))
            }
        };

        window.addEventListener('beforeunload', saveConversation)
        return () => window.removeEventListener('beforeunload', saveConversation)

        // const handleBeforeUnload = () => {
        //     if (messages.length > 0) {
        //         const newConversation = {
        //             id: Date.now(),
        //             date: new Date().toLocaleDateString(),
        //             messages: messages
        //         }
        //         // if (newConversation) {
        //         //     newConversation.id === ChatId
        //         //     return;
        //         // }
        //         const updatedConversations = [...conversations, newConversation]
        //         localStorage.setItem('conversations', JSON.stringify(updatedConversations))
        //     }
        // }
        // window.addEventListener('beforeunload', handleBeforeUnload)
        // return () => window.removeEventListener('beforeunload', handleBeforeUnload)

    }, [messages])

    return (
        <ContextProvider.Provider value={{
            sidebarOpen, handleSidebar, setMessages, messages, conversations, handleChatId, ChatId, handleDelete, handleNewChat
        }}>
            {children}
        </ContextProvider.Provider>
    )
}

export default ContextWrapper


