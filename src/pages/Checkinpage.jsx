import React from 'react'
import { coatOfArms } from '../assets'

const Checkinpage = ({myphone, sharedString, iDname,datetime,department,setFulldata}) => {
  return (
    <div>
        <div className='flex justify-center pt-[10vw]'>
            <div>
                <img src={coatOfArms} className='h-[30vw]' alt='Coat of Arms' />
            </div>
        </div>

        <div className='flex justify-center'>
        <div>
          <div className='w-[85vw] pb-[3vw] bg-white bg-opacity-10 text-white mt-[10vw] border-[0.05vw] rounded-[6vw] pl-[4vw]'>
            <p className='text-[3.8vw] mt-[5vw] font-semibold'>
            {iDname}
            </p>

            <div className='pt-[2vw]'>
              <div className='mb-[2.5vw] flex'>
                <p className='font-light'>
                  ID :
                </p>

                <p className='font-bold pl-[1.5vw]'>
                  {sharedString}
                </p>
              </div>

              <div className='mb-[2.5vw] flex'>
                <p className='font-light'>
                  Phone Number :
                </p>

                <p className='font-bold pl-[1.5vw]'>
                  {myphone}
                </p>
              </div>

              <div className='mb-[2.5vw] flex'>
                <p className='font-light'>
                  Check-in Time :
                </p>

                <p className='font-bold pl-[1.5vw]'>
                  {datetime}
                </p>
              </div>

              <div className='mb-[2.5vw] flex'>
                <p className='font-light'>
                  Destination :
                </p>

                <p className='font-bold pl-[1.5vw]'>
                  {department}
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
    </div>
  )
}

export default Checkinpage