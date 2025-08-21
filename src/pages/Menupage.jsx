import React from 'react'
import { Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';

export const Menupage = () => {

    // const logout = () => {
    //     localStorage.removeItem('token');  
    //     window.location.reload();      
    //   };

    const mobileScreen = useMediaQuery({ query: '(max-aspect-ratio: 3/3)' });
    const notMobileScreen = useMediaQuery({ query: '(min-aspect-ratio: 3/3)' });

    const logout = async () => {
        const token = localStorage.getItem('token');
        if (token) {
          const decoded = jwtDecode(token);
          try {
            await axios.post('https://vms.cognitron.co.ke/api/activity/log', {
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


  return (
    <div>
        {/* <div className='flex justify-center pt-[70vw]'>
            <div className='text-white text-[4vw] text-center'>
                <Link to="/shwebapp/camera">
                    <div className='w-[80vw] border rounded-[1.3vw] py-[2.5vw] cursor-pointer'>
                        <p>
                            Registration
                        </p>
                    </div>
                </Link>

                <Link to="/shwebapp/appointmentcamera">
                    <div className='w-[80vw] border rounded-[1.3vw] my-[5vw] py-[2.5vw] cursor-pointer'>
                        <p>
                            Appointment Arrival
                        </p>
                    </div>
                </Link>

                <Link to="/shwebapp/checkedin">
                    <div className='w-[80vw] border rounded-[1.3vw] mt-[5vw] py-[2.5vw] cursor-pointer'>
                        <p>
                            Check-Out
                        </p>
                    </div>
                </Link>   

                <button onClick={logout} className="w-[80vw] border rounded-[1.3vw] mt-[5vw] py-[2.5vw] cursor-pointer">
                    Logout
                </button>         
            </div>
        </div> */}

        {mobileScreen && (
          <div className='flex justify-center pt-[70vw]'>
            <div className='text-white text-[4vw] text-center'>
                <Link to="/shwebapp/camera">
                    <div className='w-[80vw] border rounded-[1.3vw] py-[2.5vw] cursor-pointer'>
                        <p>
                            Registration
                        </p>
                    </div>
                </Link>

                <Link to="/shwebapp/appointmentcamera">
                    <div className='w-[80vw] border rounded-[1.3vw] my-[5vw] py-[2.5vw] cursor-pointer'>
                        <p>
                            Appointment Arrival
                        </p>
                    </div>
                </Link>

                <Link to="/shwebapp/checkedin">
                    <div className='w-[80vw] border rounded-[1.3vw] mt-[5vw] py-[2.5vw] cursor-pointer'>
                        <p>
                            Check-Out
                        </p>
                    </div>
                </Link>   

                <button onClick={logout} className="w-[80vw] rounded-[1.3vw] bg-blue-600 mt-[5vw] py-[2.5vw] cursor-pointer">
                    Logout
                </button>         
            </div>
        </div>
        )}

        {notMobileScreen && (
          <div className='flex justify-center pt-[12vw]'>
            <div className='text-white text-[1.2vw] text-center'>
                <Link to="/shwebapp/camera">
                    <div className='w-[40vw] py-[1.5vw] border rounded-[1vw] cursor-pointer'>
                        <p>
                            Registration
                        </p>
                    </div>
                </Link>

                <Link to="/shwebapp/appointmentcamera">
                    <div className='w-[40vw] py-[1.5vw] border rounded-[1vw] my-[1.5vw] cursor-pointer'>
                        <p>
                            Appointment Arrival
                        </p>
                    </div>
                </Link>

                <Link to="/shwebapp/checkedin">
                    <div className='w-[40vw] py-[1.5vw] border rounded-[1vw] my-[1.5vw] cursor-pointer'>
                        <p>
                            Check-Out
                        </p>
                    </div>
                </Link>   

                <button onClick={logout} className="w-[40vw] py-[1.5vw] bg-blue-600 rounded-[1vw] cursor-pointer">
                    Logout
                </button>         
            </div>
        </div>
        )}
    </div>
  )
}
