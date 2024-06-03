import React, { useRef, useState, useEffect, useCallback } from 'react'
import Webcam from 'react-webcam'
import { parse } from 'mrz'

const Webcamera = () => {

    const webcamRef = useRef(null);
    const [scannedData, setScannedData] = useState(null);
    const [processing, setProcessing] = useState(false);

    const captureFrame = useCallback(() => {
        if (!webcamRef.current || processing) {
          return;
        }
    
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) {
          processImage(imageSrc);
        }
      }, [webcamRef, processing]);

    const processImage = async (imageSrc) => {
    setProcessing(true);
    
    try {
          // Convert the image source to a format suitable for MRZ parsing
        const response = await fetch(imageSrc);
        const blob = await response.blob();
        const reader = new FileReader();
    
        reader.onloadend = () => {
        const mrzData = parse(reader.result);
        if (mrzData) {
            setScannedData(mrzData);
        }
        setProcessing(false);
        };
    
        reader.readAsDataURL(blob);
    } catch (error) {
        console.error('Error processing image:', error);
        setProcessing(false);
    }
    };

    useEffect(() => {
        const interval = setInterval(captureFrame, 500); // Adjust the interval as needed
        return () => clearInterval(interval);
      }, [captureFrame]);

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
        {scannedData && (
        <div>
          <h3>MRZ Data:</h3>
          <pre>{JSON.stringify(scannedData, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

export default Webcamera