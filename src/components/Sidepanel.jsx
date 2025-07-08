import React from 'react'
import { homeBlack, homeWhite, optionsImg, usersBlack } from '../assets'
import { Link } from 'react-router-dom'

const Sidepanel = () => {

    const logout = () => {
        localStorage.removeItem('token');  
        window.location.reload();      
      };

  return (
    <div>
        <div className='w-[13vw] h-[43.6vw] shadow-lg z-20 mr-[0.2vw] flex justify-center pt-[1vw]'>
            <div>
                <Link to="shwebapp/dashboard">
                    <div className='w-[11vw] bg-black border-black border-[0.2vw] rounded-[0.3vw] h-[2.5vw] text-white gap-[0.7vw] text-[1.2vw] font-semibold mb-[0.5vw] text-center'>
                        {/* <img src={homeWhite} className='h-[1.5vw] mt-[0.41vw]' /> */}

                        <p className='mt-[0.27vw]'>
                            Dashboard
                        </p>
                    </div>
                </Link>

                <Link to="shwebapp/users">
                    <div className='w-[11vw] border-black border-[0.2vw] rounded-[0.3vw] h-[2.5vw] text-black gap-[0.7vw] text-[1.2vw] font-semibold mb-[0.5vw] text-center'>
                        {/* <img src={usersBlack} className='h-[1.5vw] mt-[0.41vw]' /> */}

                        <p className='mt-[0.27vw]'>
                            Users
                        </p>
                    </div> 
                </Link>

                <Link to="shwebapp/additions">
                    <div className='w-[11vw] border-black border-[0.2vw] rounded-[0.3vw] h-[2.5vw] text-black gap-[0.7vw] text-[1.2vw] font-semibold mb-[0.5vw] text-center'>
                        {/* <img src={optionsImg} className='h-[1.3vw] mt-[0.5vw]' /> */}

                        <p className='mt-[0.27vw]'>
                            Administration
                        </p>
                    </div> 
                </Link>   

                <Link to="">
                    <div className='w-[11vw] border-black border-[0.2vw] rounded-[0.3vw] h-[2.5vw] text-black gap-[0.7vw] text-[1.2vw] font-semibold mb-[0.5vw] text-center'>
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