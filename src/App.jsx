import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

import Webcamera from './components/Webcamera';
import Checkinpage from './pages/Checkinpage';
import { Menupage } from './pages/Menupage';
import Fillinfopage from './pages/Fillinfopage';
import Mypage from './pages/Mypage';
import Sidepanel from './components/Sidepanel';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import Secretaryview from './pages/Secretaryview';
import Secsidepanel from './components/Secsidepanel';
import Appointments from './components/Appointments';
import Additions from './pages/Additions';
import Notfound from './pages/Notfound';
import { Toaster, toast } from 'sonner'
import Logs from './pages/Logs';
import AppointmentCamera from './components/AppointmentCamera';
import AppointmentFillinfo from './components/AppointmentFillinfo';

const App = () => {
  // App state
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(null);
  const [staffid, setStaffid] = useState('');
  const [password, setPassword] = useState('');
  const [profile, setProfile] = useState('');

  const [myphone, setmyphone] = useState('');
  const [department, setDepartment] = useState('');
  const [sharedString, setSharedString] = useState('');
  const [iDname, setiDname] = useState('');
  const [datetime, setDateTime] = useState('');
  const [liftvisitorTag, setliftvisitorTag] = useState('');
  const [liftBadgeId, setliftBadgeId] = useState('');

  const [attendeeName, setAttendeeName] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [attendeeIDNo, setAttendeeIDNo] = useState('');
  const [licencePlateNo, setLicencePlateNo] = useState('N/a');
  // console.log(attendeeName);

  // Screen detection
  const mobileScreen = useMediaQuery({ query: '(max-aspect-ratio: 3/3)' });
  const notMobileScreen = useMediaQuery({ query: '(min-aspect-ratio: 3/3)' });

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setRole(decoded.role);
      setProfile(decoded.name);
      console.log("Decoded role:", decoded.role);
      console.log("profile: ", decoded.staffid);
    }
  }, [token]);

  const handleLogin = async () => {
    if (!staffid) {
      toast.error('Enter User ID');
    } else {
      if (!password) {
        toast.error('Enter Password')
      } else {
          try {
            const res = await axios.post('http://localhost:5001/login', { staffid, password });
            const token = res.data.token;
            localStorage.setItem('token', token);
            setToken(token);
            const decoded = jwtDecode(token);
            setRole(decoded.role);

            // ✅ Log login activity
            await axios.post('${process.env.REACT_APP_API_URL}/api/activity/log', {
              staffid: decoded.staffid,
              username: decoded.name,
              role: decoded.role,
              action: 'login'
            });

          } catch {
            toast.error('Invalid User ID or Password');
          }
      }
    }

    // try {
    //   const res = await axios.post('http://localhost:5000/login', { email, password });
    //   const token = res.data.token;
    //   localStorage.setItem('token', token);
    //   setToken(token);
    //   const decoded = jwtDecode(token);
    //   setRole(decoded.role);
    // } catch {
    //   toast.error('Invalid User ID or Password');
    // }
  };

  // const logout = () => {
  //   localStorage.removeItem('token');
  //   setToken(null);
  //   setRole(null);
  // };


  const logout = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      try {
        await axios.post('${process.env.REACT_APP_API_URL}/api/activity/log', {
          staffid: decoded.staffid,
          username: decoded.name,
          role: decoded.role,
          action: 'logout'
        });
      } catch (err) {
        console.error('Failed to log logout activity', err);
      }
    }
  
    localStorage.removeItem('token');
    setToken(null);
    setRole(null);
  };


  // login UI
  if (!token) {
    return (
      // <div className='flex flex-col items-center justify-center h-screen '>
      //   <div className="flex flex-col">
      //     <h2 className="text-white text-[3vw] font-bold text-center pb-[1vw]">Login</h2>
      //     <input
      //       className="border px-[12vw] py-[2vw] text-center rounded-[1vw] mb-[1vw]"
      //       placeholder="Enter User ID"
      //       onChange={(e) => setEmail(e.target.value)}
      //     />
      //     <input
      //       type="password"
      //       className="border px-[12vw] py-[2vw] text-center rounded-[1vw] mb-[1vw]"
      //       placeholder="Enter Password"
      //       onChange={(e) => setPassword(e.target.value)}
      //     />
      //     <button className="bg-blue-600 text-white px-4 py-2 rounded-[1vw]" onClick={handleLogin}>
      //       Login
      //     </button>

      //     <Toaster richColors position="top-center" />
      //   </div>
      // </div>
      
      <div>
        {mobileScreen && (
          <div className='flex flex-col items-center justify-center pt-[28vh]'>
          <div className="flex flex-col">
            <h2 className="text-white text-[8vw] font-bold text-center pb-[1vw]">Login.</h2>
            <input
              className="border px-[12vw] py-[3vw] text-center rounded-[1vw]"
              placeholder="Enter User ID"
              onChange={(e) => setStaffid(e.target.value)}
            />
            <input
              type="password"
              className="border px-[12vw] py-[3vw] text-center rounded-[1vw] my-[1.5vw]"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="bg-blue-600 text-white px-[12vw] py-[3vw] rounded-[1vw]" onClick={handleLogin}>
              Login
            </button>
  
            <Toaster richColors position="top-center" />
          </div>
        </div>
        )}

        {notMobileScreen && (
          <div className='flex flex-col items-center justify-center pt-[25vh]'>
            <div className="flex flex-col">
              <h2 className="text-white text-[3vw] font-bold text-center pb-[1vw]">Login</h2>
              <input
                className="border px-[5vw] py-[0.8vw] text-center rounded-[0.5vw]"
                placeholder="Enter User ID"
                onChange={(e) => setStaffid(e.target.value)}
              />
              <input
                type="password"
                className="border px-[5vw] py-[0.8vw] text-center rounded-[0.5vw] my-[0.5vw]"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="bg-blue-600 text-white px-[5vw] py-[0.8vw] rounded-[0.5vw]" onClick={handleLogin}>
                Login
              </button>
    
              <Toaster richColors position="top-center" />
            </div>
          </div>
        )}
      </div>
    );
  }

  // Main UI based on roles
  return (
    <div>
      {/* <button onClick={logout} className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded">
        Logout
      </button> */}

      {mobileScreen && role === 'Guard' && (
        <BrowserRouter>
          <Routes>
            <Route path="shwebapp/menu" element={<Menupage />} />
            <Route path="shwebapp/checkedin" element={<Checkinpage sharedString={sharedString} iDname={iDname} datetime={datetime} department={department} myphone={myphone} />} />
            <Route path='shwebapp/mypage' element={<Mypage myphone={myphone} sharedString={sharedString} iDname={iDname} datetime={datetime} department={department} liftvisitorTag={liftvisitorTag} liftBadgeId={liftBadgeId} licencePlateNo={licencePlateNo} />} />
            <Route path="shwebapp/camera" element={<Webcamera setSharedString={setSharedString} setiDname={setiDname} />} />
            <Route path="shwebapp/fill" element={<Fillinfopage sharedString={sharedString} iDname={iDname} setmyphone={setmyphone} setDateTime={setDateTime} setDepartment={setDepartment} setliftvisitorTag={setliftvisitorTag} setliftBadgeId={setliftBadgeId} setLicencePlateNo={setLicencePlateNo} />} />
            <Route path="shwebapp/appointmentcamera" element={<AppointmentCamera setAttendeeName={setAttendeeName} setAttendeeIDNo={setAttendeeIDNo} setEventLocation={setEventLocation} />} />
            <Route path="shwebapp/appointmentfillinfo" element={<AppointmentFillinfo attendeeName={attendeeName} eventLocation={eventLocation} attendeeIDNo={attendeeIDNo} />} />
            <Route path="*" element={<Navigate to="/shwebapp/menu" />} />
          </Routes>
        </BrowserRouter>
      )}

      {role === 'Admin' && (
        <div className='w-screen bg-grey absolute'>
          <Navbar profile={profile} role={role} />
          <div className='flex'>
            <BrowserRouter>
              <Sidepanel />
              <Routes>
                <Route path="shwebapp/dashboard" element={<Dashboard />} />
                <Route path="shwebapp/users" element={<Users />} />
                <Route path="shwebapp/additions" element={<Additions />} />
                <Route path="shwebapp/logs" element={<Logs />} />
                <Route path="*" element={<Navigate to="/shwebapp/dashboard" />} />
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      )}

      {role === 'Receptionist' && (
        <div className='w-screen h-screen bg-grey absolute'>
          <Navbar profile={profile} role={role} />
          <div className='flex'>
            <BrowserRouter>
              <Secsidepanel />
              <Routes>
                <Route path="shwebapp/sec" element={<Secretaryview />} />
                <Route path="shwebapp/appointments" element={<Appointments />} />
                <Route path="*" element={<Navigate to="/shwebapp/sec" />} />
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
