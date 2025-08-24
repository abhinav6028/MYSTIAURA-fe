import React from 'react'
import TableUi from '../../../Components/UI/TableUi'

function Orders() {
    return (
        <div className='w-full'>
            <TableUi
                headerName="Order list"
                buttonName="Create Order"
            />
        </div>
    )
}

export default Orders
