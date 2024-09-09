import React, { useState, useEffect } from 'react';
import { coatOfArms } from '../assets';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toaster, toast } from 'sonner'
import axios from 'axios';

const Checkinpage = ({ myphone, sharedString, iDname, datetime, department, setFulldata }) => {

  const [displayPopup, setDisplayPopup] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [visitorsBadge, setVisitorsBadge] = useState('');

  console.log(visitorsBadge);

  const displayDialogue = (visitorTag) => {
    setDisplayPopup(true);
    setVisitorsBadge(visitorTag);
  };

const handlePopupSubmit = () => {
  if (inputValue === visitorsBadge) {            
      toast.success('Confirmation Successfull');     

  } else {            
      toast.error('Confirmation Failed');
      setInputValue(''); //Reset the input field  
  }
};

  // const [checkins, setCheckins] = useState(() => {
  //   const savedCheckins = localStorage.getItem('checkins');
  //   return savedCheckins ? JSON.parse(savedCheckins) : [];
  // });

  // const addCheckin = () => {
  //   const newCheckin = { myphone, sharedString, iDname, datetime, department };
  //   const updatedCheckins = [...checkins, newCheckin];
  //   setCheckins(updatedCheckins);
  //   localStorage.setItem('checkins', JSON.stringify(updatedCheckins));
  // };

  // useEffect(() => {
  //   addCheckin();
  // }, [myphone, sharedString, iDname, datetime, department]);
  

  // const [name, setName] = useState('');

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post('http://localhost:5000/api/names', { name });
  //     console.log(response.data);
  //     setName('');
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/data')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <div className='flex justify-center pt-[10vw]'>
        <div>
          <img src={coatOfArms} className='h-[30vw]' alt='Coat of Arms' />
        </div>
      </div>
      {/* {data.map((checkin, index) => (
        <div className='flex justify-center' key={index}>
          <div>
            <div className='w-[85vw] pb-[3vw] bg-white bg-opacity-10 text-white mt-[10vw] border-[0.05vw] rounded-[6vw] pl-[4vw] mb-[2vw]'>
              <p className='text-[3.8vw] mt-[5vw] font-semibold'>
                {checkin.iDname}
              </p>

              <div className='pt-[2vw]'>
                <div className='mb-[2.5vw] flex'>
                  <p className='font-light'>
                    ID :
                  </p>

                  <p className='font-bold pl-[1.5vw]'>
                    {checkin.sharedString}
                  </p>
                </div>

                <div className='mb-[2.5vw] flex'>
                  <p className='font-light'>
                    Phone Number :
                  </p>

                  <p className='font-bold pl-[1.5vw]'>
                    {checkin.myphone}
                  </p>
                </div>

                <div className='mb-[2.5vw] flex'>
                  <p className='font-light'>
                    Check-in Time :
                  </p>

                  <p className='font-bold pl-[1.5vw]'>
                    {checkin.datetime}
                  </p>
                </div>

                <div className='mb-[2.5vw] flex'>
                  <p className='font-light'>
                    Destination :
                  </p>

                  <p className='font-bold pl-[1.5vw]'>
                    {checkin.department}
                  </p>
                </div>

                <div className='mb-[2.5vw] flex'>
                  <p className='font-light'>
                    Licence Plate :
                  </p>

                  <p className='font-bold pl-[1.5vw]'>
                    TODO
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))} */}

      {data.map(item => (
          <div className='flex justify-center' key={item._id}>
            <div>
              <div className='w-[85vw] pb-[3vw] bg-white bg-opacity-10 text-white mt-[10vw] border-[0.05vw] rounded-[6vw] pl-[4vw] mb-[2vw]'>
                <p className='text-[3.8vw] mt-[5vw] font-semibold'>
                  {item.idName}
                </p>

                <div className='pt-[2vw]'>
                  <div className='mb-[2.5vw] flex'>
                    <p className='font-light'>
                      ID :
                    </p>

                    <p className='font-bold pl-[1.5vw]'>
                      {item.sharedString}
                    </p>
                  </div>

                  <div className='mb-[2.5vw] flex'>
                    <p className='font-light'>
                      Phone Number :
                    </p>

                    <p className='font-bold pl-[1.5vw]'>
                      {item.phone}
                    </p>
                  </div>

                  <div className='mb-[2.5vw] flex'>
                    <p className='font-light'>
                      Check-in Time :
                    </p>

                    <p className='font-bold pl-[1.5vw]'>
                      {item.dateTime}
                    </p>
                  </div>

                  <div className='mb-[2.5vw] flex'>
                    <p className='font-light'>
                      Destination :
                    </p>

                    <p className='font-bold pl-[1.5vw]'>
                      {item.department}
                    </p>
                  </div>

                  <div className='mb-[2.5vw] flex'>
                    <p className='font-light'>
                      Licence Plate :
                    </p>

                    <p className='font-bold pl-[1.5vw]'>
                      TODO
                    </p>
                  </div>
                  
                  {item.cleared && (
                    <div className='flex justify-center py-[0.8vw]'>
                      <Button
                          label="Checkout Visitor" 
                          onClick={() => displayDialogue(item.visitorTag)}                       
                          className="bg-white text-black px-[3vw] py-[0.9vw] rounded"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>            
          </div>
        ))}

        <Dialog
            header="Visitor Clearance"
            visible={displayPopup}
            onHide={() => setDisplayPopup(false)}
            className='w-[80vw]'
        >
            <div>
                <p className='text-[4vw] ml-[0.3vw]'>Enter Visitor's Badge Number</p>

                <InputText
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className='w-full text-black rounded-[0.3vw] text-[5vw] pl-[0.5vw] h-[8vw] border-black border-[0.2vw] mt-[0.2vw]'
                />     

                <div className="mt-[3vw] flex justify-center">
                    <Button
                        label="Checkout"
                        onClick={handlePopupSubmit}
                        className="bg-green-500 text-white px-3 py-1"
                    />
                </div>                           
            </div>
        </Dialog>

        <Toaster richColors position="top-center" />
    </div>
  );
};

export default Checkinpage;
