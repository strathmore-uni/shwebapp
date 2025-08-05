import React from 'react'
import { gatepass, homeBlack, homeWhite, preRegisterIcon, usersBlack } from '../assets'
import { Link, useLocation } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const Secsidepanel = () => {
    const location = useLocation();

    // const logout = () => {
    //     localStorage.removeItem('token');  
    //     localStorage.clear();
    //     window.location.reload();      
    //   };


    const logout = async () => {
        const token = localStorage.getItem('token');
        if (token) {
          const decoded = jwtDecode(token);
          try {
            await axios.post('http://localhost:5000/api/activity/log', {
              staffid: decoded.staffid,
              username: decoded.name,
              role: decoded.role,
              action: 'logout'
            });
          } catch (err) {
            console.error('Failed to log logout activity', err);
          }
        }
      
        localStorage.clear();
        window.location.reload();
      };


    // Function to determine if the link is active
    const isActive = (path) => location.pathname.includes(path);

  return (
    <div>
        <div className='w-[13vw] h-[43.6vw] fixed shadow-lg z-20 mr-[0.2vw] flex justify-center mt-[5vw] pt-[1vw]'>
            <div>
                <Link to="shwebapp/sec">
                    <div className={`w-[11vw] border-[0.2vw] rounded-[0.3vw] h-[2.5vw] gap-[0.7vw] text-[1.2vw] font-semibold mb-[0.5vw] text-center ${
                        isActive('/shwebapp/sec') ? 'bg-black text-white border-black' : 'text-black border-black'
                    }`}>
                        {/* <img src={homeWhite} className='h-[1.5vw] mt-[0.41vw]' /> */}

                        <p className='mt-[0.27vw]'>
                            Home
                        </p>
                    </div>
                </Link>

                <Link to="shwebapp/appointments">
                    <div className={`w-[11vw] border-[0.2vw] rounded-[0.3vw] h-[2.5vw] gap-[0.7vw] text-[1.2vw] font-semibold mb-[0.5vw] text-center ${
                        isActive('/shwebapp/appointments') ? 'bg-black text-white border-black' : 'text-black border-black'
                    }`}>
                        {/* <img src={usersBlack} className='h-[1.5vw] mt-[0.41vw]' /> */}

                        <p className='mt-[0.35vw]'>
                            Appointments
                        </p>
                    </div> 
                </Link>

                {/* <Link to="shwebapp/appointments">
                    <div className='w-[11vw] border-black border-[0.2vw] rounded-[0.3vw] h-[2.5vw] text-black flex pl-[0.6vw] gap-[0.7vw] text-[1.1vw] font-semibold mb-[0.5vw]'>
                        <img src={gatepass} className='h-[1.5vw] mt-[0.41vw]' />

                        <p className='mt-[0.35vw]'>
                            Gate Pass
                        </p>
                    </div> 
                </Link>  */}

                {/* <Link to="shwebapp/appointments">
                    <div className='w-[11vw] border-black border-[0.2vw] rounded-[0.3vw] h-[2.5vw] text-black flex pl-[0.6vw] gap-[0.7vw] text-[1.1vw] font-semibold mb-[0.5vw]'>
                        <img src={preRegisterIcon} className='h-[1.5vw] mt-[0.41vw]' />

                        <p className='mt-[0.35vw]'>
                            Registration
                        </p>
                    </div> 
                </Link>    */}

                <button onClick={logout} className="w-[11vw] border-red-500 border-[0.2vw] rounded-[0.3vw] h-[2.5vw] text-red-500 text-center gap-[0.7vw] text-[1.1vw] font-semibold mb-[0.5vw]">
                    Logout
                </button>                   
            </div>
        </div>
    </div>
  )
}

export default Secsidepanel