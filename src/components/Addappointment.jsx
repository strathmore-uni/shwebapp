import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import axios from 'axios';
import { Toaster, toast } from 'sonner'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Addappointment = ({setShowUsersForm, refresh, setRefresh}) => {

    const [userName, setUserName] = useState('');
    const [eventName, setEventName] = useState('');
    const [visiteemail, setVisiteemail] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('Pending');
    const [visitorTag, setVisitorTag] = useState('Pending');
    const [badgeId, setBadgeId] = useState('Pending');
    const [checkInTime, setCheckInTime] = useState('Pending');
    const [phoneNo, setPhoneNo] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [eventLocation, setEventLocation] = useState('');
    const [AttendeeID, setAttendeeID] = useState('');
    const [venueOptions, setVenueOptions] = useState([]);

    // console.log(selectedDate);
    // const [toastResponse, setToastResponse] = useState('');

    // Fetch Venues from MongoDB API endpoint
    useEffect(() => {
      const fetchVenues = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/eventvenues'); // Replace with your actual API endpoint
          const venues = response.data;

          // Map the data to the format React Select expects
          const formattedOptions = venues.map(venue => ({
            value: venue.eventVenue,
            label: venue.eventVenue
          }));

          setVenueOptions(formattedOptions);
        } catch (error) {
          console.error("Error fetching Venues:", error);
        }
      };

      fetchVenues();
    }, []);


    const handleChange = (selectedOption) => {
      // console.log(`Selected:`, selectedOption);
      setEventLocation(selectedOption.value);    // .value extracts the value from the object created by react select
    };


    const handleSubmit = async () => {

        if (!userName) {
            toast.error('Name is required');
            return;
          }
        if (!AttendeeID) {
          toast.error("Attendees's ID Number is required");
          return;
        }
        if (!eventName) {
          toast.error("Name of the Event or Meeting is required");
          return;
        }
        if (!selectedDate) {
          toast.error('Date is required');
          return;
        }
        if (!eventLocation) {
          toast.error("Add location of where the event/meeting will take place");
          return;
        }
        if (!email) {
          // alert("Email is required");
          toast.error("Visitor's Email address is required");
          return;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
          toast.error("Visitor's Email address is invalid");
          return;
        }
        // if (!visiteemail) {
        //   toast.error("Visitee Email is required");
        //   return;
        // } else if (!/\S+@\S+\.\S+/.test(visiteemail)) {
        //   toast.error("Visitee Email address is invalid");
        //   return;
        // }

        // const formattedDate = selectedDate.toString();
        const dateString = selectedDate.toString();
        const formattedDate = dateString.split('GMT')[0].trim().slice(0, -3); // This removes the 'GMT+0300 (East Africa Time)' part and also the seconds

        // Create an object with the state variables
        const data = {
          name: userName,
          email: email,
          selectedDate: formattedDate,
          AttendeeID: AttendeeID,
          phoneNo: phoneNo,
          eventName: eventName,
          eventLocation: eventLocation,
          status: status,
          visitorTag: visitorTag,
          badgeId: badgeId,
          checkInTime: checkInTime,
        };
    
        try {
          // Send the data to the backend
          const response = await axios.post('http://localhost:5000/api/appointmentsdata', data);
        //   setToastResponse(response.data);
          console.log(response.data); // Log the response from the server
          toast.success(response.data);
          setUserName('');
          setVisiteemail('');
          setEmail('');
          setAttendeeID('');
          setPhoneNo('');
          setSelectedDate(null);
          setEventLocation('');
          setEventName('');
          setEventLocation('');
          setRefresh(!refresh);

        // Prepare the email data to send after the appointment creation
        const emailData = {
          email: email,
          subject: 'Appointment Created',
          message: 'Dear ' + userName + ",<br />An appointment has been setup for you to see [Visitee Name] on " + formattedDate,
        };

        // Send the email data to the backend
        const emailResponse = await fetch('http://localhost:5000/send-appointment-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(emailData), // Use the structured emailData
        });

        const responseData = await emailResponse.text(); // Get response as text

        if (emailResponse.ok) {
          // alert('Email sent successfully!');
          toast.success('Email sent successfully!');
        } else {
          toast.error('Failed to send email');
          console.log(responseData);
        }

        } catch (error) {
          console.error('Error submitting data:', error);
          toast.error('Failed to create a new user');
        }
      };

    const handleClick = () => {
      setShowUsersForm(false);
    };

  return (
    <div>
        <div className='w-screen h-screen absolute left-[0vw] top-[0vw] flex justify-end'>
            <div className='w-screen h-screen bg-black bg-opacity-5 backdrop-blur-[0.1vw] absolute left-[0vw] top-[0vw] flex justify-end z-0' onClick={handleClick}></div>

            <div className='w-[22vw] h-[48vw] absolute right-[0.3vw] top-[0.3vw] bg-white border-border-grey border-[0.2vw] rounded-[0.3vw] flex justify-center pt-[1.5vw] z-10'>
                <div>
                    <div>
                        <p className='text-center font-bold text-[1.2vw]'>
                            CREATE APPOINTMENT
                        </p>

                        <div className='flex justify-center'>
                            <div className='w-[7vw] h-[0.1vw] mt-[0.1vw] mb-[1vw] bg-background-grey'></div>
                        </div>                    
                    </div>

                    <div>
                        <label>
                            <p className='mb-[0.2vw] ml-[0.3vw] text-[1vw]'>
                                Antendee's Full Name :
                            </p>

                            <input name="username" type="text" placeholder='Enter Name' value={userName} className='text-black rounded-[0.3vw] text-[1vw] pl-[0.5vw] h-[2vw] w-[16vw] border-black border-[0.2vw] mb-[0.9vw]'  onChange={e => setUserName(e.target.value)} />
                        </label>

                        <label>
                            <p className='mb-[0.2vw] ml-[0.3vw] text-[1vw]'>
                                Antendee's ID Number :
                            </p>

                            <input name="AttendeeID" type="number" placeholder='Enter ID Number' value={AttendeeID} className='text-black rounded-[0.3vw] text-[1vw] pl-[0.5vw] h-[2vw] w-[16vw] border-black border-[0.2vw] mb-[0.9vw]'  onChange={e => setAttendeeID(e.target.value)} />
                        </label>

                        <label>
                            <p className='mb-[0.2vw] ml-[0.3vw] text-[1vw]'>
                                Antendee's Phone Number :
                            </p>

                            <input name="phoneNo" type="number" placeholder='Enter Phone Number' value={phoneNo} className='text-black rounded-[0.3vw] text-[1vw] pl-[0.5vw] h-[2vw] w-[16vw] border-black border-[0.2vw] mb-[0.9vw]'  onChange={e => setPhoneNo(e.target.value)} />
                        </label>

                        <label>
                            <p className='mb-[0.2vw] ml-[0.3vw] text-[1vw]'>
                                Meeting/Event Name:
                            </p>

                            <input name="eventName" type="text" placeholder='Enter name of Event/Meeting' value={eventName} className='text-black rounded-[0.3vw] text-[1vw] pl-[0.5vw] h-[2vw] w-[16vw] border-black border-[0.2vw] mb-[0.9vw]'  onChange={e => setEventName(e.target.value)} />
                        </label> 

                        <label>
                          <p className='mb-[0.2vw] ml-[0.3vw] text-[1vw]'>
                              Date of Meeting or Event :
                          </p>

                          <div>
                            <DatePicker
                              selected={selectedDate}
                              onChange={(date) => setSelectedDate(date)}
                              showTimeSelect
                              dateFormat="Pp"
                              placeholderText="Select a date and time"
                              className='text-black rounded-[0.3vw] text-[1vw] pl-[0.5vw] h-[2vw] w-[16vw] border-black border-[0.2vw] mb-[0.9vw]'
                            />
                          </div>  
                        </label> 

                        <label>
                            <p className='mb-[0.2vw] ml-[0.3vw] text-[1vw]'>
                                Event/Meeting Location :
                            </p>

                            {/* <input name="eventLocation" type="text" placeholder='Enter Location of Event' value={eventLocation} className='text-black rounded-[0.3vw] text-[1vw] pl-[0.5vw] h-[2vw] w-[16vw] border-black border-[0.2vw] mb-[0.9vw]'  onChange={e => setEventLocation(e.target.value)} /> */}

                            <Select
                                options={venueOptions}
                                onChange={handleChange}
                                placeholder="Select Venue"
                                className='w-[16vw] rounded-[1vw] text-black mb-[0.9vw]'
                            />
                        </label> 

                        <label>
                            <p className='mb-[0.2vw] ml-[0.3vw] text-[1vw]'>
                                Antendee's Email :
                            </p>

                            <input name="email" type="text" placeholder="Email Antendee's Address" value={email} className='text-black rounded-[0.3vw] text-[1vw] pl-[0.5vw] h-[2vw] w-[16vw] border-black border-[0.2vw] mb-[0.9vw]'  onChange={e => setEmail(e.target.value.toLowerCase())} />
                        </label> 

                        {/* <label>
                            <p className='mb-[0.2vw] ml-[0.3vw] text-[1vw]'>
                                Enter Visitee Email :
                            </p>

                            <input name="visiteemail" type="text" placeholder='Enter Visitee Email' value={visiteemail} className='text-black rounded-[0.3vw] text-[1vw] pl-[0.5vw] h-[2vw] w-[16vw] border-black border-[0.2vw] mb-[0.9vw]'  onChange={e => setVisiteemail(e.target.value.toLowerCase())} />
                        </label>                             */}

                        {/* <label>
                            <p className='mb-[0.2vw] ml-[0.3vw] text-[1vw]'>
                                Enter Time of Appointment :
                            </p>

                            <input name="email" type="text" placeholder='Email Address' value={email} className='text-black rounded-[0.3vw] text-[1vw] pl-[0.5vw] h-[2vw] w-[16vw] border-black border-[0.2vw] mb-[0.9vw]'  onChange={e => setEmail(e.target.value.toLowerCase())} />
                        </label>                                               */}
                    </div>

                    <div className='flex justify-center'>
                        <div>
                            <Toaster richColors />
                            
                            <div className='w-[12vw] mt-[2.5vw] border-black bg-black text-white border-[0.15vw] rounded-[0.3vw] h-[2.5vw] flex justify-center text-[1.2vw] font-semibold cursor-pointer' onClick={handleSubmit}>
                                <p className='mt-[0.36vw]'>
                                    Accept
                                </p>
                            </div>

                            <div className='w-[12vw] mt-[0.7vw] border-black border-[0.15vw] rounded-[0.3vw] h-[2.5vw] flex justify-center text-[1.2vw] font-semibold cursor-pointer' onClick={handleClick}>
                                <p className='mt-[0.36vw]'>
                                    Cancel
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Addappointment