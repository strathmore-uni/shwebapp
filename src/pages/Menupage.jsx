import React from 'react'
import { Link } from 'react-router-dom'

export const Menupage = () => {
  return (
    <div>
        <div className='flex justify-center pt-[70vw]'>
            <div className='text-white text-[4vw] text-center'>
                <Link to="/shwebapp/camera">
                    <div className='w-[80vw] border rounded-[1.3vw] py-[2.5vw] cursor-pointer'>
                        <p>
                            Registration
                        </p>
                    </div>
                </Link>

                <div className='w-[80vw] border rounded-[1.3vw] my-[5vw] py-[2.5vw] cursor-pointer'>
                    <p>
                        Appointment Arrival
                    </p>
                </div>

                <Link to="/shwebapp/checkedin">
                    <div className='w-[80vw] border rounded-[1.3vw] py-[2.5vw] cursor-pointer'>
                        <p>
                            Checked-In
                        </p>
                    </div>
                </Link>            
            </div>
        </div>
    </div>
  )
}
