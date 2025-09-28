import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip, LineChart, Line, CartesianGrid, Legend
} from "recharts";
import { ArrowUpRight, ArrowDownRight, MoreHorizontal } from "lucide-react";
import { Paper } from "@mui/material";
import { useDashBoardLatestOrders, useDashBoardLatestProducts, useDashBoardStatus } from "../../services/api/dashboard/dashboard";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import type { Product } from "../../types/adminTypes";

export default function DashBoard() {

    const { data } = useDashBoardStatus()

    const { data: latestProducts } = useDashBoardLatestProducts()

    const { data: latestOrders } = useDashBoardLatestOrders()
    console.log("latestProducts", latestOrders?.data?.data);


    const stats = [
        {
            title: "Total Sales",
            value: data ? `₹${data?.data?.data?.totalSales}` : 0,
            change: 14,
            isIncrease: true,
            note: "in the last month",
        },
        {
            title: "Total Order",
            value: data ? `₹${data?.data?.data?.totalOrders}` : 0,
            change: 17,
            isIncrease: false,
            note: "in the last month",
        },
        {
            title: "Total Revenue",
            value: data ? `₹${data?.data?.data?.totalRevenue}` : 0,
            change: 14,
            isIncrease: true,
            note: "in the last month",
        },
        {
            title: "Total Customer",
            value: data ? `₹${data?.data?.data?.totalCustomers}` : 0,
            change: 11,
            isIncrease: false,
            note: "in the last month",
        },
    ];


    const salesData1 = [
        { date: "Apr 21", sales: 2000 },
        { date: "Apr 22", sales: 2500 },
        { date: "Apr 23", sales: 1800 },
        { date: "Apr 24", sales: 4500 },
        { date: "Apr 25", sales: 2300 },
        { date: "Apr 26", sales: 2800 },
        { date: "Apr 27", sales: 2400 },
        { date: "Apr 28", sales: 4500 },
        { date: "Apr 29", sales: 2300 },
        { date: "Apr 30", sales: 2800 },
        { date: "Apr 31", sales: 2400 },
    ];


    const data1 = [
        { month: "Jan", current: 12, previous: 8 },
        { month: "Feb", current: 10, previous: 14 },
        { month: "Mar", current: 14, previous: 12 },
        { month: "Apr", current: 18, previous: 10 },
        { month: "May", current: 20, previous: 16 },
        { month: "Jun", current: 22, previous: 21 },
    ];

    const columns: GridColDef[] = [
        {
            field: "images",
            headerName: "Image",
            flex: 1,
            renderCell: (params) => (
                <img
                    src={params.row.images}
                    alt="product"
                    className="w-10 h-10 object-cover rounded"
                />
            ),
        },
        { field: "name", headerName: "Name", flex: 1 },
        { field: "category", headerName: "Category", flex: 1 },
        { field: "stock", headerName: "Stock", flex: 1 },
        { field: "price", headerName: "Price", flex: 1 },
        { field: "status", headerName: "Status", flex: 1 },

    ];


    const columns1: GridColDef[] = [
        {
            field: "images",
            headerName: "Image",
            flex: 1,
            renderCell: (params) => (
                <img
                    src={params.row.images}
                    alt="product"
                    className="w-10 h-10 object-cover rounded"
                />
            ),
        },
        { field: "name", headerName: "Name", flex: 1 },
        { field: "category", headerName: "Category", flex: 1 },
        { field: "stock", headerName: "Stock", flex: 1 },
        { field: "price", headerName: "Price", flex: 1 },
        { field: "status", headerName: "Status", flex: 1 },
      
    ];

    const rows = latestProducts?.data?.data.map((product: Product) => ({
        id: product._id,
        name: product.name,
        category: product.category?.name,
        stock: product.stock,
        price: product.price,
        images: product.images?.[0]?.secure_url,
        description: product.description,
        material: product.material,
        discountType: product.discountType,
        discountPrice: product.discountPrice,
        categoryDetails: product.category,
        imageContainer: product.images,
        status: product?.status
    }));

    const row1 = latestOrders?.data?.data.map((product: Product) => ({
        id: product._id,
        name: product?.shippingAddress?.name,
        category: product.category?.name,
        stock: product.stock,
        price: product.price,
        images: product.images?.[0]?.secure_url,
        description: product.description,
        material: product.material,
        discountType: product.discountType,
        discountPrice: product.discountPrice,
        categoryDetails: product.category,
        imageContainer: product.images,
        status: product?.status
    }));



    return (
        <div className='bg-[#F6F6F6]'>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 p-4">
                {stats.map((item, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-sm shadow-sm p-5 flex flex-col justify-between"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <h3 className="text-gray-600 text-sm font-medium">{item.title}</h3>
                            <MoreHorizontal className="w-4 h-4 text-gray-400" />
                        </div>

                        {/* Value */}
                        <div className="mt-3 text-2xl font-bold text-gray-900">
                            {item.value}
                        </div>

                        {/* Change Info */}
                        <div className="flex items-center gap-2 mt-3 text-sm">
                            {item.isIncrease ? (
                                <ArrowUpRight className="text-green-500 w-4 h-4" />
                            ) : (
                                <ArrowDownRight className="text-red-500 w-4 h-4" />
                            )}
                            <span
                                className={`font-semibold ₹{item.isIncrease ? "text-green-500" : "text-red-500"
                                    }`}
                            >
                                {item.change}%
                            </span>
                            <span className="text-gray-500 font-semibold">{item.note}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2 p-4">
                {/* Sales Statistics */}
                <div className="bg-white rounded-sm shadow-sm p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Revenue</h2>
                        {/* <h3 className="text-gray-700 font-medium text-sm">Sales Statistics</h3> */}
                        <MoreHorizontal className="w-4 h-4 text-gray-400" />
                    </div>

                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={salesData1}>
                                <XAxis dataKey="date" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip />
                                <Bar dataKey="sales" fill="#7c3aed" radius={[2, 2, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className='bg-white rounded-sm shadow-sm'>
                    <div className=" p-6  w-full">
                        {/* <h2 className="text-lg font-semibold text-gray-800 mb-4">Revenue</h2> */}
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Orders</h2>

                        <div className="text-sm text-gray-600 flex gap-6 mb-4">
                            <span className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-green-500" />
                                Current Week <span className="font-medium text-gray-800">₹58,211</span>
                            </span>
                            <span className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-purple-500" />
                                Previous Week <span className="font-medium text-gray-800">₹68,768</span>
                            </span>
                        </div>

                        <div className="w-full h-60">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data1}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                                    <YAxis tick={{ fontSize: 12 }} />
                                    <Tooltip />
                                    <Legend wrapperStyle={{ outline: "none" }} />
                                    <Line
                                        type="monotone"
                                        dataKey="current"
                                        stroke="#22c55e"
                                        strokeWidth={3}
                                        dot={false}
                                        activeDot={false}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="previous"
                                        stroke="#8b5cf6"
                                        strokeWidth={3}
                                        dot={false}
                                        activeDot={false}
                                    />
                                </LineChart>
                            </ResponsiveContainer>

                        </div>
                    </div>
                </div>
            </div>


            <div className="grid gap-6 md:grid-cols-2 p-4">
                {/* Sales Statistics */}
                <div className="bg-white rounded-sm shadow-sm p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Latest Products</h2>
                        {/* <h3 className="text-gray-700 font-medium text-sm">Sales Statistics</h3> */}
                        <MoreHorizontal className="w-4 h-4 text-gray-400" />
                    </div>

                    <Paper sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            hideFooterPagination
                            hideFooter
                            sx={{
                                border: 0,
                                '& .MuiData1Grid-cell': {
                                    fontFamily: 'Poppins, sans-serif',
                                },
                                '& .MuiData1Grid-columnHeaders': {
                                    fontFamily: 'Poppins, sans-serif',
                                    fontWeight: 600,
                                },
                            }}
                        />
                    </Paper>
                </div>

                <div className="bg-white rounded-sm shadow-sm p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Latest Orders</h2>
                        <MoreHorizontal className="w-4 h-4 text-gray-400" />
                    </div>

                    <Paper sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={row1}
                            columns={columns1}
                            hideFooterPagination
                            hideFooter
                            sx={{
                                border: 0,
                                '& .MuiData1Grid-cell': {
                                    fontFamily: 'Poppins, sans-serif',
                                },
                                '& .MuiData1Grid-columnHeaders': {
                                    fontFamily: 'Poppins, sans-serif',
                                    fontWeight: 600,
                                },
                            }}
                        />
                    </Paper>
                </div>
            </div>



        </div>

    )
}
