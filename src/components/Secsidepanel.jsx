import React from 'react'
import { gatepass, homeBlack, homeWhite, preRegisterIcon, usersBlack } from '../assets'
import { Link } from 'react-router-dom'

const Secsidepanel = () => {

    const logout = () => {
        localStorage.removeItem('token');  
        window.location.reload();      
      };

  return (
    <div>
        <div className='w-[13vw] h-[43.6vw] shadow-lg z-20 mr-[0.2vw] flex justify-center pt-[1vw]'>
            <div>
                <Link to="shwebapp/sec">
                    <div className='w-[11vw] bg-black border-black border-[0.2vw] rounded-[0.3vw] h-[2.5vw] text-white flex pl-[0.6vw] gap-[0.7vw] text-[1.2vw] font-bold mb-[0.5vw]'>
                        <img src={homeWhite} className='h-[1.5vw] mt-[0.41vw]' />

                        <p className='mt-[0.27vw]'>
                            Home
                        </p>
                    </div>
                </Link>

                {/* <Link to="shwebapp/appointments">
                    <div className='w-[11vw] border-black border-[0.2vw] rounded-[0.3vw] h-[2.5vw] text-black flex pl-[0.6vw] gap-[0.7vw] text-[1.1vw] font-semibold mb-[0.5vw]'>
                        <img src={usersBlack} className='h-[1.5vw] mt-[0.41vw]' />

                        <p className='mt-[0.35vw]'>
                            Appointments
                        </p>
                    </div> 
                </Link> */}

                <Link to="shwebapp/appointments">
                    <div className='w-[11vw] border-black border-[0.2vw] rounded-[0.3vw] h-[2.5vw] text-black flex pl-[0.6vw] gap-[0.7vw] text-[1.1vw] font-semibold mb-[0.5vw]'>
                        <img src={gatepass} className='h-[1.5vw] mt-[0.41vw]' />

                        <p className='mt-[0.35vw]'>
                            Gate Pass
                        </p>
                    </div> 
                </Link> 

                <Link to="shwebapp/appointments">
                    <div className='w-[11vw] border-black border-[0.2vw] rounded-[0.3vw] h-[2.5vw] text-black flex pl-[0.6vw] gap-[0.7vw] text-[1.1vw] font-semibold mb-[0.5vw]'>
                        <img src={preRegisterIcon} className='h-[1.5vw] mt-[0.41vw]' />

                        <p className='mt-[0.35vw]'>
                            Registration
                        </p>
                    </div> 
                </Link>   

                <button onClick={logout} className="w-[11vw] border-red-500 border-[0.2vw] rounded-[0.3vw] h-[2.5vw] text-red-500 text-center gap-[0.7vw] text-[1.1vw] font-semibold mb-[0.5vw]">
                    Logout
                </button>                   
            </div>
        </div>
    </div>
  )
}

export default Secsidepanel