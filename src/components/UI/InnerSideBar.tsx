import { CircleUser, Files, LogOut } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLogout } from '../../hooks/useLogout';

export default function InnerSideBar() {

    const navigate = useNavigate();
    const pathName = useLocation();
    const logoutUser = useLogout();


    const sideBartems = [

        {
            name: 'My Profile',
            path: '/user/myprofile',
            Icon: CircleUser
        },
        {
            name: 'My Orders',
            path: '/user/myorders',
            Icon: Files
        },
        {
            name: 'Logout',
            // path: '/user/myorders',
            Icon: LogOut
        }

    ]

      const handleLogout = async () => {
       logoutUser();
        navigate("/login");
      }

    return (
        <>
            <aside
                className="
                    w-full sm:w-64
                    bg-white 
                    px-2 
                    fixed bottom-0 left-0 right-0 
                    sm:relative 
                    border-t sm:border-t-0
                    z-100"
            >
                <nav
                    className="flex sm:flex-col justify-center sm:justify-start items-center space-x-6 sm:space-x-0 sm:space-y-2 py-2 sm:py-0"
                >
                    {sideBartems?.map((data: any, index: any) => {
                        const Icon = data?.Icon;
                        const isActive = pathName.pathname === data?.path;

                        return (
                            <button
                                key={index}
                                onClick={async () => {
                                    if(data?.name === "Logout") {
                                        await handleLogout();
                                    }
                                    navigate(data?.path)}}
                                className={` flex w-full flex-col sm:flex-row items-center sm:justify-start justify-center  px-5 sm:px-6 py-2 sm:py-3 font-semibold transition
            ${isActive ? "bg-primary text-white" : "text-primary"}
            hover:border hover:border-primary
          `}
                            >
                                <Icon className="w-6 h-6" strokeWidth={1} />
                                <p className="text-xs sm:text-base sm:ml-2 mt-1 sm:mt-0">
                                    {data?.name}
                                </p>
                            </button>
                        );
                    })}
                </nav>
            </aside>
        </>
    )
}
