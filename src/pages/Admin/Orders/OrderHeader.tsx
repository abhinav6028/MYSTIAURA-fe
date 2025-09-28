import { useState } from "react";
import { TextField, Button, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Dayjs } from "dayjs";
import { useNavigate } from "react-router-dom";

export default function OrderHeader() {
    // Controlled inputs
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);
    const navigate = useNavigate();

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    return (
        <div className="bg-white  rounded-md space-y-4">
            {/* Top Row: Title and Create Button */}
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold">Order List</h1>
                <Button style={{ fontFamily: 'Poppins, sans-serif' }} variant="contained" color="primary" onClick={() => navigate('/admin/products/create')}>
                    Create Order
                </Button>
            </div>

            {/* Filters Row */}
            <div className="flex gap-4 items-end justify-between pb-4">
                {/* Search Input */}
                <TextField
                    label="Search"
                    variant="outlined"
                    size="small"
                    value={search}
                    sx={{ width: 300 }}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div className="flex gap-4">
                    {/* Date Range Picker */}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Start Date"
                            value={startDate}
                            onChange={(newValue) => setStartDate(newValue)}
                            slotProps={{
                                textField: { size: "small" },
                            }}
                        />
                        <DatePicker
                            label="End Date"
                            value={endDate}
                            onChange={(newValue) => setEndDate(newValue)}
                            slotProps={{
                                textField: { size: "small" },
                            }}
                        />
                    </LocalizationProvider>

                    {/* Status Dropdown */}
                    <FormControl size="small">
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            label="Status"
                            sx={{ minWidth: 120 }}
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="active">Active</MenuItem>
                            <MenuItem value="inactive">Inactive</MenuItem>
                            <MenuItem value="pending">Pending</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
        </div>
    );
};