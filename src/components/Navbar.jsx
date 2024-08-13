import React from 'react'
import { myImage } from '../assets'

const Navbar = () => {
  return (
    <div>
        <div className='h-[5vw] w-[100vw] border-black border-b-[0.15vw]'>
            <div className='absolute right-[1vw] flex gap-[0.4vw] mt-[0.6vw]'>
                <div>
                    <p className='text-[1vw] font-semibold mt-[0.4vw]'>
                        Martin Maina
                    </p>

                    <p className='text-[1vw] font-bold flex justify-end mt-[-0.1vw]'>
                        Admin
                    </p>
                </div>
                <img src={myImage} className='w-[3.7vw] rounded-[10vw] border-black border-[0.2vw]' />
            </div>
        </div>
    </div>
  )
}

export default Navbar