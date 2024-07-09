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
            <div className='w-[85vw] pb-[4vw] bg-white bg-opacity-10 text-white mt-[10vw] border-[0.05vw] rounded-[6vw] pl-[4vw]'>
                <p className='text-[3.8vw] mt-[4vw] font-semibold'>
                    REQUIRED
                </p>

                <div className='pt-[2vw]'>
                    <label>
                        Enter phone number : <br />
                         <input name="telnumber" type="number" placeholder='Enter phone number' className='text-black mt-[0.5vw] rounded-[1vw] pl-[1vw]'/>
                    </label>

                    <br />

                    <label>
                        Enter Check-in time : <br />
                         <input name="telnumber" type="number" placeholder='should be automatic' className='text-black mt-[0.5vw] rounded-[1vw]'/>
                    </label>

                    <br />

                    <label>
                        Enter Destination : <br />
                         <input name="telnumber" type="text" placeholder='should be automatic' className='text-black mt-[0.5vw] rounded-[1vw]'/>
                    </label>
                </div>
                
                <div className='flex justify-center text-[3.8vw] mt-[6vw]'>
                    <p className='border-[0.45vw] rounded-[1vw] text-center text-white py-[1vw] cursor-pointer w-[40vw]'>
                        Done
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Fillinfopage