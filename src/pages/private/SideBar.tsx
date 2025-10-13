import { Home, ShoppingCart, BarChart3, User, LogOut } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { TbCategory } from "react-icons/tb";
import logo from "../../assets/logohorizontal.svg"
import { useLogout } from "../../hooks/useLogout";

const menuItems = [
  { icon: Home, label: "Main Dashboard", path: "/admin/dashboard" },
  { icon: TbCategory, label: "category", path: "/admin/category" },
  { icon: ShoppingCart, label: "Products", path: "/admin/products" },
  { icon: BarChart3, label: "Users", path: "/admin/users" },
  { icon: User, label: "Orders", path: "/admin/orders" },
  { icon: LogOut, label: "Logout" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const logoutUser = useLogout();

  const handleItemClick = (item: typeof menuItems[number]) => {
    if (item.label === "Logout") {
      logoutUser();
      navigate("/login");
    } else if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <div className="w-64 h-screen border-r bg-white border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 py-10 mx-4">
        <img
          src={logo}
          alt="PeariGem"
          onClick={() => navigate('/')}
          className="w-35 sm:w-28 md:w-32 lg:w-40 xl:w-48 h-auto cursor-pointer"

        />
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = item.path && location.pathname.startsWith(item.path);

            return (
              <li
                key={index}
                className="relative cursor-pointer"
                onClick={() => handleItemClick(item)}
              >
                <p
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${isActive
                    ? "text-gray-900 bg-gray-50"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </p>

                {/* Active indicator */}
                {isActive && (
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-10 bg-blue-700 rounded-l-full"></div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
