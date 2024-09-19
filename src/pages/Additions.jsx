import React, { useState, useEffect } from 'react'
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toaster, toast } from 'sonner'
import axios from 'axios';

const Additions = () => {

    const [depart, setDepart] = useState('');
    const [badge, setBadge] = useState('');
    const [departmentRefresh, setDepartmentRefresh] = useState(false);
    const [badgesRefresh, setBadgesRefresh] = useState(false);
    const [data, setData] = useState([]);
    const [backendBadges, setBackendBadges] = useState([]);

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS},
    })

    useEffect(() => {
        fetch('http://localhost:5000/api/departmentsdata')
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => toast.error('Error fetching data:', error));
    }, [departmentRefresh]);

    useEffect(() => {
        fetch('http://localhost:5000/api/visitorsbadges')
        .then(response => response.json())
        .then(data => setBackendBadges(data))
        .catch(error => toast.error('Error fetching data:', error));
    }, [badgesRefresh]);

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
          setDepartmentRefresh(!departmentRefresh);

        } catch (error) {
          console.error('Error submitting data:', error);
          toast.error('Failed to add Department');
        }
      };
      
    const visitorBadgeSubmit = async () => {
        if (!badge) {
          toast.error("Badge name/number is required");
          return;
        }          

        // Create an object with the state variables
        const data = {
            visitorsBadge: badge,          
        };
    
        try {
          // Send the data to the backend
          const response = await axios.post('http://localhost:5000/api/visitorsbadges', data);       
        //   console.log(response.data); // Log the response from the server
          toast.success(badge + " has been successfully added");
          setBadge('');          
          setBadgesRefresh(!badgesRefresh);

        } catch (error) {
          console.error('Error submitting data:', error);
          toast.error('Failed to add Visitors Badge');
        }
      };
      
    const handleDelete = async (_id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/departmentsdata/${_id}`, {
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

    const handleVisitorBadgeDelete = async (_id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/visitorsbadges/${_id}`, {
                method: 'DELETE',
            });
            const result = await response.json();
            console.log(result.message);
            toast.success(result.message);
            // Refresh data after delete
            setBackendBadges(backendBadges.filter((item) => item._id !== _id));
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error('Error deleting user');
        }
    };

  return (
    <div>
        <Toaster richColors />

        <div className='mt-[2.5vw] ml-[3vw] flex gap-[4vw]'>
            <div>
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

                <div className='w-[25vw] overflow-x-hidden border-black border-[0.2vw] rounded-[0.3vw] flex justify-center'>
                    <div>
                        <InputText 
                            onInput={(e) =>
                                setFilters({
                                    global: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS}
                                })
                            }
                            
                            placeholder='Search for Department'
                            className='mt-[1vw] h-[2.5vw] rounded-[0.3vw] pl-[1.5vw] w-[20vw] bg-background-grey'
                        />

                        <DataTable className='w-[23vw] h-[30vw] mt-[1vw]' value={data} filters={filters} stripedRows placeholder='ji' rows={8}>
                            <Column field="departmentName" header="Department" sortable />                   
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
            </div>

            <div>
                <div className='flex gap-[1vw]'>
                    <label>
                        {/* <p className='mb-[0.2vw] ml-[0.3vw] text-[1vw]'>
                            Add Department :
                        </p> */}

                        <input type="text" placeholder='Enter Vistor Badge' value={badge} className='text-black rounded-[0.3vw] text-[1vw] pl-[0.5vw] h-[2.5vw] w-[17vw] border-black border-[0.2vw] mb-[0.9vw]'  onChange={e => setBadge(e.target.value)} />
                    </label>

                    <div className='w-[7vw] border-black bg-black text-white border-[0.15vw] rounded-[0.3vw] h-[2.5vw] flex justify-center text-[1.2vw] font-semibold cursor-pointer' onClick={visitorBadgeSubmit}>
                        <p className='mt-[0.36vw]'>
                            ADD
                        </p>
                    </div>
                </div>

                <div className='w-[25vw] overflow-x-hidden border-black border-[0.2vw] rounded-[0.3vw] flex justify-center'>
                    <div>
                        <InputText 
                            onInput={(e) =>
                                setFilters({
                                    global: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS}
                                })
                            }
                            
                            placeholder='Search for Visitor Badge'
                            className='mt-[1vw] h-[2.5vw] rounded-[0.3vw] pl-[1.5vw] w-[20vw] bg-background-grey'
                        />

                        <DataTable className='w-[23vw] h-[30vw] mt-[1vw]' value={backendBadges} filters={filters} stripedRows placeholder='ji' rows={8}>
                            <Column field="visitorsBadge" header="Visitors Badge" sortable />                   
                            <Column
                                header="Actions"
                                body={(rowData) => (
                                    <button
                                        onClick={() => handleVisitorBadgeDelete(rowData._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                )}
                            />
                        </DataTable>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Additions