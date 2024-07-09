import React from 'react'
import { coatOfArms } from '../assets'

const Fillinfopage = () => {
  return (
    <div>
        <div className='flex justify-center pt-[10vw]'>
            <div>
                <img src={coatOfArms} className='h-[30vw]' />
            </div>            
        </div>

        <div className='flex justify-center'>
            <div className='w-[90vw] h-[90vw] bg-white bg-opacity-10 text-white mt-[10vw] border-[0.05vw] rounded-[7vw] pl-[3vw]'>
                <p className='text-[5vw] mt-[4vw]'>
                    Required
                </p>
            </div>
        </div>
    </div>
  )
}

export default Fillinfopage