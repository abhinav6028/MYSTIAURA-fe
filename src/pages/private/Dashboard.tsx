import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import AppBreadcrumbs from '../../components/layout/BreadCrump'

const Dashboard = () => {
    return (
        <div>
            <Header />
            <AppBreadcrumbs />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Dashboard