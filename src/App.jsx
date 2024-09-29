import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom"
import { coatOfArms, fingerprintIcon, signOut } from './assets'
import { useMediaQuery } from 'react-responsive'
import Webcamera from './components/Webcamera'
import Loginpage from './pages/Loginpage'
import Checkinpage from './pages/Checkinpage'
import { Menupage } from './pages/Menupage'
import Fillinfopage from './pages/Fillinfopage'
import Mypage from './pages/Mypage'
import Sidepanel from './components/Sidepanel'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import Users from './components/Users'
import Notfound from './pages/Notfound'
import Secretaryview from './pages/Secretaryview'
import Secsidepanel from './components/Secsidepanel'
import Appointments from './components/Appointments'
import Additions from './pages/Additions'

const App = () => {
  const[myphone,setmyphone]=useState('')
  const[department,setDepartment]=useState('');
  const [sharedString, setSharedString] = useState('');
  const [iDname, setiDname] = useState('');
  const [datetime,setDateTime]= useState('');
  const [liftvisitorTag, setliftvisitorTag] = useState('');
  const [liftBadgeId, setliftBadgeId] = useState('');

const myarray = [myphone, department, sharedString, iDname, datetime];

const obj = Object.assign({}, { info: myarray });

// console.log(obj);

  const mobileScreen = useMediaQuery({ query: '(max-aspect-ratio: 3/3)' });
  const notMobileScreen = useMediaQuery({ query: '(min-aspect-ratio: 3/3)'});
  const guardSignedIn = true;
  const adminSignedIn = false;
  const secSignedIn = true;

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

      
      {/* <BrowserRouter>
        <Routes>
          <Route path="shwebapp/" element={<Loginpage />}></Route>
          <Route path="shwebapp/menu" element={<Menupage />}></Route>
          <Route path="shwebapp/checkedin" element={<Checkinpage sharedString={sharedString} iDname={iDname}  datetime={datetime} department={department} myphone={myphone} />}></Route>
          <Route path='shwebapp/mypage' element={<Mypage myphone={myphone} sharedString={sharedString} iDname={iDname}  datetime={datetime} department={department}   />} />
          <Route path="shwebapp/camera" element={<Webcamera  setSharedString={setSharedString} setiDname={setiDname} />}></Route>
          <Route path="shwebapp/fill" element={<Fillinfopage sharedString={sharedString} iDname={iDname} setmyphone={setmyphone} setDateTime={setDateTime} setDepartment={setDepartment} />}></Route>
        </Routes>
      </BrowserRouter> */}

      {/* <div style={{ display: notMobileScreen ? 'none' : 'block' }}>
        <BrowserRouter>
          <Routes>
            <Route path="shwebapp/" element={<Loginpage />}></Route>
            <Route path="shwebapp/menu" element={<Menupage />}></Route>
            <Route path="shwebapp/checkedin" element={<Checkinpage sharedString={sharedString} iDname={iDname}  datetime={datetime} department={department} myphone={myphone} />}></Route>
            <Route path='shwebapp/mypage' element={<Mypage myphone={myphone} sharedString={sharedString} iDname={iDname}  datetime={datetime} department={department}   />} />
            <Route path="shwebapp/camera" element={<Webcamera  setSharedString={setSharedString} setiDname={setiDname} />}></Route>
            <Route path="shwebapp/fill" element={<Fillinfopage sharedString={sharedString} iDname={iDname} setmyphone={setmyphone} setDateTime={setDateTime} setDepartment={setDepartment} />}></Route>
          </Routes>
        </BrowserRouter>
      </div> */}

      {mobileScreen && (
        <BrowserRouter>
          <Routes>
            <Route path="shwebapp/" element={<Loginpage />}></Route>
            <Route path="shwebapp/menu" element={<Menupage />}></Route>
            <Route path="shwebapp/checkedin" element={<Checkinpage sharedString={sharedString} iDname={iDname}  datetime={datetime} department={department} myphone={myphone} />}></Route>
            <Route path='shwebapp/mypage' element={<Mypage myphone={myphone} sharedString={sharedString} iDname={iDname}  datetime={datetime} department={department} liftvisitorTag={liftvisitorTag} liftBadgeId={liftBadgeId}   />} />
            <Route path="shwebapp/camera" element={<Webcamera  setSharedString={setSharedString} setiDname={setiDname} />}></Route>
            <Route path="shwebapp/fill" element={<Fillinfopage sharedString={sharedString} iDname={iDname} setmyphone={setmyphone} setDateTime={setDateTime} setDepartment={setDepartment} setliftvisitorTag={setliftvisitorTag} setliftBadgeId={setliftBadgeId} />}></Route>
            <Route path="*" element={<Navigate to="/shwebapp/menu" />} />
          </Routes>
        </BrowserRouter>
      )}

      {notMobileScreen && (
        <div>
          {adminSignedIn && (
            <div className='w-screen h-screen bg-grey absolute'>
              <Navbar />
              <div className='flex'>            
                <BrowserRouter>
                  <Sidepanel />

                  <Routes>
                    <Route path="shwebapp/dashboard" element={<Dashboard />}></Route>
                    <Route path="shwebapp/users" element={<Users />}></Route>
                    <Route path="shwebapp/additions" element={<Additions />}></Route>
                    <Route path="*" element={<Navigate to="/shwebapp/dashboard" />} />
                  </Routes>
                </BrowserRouter>
              </div>
            </div>
          )}

          {secSignedIn && (
            <div className='w-screen h-screen bg-grey absolute'>
              <Navbar />
              <div className='flex'>            
                <BrowserRouter>
                  <Secsidepanel />

                  <Routes>                    
                    <Route path="*" element={<Navigate to="/shwebapp/sec" />} />
                    <Route path="shwebapp/sec" element={<Secretaryview />}></Route>
                    <Route path="shwebapp/appointments" element={<Appointments />} />
                  </Routes>
                </BrowserRouter>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default App