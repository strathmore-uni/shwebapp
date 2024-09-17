import React, { useState, useEffect } from 'react'
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toaster, toast } from 'sonner'
import axios from 'axios';

const Additions = () => {

    const [depart, setDepart] = useState('');

    const [data, setData] = useState([]);

    console.log(data);

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS},
    })

    useEffect(() => {
        fetch('http://localhost:5000/api/departmentsdata')
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => toast.error('Error fetching data:', error));
    }, []);

    const handleSubmit = async () => {
        if (!depart) {
          toast.error("Department name is required");
          return;
        }          

        // Create an object with the state variables
        const data = {
          departmentName: depart,          
        };
    
        try {
          // Send the data to the backend
          const response = await axios.post('http://localhost:5000/api/departmentsdata', data);       
        //   console.log(response.data); // Log the response from the server
          toast.success("Department " + depart + " has been successfully added");
          setDepart('');          
        //   setRefresh(!refresh);

        } catch (error) {
          console.error('Error submitting data:', error);
          toast.error('Failed to add Department');
        }
      };    

  return (
    <div>
        <Toaster richColors />

        <div className='mt-[1vw] ml-[3vw]'>
            <div className='flex gap-[1vw]'>
                <label>
                    {/* <p className='mb-[0.2vw] ml-[0.3vw] text-[1vw]'>
                        Add Department :
                    </p> */}

                    <input type="text" placeholder='Enter Department Name' value={depart} className='text-black rounded-[0.3vw] text-[1vw] pl-[0.5vw] h-[2.5vw] w-[17vw] border-black border-[0.2vw] mb-[0.9vw]'  onChange={e => setDepart(e.target.value)} />
                </label>

                <div className='w-[7vw] border-black bg-black text-white border-[0.15vw] rounded-[0.3vw] h-[2.5vw] flex justify-center text-[1.2vw] font-semibold cursor-pointer' onClick={handleSubmit}>
                    <p className='mt-[0.36vw]'>
                        ADD
                    </p>
                </div>
            </div>

            <div className='w-[25vw]  border-black border-[0.2vw] rounded-[0.3vw] flex justify-center'>
                <InputText 
                    onInput={(e) =>
                        setFilters({
                            global: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS}
                        })
                    }
                    
                    placeholder='Search for Department'
                    className='mt-[1vw] h-[2.5vw] rounded-[0.3vw] pl-[1.5vw] w-[20vw] bg-background-grey'
                />

                <DataTable className='w-[86.5vw]' value={data} filters={filters} paginator stripedRows placeholder='ji' rows={7}>
                    <Column field="departmentName" header="Name" sortable />                   
                    
                </DataTable>
            </div>
        </div>
    </div>
  )
}

export default Additions