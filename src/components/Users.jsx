import React from 'react'
import { plusImage } from '../assets'
import Table from './Table'
import Datatable from './Datatable';

const Users = () => {

    const columns = [
        {
          Header: 'StaffID',
          accessor: 'id',
        },
        {
          Header: 'Name',
          accessor: 'name',
        },
        {
          Header: 'Age',
          accessor: 'age',
        },
        {
            Header: 'Role',
            accessor: 'role',
        },
        {
            Header: 'Email',
            accessor: 'email',
        },       
      ];
    
      const data = [
        { id: 1, name: 'John Doe', age: 28, role: 'Receptionist', email: 'emai@address' },
        { id: 2, name: 'Jane Smith', age: 34, role: 'Guard', email: 'emai@address' },
        { id: 3, name: 'Sam Johnson', age: 45, role: 'Guard', email: 'emai@address' },
      ];

  return (
    <div>
        <div>
            <div className='w-[11vw] absolute right-[1vw] mt-[0.7vw] border-kenya-green border-[0.2vw] rounded-[0.3vw] h-[2.5vw] text-kenya-green flex pl-[0.8vw] gap-[2vw] text-[1.2vw] font-semibold mb-[0.5vw]'>
                <img src={plusImage} className='h-[1.3vw] mt-[0.5vw]' />

                <p className='mt-[0.22vw]'>
                    Add User
                </p>
            </div>

            {/* <Table columns={columns} data={data} /> */}
            <Datatable />
        </div>
    </div>
  )
}

export default Users