import React from 'react'
import TableUi from '../../../Components/UI/TableUi'

function UsersTable() {
    return (
        <div className='w-full'>
            <TableUi
                headerName="User list"
                buttonName='Create User'
                routingPath="/admin/users/create"
            />
        </div>
    )
}

export default UsersTable
