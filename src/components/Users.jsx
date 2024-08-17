import React from 'react'
import { plusImage } from '../assets'
import Table from './Table'
import Datatable from './Datatable';
import Addusers from './Addusers';

const Users = () => {

    

  return (
    <div>
        <div>
            <div className='flex justify-end w-[86vw]'>
              <div className='w-[11vw] mt-[1vw] border-black border-[0.15vw] rounded-[0.3vw] h-[2.5vw] flex justify-center pl-[0.8vw] gap-[0.6vw] text-[1.2vw] font-semibold mb-[0.5vw] cursor-pointer'>
                  <img src={plusImage} className='h-[0.8vw] mt-[0.8vw]' />

                  <p className='mt-[0.36vw]'>
                      Add User
                  </p>
              </div>
            </div>
            
            <Datatable />
            <Addusers />
        </div>
    </div>
  )
}

export default Users