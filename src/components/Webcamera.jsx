import React, { useRef, useState, useEffect, useCallback } from 'react'
import Webcam from 'react-webcam'
import { Link, useNavigate } from 'react-router-dom'
// import Tesseract from 'tesseract.js'
// import { createCanvas, loadImage } from 'canvas'
import axios from 'axios'
import Fillinfopage from '../pages/Fillinfopage'
// import { parse } from 'mrz'

const Webcamera = ({ setSharedString, setiDname,myphone }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const history = useNavigate();
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);

  const [image, setImage] = useState(null);
  const [results, setResults] = useState([]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('http://127.0.0.1:5000/ocr', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setResults(response.data);
    } catch (error) {
      console.error('Error uploading the image', error);
    }
  };

  // const capture = React.useCallback(() => {
  //   const imageSrc = webcamRef.current.getScreenshot();
  //   setImgSrc(imageSrc);
  // }, [webcamRef, setImgSrc]);

  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);

    // Convert the base64 image to a Blob
    const blob = await fetch(imageSrc).then(res => res.blob());
    const formData = new FormData();
    formData.append('image', blob, 'captured-image.jpg');

    try {
      const response = await axios.post('http://127.0.0.1:5000/ocr', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResults(response.data);
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
  // const noName = [results[3], results[4]];
  // console.log(results[2]);
  

  // const capture = async () => {
  //   const imageSrc = webcamRef.current.getScreenshot();
  //   const preprocessedImage = await preprocessImage(imageSrc);
  //   setImgSrc(preprocessedImage);
  // };

  // const preprocessImage = async (imageSrc) => {
  //   const img = await loadImage(imageSrc);
  //   const canvas = createCanvas(img.width, img.height);
  //   const ctx = canvas.getContext('2d');

  //   ctx.drawImage(img, 0, 0);
  //   // Convert to grayscale
  //   const imageData = ctx.getImageData(0, 0, img.width, img.height);
  //   const data = imageData.data;
  //   // const contrast = 128; // Adjust contrast level here

  //   // for (let i = 0; i < data.length; i += 4) {
  //   //   const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
  //   //   const contrasted = ((avg - 128) * contrast / 128) + 128;
  //   //   data[i] = contrasted; // red
  //   //   data[i + 1] = contrasted; // green
  //   //   data[i + 2] = contrasted; // blue
  //   // }
  //   // ctx.putImageData(imageData, 0, 0);

  //   // Apply thresholding
  //   const threshold = 110; // Adjust threshold level here
  //   for (let i = 0; i < data.length; i += 4) {
  //     const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
  //     const value = avg > threshold ? 255 : 0;
  //     data[i] = value;     // red
  //     data[i + 1] = value; // green
  //     data[i + 2] = value; // blue
  //   }

  //   ctx.putImageData(imageData, 0, 0);

  //   return canvas.toDataURL('image/jpeg');
  // };


  // const [recognizedText, setRecognizedText] = useState('');

  // useEffect(() => {
  //   const recognizeText = async () => {
  //     if (imgSrc) {
  //       const result = await Tesseract.recognize(imgSrc);
  //       setRecognizedText(result.data.text);
  //     }
  //   };
  //   recognizeText();
  // }, [imgSrc]);

  // console.log(recognizedText);

  return (
    <div>
        <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
                facingMode: 'environment',
            }}
        />

        <button onClick={capture}>Capture photo</button>
          {/* {imgSrc && (
            <img
              src={imgSrc}
            />
          )} */}

        {/* <div>
          <h2 className='text-white'>{recognizedText}</h2>
          <p>{recognizedText}</p>
        </div>   */}

        <div className='text-white'>
            {/* <form onSubmit={handleSubmit}>
              <input type="file" accept="image/*" onChange={handleImageChange} />
              <button type="submit">Upload</button>
            </form> */}
            {results.length > 0 && (
              <div>    
                <p>{myphone}</p>            
                <p>
                  {results[3][1]}
                </p>

                <p>
                {results[4][1]}
                </p>
              </div>
            )}
            {/* {noName.length > 0 && (
              <div>
                <h2>Results</h2>
                <ul>
                  {results.map((noName, index) => (
                    <li key={index}>                      
                      {noName[1]}
                    </li>
                  ))}
                </ul>
              </div>
            )} */}
        </div>  
        
        <div className='flex justify-center mt-[5vw]'>
        <button onClick={navigateToNextPage} className='border-[0.45vw] rounded-[1vw] text-center text-white py-[1vw] w-[40vw]'>
          Next
        </button>
      </div>
    


    </div>
  )
}

export default Webcamera