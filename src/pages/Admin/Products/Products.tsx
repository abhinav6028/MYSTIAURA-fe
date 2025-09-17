import type { GridColDef } from '@mui/x-data-grid';
import CommonDataGrid from '../../../components/MuiComponents/CustomDatagrid';
import ProductHeader from './ProductHeder';
import { useProducts } from '../../../services/api/product/product';
import AdminLayout from '../../../components/layout/AdminLayout';
import { IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import AlertDialog from '../../../components/MuiComponents/CustomDialogBox';
import { useState } from 'react';
import type { Product } from '../../../types/adminTypes';
import { useDeleteProduct } from '../../../services/api/product/product';
import { useNavigate } from 'react-router-dom';

function Products() {
    const { data: userProduct } = useProducts();
    const [open, setOpen] = useState(false);
    const deleteProduct = useDeleteProduct();
    const [selectedrow, setSelectedRow] = useState<Product | null>(null);
    const navigate = useNavigate();

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
                        onClick={() => navigate(`/admin/products/${params.row.id}`)}
                    >
                        <Edit />
                    </IconButton>
                    <IconButton
                        color="error"
                        size="small"
                        onClick={() => { setOpen(true), setSelectedRow(params.row) }}
                    >
                        <Delete />
                    </IconButton>
                </div>
            ),
        },
    ];

    const rows = userProduct?.map((product) => ({
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
    }));

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        if (!selectedrow) return;
        deleteProduct.mutate(selectedrow?.id || "");
        setOpen(false);
    };

    return (
        <AdminLayout>
            <div className='w-full'>
                <ProductHeader />
                <CommonDataGrid
                    rows={rows || []}
                    columns={columns}
                    checkboxSelection
                    pageSize={5}
                    autoHeight
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

export default Products
