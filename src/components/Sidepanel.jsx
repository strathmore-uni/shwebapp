import React from 'react'
import { homeBlack, homeWhite, usersBlack } from '../assets'
import { Link } from 'react-router-dom'

const Sidepanel = () => {
  return (
    <div>
        <div className='w-[13vw] h-[40vw] border-black border-r-[0.15vw] flex justify-center pt-[1vw]'>
            <div>
                <Link to="shwebapp/dashboard">
                    <div className='w-[11vw] bg-black border-black border-[0.2vw] rounded-[0.3vw] h-[2.5vw] text-white flex pl-[0.6vw] gap-[0.7vw] text-[1.2vw] font-bold mb-[0.5vw]'>
                        <img src={homeWhite} className='h-[1.5vw] mt-[0.41vw]' />

                        <p className='mt-[0.27vw]'>
                            Dashboard
                        </p>
                    </div>
                </Link>

                {/* <div className='w-[11vw] border-black border-[0.2vw] hover:bg-black rounded-[0.3vw] h-[2.5vw] text-black flex pl-[0.6vw] gap-[0.7vw] text-[1.2vw] font-semibold mb-[0.5vw]'>
                    <img src={usersBlack} className='h-[1.5vw] mt-[0.41vw]' />

                    <p className='mt-[0.27vw]'>
                        Users
                    </p>
                </div>  */}

                <Link to="/shwebapp/users">
                    <div className='w-[11vw] border-black border-[0.2vw] rounded-[0.3vw] h-[2.5vw] text-black flex pl-[0.6vw] gap-[0.7vw] text-[1.2vw] font-semibold mb-[0.5vw]'>
                        <img src={usersBlack} className='h-[1.5vw] mt-[0.41vw]' />

                        <p className='mt-[0.27vw]'>
                            Users
                        </p>
                    </div> 
                </Link>               
            </div>
        </div>
    </div>
  )
}

export default Sidepanel