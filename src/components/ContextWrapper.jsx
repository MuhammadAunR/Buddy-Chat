import { createContext, useState } from "react";

export const ContextProvider = createContext()


const ContextWrapper = ({ children }) => {

    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [getConversations, setGetConversations] = useState([])

    const handleSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }
    
    return (
        <ContextProvider.Provider value={{ sidebarOpen, handleSidebar, setGetConversations }}>
            {children}
        </ContextProvider.Provider>
    )
}

export default ContextWrapper


