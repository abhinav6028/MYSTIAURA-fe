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
import useDebounce from '../../../utilsComp/useDeounce';

function Products() {
    const [open, setOpen] = useState(false);
    const deleteProduct = useDeleteProduct();
    const [selectedrow, setSelectedRow] = useState<Product | null>(null);
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const { data: userProduct } = useProducts({ search: useDebounce(searchText), page, limit });
    const products = userProduct?.data?.products?.products ?? [];
    const totalProducts = userProduct?.data?.products?.count;

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
    
    // const startIndex = (page - 1) * limit;
    const rows = products?.map((product: Product) => ({
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

    const handlePaginationChange = (newPage: number, newPageSize: number) => {
        if (newPageSize !== limit) {
            setLimit(newPageSize); // update page size
            setPage(1); // reset page to first
          } else {
            setPage(newPage); // normal page change
          }
      };


    return (
        <AdminLayout>
            <div className='w-full'>
                <ProductHeader
                    search={searchText}
                    onSearch={(val: string) => {
                        setSearchText(val);
                        setPage(1);
                    }}
                />
                <CommonDataGrid
                    rows={rows || []}
                    columns={columns}
                    checkboxSelection
                    page={page}
                    pageSize={limit}
                    totalRecords={totalProducts}
                    onPaginationChange={handlePaginationChange}
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
