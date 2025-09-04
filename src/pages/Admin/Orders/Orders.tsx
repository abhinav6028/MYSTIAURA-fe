import TableUi from '../../../components/UI/TableUi'

function Orders() {
    return (
        <div className='w-full'>
            <TableUi
                headerName="Order list"
                buttonName="Create Order"
                routingPath="/admin/orders/create"
            />
        </div>
    )
}

export default Orders
