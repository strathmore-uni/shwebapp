import React from 'react'
import { coatOfArms, fingerprintIcon } from './assets'
import { useMediaQuery } from 'react-responsive'

const App = () => {

  const mobileScreen = useMediaQuery({ query: '(max-aspect-ratio: 3/3)' });
  const notMobileScreen = useMediaQuery({ query: '(max-aspect-ratio: 3/3)'});

  return (
    <div>
      <div style={{ display: mobileScreen ? 'none' : 'block' }}>
        <div className='absolute top-[13vw] flex text-white left-[10vw]'>
          <img src={coatOfArms} className='w-[35vw]' />

          <p>
            Welcom to Digital Learning Visitor's Management System
          </p>
        </div>
      </div>

      
      <div className='flex justify-center flex-col items-center'>
        <img src={coatOfArms} className='w-[55vw] mt-[20vw]' />

        <img src={fingerprintIcon} className='w-[20vw] mt-[38vw]' />

        <p className='text-[3vw] font-normal text-white mt-[3vw]'>
          Scan fingerprint to Login
        </p>
      </div>
    </div>
  )
}

export default App