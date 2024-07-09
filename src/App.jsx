import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { coatOfArms, fingerprintIcon, signOut } from './assets'
import { useMediaQuery } from 'react-responsive'
import Webcamera from './components/Webcamera'
import Loginpage from './pages/Loginpage'
import { Menupage } from './pages/Menupage'

const App = () => {

  // const mobileScreen = useMediaQuery({ query: '(max-aspect-ratio: 3/3)' });
  // const notMobileScreen = useMediaQuery({ query: '(min-aspect-ratio: 3/3)'});

  // const [coatLarge, setCoatLarge] = useState(55);
  // const [coatTop, setcoatTop] = useState(20);
  // const [fingerVisible, setfingerVisible] = useState(1);
  // const [fingerDisplay, setfingerDisplay] = useState("visible");
  // const [signOutVisible, setSignOutVisible] = useState("none");
  // const [registrationButton, setRegistrationButton] = useState("block");
  // const [cameraVisible, setCameraVisible] = useState("none");

  
  // //Registration Page
  // const [menuhide, setMenuHide] = useState("none");

  // const secondScreen = () => {
  //   setCoatLarge(30);
  //   setfingerVisible(0);
  //   setcoatTop(10);
  //   setMenuHide("block");
  //   setSignOutVisible("block")

  //   // Set a timeout to hide the element after 3 seconds
  //   setTimeout(() => {
  //     setfingerDisplay("hidden");
  //   }, 3);
  // }

  // const firstScreen = () => {
  //   setCoatLarge(55);
  //   setfingerVisible(1);
  //   setcoatTop(20);
  //   setMenuHide("none");
  //   setSignOutVisible("none")

  //   // Set a timeout to hide the element after 3 seconds
  //   setTimeout(() => {
  //     setfingerDisplay("hidden");
  //   }, 3);
  // }

  // const cameraScreen = () => {
  //   setMenuHide("none");
  //   setSignOutVisible("none");
  //   setCameraVisible("block");
  //   setCoatLarge(20);
  //   setcoatTop(3);
  // }

  return (
    <div>
      {/* <div style={{ display: mobileScreen ? 'none' : 'block' }}>
        <div className='absolute top-[13vw] flex text-white left-[10vw]'>
          <img src={coatOfArms} className='w-[35vw]' />

          <p>
            Welcom to Digital Learning Visitor's Management System
          </p>
        </div>
      </div>      
      

      <div style={{ display: notMobileScreen ? 'none' : 'block' }}>
        <div className='flex justify-center flex-col items-center'>
          <img src={coatOfArms} className='w-[55vw] mt-[20vw] z-10'
            style={{
              width: `${coatLarge}vw`,
              transition: 'width 0.4s ease-in-out, marginTop 0.5s ease-in-out',
              marginTop: `${coatTop}vw`
            }} 
          />

          <div className='flex justify-center flex-col items-center cursor-pointer absolute bottom-[10vw]' onClick={secondScreen}
            style={{
              opacity: `${fingerVisible}`,
              transition: 'opacity 0.2s ease-in-out',
              // display: `${fingerDisplay}`
              // visibility: `${fingerDisplay}`
            }}
          >
            <div className='flex justify-center flex-col items-center'>
              <img src={fingerprintIcon} className='w-[25vw]' />

              <p className='text-[3.5vw] font-normal text-white mt-[4vw]'>
                Scan fingerprint to Login
              </p>
            </div>
          </div>


          <div className='text-white text-[4vw] absolute top-[60vw] text-center'
            style={{
              display: `${menuhide}`
            }}
          >
            <div className='w-[80vw] border rounded-[1.3vw] py-[2.5vw] cursor-pointer' onClick={cameraScreen}>
              <p>
                Registration
              </p>
            </div>

            <div className='w-[80vw] border rounded-[1.3vw] my-[5vw] py-[2.5vw] cursor-pointer'>
              <p>
                Appointment Arrival
              </p>
            </div>

            <div className='w-[80vw] border rounded-[1.3vw] py-[2.5vw] cursor-pointer'>
              <p>
                Checked-In
              </p>
            </div>            
          </div>

          <div className='absolute bottom-[11vw] cursor-pointer' onClick={firstScreen}
            style={{
              display: `${signOutVisible}`
            }}
          >
            <img src={signOut} className='w-[16vw]' />
          </div>

          <div className='w-[80vw] absolute top-[13vw]'
            style={{
              display: `${cameraVisible}`
            }}
          >
            

            <Webcamera />

            <p className='text-[3.5vw] font-normal text-center text-white mt-[4vw]'>
              Scan ID to Register Person
            </p>
          </div>
        </div>
      </div> */}

      
      <BrowserRouter>
        <Routes>
          <Route path="shwebapp/" element={<Loginpage />}></Route>
          <Route path="shwebapp/menu" element={<Menupage />}></Route>
          <Route path="shwebapp/camera" element={<Webcamera />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App