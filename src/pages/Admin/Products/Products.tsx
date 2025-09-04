import type { GridColDef } from '@mui/x-data-grid';
import CommonDataGrid from '../../../components/MuiComponents/CustomDatagrid';
import img from "../../../assets/product.jpg"
import TableUi from '../../../components/UI/TableUi';
import ProductHeader from './ProductHeder';

function Products() {

    const arrays = [
        {
            id: 1,
            name: "Casual Sunglass",
            category: "Sunglass",
            stock: "124 Low Stock",
            stockStatus: "low",
            price: "$47",
            status: "Published",
            statusColor: "bg-green-100 text-green-600",
            image: img,
        },
        {
            id: 2,
            name: "T-Shirt",
            category: "Clothes",
            stock: "124",
            stockStatus: "ok",
            price: "$47",
            status: "Published",
            statusColor: "bg-green-100 text-green-600",
            image: img,
        },
        {
            id: 3,
            name: "Green Tea",
            category: "Beauty",
            stock: "Out of Stock",
            stockStatus: "out",
            price: "$47",
            status: "Draft List",
            statusColor: "bg-gray-100 text-gray-500",
            image: img,
        },
        {
            id: 4,
            name: "Denim Shirt",
            category: "Clothes",
            stock: "124 Low Stock",
            stockStatus: "low",
            price: "$47",
            status: "Inactive",
            statusColor: "bg-red-100 text-red-500",
            image: img,
        },
        {
            id: 5,
            name: "Casual Jacket",
            category: "Clothes",
            stock: "Out of Stock",
            stockStatus: "out",
            price: "$47",
            status: "Stock Out",
            statusColor: "bg-yellow-100 text-yellow-600",
            image: img,
        },

    ];

    const columns: GridColDef[] = [
        {
          field: "image",
          headerName: "Image",
          flex: 1,
          renderCell: (params) => (
            <img
              src={params.row.image}
              alt="product"
              className="w-10 h-10 object-cover rounded"
            />
          ),
        },
        { field: "name", headerName: "Name", flex: 1 },
        { field: "category", headerName: "Category", flex: 1 },
        { field: "stock", headerName: "Stock", flex: 1 },
        { field: "price", headerName: "Price", flex: 1 },
      ];


    return (
        <div className='w-full'>
            {/* <TableUi
                headerName="Product list"
                buttonName="Create Product"
                routingPath='/admin/products/create'
                arrays={arrays}
            /> */}

          <ProductHeader />

            <CommonDataGrid
                rows={arrays}
                columns={columns}
                checkboxSelection
                pageSize={5}
                autoHeight
                onRowClick={(row) => console.log("Clicked row:", row)}
            />
        </div>
    )
}

export default Products
