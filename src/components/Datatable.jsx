import React, { useState, useEffect } from 'react'
import { DataTable } from "primereact/datatable";
import { Column } from 'primereact/column';
// import { useState } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { Toaster, toast } from 'sonner'
import { searchIcon } from '../assets';

const Datatable = (refresh) => {

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS},
    })

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('https://vms.cognitron.co.ke/api/userdata')
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error('Error fetching data:', error));
    }, [refresh]);

    const handleDelete = async (_id) => {
        try {
            const response = await fetch(`https://vms.cognitron.co.ke/api/userdata/${_id}`, {
                method: 'DELETE',
            });
            const result = await response.json();
            console.log(result.message);
            toast.success(result.message);
            // Refresh data after delete
            setData(data.filter((item) => item._id !== _id));
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error('Error deleting user');
        }
    };

  return (
    <div>

        <InputText 
            onInput={(e) =>
                setFilters({
                    global: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS}
                })
            }
            
            placeholder='Search for Users'
            className='mt-[2vw] ml-[1vw] py-[0.6vw] rounded-[1.5vw] pl-[1.5vw] mb-[1.6vw] bg-background-grey'
        />

        <Toaster richColors />

        <DataTable className='w-[86.5vw]' value={data} filters={filters} paginator stripedRows placeholder='ji' rows={7}>
            <Column field="name" header="Name" sortable />
            <Column field="staffid" header="Employee ID" />
            <Column field="role" header="Role" />
            <Column field="email" header="Email" />
            <Column
                header="Actions"
                body={(rowData) => (
                    <button
                        onClick={() => handleDelete(rowData._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                        Delete
                    </button>
                )}
            />
        </DataTable>
    </div>
  )
}

export default Datatable