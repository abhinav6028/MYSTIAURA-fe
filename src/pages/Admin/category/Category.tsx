import { Button, IconButton, TextField } from "@mui/material"
import AdminLayout from "../../../components/layout/AdminLayout";
import CommonDataGrid from "../../../components/MuiComponents/CustomDatagrid";
import { type GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCategories, useDeleteCategory } from "../../../services/api/category/category";
import { Delete, Edit } from "@mui/icons-material";
import AlertDialog from "../../../components/MuiComponents/CustomDialogBox";
import type { Category } from "../../../types/adminTypes";

const Category = () => {

    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();
    const { data: category } = useCategories({ search: searchText });
    const [open, setOpen] = useState(false);
    const deleteCategory = useDeleteCategory();
    const [selectedrow,setSelectedRow] = useState<Category | null>(null);

    const columns: GridColDef[] = [
        { field: "sno", headerName: "S.No", width: 90 },
        {
            field: "image",
            headerName: "Image",
            flex: 1,
            renderCell: (params) => (
                <img
                    src={params.row?.image?.secure_url || ""}
                    alt={params.row.name}
                    className="w-12 h-12 object-cover rounded-md"
                />
            ),
        },
        { field: "name", headerName: "Name", flex: 1 },
        { field: "description", headerName: "Description", flex: 2 },
        {
            field: "actions",
            headerName: "Actions",
            width: 120,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <div className="flex gap-2">
                    <IconButton
                        color="primary"
                        size="small"
                        onClick={() => navigate(`/admin/category/${params.row._id}`)}
                    >
                        <Edit />
                    </IconButton>
                    <IconButton
                        color="error"
                        size="small"
                        onClick={() => {setOpen(true), setSelectedRow(params.row)}}
                    >
                        <Delete />
                    </IconButton>
                </div>
            ),
        },
    ];

    const rows = (category || []).map((cat, index) => ({
        ...cat,
        id: cat._id,
        sno: index + 1,
    }));

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
      };
    
      const handleDelete = () => {
        if (!selectedrow) return;
        deleteCategory.mutate(selectedrow?._id);
        setOpen(false);
      };

    return (
        <AdminLayout>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Category</h1>
                <Button variant="contained" onClick={() => navigate('/admin/category/create')}>Add Category</Button>
            </div>
            {/* search bar */}
            <div className="my-4">
                <TextField
                    label="Search Categories"
                    variant="outlined"
                    size="small"
                    value={searchText}
                    onChange={handleSearch}
                    sx={{ maxWidth: 200 }}
                />
            </div>
            {/* table */}
            <div>
                <CommonDataGrid
                    rows={rows}
                    columns={columns}
                    checkboxSelection={false}
                    autoHeight
                    pageSize={5}
                />
            </div>

            {/* Delete Dialog Box */}
            <AlertDialog
                btnname1="Delete"
                btnname2="Cancel"
                title="Delete Category"
                description={selectedrow?.name || "category"}
                open={open}
                onClose={handleClose}
                btn2Func={handleDelete}
            />
        </AdminLayout>
    )
}

export default Category;
