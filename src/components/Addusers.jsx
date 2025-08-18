import React, { useState } from 'react'
import Select from 'react-select';
import axios from 'axios';
import { Toaster, toast } from 'sonner'



const Addusers = ({setShowUsersForm, refresh, setRefresh}) => {

    const [userName, setUserName] = useState('');
    const [staffId, setStaffId] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    // const [toastResponse, setToastResponse] = useState('');

    // console.log(role);
    
    ///Generate Passwords Function///
    function Str_Random(length) {
        let result = '';
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789@!#$.ABCDEFGHIJKLMNOPQRSTVUWYXZ';
        
        // Loop to generate characters for the specified length
        for (let i = 0; i < length; i++) {
            const randomInd = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomInd);
        }
        return result;
    }
    // console.log(Str_Random(10));
    const password = Str_Random(7);
    ////////////////////////////////
    ////////////////////////////////

    const handleSubmit = async () => {

        if (!userName) {
            toast.error("Name is required");
            return;
          }
          if (!staffId) {
            toast.error("Staff ID is required");
            return;
          }
          if (!email) {
            toast.error("Email is required");
            return;
          } else if (!/\S+@\S+\.\S+/.test(email)) {
            toast.error("Email address is invalid");
            return;
          }          
          if (!role) {
            toast.error("Role is required");
            return;
          }

        // Create an object with the state variables
        const data = {
          name: userName,
          staffid: staffId,
          email: email,
          password: password,
          role: role,
        };
    
        try {
          // Send the data to the backend
          const response = await axios.post('https://vms.cognitron.co.ke/api/userdata', data);
        //   setToastResponse(response.data);
          //console.log(response.data); // Log the response from the server
          toast.success(response.data);
          setUserName('');
          setStaffId('');
          setEmail('');
          setRefresh(!refresh);

        // Prepare the email data to send after the user creation
        const emailData = {
          email: email,
          subject: 'Access to Visitor Management System',
          message: 'Hello ' + userName + ",<br /><br /> You have been granted access to the company's <strong>Visitor Management System</strong> with the role of: <strong>" + role + "</strong>.<br /><br /> Your login credentials are as follows: <br /> User Name: <strong>" + userName + "</strong> <br /> Password: <strong>" + password + "</strong> <br /><br /> Best regards,<br /> IT Support Team<br />Company Name",
        };

        // Send the email data to the backend
        const emailResponse = await fetch('https://vms.cognitron.co.ke/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(emailData), // Use the structured emailData
        });

        const responseData = await emailResponse.text(); // Get response as text

        if (emailResponse.ok) {
          // alert('Email sent successfully!');
          toast.success('Email sent successfully!');
        } else {
          toast.error('Failed to send email');
          console.log(responseData);
        }

        } catch (error) {
          console.error('Error submitting data:', error);
          toast.error('Failed to create a new user');
        }        
      };

    const options = [
        { value: 'Guard', label: 'Guard' },
        { value: 'Receptionist', label: 'Receptionist' },
        { value: 'Admin', label: 'Admin' },
      ];

    const handleChange = (selectedOption) => {
      // console.log(`Selected:`, selectedOption);
      setRole(selectedOption.value);    // .value extracts the value from the object created by react select
    };

    const handleClick = () => {
      setShowUsersForm(false);
    };
      

  return (
    <div>
        <div className='w-screen h-screen absolute left-[0vw] top-[0vw] flex justify-end'>
            <div className='w-screen h-screen bg-black bg-opacity-5 backdrop-blur-[0.1vw] absolute left-[0vw] top-[0vw] flex justify-end z-0' onClick={handleClick}></div>

            <div className='w-[21vw] h-[48vw] absolute right-[0.3vw] top-[0.3vw] bg-white border-border-grey border-[0.2vw] rounded-[0.3vw] flex justify-center pt-[1.5vw] z-10'>
                <div>
                    <div>
                        <p className='text-center font-bold text-[1.2vw]'>
                            ADD NEW USER
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
                                Enter Employee ID :
                            </p>

                            <input name="staffid" type="text" placeholder='Enter ID' value={staffId} className='text-black rounded-[0.3vw] text-[1vw] pl-[0.5vw] h-[2vw] w-[16vw] border-black border-[0.2vw] mb-[0.9vw]'  onChange={e => setStaffId(e.target.value)} />
                        </label> 

                        <label>
                            <p className='mb-[0.2vw] ml-[0.3vw] text-[1vw]'>
                                Enter Email Address :
                            </p>

                            <input name="email" type="text" placeholder='Email Address' value={email} className='text-black rounded-[0.3vw] text-[1vw] pl-[0.5vw] h-[2vw] w-[16vw] border-black border-[0.2vw] mb-[0.9vw]'  onChange={e => setEmail(e.target.value.toLowerCase())} />
                        </label> 

                        <label>
                            <p className='mb-[0.2vw] ml-[0.3vw] text-[1vw]'>
                                User's Password :
                            </p>

                            <p className='font-bold ml-[1vw] mb-[0.5vw]'>
                                {password}
                            </p>

                            {/* <input name="telnumber" type="number" placeholder='Email Address' className='text-black rounded-[0.3vw] text-[1vw] pl-[0.5vw] h-[2vw] w-[16vw] border-black border-[0.2vw] mb-[0.9vw]'  onChange={e => setphoneno(e.target.value)} /> */}
                        </label> 

                        <p className='mb-[0.2vw] ml-[0.3vw] text-[1vw]'>
                            Select Role :
                        </p>

                        <Select
                            options={options}
                            onChange={handleChange}
                            placeholder="Choose a role"
                            className='border-black border-[0.15vw] rounded-[0.4vw]'
                        />                       
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

export default Addusers