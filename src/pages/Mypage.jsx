import React from 'react'
import { coatOfArms } from '../assets'

export default function Mypage({myphone}) {
  console.log(myphone)
  return (
    <div>
      {/* <h1 className='text-white'>Mypage{myphone}</h1> */}

      <div className='flex justify-center pt-[10vw]'>
        <div>
          <img src={coatOfArms} className='h-[30vw]' alt='Coat of Arms' />
        </div>
      </div>

      <div className='flex justify-center'>
        <div>
          <div className='w-[85vw] pb-[6vw] bg-white bg-opacity-10 text-white mt-[10vw] border-[0.05vw] rounded-[6vw] pl-[4vw]'>
            <p className='text-[3.8vw] mt-[5vw] font-semibold'>
              VISITOR'S INFORMATION
            </p>

            <div className='pt-[2vw]'>
              <div className='mb-[2.5vw]'>
                <p className=''>
                  Name :
                </p>

                <p className='font-bold pl-[1.5vw]'>
                  Sample
                </p>
              </div>

              <div className='mb-[2.5vw]'>
                <p className=''>
                  ID Number :
                </p>

                <p className='font-bold pl-[1.5vw]'>
                  Sample
                </p>
              </div>

              <div className='mb-[2.5vw]'>
                <p className=''>
                  Check-in Time :
                </p>

                <p className='font-bold pl-[1.5vw]'>
                  TODO
                </p>
              </div>

              <label>
                <p className='mb-[1vw]'>
                  Enter phone number :
                </p>

                <p className='font-bold pl-[1.5vw]'>
                  {myphone}
                </p>              
              </label>

              <label>
                <p className='mb-[1vw] mt-[2.5vw]'>
                  Enter Department Headed :
                </p>
                
                <p className='font-bold pl-[1.5vw]'>
                  Sample
                </p>
              </label>

              <div className='mt-[2.5vw]'>
                <p className=''>
                  Licence Plate :
                </p>

                <p className='font-bold pl-[1.5vw]'>
                  TODO
                </p>             
              </div>
            </div>

            
          </div>

          <div className='flex justify-center text-[3.8vw] my-[3vw]'>
            <p className='border-[0.45vw] rounded-[1vw] text-center text-black bg-white font-semibold py-[1vw] cursor-pointer w-[60vw]' >
              COMPLETE REGISTRATION
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
