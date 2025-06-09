import React from 'react'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { coatOfArms, fingerprintIcon } from '../assets'

const Loginpage = () => {

    const mobileScreen = useMediaQuery({ query: '(max-aspect-ratio: 3/3)' });
    const notMobileScreen = useMediaQuery({ query: '(min-aspect-ratio: 3/3)'});

  return (
    <div>
        <div style={{ display: notMobileScreen ? 'none' : 'block' }}>
            <div className='flex justify-center flex-col items-center'>
                <img src={coatOfArms} className='w-[55vw] mt-[20vw] z-10'/>

                <div className='flex justify-center flex-col items-center cursor-pointer absolute bottom-[10vw]'>
                    <Link to="/shwebapp/menu">
                        <div className='flex justify-center flex-col items-center'>
                            <img src={fingerprintIcon} className='w-[25vw]' />

                            <p className='text-[3.5vw] font-normal text-white mt-[4vw]'>
                                Monday 10.01
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Loginpage