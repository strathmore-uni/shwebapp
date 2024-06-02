import React, { useState } from 'react'
import { coatOfArms, fingerprintIcon } from './assets'
import { useMediaQuery } from 'react-responsive'

const App = () => {

  const mobileScreen = useMediaQuery({ query: '(max-aspect-ratio: 3/3)' });
  const notMobileScreen = useMediaQuery({ query: '(min-aspect-ratio: 3/3)'});

  const [coatLarge, setCoatLarge] = useState(55);
  const [coatTop, setcoatTop] = useState(20);
  const [fingerVisible, setfingerVisible] = useState(1);
  const [fingerDisplay, setfingerDisplay] = useState("block");

  const secondScreen = () => {
    setCoatLarge(30);
    setfingerVisible(0);
    setcoatTop(10);

    // Set a timeout to hide the element after 3 seconds
    setTimeout(() => {
      setfingerDisplay("none");
    }, 1);
  }

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
      

      <div style={{ display: notMobileScreen ? 'none' : 'block' }}>
        <div className='flex justify-center flex-col items-center'>
          <img src={coatOfArms} className='w-[55vw] mt-[20vw]'
            style={{
              width: `${coatLarge}vw`,
              transition: 'width 0.4s ease-in-out, marginTop 0.5s ease-in-out',
              marginTop: `${coatTop}vw`
            }} 
          />

          <div className='flex justify-center flex-col items-center cursor-pointer' onClick={secondScreen}
            style={{
              opacity: `${fingerVisible}`,
              transition: 'opacity 0.2s ease-in-out',
              display: `${fingerDisplay}`
            }}
          >
            <div className='flex justify-center flex-col items-center'>
              <img src={fingerprintIcon} className='w-[25vw] mt-[30vw]' />

              <p className='text-[3.5vw] font-normal text-white mt-[4vw]'>
                Scan fingerprint to Login
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App