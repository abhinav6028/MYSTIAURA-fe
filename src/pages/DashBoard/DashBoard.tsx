import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip, LineChart, Line, CartesianGrid, Legend
} from "recharts";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { ArrowUpRight, ArrowDownRight, MoreHorizontal } from "lucide-react";
import { Paper } from "@mui/material";

export default function DashBoard() {


    const stats = [
        {
            title: "Total Sales",
            value: "$34,456.00",
            change: 14,
            isIncrease: true,
            note: "in the last month",
        },
        {
            title: "Total Order",
            value: "3,456",
            change: 17,
            isIncrease: false,
            note: "in the last month",
        },
        {
            title: "Total Revenue",
            value: "$1,456.00",
            change: 14,
            isIncrease: true,
            note: "in the last month",
        },
        {
            title: "Total Customer",
            value: "42,456",
            change: 11,
            isIncrease: false,
            note: "in the last month",
        },
    ];


    const salesData = [
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


    const data = [
        { month: "Jan", current: 12, previous: 8 },
        { month: "Feb", current: 10, previous: 14 },
        { month: "Mar", current: 14, previous: 12 },
        { month: "Apr", current: 18, previous: 10 },
        { month: "May", current: 20, previous: 16 },
        { month: "Jun", current: 22, previous: 21 },
    ];

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 90,
        },
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
        },
    ];

    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];

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
                                className={`font-semibold ${item.isIncrease ? "text-green-500" : "text-red-500"
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
                            <BarChart data={salesData}>
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
                                Current Week <span className="font-medium text-gray-800">$58,211</span>
                            </span>
                            <span className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-purple-500" />
                                Previous Week <span className="font-medium text-gray-800">$68,768</span>
                            </span>
                        </div>

                        <div className="w-full h-60">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data}>
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
                            // initialState={{ pagination: { paginationModel } }}
                            checkboxSelection
                            hideFooterPagination
                            hideFooter
                            sx={{
                                border: 0,
                                '& .MuiDataGrid-cell': {
                                    fontFamily: 'Poppins, sans-serif',
                                },
                                '& .MuiDataGrid-columnHeaders': {
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
                        {/* <h3 className="text-gray-700 font-medium text-sm">Sales Statistics</h3> */}
                        <MoreHorizontal className="w-4 h-4 text-gray-400" />
                    </div>

                    <Paper sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            checkboxSelection
                            hideFooterPagination
                            hideFooter
                            sx={{
                                border: 0,
                                '& .MuiDataGrid-cell': {
                                    fontFamily: 'Poppins, sans-serif',
                                },
                                '& .MuiDataGrid-columnHeaders': {
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
