import LayoutContainer from '../../components/layout/LayoutContainer';
import { Files } from 'lucide-react';

export default function MyOrders() {

    const orders = [
        {
            status: "In progress",
            date: "10 May 2021",
            id: "ABC-6457325",
            title:
                "Blue & pink Silk Saree | Linen Kurta | Printed black & white short kurti & 2 more items",
            price: "₹12,500",
            image: "image url",
        }
    ];

    return (
        <LayoutContainer>
            <div className="min-h-scree p-6 flex">
                {/* Sidebar */}
                <aside className="w-64 bg-white p-4 ">
                    <nav className="space-y-3">
                        <a href="#" className="flex items-center gap-2 text-gray-700 my-5">
                            <Files className="cursor-pointer w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-5 lg:h-5" strokeWidth={1} />  My Profile
                        </a>
                        <a
                            href="#" className="flex items-center gap-2 text-[#660033] font-semibold bg-[#f1e5e8] py-4 px-2 rounded-2xl">
                            <Files className="cursor-pointer w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-5 lg:h-5" strokeWidth={1} />  My Orders
                        </a>

                        {/* <a href="#" className="flex items-center gap-2 text-gray-700 my-5">
                            <Files className="cursor-pointer w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-5 lg:h-5" strokeWidth={1} />  Customer Care
                        </a>
                        <a href="#" className="flex items-center gap-2 text-gray-700 my-5">
                            <Files className="cursor-pointer w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-5 lg:h-5" strokeWidth={1} />  Saved Cards
                        </a>
                        <a href="#" className="flex items-center gap-2 text-gray-700 my-5">
                            <Files className="cursor-pointer w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-5 lg:h-5" strokeWidth={1} />  Pending Payments
                        </a>
                        <a href="#" className="flex items-center gap-2 text-gray-700 my-5">
                            <Files className="cursor-pointer w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-5 lg:h-5" strokeWidth={1} />  Gift Cards
                        </a> */}
                    </nav>
                </aside>

                {/* Main content */}
                <main className="flex-1 ml-6">


                    {/* Tabs */}
                    <div className="flex items-center gap-3 mb-6">
                        {["All", "In Progress", "Delivered", "Cancelled"].map((tab) => (
                            <button
                                key={tab}
                                className={`px-4 py-1 rounded-full cursor-pointer border ${tab === "All"
                                    ? "bg-[#f1e5e8] text-[#660033]"
                                    : "bg-white text-gray-600 hover:bg-gray-100"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}

                    </div>

                    {/* Orders List */}
                    <div className="space-y-4">
                        {orders.map((order, idx) => (
                            <div
                                key={idx}
                                className="bg-white border border-green-100 p-4 flex items-center gap-4 hover:shadow-md transition"
                            >
                                <img
                                    src={order.image}
                                    alt={order.title}
                                    className="w-full md:w-32 h-48 md:h-40 lg:h-35 lg:w-35 object-cover bg-[#f9f9f9] rounded-md"
                                />
                                <div className="flex-1 ml-4">
                                    <div className="flex items-center gap-2 text-sm mb-1">
                                        <span
                                            className={`px-3 py-1 rounded-lg text-white text-xs ${order.status === "Delivered"
                                                ? "bg-green-500"
                                                : "bg-yellow-500"
                                                }`}
                                        >
                                            {order.status}
                                        </span>
                                        <span className=" font-medium">{order.date}</span>
                                    </div>
                                    <div className="font-semibold text-gray-800 mt-3">
                                        Order ID: {order.id}
                                    </div>
                                    <div className="text-gray-700 text-sm truncate">{order.title}</div>
                                    <div className="text-red-600 font-bold mt-1">{order.price}</div>
                                </div>
                                {/* <button className="ml-auto text-gray-400 hover:text-gray-600">
                                    ➡
                                </button> */}
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </LayoutContainer>
    )
}