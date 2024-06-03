import React from 'react'
import Webcam from 'react-webcam'

const Webcamera = () => {
  return (
    <div>
        <Webcam
            videoConstraints={{
                facingMode: 'environment',
            }}
        />
    </div>
  )
}

export default Webcamera