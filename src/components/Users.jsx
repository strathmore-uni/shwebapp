import React, { useState } from 'react'
import { plusImage } from '../assets'
import Table from './Table'
import Datatable from './Datatable';
import Addusers from './Addusers';

const Users = () => {

    const [showUsersForm, setShowUsersForm] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const handleClick = () => {
      setShowUsersForm(true);
    };

    // console.log(refresh);

  return (
    <div>
        <div>
            <div className='absolute right-[1vw]'>
              <div className='px-[1vw] py-[0.3vw] mt-[1vw] border-black border-[0.2vw] rounded-[0.3vw] h-[2.5vw] flex justify-center pl-[0.8vw] gap-[0.6vw] text-[1.2vw] font-semibold mb-[0.5vw] cursor-pointer' onClick={handleClick}>
                  <img src={plusImage} className='h-[0.8vw] mt-[0.45vw]' />

                  <p>
                      Add User
                  </p>
              </div>
            </div>
            
            <Datatable refresh={refresh} />

            {showUsersForm && (
              <Addusers setShowUsersForm={setShowUsersForm} refresh={refresh} setRefresh={setRefresh} />
            )}
        </div>
    </div>
  )
}

export default Users