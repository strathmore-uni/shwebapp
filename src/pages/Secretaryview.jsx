import React, { useState, useEffect } from 'react'
import { DataTable } from "primereact/datatable";
import { Column } from 'primereact/column';
// import { useState } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import Select from 'react-select';
import { Toaster, toast } from 'sonner'
import { searchIcon } from '../assets';

const Secretaryview = () => {

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS},
    })

    const [data, setData] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [displayPopup, setDisplayPopup] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [displaySelect, setDisplaySelect] = useState(false);
    // const [matchResult, setMatchResult] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/api/data')
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error('Error fetching data:', error));
    }, []);

    const confirmUser = (user) => {
        setSelectedUser(user);
        setDisplayPopup(true);
        // setMatchResult(null); // Reset match result when opening the popup
    };

    const handlePopupSubmit = () => {
        if (inputValue === selectedUser.visitorTag) {
            // If the input matches the visitorTag, handle the match
            // setMatchResult('Match found!');
            toast.success('Confirmation Successfull');
            setDisplaySelect(true);
            // setDisplayPopup(false);
            // You can add additional logic here (e.g., send data to the backend)
        } else {
            // If the input doesn't match
            // setMatchResult('No match found.');
            toast.error('Confirmation Failed');
            setInputValue(''); //Reset the input field
        }

        // Optionally close the popup or keep it open based on your needs
        
        // setInputValue(''); //Reset the input field
    };

    const renderConfirmButton = (rowData) => {
        return (
            <Button
                label="Confirm"
                onClick={() => confirmUser(rowData)}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700"
            />
        );
    };

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

    const options = [
        { value: 'inquiry', label: 'Inquiry' },
        { value: 'person', label: 'See Someone' },
      ];

      const handleChange = (selectedOption) => {
        console.log(`Selected:`, selectedOption);
        // setRole(selectedOption.value);    // .value extracts the value from the object created by react select
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
                <Column field="visitorTag" header="Tag" />
                <Column body={renderConfirmButton} header="Action" />
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
            </DataTable>
        </div>

        <Dialog
            header="Confirm Visitor"
            visible={displayPopup}
            onHide={() => setDisplayPopup(false)}
            className='w-[20vw]'
        >
            <div>
                <p className='text-[1vw] ml-[0.3vw]'>Enter Visitor's Tag Number</p>

                <InputText
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className='w-full text-black rounded-[0.3vw] text-[1vw] pl-[0.5vw] h-[2vw] border-black border-[0.2vw] mt-[0.2vw]'
                />

                {/* <div>
                    <p className='ml-[0.3vw] mt-[0.6vw] text-[1vw]'>
                        Reason for Visit :
                    </p>

                    <Select
                        options={options}
                        onChange={handleChange}
                        placeholder="Choose a role"
                        className='border-black border-[0.15vw] rounded-[0.4vw]'
                    />
                </div> */}

                {displaySelect && (
                    <div>
                        <p className='ml-[0.3vw] mt-[0.6vw] text-[1vw]'>
                            Reason for Visit :
                        </p>

                        <Select
                            options={options}
                            onChange={handleChange}
                            placeholder="Choose a role"
                            className='border-black border-[0.15vw] rounded-[0.4vw]'
                        />

                        <div>
                            <p className='ml-[0.3vw] mt-[0.6vw] text-[1vw]'>
                                Person being Visited :
                            </p>

                            <Select
                                options={options}
                                onChange={handleChange}
                                placeholder="Select Person"
                                className='border-black border-[0.15vw] rounded-[0.4vw]'
                            />
                        </div>
                    </div>
                )}

                <div className="mt-[1vw] flex justify-center">
                    <Button
                        label="Submit"
                        onClick={handlePopupSubmit}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700"
                    />
                </div>
            </div>
        </Dialog>

        {/* {matchResult && (
                <div className='mt-2'>
                    <p>{matchResult}</p>
                </div>
            )} */}
    </div>
  )
}

export default Secretaryview