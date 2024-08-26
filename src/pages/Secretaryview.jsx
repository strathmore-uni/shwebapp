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

const Secretaryview = () => {

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS},
    })

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/data')
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleDelete = async (_id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/data/${_id}`, {
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

            <Toaster richColors />

            <DataTable className='w-[87vw]' value={data} filters={filters} paginator stripedRows rows={7}>
                <Column field="idName" header="Name" sortable />
                <Column field="sharedString" header="ID" />
                <Column field="phone" header="Phone No." />
                <Column field="department" header="Destination" />
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
    </div>
  )
}

export default Secretaryview