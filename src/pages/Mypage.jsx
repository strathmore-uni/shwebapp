import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { coatOfArms } from '../assets'
import axios from 'axios';

export default function Mypage({myphone, sharedString, iDname,datetime,department,setFulldata, liftvisitorTag, liftBadgeId}) {

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
    };

    const choosen = {
      chosen: 'true',      
    }

    try {
      // Send the data to the backend
      // const response = await axios.post('http://localhost:5000/api/data', data);
      // console.log(response.data); // Log the response from the server

      const [postResponse, putResponse] = await Promise.all([
        axios.post('http://localhost:5000/api/data', data),
        axios.put(`http://localhost:5000/api/visitorsbadges/${liftBadgeId}`, choosen)
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
      {/* <h1 className='text-white'>Mypage{myphone}</h1> */}

      {/* <div className='flex justify-center pt-[10vw]'>
        <div>
          <img src={coatOfArms} className='h-[30vw]' alt='Coat of Arms' />
        </div>
      </div> */}

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
                  Enter phone number :
                </p>

                <p className='font-bold pl-[1.5vw]'>
                  {myphone}
                </p>              
              </label>

              <label>
                <p className='mb-[1vw] mt-[2.5vw]'>
                  Enter Department Headed :
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

              {/* <div className='mt-[2.5vw]'>
                <p className=''>
                  Licence Plate :
                </p>

                <p className='font-bold pl-[1.5vw]'>
                  TODO
                </p>             
              </div> */}
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
  )
}
