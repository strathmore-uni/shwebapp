import React from 'react'
import { DataTable } from "primereact/datatable";
import { Column } from 'primereact/column';
import { useState } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { searchIcon } from '../assets';

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
            
            placeholder='Search for Users'
            className=' mt-[1vw] ml-[1vw] h-[2.5vw] rounded-[1.5vw] pl-[1vw] mb-[0.5vw] bg-background-grey'
        />

        <DataTable className='w-[87vw]' value={data} filters={filters} paginator stripedRows placeholder='ji' rows={5}>
            <Column field="name" header="Name" sortable />
            <Column field="id" header="Staff Id" />
            <Column field="role" header="Role" />
            <Column field="email" header="Email" />
        </DataTable>
    </div>
  )
}

export default Datatable