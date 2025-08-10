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

const Appointmentstable = ({refresh}) => {

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS},
    })

    const [data, setData] = useState([]);

    // useEffect(() => {
    //     fetch('http://localhost:5000/api/appointmentsdata')
    //     .then(response => response.json())
    //     .then(data => setData(data))
    //     .catch(error => console.error('Error fetching data:', error));
    // }, [refresh]);

    useEffect(() => {
        const fetchData = () => {
            fetch('http://localhost:5001/api/appointmentsdata')
                .then(response => response.json())
                .then(data => setData(data))
                .catch(error => console.error('Error fetching data:', error));
        };
    
        fetchData(); // Fetch immediately
    
        const interval = setInterval(fetchData, 60000); // Reload every 1 minute
    
        return () => clearInterval(interval); // Clear on unmount
    }, [refresh]);
    

    const handleDelete = async (_id) => {
        try {
            const response = await fetch(`http://localhost:5001/api/appointmentsdata/${_id}`, {
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
    <div className='overflow-x-scroll'>
        <InputText 
            onInput={(e) =>
                setFilters({
                    global: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS}
                })
            }
            
            placeholder='Search Appointments'
            className=' mt-[2vw] ml-[1vw] py-[0.6vw] rounded-[1.5vw] pl-[1.5vw] mb-[1.6vw] bg-background-grey'
        />

        <Toaster richColors />

        <DataTable className='w-[100vw]' value={data} filters={filters} paginator stripedRows placeholder='ji' rows={7}>
            <Column field="name" header="Name" />
            <Column field="AttendeeID" header="ID Number" />
            <Column field="phoneNo" header="Phone Number" />
            <Column field="eventName" header="Event/Meeting Name" />
            <Column field="eventLocation" header="Event/Meeting Location" />
            <Column field="selectedDate" header="Event/Meeting Date & Time" sortable />
            {/* <Column field="visiteemail" header="Visitee Email" /> */}
            <Column field="email" header="Email Address" />
            <Column field="status" header="status" />
            {/* <Column
                        header="Actions"
                        body={(rowData) => (
                            <button
                                onClick={() => handleDelete(rowData._id)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                            >
                                Delete
                            </button>
                        )}
                    /> */}

            <Column
                header="Actions"
                body={(rowData) => {
                    const isCheckedIn = rowData.status === 'Checked-In';
                    return (
                        <button
                            onClick={() => !isCheckedIn && handleDelete(rowData._id)}
                            disabled={isCheckedIn}
                            className={`px-3 py-1 rounded ${
                                isCheckedIn
                                    ? 'bg-gray-400 text-white cursor-not-allowed'
                                    : 'bg-red-500 text-white hover:bg-red-700'
                            }`}
                        >
                            Delete
                        </button>
                    );
                }}
            />

        </DataTable>
    </div>
  )
}

export default Appointmentstable