import React, { useEffect, useState } from 'react';
import { coatOfArms, cameraIcon } from '../assets';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios'; // For API requests
import { useMediaQuery } from 'react-responsive';

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

  const mobileScreen = useMediaQuery({ query: '(max-aspect-ratio: 3/3)' });
  const notMobileScreen = useMediaQuery({ query: '(min-aspect-ratio: 3/3)' });

  // const handlesubmit = () => {
  //   setDepartment(dept);
  //   setmyphone(phoneno);
  //   setliftvisitorTag(visitorTag);
  //   setliftBadgeId(badgeId);

  //   navigate('/shwebapp/mypage')
 
  // }

  const handlesubmit = async () => {
    const clearedData = {
      visitorTag: visitorTag,
      badgeId: badgeId,
      status: 'Checked-In',
      checkInTime: datetime,
    };
  
    try {
      // 1. Update appointment record
      const response = await fetch(`https://vms.cognitron.co.ke/api/appointmentsdata/${attendeeIDNo}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clearedData),
      });
  
      const result = await response.json();
      console.log('Appointment updated:', result);
  
      // 2. Mark badge as chosen
      await axios.put(`https://vms.cognitron.co.ke/api/visitorsbadges/${badgeId}`, {
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
        const response = await axios.get('https://vms.cognitron.co.ke/api/visitorsbadges'); // Replace with your actual API endpoint
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
      {/* <div className='flex justify-center'>
        <div className='w-[85vw] pb-[6vw] bg-white bg-opacity-10 text-white mt-[10vw] border-[0.05vw] rounded-[6vw] pl-[4vw]'>
          <p className='text-[3.8vw] mt-[5vw] font-semibold'>
            Visitor's Information
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

            <label>
              <p className='mb-[1vw] mt-[2.5vw]'>
                Visitor's Badge Number :
              </p>

              <Select
                  options={badges}
                  onChange={handleBadgesChange}
                  placeholder="Select Visitors Badge"
                  className='w-[55vw] rounded-[1vw] text-black'
              />
            </label>
          </div>

          <div className='flex justify-center text-[3.8vw] mt-[8vw]'>
            <p className='border-[0.45vw] rounded-[1vw] text-center text-white py-[1vw] cursor-pointer w-[40vw]' onClick={handlesubmit} >
              Done
            </p>
          </div>
        </div>
      </div> */}


      {mobileScreen && (
        <div>
          <div className='flex justify-center'>
            <div className='w-[85vw] pb-[6vw] bg-white bg-opacity-10 text-white mt-[10vw] border-[0.05vw] rounded-[6vw] pl-[4vw]'>
              <p className='text-[3.8vw] mt-[5vw] font-semibold'>
                Visitor's Information
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

                <label>
                  <p className='mb-[1vw] mt-[2.5vw]'>
                    Visitor's Badge Number :
                  </p>

                  <Select
                      options={badges}
                      onChange={handleBadgesChange}
                      placeholder="Select Visitors Badge"
                      className='w-[55vw] rounded-[1vw] text-black'
                  />
                </label>
              </div>

              <div className='flex justify-center text-[3.8vw] mt-[8vw]'>
                <p className='border-[0.45vw] rounded-[1vw] text-center text-white py-[1vw] cursor-pointer w-[40vw]' onClick={handlesubmit} >
                  Done
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {notMobileScreen && (
        <div>
          <div className='flex justify-center'>
            <div className='w-[45vw] pb-[3vw] bg-white bg-opacity-10 text-white mt-[3vw] border-[0.05vw] rounded-[3vw]'>
              {/* <p className='text-[3.8vw] mt-[5vw] font-semibold'>
                Visitor's Information
              </p> */}

              <div className='flex justify-center'>
                <p className='text-[3vw] mt-[1.5vw] font-semibold'>
                  Visitor's Information
                </p>
              </div>

              <div className='flex justify-center'>
                <div className='w-[10vw] h-[0.1vw] bg-white'></div>
              </div>

              <div className='pt-[2vw] text-center'>
                <div className='mb-[1vw] flex justify-center'>
                  <p className=''>
                    Name :
                  </p>

                  <p className='font-bold pl-[1vw]'>
                    {attendeeName}
                  </p>
                </div>

                <div className='mb-[1vw] flex justify-center'>
                  <p className=''>
                    ID Number :
                  </p>

                  <p className='font-bold pl-[1vw]'>
                    {attendeeIDNo}
                  </p>
                </div>

                <div className='mb-[1vw] flex justify-center'>
                  <p className=''>
                    Check-in Time :
                  </p>

                  <p className='font-bold pl-[1vw]'>
                    {showTime}
                  </p>
                </div>

                <div className='mb-[1vw] flex justify-center'>
                  <p>
                    Destination :
                  </p>
                  
                  <p className='font-bold pl-[1.5vw]'>
                    {eventLocation}
                  </p>
                </div>                

                <div>
                  <p className='mb-[1vw]'>
                    Visitor's Badge Number :
                  </p>

                  <div className='flex justify-center'>
                    <Select
                        options={badges}
                        onChange={handleBadgesChange}
                        placeholder="Select Visitors Badge"
                        className='w-[30vw] rounded-[1vw] text-black'
                    />
                  </div>
                </div>
              </div>

              <div className='flex justify-center text-[1.5vw] mt-[3vw]'>
                <p className='border-[0.45vw] rounded-[1vw] text-center text-black bg-white py-[1vw] font-semibold cursor-pointer w-[25vw]' onClick={handlesubmit} >
                  Done
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AppointmentFillinfo