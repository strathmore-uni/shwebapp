import React, { useRef, useState, useEffect, useCallback } from 'react'
import Webcam from 'react-webcam'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
// import Fillinfopage from '../pages/Fillinfopage'
import { shutter } from '../assets'

const Webcamera = ({ setSharedString, setiDname,myphone }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const history = useNavigate();
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);

  const [image, setImage] = useState(null);
  const [results, setResults] = useState([]);

  const [animate, setAnimate] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // const handleImageChange = (e) => {
  //   setImage(e.target.files[0]);
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append('image', image);

  //   try {
  //     const response = await axios.post('https://5b96-2c0f-fe38-2190-a99f-392d-9920-6b27-3783.ngrok-free.app/ocr', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data'
  //       }
  //     });
  //     setResults(response.data);
  //   } catch (error) {
  //     console.error('Error uploading the image', error);
  //   }
  // };

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
    formData.append('image', blob, 'captured-image.jpg');

    try {
      const response = await axios.post('https://ffd2-156-0-233-52.ngrok-free.app/ocr', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResults(response.data);
      setVisible(true);
      setLoading(false);
    } catch (error) {
      console.error('Error uploading the image', error);
      alert('Failed to upload the image. Please try again.');
    }
  }, [webcamRef]);


useEffect(() => {
  const sendDetails = () => {
    if (Object.keys(results).length > 0) {
     
      return {
        id: results[3][1], 
        name: results[4][1]
      };
    }

    return { id: '', name: '' }; 
  };

  const { id, name } = sendDetails();
  setSharedString(id);
  setiDname(name);
 
}, [results]); 
const navigateToNextPage = () => {
  history('/shwebapp/fill', { state: { id, name } });
};


  return (
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

      {/* <div className='flex justify-center'>
        <div className='absolute top-[25vw] w-[70vw] bg-black bg-opacity-70 border-[0.5vw] rounded-[1vw] text-white text-center py-[9vw]'>
          {results.length > 0 && (
              <div>    
                <p>{myphone}</p>            
                <p>
                  ID No : {results[3][1]}
                </p>

                <p>
                  Name : {results[4][1]}
                </p>
              </div>
            )}
        </div>
      </div> */}

      {visible && (
        <div className='flex justify-center relative'>
          <div className='absolute top-[15vw] w-[70vw] bg-black bg-opacity-70 border-[0.5vw] rounded-[1vw] text-white text-center pt-[9vw] pb-[5vw] z-10'>
            {results.length > 0 && (
              <div>    
                <p>{myphone}</p>            
                <p>ID No : {results[3][1]}</p>
                <p>Name : {results[4][1]}</p>
              </div>
            )}
        
            <button onClick={navigateToNextPage} className='border-[0.45vw] rounded-[1vw] text-center text-white mt-[3vw] py-[1vw] w-[40vw]'>
              Continue
            </button>
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
        
        {/* <div className='flex justify-center mt-[5vw]'>
          <button onClick={navigateToNextPage} className='border-[0.45vw] rounded-[1vw] text-center text-white py-[1vw] w-[40vw]'>
            Next
          </button>
        </div> */}

      
    


    </div>
  )
}

export default Webcamera