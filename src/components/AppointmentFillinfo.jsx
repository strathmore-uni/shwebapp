import React, { useEffect, useState } from 'react';
import { coatOfArms, cameraIcon } from '../assets';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios'; // For API requests

const AppointmentFillinfo = ({attendeeName, eventLocation, attendeeIDNo}) => {

  const navigate = useNavigate();
  const [phoneno, setphoneno] = useState('');
  const [datetime, setDateTime] = useState('');
  const [iDname, setiDname] = useState('');
  const [sharedString, setSharedString] = useState('');

  const [showTime] = useState(getFormattedDate())
  
  const [dept, setdept] = useState('');

  const [visitorTag, setvisitorTag] = useState('');
  const [badgeId, setBadgeId] = useState('');

  // const handlesubmit = () => {
  //   setDepartment(dept);
  //   setmyphone(phoneno);
  //   setliftvisitorTag(visitorTag);
  //   setliftBadgeId(badgeId);

  //   navigate('/shwebapp/mypage')
 
  // }

  const handlesubmit = async () => {
    const clearedData = {
      badgeId: badgeId,
      status: 'Checked-In',
    };
  
    try {
      // 1. Update appointment record
      const response = await fetch(`http://localhost:5000/api/appointmentsdata/${attendeeIDNo}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clearedData),
      });
  
      const result = await response.json();
      console.log('Appointment updated:', result);
  
      // 2. Mark badge as chosen
      await axios.put(`http://localhost:5000/api/visitorsbadges/${badgeId}`, {
        chosen: "true"
      });
  
      // 3. Optional: redirect
      navigate('/shwebapp/menu');
    } catch (error) {
      console.error('Error during check-in:', error);
    }
  };
  
  

  //Date and Time function to update the usestate
  function getFormattedDate() {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const date = new Date();
    const showTime = ('0' + date.getHours()).slice(-2) + ':' + 
                     ('0' + date.getMinutes()).slice(-2) + ' - ' + 
                     ('0' + date.getDate()).slice(-2) + ' ' + 
                     monthNames[date.getMonth()] + ' ' + date.getFullYear();
    return showTime;
  }
  // setDateTime(showTime);
  // console.log(showTime)

  useEffect(() => {
    setDateTime(showTime);
  }, [showTime, setDateTime]);


  const [badges, setBadges] = useState([]);

  // Fetch data from Visitors Badges MongoDB API endpoint
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/visitorsbadges'); // Replace with your actual API endpoint
        const visitors = response.data;

        // Filter out records where chosen is "true"
        const filteredVisitors = visitors.filter(visitor => visitor.chosen !== "true");

        // Map the data to the format React Select expects
        const formattedOptions = filteredVisitors.map(visitors => ({
          value: visitors._id,
          label: visitors.visitorsBadge,
          chosen: visitors.chosen
        }));

        setBadges(formattedOptions);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);


  const handleBadgesChange = (selectedOption) => {
    // console.log(`Selected:`, selectedOption);
    setvisitorTag(selectedOption.label);    // .value extracts the value from the object created by react select
    setBadgeId(selectedOption.value);
  };

  return (
    <div>
        <div className='flex justify-center'>
        <div className='w-[85vw] pb-[6vw] bg-white bg-opacity-10 text-white mt-[10vw] border-[0.05vw] rounded-[6vw] pl-[4vw]'>
          <p className='text-[3.8vw] mt-[5vw] font-semibold'>
            REQUIRED
          </p>

          <div className='pt-[2vw]'>
            <div className='mb-[2.5vw]'>
              <p className=''>
                Name :
              </p>

              <p className='font-bold pl-[1.5vw]'>
                {attendeeName}
              </p>
            </div>

            <div className='mb-[2.5vw]'>
              <p className=''>
                ID Number :
              </p>

              <p className='font-bold pl-[1.5vw]'>
                {attendeeIDNo}
              </p>
            </div>

            <label>
              <p className='mt-[2.5vw]'>
                Destination :
              </p>
              
              <p className='font-bold pl-[1.5vw] mb-[1vw]'>
                {eventLocation}
              </p>
            </label>

            <div className='mb-[2.5vw]'>
              <p className=''>
                Check-in Time :
              </p>

              <p className='font-bold pl-[1.5vw]'>
                {showTime}
              </p>
            </div>

            {/* <label>
              <p className='mb-[1vw]'>
                Enter phone number :
              </p>
              <input name="telnumber" type="number" placeholder='Phone number' className='text-black rounded-[1vw] text-[3vw] pl-[2vw] h-[6vw] w-[55vw]'  onChange={e => setphoneno(e.target.value)} />
            </label> */}

            {/* <label>
              <p className='mb-[1vw] mt-[2.5vw]'>
                Destination :
              </p>
              
              <p className='font-bold pl-[1.5vw]'>
                {eventLocation}
              </p>
            </label> */}

            <label>
              <p className='mb-[1vw] mt-[2.5vw]'>
                Visitor's Badge Number :
              </p>
              {/* <input name="telnumber" type="text" placeholder='Enter Badge Number' className='text-black rounded-[1vw] text-[3vw] pl-[2vw] h-[6vw] w-[55vw]'  onChange={e => setvisitorTag(e.target.value)}/> */}

              <Select
                  options={badges}
                  onChange={handleBadgesChange}
                  placeholder="Select Visitors Badge"
                  className='w-[55vw] rounded-[1vw] text-black'
              />
            </label>

            {/* <div className='mt-[2.5vw]'>
              <p className=''>
                Take picture of Vehicle's Licence Plate :
              </p>

              <img src={cameraIcon} className='h-[13vw] mt-[2vw] pl-[1vw] cursor-pointer' />              
            </div> */}
          </div>

          <div className='flex justify-center text-[3.8vw] mt-[8vw]'>
            <p className='border-[0.45vw] rounded-[1vw] text-center text-white py-[1vw] cursor-pointer w-[40vw]' onClick={handlesubmit} >
              Done
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppointmentFillinfo