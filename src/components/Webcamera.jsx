import React, { useRef, useState, useCallback } from 'react'
import Webcam from 'react-webcam'
import { parse } from 'mrz'

const Webcamera = () => {

  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

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
    </div>
  )
}

export default Webcamera