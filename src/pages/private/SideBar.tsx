import { Home, ShoppingCart, BarChart3, User, Lock, Settings, Headphones } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"

export default function Sidebar() {
    const menuItems = [
        { icon: Home, label: "Main Dashboard", path: '/admin/dashboard', active: true },
        { icon: ShoppingCart, label: "Products", path: '/admin/products', active: false },
        { icon: BarChart3, label: "Users", path: '/admin/users', active: false },
        { icon: User, label: "orders", path: '/admin/orders', active: false },
        { icon: Lock, label: "Sign In", active: false },
        { icon: Settings, label: "RTL Admin", active: false },
        { icon: Settings, label: "Logout", active: false },
    ]

    const navigate = useNavigate();

    const pathName = useLocation();

    return (
        <div className="w-64 h-screen border-r bg-white border-gray-200 flex flex-col">
            {/* Header */}
            <div className="p-6 border-b  border-gray-200 py-10 mx-4">
                <h1 className="text-xl font-bold text-gray-800">
                    HORIZON <span className="font-normal text-gray-600">FREE</span>
                </h1>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {menuItems.map((item, index) => {
                        const Icon = item.icon
                        return (
                            <li key={index} className="relative cursor-pointer" onClick={() => item.path && navigate(item.path)}>
                                <p
                                    style={{ fontFamily: 'GFS Didot' }}
                                    className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${pathName?.pathname == item?.path
                                        ? "text-gray-900 bg-gray-50"
                                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                                        }`}
                                >
                                    <Icon size={20} />
                                    <span className="font-medium">{item.label}</span>
                                </p>
                                {/* Active indicator */}
                                {pathName?.pathname == item?.path && (
                                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-10 bg-blue-500 rounded-l-full"></div>
                                )}
                            </li>
                        )
                    })}
                </ul>
            </nav>

        </div>
    )
}