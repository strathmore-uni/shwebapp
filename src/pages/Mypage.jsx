import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { coatOfArms } from '../assets'
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';

export default function Mypage({myphone, sharedString, iDname,datetime,department,setFulldata, liftvisitorTag, liftBadgeId, licencePlateNo}) {

  // const [time, setTime] = 'Pending';
  const mobileScreen = useMediaQuery({ query: '(max-aspect-ratio: 3/3)' });
  const notMobileScreen = useMediaQuery({ query: '(min-aspect-ratio: 3/3)' });

  const handleSubmit = async () => {
    // Create an object with the state variables
    const data = {
      phone: myphone,
      department: department,
      sharedString: sharedString,
      idName: iDname,
      dateTime: datetime,
      visitorTag: liftvisitorTag,
      badgeId: liftBadgeId,
      checkoutTime: 'Pending',
      licencePlateNo: licencePlateNo,
    };

    const choosen = {
      chosen: 'true',      
    }

    try {
      // Send the data to the backend
      // const response = await axios.post('http://localhost:5000/api/data', data);
      // console.log(response.data); // Log the response from the server

      const [postResponse, putResponse] = await Promise.all([
        axios.post('https://vms.cognitron.co.ke/api/data', data),
        axios.put(`https://vms.cognitron.co.ke/api/visitorsbadges/${liftBadgeId}`, choosen)
      ]);

      console.log('Post Response:', postResponse.data); // Log the response from the server
      console.log('Put Response:', putResponse.data); // Log response for badge update

      // Reset the fields if needed
      // setMyPhone('');
      // setDepartment('');
      // setSharedString('');
      // setIDname('');
      // setDateTime('');
    } catch (error) {
      // console.error('Error submitting data:', error);
      console.error('Error submitting data:', error.message || error);
    }
  };


  return (
    <div>
      {/* <div className='flex justify-center'>
        <div>
          <div className='w-[85vw] pb-[6vw] bg-white bg-opacity-10 text-white mt-[10vw] border-[0.05vw] rounded-[6vw] pl-[4vw]'>
            <p className='text-[3.8vw] mt-[5vw] font-semibold'>
              VISITOR'S INFORMATION
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
                   {datetime}
                </p>
              </div>

              <label>
                <p className='mb-[1vw]'>
                  Phone number :
                </p>

                <p className='font-bold pl-[1.5vw] mb-[0.5vw]'>
                  {myphone}
                </p>              
              </label>

              <label>
                <p className='mb-[1vw]'>
                  Licence Plate :
                </p>

                <p className='font-bold pl-[1.5vw]'>
                  {licencePlateNo}
                </p>              
              </label>

              <label>
                <p className='mb-[1vw] mt-[2.5vw]'>
                  Destination Headed :
                </p>
                
                <p className='font-bold pl-[1.5vw]'>
                 {department}
                </p>
              </label>

              <label>
                <p className='mb-[1vw] mt-[2.5vw]'>
                  Visitor's Badge Number :
                </p>
                
                <p className='font-bold pl-[1.5vw]'>
                 {liftvisitorTag}
                </p>
              </label>
            </div>            
          </div>

          <div className='flex justify-center text-[3.8vw] my-[3vw]'>
            <Link to="/shwebapp/menu">
              <p className='border-[0.45vw] rounded-[1vw] text-center text-black bg-white font-semibold py-[1vw] cursor-pointer w-[60vw]' onClick={handleSubmit} >
                COMPLETE REGISTRATION
              </p>
            </Link>
          </div>
        </div>
      </div> */}



      {mobileScreen && (
        <div>
          <div className='flex justify-center'>
            <div>
              <div className='w-[85vw] pb-[6vw] bg-white bg-opacity-10 text-white mt-[10vw] border-[0.05vw] rounded-[6vw] pl-[4vw]'>
                <p className='text-[3.8vw] mt-[5vw] font-semibold'>
                  VISITOR'S INFORMATION
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
                      {datetime}
                    </p>
                  </div>

                  <label>
                    <p className='mb-[1vw]'>
                      Phone number :
                    </p>

                    <p className='font-bold pl-[1.5vw] mb-[0.5vw]'>
                      {myphone}
                    </p>              
                  </label>

                  <label>
                    <p className='mb-[1vw]'>
                      Licence Plate :
                    </p>

                    <p className='font-bold pl-[1.5vw]'>
                      {licencePlateNo}
                    </p>              
                  </label>

                  <label>
                    <p className='mb-[1vw] mt-[2.5vw]'>
                      Destination Headed :
                    </p>
                    
                    <p className='font-bold pl-[1.5vw]'>
                    {department}
                    </p>
                  </label>

                  <label>
                    <p className='mb-[1vw] mt-[2.5vw]'>
                      Visitor's Badge Number :
                    </p>
                    
                    <p className='font-bold pl-[1.5vw]'>
                    {liftvisitorTag}
                    </p>
                  </label>
                </div>            
              </div>

              <div className='flex justify-center text-[3.8vw] my-[3vw]'>
                <Link to="/shwebapp/menu">
                  <p className='border-[0.45vw] rounded-[1vw] text-center text-black bg-white font-semibold py-[1vw] cursor-pointer w-[60vw]' onClick={handleSubmit} >
                    COMPLETE REGISTRATION
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>    
      )}

      {notMobileScreen && (
        <div>
          <div className='flex justify-center'>
            <div>
              <div className='w-[45vw] pb-[3vw] bg-white bg-opacity-10 text-white mt-[3vw] border-[0.05vw] rounded-[3vw]'>
                {/* <p className='text-[3.8vw] mt-[5vw] font-semibold'>
                  VISITOR'S INFORMATION
                </p> */}

                <div className='flex justify-center'>
                  <p className='text-[3vw] mt-[1.5vw] font-semibold'>
                    VISITOR'S INFORMATION
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

                  <div className='mb-[1vw] flex justify-center'>
                    <p className=''>
                      Check-in Time :
                    </p>

                    <p className='font-bold pl-[1vw]'>
                      {datetime}
                    </p>
                  </div>

                  <div className='mb-[1vw] flex justify-center'>
                    <p>
                      Phone number :
                    </p>

                    <p className='font-bold pl-[1vw]'>
                      {myphone}
                    </p>              
                  </div>

                  <div className='mb-[1vw] flex justify-center'>
                    <p>
                      Licence Plate :
                    </p>

                    <p className='font-bold pl-[1vw]'>
                      {licencePlateNo}
                    </p>              
                  </div>

                  <div className='mb-[1vw] flex justify-center'>
                    <p>
                      Destination Headed :
                    </p>
                    
                    <p className='font-bold pl-[1vw]'>
                    {department}
                    </p>
                  </div>

                  <div className='mb-[1vw] flex justify-center'>
                    <p>
                      Visitor's Badge Number :
                    </p>
                    
                    <p className='font-bold pl-[1vw]'>
                    {liftvisitorTag}
                    </p>
                  </div>
                </div>   

                <div className='flex justify-center text-[1.5vw] mt-[3vw]'>
                  <Link to="/shwebapp/menu">
                    <p className='border-[0.45vw] rounded-[1vw] text-center text-black bg-white font-semibold py-[1vw] cursor-pointer w-[25vw]' onClick={handleSubmit} >
                      COMPLETE REGISTRATION
                    </p>
                  </Link>
                </div>         
              </div>

              {/* <div className='flex justify-center text-[1.5vw] my-[3vw]'>
                <Link to="/shwebapp/menu">
                  <p className='border-[0.45vw] rounded-[1vw] text-center text-black bg-white font-semibold py-[1vw] cursor-pointer w-[25vw]' onClick={handleSubmit} >
                    COMPLETE REGISTRATION
                  </p>
                </Link>
              </div> */}
            </div>
          </div>
        </div>    
      )}
    </div>
  )
}
