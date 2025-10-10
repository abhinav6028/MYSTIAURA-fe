import LayoutContainer from '../../components/layout/LayoutContainer';
import InnerSideBar from '../../components/UI/InnerSideBar';
import { useOrderedList } from '../../services/api/orders/orders';
import type { OrderType } from '../../types/orderHistory';

export default function MyOrders() {

    const { data: orderList } = useOrderedList();
    console.log(orderList);


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
            <div className="min-h-scree md:p-6 flex">
                {/* Sidebar */}
                <InnerSideBar />

                {/* Main content */}
                <main className="flex-1 w-full sm:ml-6 px-2 sm:px-0">
                    {/* Tabs */}
                    <div className="w-full overflow-x-auto scrollbar-hide">
                        <div className="flex items-center gap-3 min-w-max px-2">
                            {["All", "In Progress", "Delivered", "Cancelled"].map((tab) => (
                                <button
                                    key={tab}
                                    className={`px-4 py-1 rounded-full border whitespace-nowrap cursor-pointer transition-colors ${tab === "All"
                                        ? "bg-[#f1e5e8] text-[#660033]"
                                        : "bg-white text-gray-600 hover:bg-gray-100"
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Orders List */}
                    <div className="space-y-4 mt-3">
                        {orders.map((order, idx) => (
                            <div
                                key={idx}
                                className="bg-white border border-green-100 p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 hover:shadow-md transition rounded-md overflow-hidden"
                            >
                                {/* ✅ Responsive image */}
                                <img
                                    src={order.image}
                                    alt={order.title}
                                    className="w-full sm:w-32 h-48 sm:h-36 object-cover bg-[#f9f9f9] rounded-md"
                                />

                                {/* ✅ Order content */}
                                <div className="flex-1">
                                    <div className="flex flex-wrap items-center gap-2 text-sm mb-1">
                                        <span
                                            className={`px-3 py-1 rounded-lg text-white text-xs ${order.status === "Delivered" ? "bg-green-500" : "bg-yellow-500"
                                                }`}
                                        >
                                            {order.status}
                                        </span>
                                        <span className="font-medium text-gray-600">{order.date}</span>
                                    </div>
                                    <div className="font-semibold text-gray-800 mt-2 sm:mt-3">
                                        Order ID: {order.id}
                                    </div>
                                    <div className="text-gray-700 text-sm truncate">{order.title}</div>
                                    <div className="text-red-600 font-bold mt-1">{order.price}</div>
                                </div>
                            </div>
                        ))}

                        {Array.isArray(orderList) && orderList?.map((order : OrderType , idx: number) => (
                            <div
                                key={idx}
                                className="bg-white border border-green-100 p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 hover:shadow-md transition rounded-md overflow-hidden"
                            >
                                {/* ✅ Responsive image */}

                                <div className='grid grid-cols-1'>
                                    {
                                        order.items?.map((item: any) => (
                                            <img
                                                src={item.product.images[0].secure_url}
                                                alt={item.product.name}
                                                className="w-full sm:w-32 h-48 sm:h-36 object-cover bg-[#f9f9f9] rounded-md"
                                            />
                                        ))
                                    }
                                </div>
                                {/* ✅ Order content */}
                                <div className="flex-1">
                                    <div className="flex flex-wrap items-center gap-2 text-sm mb-1">
                                        <span
                                            className={`px-3 py-1 rounded-lg text-white text-xs ${order.orderStatus === "Delivered" ? "bg-green-500" : "bg-yellow-500"
                                                }`}
                                        >
                                            {order.orderStatus}
                                        </span>
                                        <span className="font-medium text-gray-600">{new Date(order.createdAt).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        })}</span>
                                    </div>
                                    <div className="font-semibold text-gray-800 mt-2 sm:mt-3">
                                        Order ID: {order._id}
                                    </div>
                                    <div className="text-gray-700 text-sm truncate">{order.items?.map((item: any) => item.product.name).join(" | ")}</div>
                                    <div className="text-red-600 font-bold mt-1">₹{order.totalAmount}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>

            </div>
        </LayoutContainer>
    )
}