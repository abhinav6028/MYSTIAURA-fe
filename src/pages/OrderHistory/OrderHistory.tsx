import LayoutContainer from '../../components/layout/LayoutContainer';
import InnerSideBar from '../../components/UI/InnerSideBar';
import { useOrderedList } from '../../services/api/orders/orders';
import type { OrderType } from '../../types/orderHistory';

export default function MyOrders() {

    const { data: orderList } = useOrderedList();

    // const dwUrl = "https://res.cloudinary.com/dge7us2fl/image/upload/v1764339211/invoices/eqj4l3342pv9owynfdx9.pdf"

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
                        {Array.isArray(orderList) && orderList?.map((order: OrderType, idx: number) => (
                            <div
                                key={idx}
                                className="bg-white border border-green-100 p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 hover:shadow-md transition rounded-md overflow-hidden"
                            >
                                {/* ✅ Responsive image */}

                                <div
                                    className={`grid w-full sm:w-32 h-48 sm:h-36 gap-1
                                        ${order.items?.length === 1
                                            ? "grid-cols-1 grid-rows-1"
                                            : order.items?.length === 2
                                                ? "grid-cols-1 grid-rows-2"
                                                : order.items?.length === 3
                                                    ? "grid-cols-2 grid-rows-2"
                                                    : "grid-cols-2 grid-rows-2"
                                        }
                                    `}
                                >
                                    {order.items?.slice(0, 4).map((item: any, idx: number) => (
                                        <img
                                            key={idx}
                                            src={item.product.images[0].secure_url}
                                            alt={item.product.name}
                                            className={`
                                                object-cover bg-[#f9f9f9] rounded-md w-full h-full
                                                ${order.items?.length === 3 && idx === 2
                                                    ? "col-span-2" // last image spans full width
                                                    : ""
                                                }
                                            `}
                                        />
                                    ))}
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

                                {
                                    order?.invoice_url &&

                                    <div>
                                        <button
                                            onClick={() => {
                                                const dwUrl = order?.invoice_url;

                                                const link = document.createElement("a");
                                                link.href = dwUrl;
                                                link.download = "invoice.pdf"; // Name of the file when saved
                                                document.body.appendChild(link);
                                                link.click();
                                                document.body.removeChild(link);
                                            }}
                                            className="bg-[#660033] text-white font-semibold py-2 px-3 cursor-pointer hover:bg-[#51052b] transition"
                                        >
                                            INVOICE
                                        </button>
                                        {/* <button
                                        className=" bg-[#660033] text-white font-semibold py-2 px-3 cursor-pointer hover:bg-[#51052b] transition"
                                    >
                                        INVOICE
                                    </button> */}
                                    </div>
                                }
                            </div>

                        ))}
                    </div>
                </main>

            </div>
        </LayoutContainer>
    )
}