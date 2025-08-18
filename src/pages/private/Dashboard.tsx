import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Dashboard