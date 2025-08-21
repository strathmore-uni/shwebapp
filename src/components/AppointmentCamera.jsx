import React, { useRef, useState, useEffect, useCallback } from 'react'
import Webcam from 'react-webcam'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { shutter } from '../assets'
import { useMediaQuery } from 'react-responsive';

const AppointmentCamera = ({setAttendeeName, setEventLocation, setAttendeeIDNo}) => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const history = useNavigate();
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);
    const [sharedString, setSharedString] = useState('');
    const [iDname, setiDname] = useState('');
    const [myphone, setmyphone] = useState('');

    const [image, setImage] = useState(null);
    const [results, setResults] = useState({});

    const [animate, setAnimate] = useState(false);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const [matched, setMatched] = useState(false);

    const mobileScreen = useMediaQuery({ query: '(max-aspect-ratio: 3/3)' });
    const notMobileScreen = useMediaQuery({ query: '(min-aspect-ratio: 3/3)' });

    // const [attendeeName, setAttendeeName] = useState('');
    // const [eventLocation, setEventLocation] = useState('');
    // const [attendeeIDNo, setAttendeeIDNo] = useState('');
    // console.log(attendeeName);

    const capture = useCallback(async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    
        setAnimate(true);
        setLoading(true);
    
        // Optional: reset animation after some time
        setTimeout(() => setAnimate(false), 1000); // duration matches your animation
    
        // Convert the base64 image to a Blob
        const blob = await fetch(imageSrc).then(res => res.blob());
        const formData = new FormData();
        // formData.append('image', blob, 'captured-image.jpg');
        formData.append('file', blob, 'captured-image.jpg');
    
        try {
          const response = await axios.post('https://vms.cognitron.co.ke/ocr', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          setResults(response.data);
          setVisible(true);
          setLoading(false);
        } catch (error) {
          console.error('Error uploading the image', error);
          setLoading(false);
          alert('Please try to scan the ID again.');          
        }
      }, [webcamRef]);

      useEffect(() => {
        if (results?.id_number && results?.name) {
          setSharedString(results.id_number);
          setiDname(results.name);
        //   setId(results.id_number);
          setTargetID(results.id_number);
          setName(results.name);
        }
      }, [results]);


    const [targetID, setTargetID] = useState('');
    const [data, setData] = useState([]);

    // useEffect(() => {
    //     fetch('http://localhost:5000/api/appointmentsdata')
    //         .then(response => response.json())
    //         .then(data => {
    //             setData(data);

    //             if (targetID) {
    //                 const matched = data.some(item => item.AttendeeID === targetID);
    //                 setMatched(matched);
    //                 console.log(matched ? 'Match found' : 'No match');
    //                 console.log(matched.name);
    //             }
    //         })
    //         .catch(error => console.error('Error fetching data:', error));
    // }, [targetID]);


    useEffect(() => {
        fetch('https://vms.cognitron.co.ke/api/appointmentsdata')
            .then(response => response.json())
            .then(data => {
                setData(data);
    
                if (targetID) {
                    const matchedItem = data.find(item => item.AttendeeID === targetID);
                    const matched = !!matchedItem;
                    setMatched(matched);
    
                    // console.log(matched ? 'Match found' : 'No match');
                    if (matchedItem) {                        
                        setAttendeeName(matchedItem.name);
                        setEventLocation(matchedItem.eventLocation);
                        setAttendeeIDNo(matchedItem.AttendeeID);
                    }
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [targetID]);

      
      
      const navigateToNextPage = () => {
        history('/shwebapp/appointmentfillinfo', { state: { id, name } });
      };

      const handleReload = () => {
        setVisible(false);
      };


  return (
    <div>
      {/* <p className='text-white text-center pt-[4vw]'>
        Ensure the entire ID card fits entirely within the frame
      </p>

      {loading && (
        <div className="flex justify-center">
          <div className='absolute top-[50vw]'>
            <div className="w-[15vw] h-[15vw] border-[1.5vw] border-white border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      )}

      {visible && (
        <div className='flex justify-center relative'>
          <div className='absolute top-[15vw] w-[70vw] bg-black bg-opacity-70 border-[0.5vw] rounded-[1vw] text-white text-center pt-[9vw] pb-[5vw] z-10'>
            {results?.id_number && results?.name && (
              <div>    
                <p>{myphone}</p>  
                <p>ID No: {results.id_number}</p>
                <p>Name: {results.name}</p>          
              </div>
            )}

            {matched ? (
                <div>
                <p className='text-green-600 mt-[1vw]'>
                    User Found
                </p>

                <button onClick={navigateToNextPage} className='border-[0.45vw] rounded-[1vw] text-center text-white mt-[2vw] py-[1vw] w-[40vw]'>
                    Continue
                </button>
            </div>  
            ) : (
                <div>
                    <p className='text-red-600 mt-[1vw]'>
                        User not found
                    </p>

                    <button onClick={handleReload} className='border-[0.45vw] rounded-[1vw] text-center text-white mt-[2vw] py-[1vw] w-[40vw]'>
                        Retry
                    </button>
                </div>
              )}
          </div>
        </div>      
      )}


        <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
                facingMode: 'environment',
            }}
            className='mt-[4vw]'
        />

        <button onClick={capture}>
          <img src={shutter} className={`w-[20vw] ml-[40vw] mt-[8vw] transition-transform duration-1000 ease-in-out
          ${animate ? 'scale-125 rotate-[360deg]' : ''}`} />        
        </button> */}


        {mobileScreen && (
          <div>
            <p className='text-white text-center pt-[4vw]'>
              Ensure the entire ID card fits entirely within the frame
            </p>

            {loading && (
              <div className="flex justify-center">
                <div className='absolute top-[50vw]'>
                  <div className="w-[15vw] h-[15vw] border-[1.5vw] border-white border-t-transparent rounded-full animate-spin" />
                </div>
              </div>
            )}

            {visible && (
              <div className='flex justify-center relative'>
                <div className='absolute top-[15vw] w-[70vw] bg-black bg-opacity-70 border-[0.5vw] rounded-[1vw] text-white text-center pt-[9vw] pb-[5vw] z-10'>
                  {results?.id_number && results?.name && (
                    <div>    
                      <p>{myphone}</p>  
                      <p>ID No: {results.id_number}</p>
                      <p>Name: {results.name}</p>          
                    </div>
                  )}

                  {matched ? (
                      <div>
                      <p className='text-green-600 mt-[1vw]'>
                          User Found
                      </p>

                      <button onClick={navigateToNextPage} className='border-[0.45vw] rounded-[1vw] text-center text-white mt-[2vw] py-[1vw] w-[40vw]'>
                          Continue
                      </button>
                  </div>  
                  ) : (
                      <div>
                          <p className='text-red-600 mt-[1vw]'>
                              User not found
                          </p>

                          <button onClick={handleReload} className='border-[0.45vw] rounded-[1vw] text-center text-white mt-[2vw] py-[1vw] w-[40vw]'>
                              Retry
                          </button>
                      </div>
                    )}
                </div>
              </div>      
            )}


              <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={{
                      facingMode: 'environment',
                  }}
                  className='mt-[4vw]'
              />

              <button onClick={capture}>
                <img src={shutter} className={`w-[20vw] ml-[40vw] mt-[8vw] transition-transform duration-1000 ease-in-out
                ${animate ? 'scale-125 rotate-[360deg]' : ''}`} />        
              </button>
          </div>
        )}

        {notMobileScreen && (
          <div>
                <p className='text-white text-center pt-[4vw]'>
            Ensure the entire ID card fits entirely within the frame
          </p>

          {loading && (
            <div className="pl-[22vw]">
              <div className='absolute top-[22vw]'>
                <div className="w-[15vw] h-[15vw] border-[1.5vw] border-white border-t-transparent rounded-full animate-spin" />
              </div>
            </div>
          )}

          {visible && (
            <div className='flex justify-center relative'>
              <div className='absolute top-[15vw] w-[70vw] bg-black bg-opacity-70 border-[0.5vw] rounded-[1vw] text-white text-center pt-[9vw] pb-[5vw] z-10'>
                {results?.id_number && results?.name && (
                  <div>    
                    <p>{myphone}</p>  
                    <p>ID No: {results.id_number}</p>
                    <p>Name: {results.name}</p>          
                  </div>
                )}

                {matched ? (
                    <div>
                    <p className='text-green-600 mt-[1vw]'>
                        User Found
                    </p>

                    <button onClick={navigateToNextPage} className='border-[0.45vw] rounded-[1vw] text-center text-white mt-[2vw] py-[1vw] w-[40vw]'>
                        Continue
                    </button>
                </div>  
                ) : (
                    <div>
                        <p className='text-red-600 mt-[1vw]'>
                            User not found
                        </p>

                        <button onClick={handleReload} className='border-[0.45vw] rounded-[1vw] text-center text-white mt-[2vw] py-[1vw] w-[40vw]'>
                            Retry
                        </button>
                    </div>
                  )}
              </div>
            </div>      
          )}


            <div className='flex'>
              <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={{
                      facingMode: 'environment',
                  }}
                  className='mt-[4vw] ml-[4vw] w-[50vw]'
              />

              <button onClick={capture}>
                <img src={shutter} className={`w-[18vw] ml-[13vw] mt-[5vw] transition-transform duration-1000 ease-in-out
                ${animate ? 'scale-125 rotate-[360deg]' : ''}`} />        
              </button>
            </div>
          </div>
        )}
    </div> 
  )
}

export default AppointmentCamera