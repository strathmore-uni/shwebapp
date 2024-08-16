import React from 'react'
import { plusImage } from '../assets'
import Table from './Table'
import Datatable from './Datatable';

const Users = () => {

    

  return (
    <div>
        <div>
            <div className='w-[11vw] absolute right-[1vw] mt-[0.7vw] border-kenya-green border-[0.2vw] rounded-[0.3vw] h-[2.5vw] text-kenya-green flex pl-[0.8vw] gap-[2vw] text-[1.2vw] font-semibold mb-[0.5vw]'>
                <img src={plusImage} className='h-[1.3vw] mt-[0.5vw]' />

                <p className='mt-[0.22vw]'>
                    Add User
                </p>
            </div>
            
            <Datatable />
        </div>
    </div>
  )
}

export default Users