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
    const [personSelected, setpersonSelected] = useState(false);
    const [shoowButton, setshoowButton] = useState(true);
    const [shoowSecondButton, setshoowSecondButton] = useState(false);
    const [notification, setnotification] = useState('');
    const [clearedRows, setClearedRows] = useState({});
    const [reload, setReload] = useState(true);
    // const [matchResult, setMatchResult] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5001/api/data')
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error('Error fetching data:', error));
    }, [reload]);

    useEffect(() => {
        const interval = setInterval(() => {
          setReload(prev => !prev); // Toggle reload state every 5 minutes
        }, 300000); // 300,000 ms = 5 minutes
      
        return () => clearInterval(interval); // Clean up interval on unmount
      }, []);
      

    const confirmUser = (user) => {
        setSelectedUser(user);
        setDisplayPopup(true);
        // setMatchResult(null); // Reset match result when opening the popup
    };

    const handlePopupSubmit = () => {
        if (inputValue === selectedUser.visitorTag) {            
            toast.success('Cleared');
            setReload(!reload);
            setshoowButton(false);
            setshoowSecondButton(true);
            setDisplaySelect(true);            
            // setDisplayPopup(false);
            
            setClearedRows(prev => ({
                ...prev,
                [selectedUser._id]: true // Assuming each row has a unique 'id'
            }));

            const clearedData = {
                cleared: true, // Pass the cleared status
            };
            
            fetch(`http://localhost:5001/api/data/${selectedUser._id}`, {
                method: 'PUT', // Use PUT method to update data
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(clearedData), // Only send the fields that you want to update
            })
            .then(response => response.json())
            .then(data => console.log('Data updated:', data))
            .catch(error => console.error('Error:', error));
            

        } else {            
            toast.error('Confirmation Failed');
            setInputValue(''); //Reset the input field
        }
    };

    const handleSecondaryPopupSubmit = () => {
        toast.success("Notification sent to " + notification);
        setInputValue('');
        setDisplaySelect(false);
        setpersonSelected(false);
        setshoowButton(true);
        setshoowSecondButton(false);
        setDisplayPopup(false);
    };

    const renderConfirmButton = (rowData) => {

        // const isCleared = clearedRows[rowData._id]; // Check if the row is cleared

        // Parse the 'cleared' field which is stored as a string ("true" or "false")
        const isCleared = rowData.cleared === "true"; // Convert the string to a boolean

        return (
            // <Button
            //     label="Confirm"
            //     onClick={() => confirmUser(rowData)}
            //     className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700"
            // />

            <Button
                label={isCleared ? "Cleared" : "Confirm"}
                onClick={() => confirmUser(rowData)}
                className={isCleared ? "p-button-secondary" : "bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-700"}
                disabled={isCleared} // Disable the button if cleared
            />
        );
    };

    const handleDelete = async (_id) => {
        try {
            const response = await fetch(`http://localhost:5001/api/data/${_id}`, {
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

    const peopleOptions = [
      { value: 'john', label: 'John' },
      { value: 'jane', label: 'Jane' },
    ];

    const handleChange = (selectedOption) => {
    //   console.log(`Selected:`, selectedOption);
      if ('person' === selectedOption.value) {
          setpersonSelected(true);     
      } else {
          setpersonSelected(false); 
      }        
    };

    const handlePersonChange = (selectedOption) => {
        // toast.success("Notification sent to " + selectedOption.label);
        setnotification(selectedOption.label);
        };
    

  return (
    <div className='pt-[6vw] pl-[14vw]'>
        <div>
            <InputText 
                onInput={(e) =>
                    setFilters({
                        global: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS}
                    })
                }
                
                placeholder='Search for Visitors'
                className=' mt-[2vw] ml-[1vw] py-[0.6vw] rounded-[1.5vw] pl-[1.5vw] mb-[1.6vw] bg-background-grey'
            />

            <Toaster richColors />

            <DataTable className='w-[86.5vw]' value={data} filters={filters} paginator stripedRows rows={7}>
                <Column field="idName" header="Name" sortable />
                {/* <Column field="sharedString" header="ID" /> */}
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
            header="Clear Visitor"
            visible={displayPopup}
            onHide={() => setDisplayPopup(false)}
            className='w-[20vw] h-[25vw]'
        >
            <div>
                <p className='text-[1vw] ml-[0.3vw]'>Enter Visitor's Badge Number</p>

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
                            placeholder="Select reason for visit"
                            className='border-black border-[0.15vw] rounded-[0.4vw]'
                        />

                        {personSelected && (
                            <div>
                                <p className='ml-[0.3vw] mt-[0.6vw] text-[1vw]'>
                                    Person being Visited :
                                </p>

                                <Select
                                    options={peopleOptions}
                                    onChange={handlePersonChange}
                                    placeholder="Select Person"
                                    className='border-black border-[0.15vw] rounded-[0.4vw]'
                                />
                            </div>
                        )}
                    </div>
                )}

                <div className="mt-[1vw] flex justify-center">
                    {shoowButton && (
                        <Button
                            label="Submit"
                            onClick={handlePopupSubmit}
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700"
                        />
                    )}

                    {shoowSecondButton && (
                        <Button
                            label="Submit"
                            onClick={handleSecondaryPopupSubmit}
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700"
                        />
                    )}
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