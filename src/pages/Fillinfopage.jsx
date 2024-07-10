import React from 'react';
import { coatOfArms } from '../assets';

const Fillinfopage = ({ sharedString, iDname }) => {
  console.log(sharedString, iDname); // Verify that id is received correctly

  return (
    <div>
      <div className='flex justify-center pt-[10vw]'>
        <div>
          <img src={coatOfArms} className='h-[30vw]' alt='Coat of Arms' />
        </div>
      </div>
      
      <p className='text-white'>{sharedString}</p>
      <p className='text-white'>{iDname}</p>

      <div className='flex justify-center'>
        <div className='w-[85vw] pb-[6vw] bg-white bg-opacity-10 text-white mt-[10vw] border-[0.05vw] rounded-[6vw] pl-[4vw]'>
          <p className='text-[3.8vw] mt-[5vw] font-semibold'>
            REQUIRED
          </p>

          <div className='pt-[2vw]'>
            <label>
              <p className='mb-[1vw]'>
                Enter phone number :
              </p>
              <input name="telnumber" type="number" placeholder='Phone number' className='text-black rounded-[1vw] text-[3vw] pl-[2vw] h-[6vw] w-[55vw]' />
            </label>

            <label>
              <p className='mb-[1vw] mt-[3vw]'>
                Enter Department Headed :
              </p>
              <input name="telnumber" type="text" placeholder='Department Headed' className='text-black rounded-[1vw] text-[3vw] pl-[2vw] h-[6vw] w-[55vw]' />
            </label>
          </div>

          <div className='flex justify-center text-[3.8vw] mt-[8vw]'>
            <p className='border-[0.45vw] rounded-[1vw] text-center text-white py-[1vw] cursor-pointer w-[40vw]'>
              Done
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Fillinfopage;
