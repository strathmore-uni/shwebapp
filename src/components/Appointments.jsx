import React, { useState } from 'react'
import { plusImage } from '../assets'
import Datatable from './Datatable';
import Addusers from './Addusers';
import Appointmentstable from './Appointmentstable';
import Addappointment from './Addappointment';

const Appointments = () => {

    const [showUsersForm, setShowUsersForm] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const handleClick = () => {
      setShowUsersForm(true);
    };

  return (
    <div className='pt-[6vw] pl-[14vw]'>
        <div>
            <div className='absolute right-[1vw]'>
              <div className='px-[1vw] py-[0.3vw] mt-[1vw] border-black border-[0.2vw] rounded-[0.3vw] flex justify-center gap-[0.6vw] text-[1.2vw] font-semibold cursor-pointer' onClick={handleClick}>
                  <img src={plusImage} className='h-[0.8vw] mt-[0.45vw]' />

                  <p>
                      Create Appointment
                  </p>
              </div>
            </div>
            
            <Appointmentstable refresh={refresh} />

            {showUsersForm && (
            //   <Addusers setShowUsersForm={setShowUsersForm} refresh={refresh} setRefresh={setRefresh} />
              <Addappointment setShowUsersForm={setShowUsersForm} refresh={refresh} setRefresh={setRefresh} />
            )}
        </div>
    </div>
  )
}

export default Appointments