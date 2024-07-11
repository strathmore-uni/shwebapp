import React, { useEffect, useState } from 'react';
import { coatOfArms, cameraIcon } from '../assets';
import { useNavigate } from 'react-router-dom';

const Fillinfopage = ({ sharedString, iDname,setmyphone,setDateTime,setDepartment }) => {
  console.log(sharedString, iDname);
const navigate = useNavigate();
  const [phoneno, setphoneno] = useState('');

  const [showTime] = useState(getFormattedDate())
  
  const [dept, setdept] = useState('');



  const handlesubmit = () => {
    setDepartment(dept);
  setmyphone(phoneno);

    navigate('/shwebapp/mypage')
 
  }

  
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
  setDateTime(showTime);
  console.log(showTime)

  return (
    <div>
      <div className='flex justify-center pt-[10vw]'>
        <div>
          <img src={coatOfArms} className='h-[30vw]' alt='Coat of Arms' />
        </div>
      </div>
      
    

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
                Enter phone number :
              </p>
              <input name="telnumber" type="number" placeholder='Phone number' className='text-black rounded-[1vw] text-[3vw] pl-[2vw] h-[6vw] w-[55vw]'  onChange={e => setphoneno(e.target.value)} />
            </label>

            <label>
              <p className='mb-[1vw] mt-[2.5vw]'>
                Enter Department Headed :
              </p>
              <input name="telnumber" type="text" placeholder='Department Headed' className='text-black rounded-[1vw] text-[3vw] pl-[2vw] h-[6vw] w-[55vw]'  onChange={e => setdept(e.target.value)}/>
            </label>

            <div className='mt-[2.5vw]'>
              <p className=''>
                Take picture of Vehicle's Licence Plate :
              </p>

              <img src={cameraIcon} className='h-[13vw] mt-[2vw] pl-[1vw] cursor-pointer' />              
            </div>
          </div>

          <div className='flex justify-center text-[3.8vw] mt-[8vw]'>
            <p className='border-[0.45vw] rounded-[1vw] text-center text-white py-[1vw] cursor-pointer w-[40vw]' onClick={handlesubmit} >
              Done
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Fillinfopage;
