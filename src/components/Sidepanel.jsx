import React from 'react'
import { homeBlack, homeWhite } from '../assets'

const Sidepanel = () => {
  return (
    <div>
        <div className='w-[15vw] h-[40vw] border-black border-r-[0.15vw] flex justify-center pt-[1vw]'>
            <div>
                <div className='w-[13vw] bg-black border-black border-[0.2vw] rounded-[0.3vw] h-[2.5vw] pt-[0.35vw] text-white flex pl-[0.6vw] gap-[0.6vw] text-[1.1vw] font-bold mb-[0.5vw]'>
                    <img src={homeWhite} className='h-[1.5vw]' />

                    <p>
                        Dashboard
                    </p>
                </div>

                <div className='w-[13vw]  border-black border-[0.2vw] rounded-[0.3vw] h-[2.5vw] pt-[0.35vw] text-black flex pl-[0.6vw] gap-[0.6vw] text-[1.1vw] font-bold mb-[0.5vw]'>
                    <img src={homeBlack} className='h-[1.5vw]' />

                    <p>
                        Dashboard
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Sidepanel