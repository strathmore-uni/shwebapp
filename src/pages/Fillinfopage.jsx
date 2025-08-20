import React, { useEffect, useState } from 'react';
import { coatOfArms, cameraIcon } from '../assets';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios'; // For API requests
import { Toaster, toast } from 'sonner'
import { useMediaQuery } from 'react-responsive';

const Fillinfopage = ({ sharedString, iDname,setmyphone,setDateTime,setDepartment, setliftvisitorTag, setliftBadgeId, setLicencePlateNo }) => {
  // console.log(sharedString, iDname);
const navigate = useNavigate();
  const [phoneno, setphoneno] = useState('N/a');

  const [showTime] = useState(getFormattedDate())
  
  const [dept, setdept] = useState('');

  const [visitorTag, setvisitorTag] = useState('');
  const [badgeId, setBadgeId] = useState('');
  // const [licencePlateNo, setLicencePlateNo] = useState('');

  const mobileScreen = useMediaQuery({ query: '(max-aspect-ratio: 3/3)' });
  const notMobileScreen = useMediaQuery({ query: '(min-aspect-ratio: 3/3)' });

  const handlesubmit = () => {
    if (dept == '') {
      toast.error('Please Select the Destination');
      return;
    }
    if (visitorTag == '') {
      toast.error('Please Select the Badge No.');
      return;
    }
    setDepartment(dept);
    setmyphone(phoneno);
    setliftvisitorTag(visitorTag);
    setliftBadgeId(badgeId);

    navigate('/shwebapp/mypage')
 
  }

  // const depatmentOptions = [
  //   { value: 'iLabAfrica', label: '@iLab Africa' },
  //   { value: 'Strathmore Business School', label: 'Strathmore Business School' },
  //   { value: 'St Thomas Moore Building', label: 'St. Thomas Moore Building' },
  //   { value: 'Students Center', label: 'Students Center' },
  // ];

  const [depatmentOptions, setDepatmentOptions] = useState([]);
  const [badges, setBadges] = useState([]);
  
  console.log(badges);

  // Fetch Departments from MongoDB API endpoint
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('https://vms.cognitron.co.ke/api/departmentsdata'); // Replace with your actual API endpoint
        const departments = response.data;

        // Map the data to the format React Select expects
        const formattedOptions = departments.map(department => ({
          value: department.departmentName,
          label: department.departmentName
        }));

        setDepatmentOptions(formattedOptions);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);


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


  const handleChange = (selectedOption) => {
    // console.log(`Selected:`, selectedOption);
    setdept(selectedOption.value);    // .value extracts the value from the object created by react select
  };

  const handleBadgesChange = (selectedOption) => {
    // console.log(`Selected:`, selectedOption);
    setvisitorTag(selectedOption.label);    // .value extracts the value from the object created by react select
    setBadgeId(selectedOption.value);
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

  return (
    <div>
      {/* <div className='flex justify-center'>
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
                {iDname}
              </p>
            </div>

            <div className='mb-[2.5vw]'>
              <p className=''>
                ID Number :
              </p>

              <p className='font-bold pl-[1.5vw]'>
                {sharedString}
              </p>
            </div>

            <div className='mb-[2.5vw]'>
              <p className=''>
                Check-in Time :
              </p>

              <p className='font-bold pl-[1.5vw]'>
                {showTime}
              </p>
            </div>

            <label>
              <p className='mb-[1vw]'>
                Phone number :
              </p>
              <input name="telnumber" type="number" placeholder='Enter Phone number' className='text-black rounded-[1vw] text-[3vw] pl-[2vw] h-[6vw] w-[55vw] mb-[2vw]'  onChange={e => setphoneno(e.target.value)} />
            </label>

            <label>
              <p className='mb-[1vw]'>
                Licence plate :
              </p>
              <input name="licenceplate" type="text" placeholder='Enter Licence plate information' className='text-black rounded-[1vw] text-[3vw] pl-[2vw] h-[6vw] w-[55vw]'  onChange={e => setLicencePlateNo(e.target.value)} />
            </label>

            <label>
              <p className='mb-[1vw] mt-[2vw]'>
                Destination :
              </p>

              <Select
                  options={depatmentOptions}
                  onChange={handleChange}
                  placeholder="Select Destination"
                  className='w-[55vw] rounded-[1vw] text-black'
              />
            </label>

            <label>
              <p className='mb-[1vw] mt-[2.5vw]'>
                Visitor's Badge Number :
              </p>

              <Select
                  options={badges}
                  onChange={handleBadgesChange}
                  placeholder="Select Visitors Badge No."
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
                REQUIRED
              </p>

              <div className='pt-[2vw]'>
                <div className='mb-[2.5vw]'>
                  <p className=''>
                    Name :
                  </p>

                  <p className='font-bold pl-[1.5vw]'>
                    {iDname}
                  </p>
                </div>

                <div className='mb-[2.5vw]'>
                  <p className=''>
                    ID Number :
                  </p>

                  <p className='font-bold pl-[1.5vw]'>
                    {sharedString}
                  </p>
                </div>

                <div className='mb-[2.5vw]'>
                  <p className=''>
                    Check-in Time :
                  </p>

                  <p className='font-bold pl-[1.5vw]'>
                    {showTime}
                  </p>
                </div>

                <label>
                  <p className='mb-[1vw]'>
                    Phone number :
                  </p>
                  <input name="telnumber" type="number" placeholder='Enter Phone number' className='text-black rounded-[1vw] text-[3vw] pl-[2vw] h-[6vw] w-[55vw] mb-[2vw]'  onChange={e => setphoneno(e.target.value)} />
                </label>

                <label>
                  <p className='mb-[1vw]'>
                    Licence plate :
                  </p>
                  <input name="licenceplate" type="text" placeholder='Enter Licence plate information' className='text-black rounded-[1vw] text-[3vw] pl-[2vw] h-[6vw] w-[55vw]'  onChange={e => setLicencePlateNo(e.target.value)} />
                </label>

                <label>
                  <p className='mb-[1vw] mt-[2vw]'>
                    Destination :
                  </p>

                  <Select
                      options={depatmentOptions}
                      onChange={handleChange}
                      placeholder="Select Destination"
                      className='w-[55vw] rounded-[1vw] text-black'
                  />
                </label>

                <label>
                  <p className='mb-[1vw] mt-[2.5vw]'>
                    Visitor's Badge Number :
                  </p>

                  <Select
                      options={badges}
                      onChange={handleBadgesChange}
                      placeholder="Select Visitors Badge No."
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
              <div className='flex justify-center'>
                <p className='text-[3vw] mt-[1.5vw] font-semibold'>
                  REQUIRED
                </p>
              </div>

              <div className='flex justify-center'>
                <div className='w-[10vw] h-[0.1vw] bg-white'></div>
              </div>

              <div className='pt-[2vw] text-center'>
                <div className='mb-[1vw] flex justify-center'>
                  <p>
                    Name :
                  </p>

                  <p className='font-bold pl-[1vw]'>
                    {iDname}
                  </p>
                </div>

                <div className='mb-[1vw] flex justify-center'>
                  <p className=''>
                    ID Number :
                  </p>

                  <p className='font-bold pl-[1vw]'>
                    {sharedString}
                  </p>
                </div>

                <div className='mb-[1.5vw] flex justify-center'>
                  <p className=''>
                    Check-in Time :
                  </p>

                  <p className='font-bold pl-[1vw]'>
                    {showTime}
                  </p>
                </div>

                <label>
                  <p className='mb-[1vw]'>
                    Phone number :
                  </p>
                  <input name="telnumber" type="number" placeholder='Enter Phone number' className='text-black rounded-[1vw] text-[2vw] pl-[2vw] h-[4vw] w-[30vw] mb-[1.5vw]'  onChange={e => setphoneno(e.target.value)} />
                </label>

                <label>
                  <p className='mb-[1vw]'>
                    Licence plate :
                  </p>
                  <input name="licenceplate" type="text" placeholder='Enter Licence plate' className='text-black rounded-[1vw] text-[2vw] pl-[2vw] h-[4vw] w-[30vw]'  onChange={e => setLicencePlateNo(e.target.value)} />
                </label>

                <label>
                  <p className='mb-[1vw] mt-[2vw]'>
                    Destination :
                  </p>

                  <div className='flex justify-center'>
                    <Select
                        options={depatmentOptions}
                        onChange={handleChange}
                        placeholder="Select Destination"
                        className='w-[30vw] rounded-[1vw] text-black'
                    />
                  </div>
                </label>

                <label>
                  <p className='mb-[1vw] mt-[2.5vw]'>
                    Visitor's Badge Number :
                  </p>

                  <div className='flex justify-center'>
                    <Select
                        options={badges}
                        onChange={handleBadgesChange}
                        placeholder="Select Visitors Badge No."
                        className='w-[30vw] rounded-[1vw] text-black'
                    />
                  </div>
                </label>
              </div>

              <div className='flex justify-center text-[1.5vw] mt-[5vw]'>
                <p className='border-[0.45vw] rounded-[1vw] text-center text-black bg-white py-[1vw] font-semibold cursor-pointer w-[25vw]' onClick={handlesubmit} >
                  Done
                </p>
              </div>
            </div>
          </div>
        </div>    
      )}

      <Toaster richColors position="top-center" />
    </div>
  );
}

export default Fillinfopage;
