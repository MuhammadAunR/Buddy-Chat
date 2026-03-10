import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ContextWrapper from '../components/ContextWrapper'

const MainLayout = () => {
    return (
        <>
            <ContextWrapper>
                <Navbar />
                <Outlet />
            </ContextWrapper>
        </>
    )
}

export default MainLayout
