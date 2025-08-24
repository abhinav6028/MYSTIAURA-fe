import React, { useState } from 'react';
import { Calendar, ChevronDown, Pencil, Plus } from "lucide-react";
import DatePicker from "react-datepicker";
import { TablePagination } from "@mui/material";
import { useLocation, useNavigate } from 'react-router-dom';

function TableContent({ arrays }: { arrays?: Array }) {

    const [startDate, setStartDate] = useState<Date | undefined>(undefined);
    const [endDate, setEndDate] = useState<Date | undefined>(undefined)

    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("Status");

    const options = ["Active", "Inactive", "Pending"];

    const [page, setPage] = useState(2);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const navigate = useNavigate()

    const pathName = useLocation().pathname

    return (
        <div className="p-6 bg-white rounded-lg shadow">
            {/* Search and Filters */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search"
                    className="border border-gray-300 rounded-sm px-4 h-8 w-50 focus:outline-none focus:ring-0 font-semibold placeholder:font-semibold"
                />

                <div className="flex gap-2 items-center">
                    <div className="flex items-center gap-2 border border-gray-300 rounded-sm px-4 h-8 cursor-pointer">
                        <Calendar size={16} className="text-gray-500" />
                        <DatePicker
                            placeholderText="select Date Range"
                            selected={startDate}
                            onChange={(dates) => {
                                const [start, end] = dates;
                                setStartDate(start);
                                setEndDate(end);
                            }}
                            startDate={startDate}
                            endDate={endDate}
                            selectsRange
                            dateFormat="dd MMM yyyy"
                            className="bg-transparent text-gray-700 font-medium w-fit focus:outline-none h-full text-bold"
                        />
                        <ChevronDown size={16} className="text-gray-500" />
                    </div>

                    <div className="relative inline-block ">

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex items-center gap-2 h-8 border border-gray-300 rounded-sm px-4 text-gray-700 font-medium hover:border-gray-500 transition"
                        >
                            {selected}
                            <ChevronDown size={16} className="text-gray-500" />
                        </button>

                        {isOpen && (
                            <div className="absolute mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-md z-10">
                                {options.map((option) => (
                                    <div
                                        key={option}
                                        onClick={() => {
                                            setSelected(option);
                                            setIsOpen(false);
                                        }}
                                        className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                                    >
                                        {option}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </div>

            {
                !arrays || arrays.length == 0 ?

                    <div className='w-full flex flex-col items-center justify-center py-3'>
                        <p className='text-[20px]'>Data not found</p>
                        <button
                            onClick={() => {
                                if (pathName?.split('/').length === 3) {
                                    navigate(`${pathName}/create`);
                                }
                            }}
                            type="submit"
                            className="text-white cursor-pointer bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none flex items-center"
                        >
                            <Plus className="mr-2" size={18} />  Add New Item
                        </button>
                    </div>

                    :

                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-600 uppercase">
                                <th className="p-4">
                                    <input type="checkbox" />
                                </th>
                                <th className="p-4">Product Name</th>
                                <th className="p-4">Category</th>
                                <th className="p-4">Stock</th>
                                <th className="p-4">Price</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {arrays.map((items, index) => (
                                <tr key={items.id} className="border-b border-gray-300 hover:bg-gray-50">
                                    <td className="p-4">
                                        <input type="checkbox" />
                                    </td>
                                    <td className="p-3 flex items-center gap-3 text-sm">
                                        <img
                                            src='https://images.unsplash.com/photo-1600721391776-b5cd0e0048f9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8amV3ZWxyeXxlbnwwfHwwfHx8MA%3D%3D'
                                            alt={items.name}
                                            className="w-10 h-10 rounded"
                                        />
                                        {items.name}
                                    </td>
                                    <td className="p-4 text-sm">{items.category}</td>
                                    <td
                                        className={`p-4 text-sm ${items.stockStatus === "out"
                                            ? "text-red-600"
                                            : items.stockStatus === "low"
                                                ? "text-yellow-600"
                                                : ""
                                            }`}
                                    >
                                        {items.stock}
                                    </td>
                                    <td className="p-4 text-sm">{items.price}</td>
                                    <td className="p-4 text-sm">
                                        <span
                                            className={`px-3 py-1 text-sm rounded-full ${items.statusColor}`}
                                        >
                                            {items.status}
                                        </span>
                                    </td>
                                    <td className="p-4">...</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

            }

            {/* Table */}


            <div className="flex justify-end items-center mt-4 text-sm text-gray-600 ">
                <TablePagination
                    component="div"
                    count={100}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>
        </div>
    )
}

export default TableContent
