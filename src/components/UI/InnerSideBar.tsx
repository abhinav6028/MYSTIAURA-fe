import { CircleUser, Files, LogOut } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function InnerSideBar() {

    const navigate = useNavigate();

    const pathName = useLocation();

    console.log("pathName", pathName.pathname);


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


    return (
        <>
            <aside className="w-64 bg-white px-2 ">
                <nav className="space-y-2 ">

                    {
                        sideBartems?.map((data: any, index: any) => {

                            const Icon = data?.Icon

                            return (
                                <button
                                    key={index}
                                    onClick={() => navigate(data?.path)}
                                    className={`px-6 py-3 font-semibold w-full transition
                                        ${pathName.pathname == data?.path ? 'bg-primary text-white ' : 'text-primary'}

                                     hover:border bover:border-primary
                                    cursor-pointer
                                    disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center
                                `}
                                >
                                    <Icon className="cursor-pointer w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-7 lg:h-7" strokeWidth={1} />

                                    <p className='ml-2'> {data?.name}</p>
                                </button>
                            )
                        }


                        )
                    }

                </nav>

            </aside>

        </>
    )
}
