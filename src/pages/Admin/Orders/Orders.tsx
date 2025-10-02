import { useState } from 'react';
import { useDeleteProduct } from '../../../services/api/product/product';
import { useNavigate } from 'react-router-dom';
import type { GridColDef } from '@mui/x-data-grid';
import type { Product } from '../../../types/adminTypes';
import { IconButton } from '@mui/material';
import { Edit, Delete } from 'lucide-react';
import AdminLayout from '../../../components/layout/AdminLayout';
import CommonDataGrid from '../../../components/MuiComponents/CustomDatagrid';
import AlertDialog from '../../../components/MuiComponents/CustomDialogBox';
import OrderHeader from './OrderHeader';
import { useOrders } from '../../../services/api/orders/orders';

function Orders() {
    const { data: orders } = useOrders();
    const [open, setOpen] = useState(false);
    const deleteProduct = useDeleteProduct();
    const [selectedrow, setSelectedRow] = useState<Product | null>(null);
    const ordersData = orders?.orders?.data?.result;
    const totalOrders = orders?.orders?.data?.total || 0;
    const navigate = useNavigate();

    const columns: GridColDef[] = [
        {
            field: "productImage",
            headerName: "Image",
            width: 80,
            renderCell: (params) =>
                params.value ? (
                    <img src={params.value} alt="product" className="w-10 h-10 object-cover rounded" />
                ) : null,
            sortable: false,
            filterable: false,
        },
        { field: "orderId", headerName: "Order ID", flex: 1, minWidth: 160 },
        { field: "productName", headerName: "First Item", flex: 1 },
        { field: "itemsCount", headerName: "Items", width: 90, type: "number" },
        {
            field: "totalAmount",
            headerName: "Amount",
            width: 120,
            renderCell: (params) => (params.value != null ? `₹${params.value}` : "-"),
        },
        {
            field: "createdAt",
            headerName: "Date",
            width: 160,
            valueFormatter: (value) => (value ? new Date(value as any).toLocaleString() : ""),
        },
        { field: "orderStatus", headerName: "Order Status", width: 140 },
        { field: "paymentStatus", headerName: "Payment", width: 110 },
        { field: "customer", headerName: "Customer", flex: 1 },
        { field: "city", headerName: "City", width: 120 },
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
                        onClick={() => navigate(`/admin/orders/${params.row.id}`)}
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

    const rows = ordersData?.map((order: any) => {
        const firstItem = order.items?.[0];
        const product = firstItem?.product;

        return {
            id: order._id,
            orderId: order._id,
            createdAt: order.createdAt,
            orderStatus: order.orderStatus,          // e.g., "confirmed"
            paymentStatus: order.payment?.status,    // e.g., "paid"
            totalAmount: order.totalAmount,          // e.g., 135
            itemsCount: order.items?.length ?? 0,
            customer: order.shippingAddress?.name,
            city: order.shippingAddress?.city,
            // For preview
            productName: product?.name,
            productImage: product?.images?.[0]?.secure_url,
            productPrice: product?.price,
        };
    });

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
                    pageSize={totalOrders || 10}
                    autoHeight
                    totalRecords={totalOrders}
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
