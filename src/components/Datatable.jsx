import React from 'react'
import { DataTable } from "primereact/datatable";
import { Column } from 'primereact/column';
import { useState } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

const Datatable = () => {

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS},
    })

    const data = [
        {
            id: 1,
            name: "John",
            role: "Reception",
            email: "email@address",
        },
        {
            id: 2,
            name: "Jane",
            role: "Guard",
            email: "email@address",
        },
    ];

  return (
    <div>

        <InputText 
            onInput={(e) =>
                setFilters({
                    global: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS}
                })
            }

            className='border-black border-[0.1vw]'
        />

        <DataTable value={data} filters={filters} paginator rows={5}>
            <Column field="id" header="StaffId" className='w-[5vw]' />
            <Column field="name" header="Name" className='w-[5vw]' sortable />
            <Column field="role" header="Role" className='w-[5vw]' />
            <Column field="email" header="Email" className='w-[5vw]' />
        </DataTable>
    </div>
  )
}

export default Datatable