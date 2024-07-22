import React, { useState, useEffect } from 'react';
import { coatOfArms } from '../assets';
import axios from 'axios';

const Checkinpage = ({ myphone, sharedString, iDname, datetime, department, setFulldata }) => {
  // const [checkins, setCheckins] = useState(() => {
  //   const savedCheckins = localStorage.getItem('checkins');
  //   return savedCheckins ? JSON.parse(savedCheckins) : [];
  // });

  // const addCheckin = () => {
  //   const newCheckin = { myphone, sharedString, iDname, datetime, department };
  //   const updatedCheckins = [...checkins, newCheckin];
  //   setCheckins(updatedCheckins);
  //   localStorage.setItem('checkins', JSON.stringify(updatedCheckins));
  // };

  // useEffect(() => {
  //   addCheckin();
  // }, [myphone, sharedString, iDname, datetime, department]);
  

  // const [name, setName] = useState('');

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post('http://localhost:5000/api/names', { name });
  //     console.log(response.data);
  //     setName('');
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/data')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <div className='flex justify-center pt-[10vw]'>
        <div>
          <img src={coatOfArms} className='h-[30vw]' alt='Coat of Arms' />
        </div>
      </div>
      {/* {data.map((checkin, index) => (
        <div className='flex justify-center' key={index}>
          <div>
            <div className='w-[85vw] pb-[3vw] bg-white bg-opacity-10 text-white mt-[10vw] border-[0.05vw] rounded-[6vw] pl-[4vw] mb-[2vw]'>
              <p className='text-[3.8vw] mt-[5vw] font-semibold'>
                {checkin.iDname}
              </p>

              <div className='pt-[2vw]'>
                <div className='mb-[2.5vw] flex'>
                  <p className='font-light'>
                    ID :
                  </p>

                  <p className='font-bold pl-[1.5vw]'>
                    {checkin.sharedString}
                  </p>
                </div>

                <div className='mb-[2.5vw] flex'>
                  <p className='font-light'>
                    Phone Number :
                  </p>

                  <p className='font-bold pl-[1.5vw]'>
                    {checkin.myphone}
                  </p>
                </div>

                <div className='mb-[2.5vw] flex'>
                  <p className='font-light'>
                    Check-in Time :
                  </p>

                  <p className='font-bold pl-[1.5vw]'>
                    {checkin.datetime}
                  </p>
                </div>

                <div className='mb-[2.5vw] flex'>
                  <p className='font-light'>
                    Destination :
                  </p>

                  <p className='font-bold pl-[1.5vw]'>
                    {checkin.department}
                  </p>
                </div>

                <div className='mb-[2.5vw] flex'>
                  <p className='font-light'>
                    Licence Plate :
                  </p>

                  <p className='font-bold pl-[1.5vw]'>
                    TODO
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))} */}

      {data.map(item => (
          <div className='flex justify-center' key={item._id}>
            <div>
              <div className='w-[85vw] pb-[3vw] bg-white bg-opacity-10 text-white mt-[10vw] border-[0.05vw] rounded-[6vw] pl-[4vw] mb-[2vw]'>
                <p className='text-[3.8vw] mt-[5vw] font-semibold'>
                  {item.idName}
                </p>

                <div className='pt-[2vw]'>
                  <div className='mb-[2.5vw] flex'>
                    <p className='font-light'>
                      ID :
                    </p>

                    <p className='font-bold pl-[1.5vw]'>
                      {item.sharedString}
                    </p>
                  </div>

                  <div className='mb-[2.5vw] flex'>
                    <p className='font-light'>
                      Phone Number :
                    </p>

                    <p className='font-bold pl-[1.5vw]'>
                      {item.phone}
                    </p>
                  </div>

                  <div className='mb-[2.5vw] flex'>
                    <p className='font-light'>
                      Check-in Time :
                    </p>

                    <p className='font-bold pl-[1.5vw]'>
                      {item.dateTime}
                    </p>
                  </div>

                  <div className='mb-[2.5vw] flex'>
                    <p className='font-light'>
                      Destination :
                    </p>

                    <p className='font-bold pl-[1.5vw]'>
                      {item.department}
                    </p>
                  </div>

                  <div className='mb-[2.5vw] flex'>
                    <p className='font-light'>
                      Licence Plate :
                    </p>

                    <p className='font-bold pl-[1.5vw]'>
                      TODO
                    </p>
                  </div>
                </div>
              </div>
            </div>            
          </div>
        ))}

      

{/* <div className='text-white'>
      <h1>Data from MongoDB</h1>
      <ul>
        {data.map(item => (
          <li key={item._id}>
            <p>Phone: {item.phone}</p>
            <p>Department: {item.department}</p>
            <p>Shared String: {item.sharedString}</p>
            <p>ID Name: {item.idName}</p>
            <p>Date and Time: {item.dateTime}</p>
          </li>
        ))}
      </ul>
    </div> */}
    </div>
  );
};

export default Checkinpage;
