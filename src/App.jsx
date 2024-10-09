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
import Login from './components/authentication/Login'

const App = () => {
  //UseStates//
  const[myphone,setmyphone]=useState('')
  const[department,setDepartment]=useState('');
  const [sharedString, setSharedString] = useState('');
  const [iDname, setiDname] = useState('');
  const [datetime,setDateTime]= useState('');
  const [liftvisitorTag, setliftvisitorTag] = useState('');
  const [liftBadgeId, setliftBadgeId] = useState('');

  //Responsiveness//
  const mobileScreen = useMediaQuery({ query: '(max-aspect-ratio: 3/3)' });
  const notMobileScreen = useMediaQuery({ query: '(min-aspect-ratio: 3/3)'});

  //Psuedo-Sign-in//
  const guardSignedIn = false;
  const adminSignedIn = false;
  const secSignedIn = false;  

  return (
    <div>
      <Login />

      {mobileScreen && (
        <div>
          {guardSignedIn && (
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
        </div>
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