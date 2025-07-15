import React from 'react'
import { homeBlack, homeWhite, optionsImg, usersBlack } from '../assets'
import { Link, useLocation } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const Sidepanel = () => {
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
                {/* <Link to="shwebapp/dashboard">
                    <div className='w-[11vw] bg-black border-black border-[0.2vw] rounded-[0.3vw] h-[2.5vw] text-white gap-[0.7vw] text-[1.2vw] font-semibold mb-[0.5vw] text-center'>

                        <p className='mt-[0.27vw]'>
                            Dashboard
                        </p>
                    </div>
                </Link> */}

                <Link to="/shwebapp/dashboard">
                    <div className={`w-[11vw] border-[0.2vw] rounded-[0.3vw] h-[2.5vw] gap-[0.7vw] text-[1.2vw] font-semibold mb-[0.5vw] text-center ${
                        isActive('/shwebapp/dashboard') ? 'bg-black text-white border-black' : 'text-black border-black'
                    }`}>
                        <p className='mt-[0.27vw]'>Dashboard</p>
                    </div>
                </Link>
                

                {/* <Link to="shwebapp/users">
                    <div className='w-[11vw] border-black border-[0.2vw] rounded-[0.3vw] h-[2.5vw] text-black gap-[0.7vw] text-[1.2vw] font-semibold mb-[0.5vw] text-center'>

                        <p className='mt-[0.27vw]'>
                            Users
                        </p>
                    </div> 
                </Link> */}

                <Link to="/shwebapp/users">
                    <div className={`w-[11vw] border-[0.2vw] rounded-[0.3vw] h-[2.5vw] gap-[0.7vw] text-[1.2vw] font-semibold mb-[0.5vw] text-center ${
                        isActive('/shwebapp/users') ? 'bg-black text-white border-black' : 'text-black border-black'
                    }`}>
                        <p className='mt-[0.27vw]'>Users</p>
                    </div>
                </Link>

                {/* <Link to="shwebapp/additions">
                    <div className='w-[11vw] border-black border-[0.2vw] rounded-[0.3vw] h-[2.5vw] text-black gap-[0.7vw] text-[1.2vw] font-semibold mb-[0.5vw] text-center'>

                        <p className='mt-[0.27vw]'>
                            Administration
                        </p>
                    </div> 
                </Link>    */}

                <Link to="/shwebapp/additions">
                    <div className={`w-[11vw] border-[0.2vw] rounded-[0.3vw] h-[2.5vw] gap-[0.7vw] text-[1.2vw] font-semibold mb-[0.5vw] text-center ${
                        isActive('/shwebapp/additions') ? 'bg-black text-white border-black' : 'text-black border-black'
                    }`}>
                        <p className='mt-[0.27vw]'>Administration</p>
                    </div>
                </Link>

                <Link to="shwebapp/logs">
                    <div className={`w-[11vw] border-[0.2vw] rounded-[0.3vw] h-[2.5vw] gap-[0.7vw] text-[1.2vw] font-semibold mb-[0.5vw] text-center ${
                        isActive('/shwebapp/logs') ? 'bg-black text-white border-black' : 'text-black border-black'
                    }`}>
                        {/* <img src={optionsImg} className='h-[1.3vw] mt-[0.5vw]' /> */}

                        <p className='mt-[0.27vw]'>
                            Logs
                        </p>
                    </div> 
                </Link>   

                <button onClick={logout} className="w-[11vw] border-red-500 border-[0.2vw] rounded-[0.3vw] h-[2.5vw] text-red-500 gap-[0.7vw] text-[1.2vw] font-semibold mb-[0.5vw] text-center">
                    Logout
                </button>           
            </div>
        </div>
    </div>
  )
}

export default Sidepanel