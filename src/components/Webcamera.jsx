import React, { useRef, useState, useEffect, useCallback } from 'react'
import Webcam from 'react-webcam'
import Tesseract from 'tesseract.js'
import { parse } from 'mrz'

const Webcamera = () => {

  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);


  const [recognizedText, setRecognizedText] = useState('');

  useEffect(() => {
    const recognizeText = async () => {
      if (imgSrc) {
        const result = await Tesseract.recognize(imgSrc);
        setRecognizedText(result.data.text);
      }
    };
    recognizeText();
  }, [imgSrc]);

  console.log(recognizedText);

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
          {imgSrc && (
            <img
              src={imgSrc}
            />
          )}

<div>
      <h2 className='text-white'>{recognizedText}</h2>
      <p>{recognizedText}</p>
    </div>        
    </div>
  )
}

export default Webcamera