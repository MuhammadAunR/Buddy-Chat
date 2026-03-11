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

    const handleDelete = (id) => {
        const afterDeletionChats = conversations.filter(item => item.id != id)
        setConversations(afterDeletionChats)
        localStorage.setItem('conversations', JSON.stringify(afterDeletionChats))
    }

    useEffect(() => {
        const entries = performance.getEntriesByType('navigation')
        if (entries.length > 0 && entries[0].type === 'reload') {
            const lastChat = conversations.at(-1)
            if (lastChat) {
                setMessages(lastChat.messages)
                setChatId(lastChat.id)
            }
        }
    }, [])

    useEffect(() => {
        function saveConversation() {
            if (messages.length === 0) return

            if (ChatId) {
                const updatedChat = conversations.map(chat => {
                    return chat.id === ChatId ? { ...chat, messages } : chat
                })
                localStorage.setItem('conversations', JSON.stringify(updatedChat))
            } else {
                const newConversation = {
                    id: Date.now(),
                    date: new Date().toLocaleDateString(),
                    time: new Date().toLocaleTimeString(),
                    messages: messages,
                }
                const updatedConversations = [...conversations, newConversation]
                localStorage.setItem('conversations', JSON.stringify(updatedConversations))
            }
        };
        saveConversation()
    }, [messages])

    const handleNewChat = () => {
        setMessages([])
        setChatId(null)
    }

    return (
        <ContextProvider.Provider value={{
            sidebarOpen, handleSidebar, setMessages, messages, conversations, handleChatId, ChatId, handleDelete, handleNewChat
        }}>
            {children}
        </ContextProvider.Provider>
    )
}

export default ContextWrapper


