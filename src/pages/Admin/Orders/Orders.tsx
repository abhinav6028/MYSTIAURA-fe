import { useState } from 'react';
import { useDeleteProduct } from '../../../services/api/product/product';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { Delete, Edit } from 'lucide-react';
import type { GridColDef } from '@mui/x-data-grid';
import type { Product } from '../../../types/adminTypes';
import AdminLayout from '../../../components/layout/AdminLayout';
import CommonDataGrid from '../../../components/MuiComponents/CustomDatagrid';
import AlertDialog from '../../../components/MuiComponents/CustomDialogBox';
import OrderHeader from './OrderHeader';
import { useOrders } from '../../../services/api/orders/orders';

function Orders() {
    const { data: useProducts } = useOrders();
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




    const rows = useProducts?.data?.products?.products?.map((product: Product) => ({
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
                <OrderHeader />
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

export default Orders
