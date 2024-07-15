import React, { useState, useEffect } from 'react';
import { coatOfArms } from '../assets';

const Checkinpage = ({ myphone, sharedString, iDname, datetime, department, setFulldata }) => {
  const [checkins, setCheckins] = useState(() => {
    const savedCheckins = localStorage.getItem('checkins');
    return savedCheckins ? JSON.parse(savedCheckins) : [];
  });

  const addCheckin = () => {
    const newCheckin = { myphone, sharedString, iDname, datetime, department };
    const updatedCheckins = [...checkins, newCheckin];
    setCheckins(updatedCheckins);
    localStorage.setItem('checkins', JSON.stringify(updatedCheckins));
  };

  useEffect(() => {
    addCheckin();
  }, [myphone, sharedString, iDname, datetime, department]);

  return (
    <div>
      <div className='flex justify-center pt-[10vw]'>
        <div>
          <img src={coatOfArms} className='h-[30vw]' alt='Coat of Arms' />
        </div>
      </div>
      {checkins.map((checkin, index) => (
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
      ))}
    </div>
  );
};

export default Checkinpage;
