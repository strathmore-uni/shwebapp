import React, { useState } from 'react'
import Select from 'react-select';
import axios from 'axios';
import { Toaster, toast } from 'sonner'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Addappointment = ({setShowUsersForm, refresh, setRefresh}) => {

    const [userName, setUserName] = useState('');
    const [visiteemail, setVisiteemail] = useState('');
    const [email, setEmail] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);

    console.log(selectedDate);
    // const [toastResponse, setToastResponse] = useState('');

    const handleSubmit = async () => {

        if (!userName) {
            // alert("Name is required");
            toast.error('Name is required');
            return;
          }
        if (!selectedDate) {
          // alert("Name is required");
          toast.error('Date is required');
          return;
        }
        if (!email) {
          // alert("Email is required");
          toast.error("Visitor's Email address is required");
          return;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
          toast.error("Visitor's Email address is invalid");
          return;
        }
        if (!visiteemail) {
          toast.error("Visitee Email is required");
          return;
        } else if (!/\S+@\S+\.\S+/.test(visiteemail)) {
          toast.error("Visitee Email address is invalid");
          return;
        }

        // const formattedDate = selectedDate.toString();
        const dateString = selectedDate.toString();
        const formattedDate = dateString.split('GMT')[0].trim().slice(0, -3); // This removes the 'GMT+0300 (East Africa Time)' part and also the seconds

        // Create an object with the state variables
        const data = {
          name: userName,
          visiteemail: visiteemail,
          email: email,
          selectedDate: formattedDate,
        };
    
        try {
          // Send the data to the backend
          const response = await axios.post('http://localhost:5000/api/appointmentsdata', data);
        //   setToastResponse(response.data);
          console.log(response.data); // Log the response from the server
          toast.success(response.data);
          setUserName('');
          setVisiteemail('');
          setEmail('');
          setSelectedDate(null);
          setRefresh(!refresh);

        } catch (error) {
          console.error('Error submitting data:', error);
          toast.error('Failed to create a new user');
        }
      };

    const handleClick = () => {
      setShowUsersForm(false);
    };

  return (
    <div>
        <div className='w-screen h-screen absolute left-[0vw] top-[0vw] flex justify-end'>
            <div className='w-screen h-screen bg-black bg-opacity-5 backdrop-blur-[0.1vw] absolute left-[0vw] top-[0vw] flex justify-end z-0' onClick={handleClick}></div>

            <div className='w-[21vw] h-screen bg-white border-border-grey border-[0.2vw] rounded-[0.3vw] flex justify-center pt-[1.5vw] z-10'>
                <div>
                    <div>
                        <p className='text-center font-bold text-[1.2vw]'>
                            CREATE APPOINTMENT
                        </p>

                        <div className='flex justify-center'>
                            <div className='w-[7vw] h-[0.1vw] mt-[0.1vw] mb-[1vw] bg-background-grey'></div>
                        </div>                    
                    </div>

                    <div>
                        <label>
                            <p className='mb-[0.2vw] ml-[0.3vw] text-[1vw]'>
                                Enter Full Name :
                            </p>

                            <input name="username" type="text" placeholder='Enter Name' value={userName} className='text-black rounded-[0.3vw] text-[1vw] pl-[0.5vw] h-[2vw] w-[16vw] border-black border-[0.2vw] mb-[0.9vw]'  onChange={e => setUserName(e.target.value)} />
                        </label>

                        <label>
                          <p className='mb-[0.2vw] ml-[0.3vw] text-[1vw]'>
                              Enter Date of Appointment :
                          </p>

                          <div>
                            <DatePicker
                              selected={selectedDate}
                              onChange={(date) => setSelectedDate(date)}
                              showTimeSelect
                              dateFormat="Pp"
                              placeholderText="Select a date and time"
                              className='text-black rounded-[0.3vw] text-[1vw] pl-[0.5vw] h-[2vw] w-[16vw] border-black border-[0.2vw] mb-[0.9vw]'
                            />
                          </div>  
                        </label> 

                        <label>
                            <p className='mb-[0.2vw] ml-[0.3vw] text-[1vw]'>
                                Enter Visitor's Email :
                            </p>

                            <input name="email" type="text" placeholder='Email Address' value={email} className='text-black rounded-[0.3vw] text-[1vw] pl-[0.5vw] h-[2vw] w-[16vw] border-black border-[0.2vw] mb-[0.9vw]'  onChange={e => setEmail(e.target.value.toLowerCase())} />
                        </label> 

                        <label>
                            <p className='mb-[0.2vw] ml-[0.3vw] text-[1vw]'>
                                Enter Visitee Email :
                            </p>

                            <input name="visiteemail" type="text" placeholder='Enter Visitee Email' value={visiteemail} className='text-black rounded-[0.3vw] text-[1vw] pl-[0.5vw] h-[2vw] w-[16vw] border-black border-[0.2vw] mb-[0.9vw]'  onChange={e => setVisiteemail(e.target.value.toLowerCase())} />
                        </label>                            

                        {/* <label>
                            <p className='mb-[0.2vw] ml-[0.3vw] text-[1vw]'>
                                Enter Time of Appointment :
                            </p>

                            <input name="email" type="text" placeholder='Email Address' value={email} className='text-black rounded-[0.3vw] text-[1vw] pl-[0.5vw] h-[2vw] w-[16vw] border-black border-[0.2vw] mb-[0.9vw]'  onChange={e => setEmail(e.target.value.toLowerCase())} />
                        </label>                                               */}
                    </div>

                    <div className='flex justify-center'>
                        <div>
                            <Toaster richColors />
                            
                            <div className='w-[12vw] mt-[13.5vw] border-black bg-black text-white border-[0.15vw] rounded-[0.3vw] h-[2.5vw] flex justify-center text-[1.2vw] font-semibold cursor-pointer' onClick={handleSubmit}>
                                <p className='mt-[0.36vw]'>
                                    Accept
                                </p>
                            </div>

                            <div className='w-[12vw] mt-[0.7vw] border-black border-[0.15vw] rounded-[0.3vw] h-[2.5vw] flex justify-center text-[1.2vw] font-semibold cursor-pointer' onClick={handleClick}>
                                <p className='mt-[0.36vw]'>
                                    Cancel
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Addappointment