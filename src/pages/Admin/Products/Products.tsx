import TableUi from '../../../Components/UI/TableUi'

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
            image: "https://via.placeholder.com/40",
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
            image: "https://via.placeholder.com/40",
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
            image: "https://via.placeholder.com/40",
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
            image: "https://via.placeholder.com/40",
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
            image: "https://via.placeholder.com/40",
        },

    ];

    return (
        <div className='w-full'>
            <TableUi
                headerName="Product list"
                buttonName="Create Product"
                routingPath='/admin/products/create'
                arrays={arrays}
            />
        </div>
    )
}

export default Products
