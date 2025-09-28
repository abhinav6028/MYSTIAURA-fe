import Header from './Header'
import Footer from './Footer'
import { Outlet, useLocation } from 'react-router-dom'
import SideBar from './SideBar'

const Dashboard = () => {

    const pathName = useLocation()

    return (
        <div className={pathName?.pathname?.split('/').includes('admin') ? 'flex w-full h-screen' : ''}>

            {
                pathName?.pathname?.split('/').includes('admin') ? <SideBar /> : <Header />
            }

            <div
                className={`flex-1  ${pathName?.pathname?.split('/').includes('admin') ? 'bg-[#F6F6F6] overflow-y-auto' : 'md:mt-35 mt-30 lg:mt-35'}`}
            >
                <Outlet />
            </div>

            {
                !pathName?.pathname?.split('/').includes('admin') && <Footer />
            }

        </div>
    )
}

export default Dashboard