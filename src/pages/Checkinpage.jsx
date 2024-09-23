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
  const [selectedIdName, setSelectedIdName] = useState('');
  const [documentId, setDocumentId] = useState('');
  const [reload, setReload] = useState(true);
  const [vistBadgeId, setVistBadgeId] = useState('');

  const displayDialogue = (visitorTag, idName, _id, badgeId) => {
    setDisplayPopup(true);
    setVisitorsBadge(visitorTag);
    setSelectedIdName(idName);
    setDocumentId(_id);
    setVistBadgeId(badgeId);
  };

const handlePopupSubmit = async () => {
  if (inputValue === visitorsBadge) {            
      // toast.success(selectedIdName +' has been Succesfully checkedout');    

      const choosen = {
        chosen: 'false',      
      }
      
      try {
          // const response = await axios.post('http://localhost:5000/api/migrate', { id: documentId });

          const [postResponse, putResponse] = await Promise.all([
            axios.post('http://localhost:5000/api/migrate', { id: documentId }),
            axios.put(`http://localhost:5000/api/visitorsbadges/${vistBadgeId}`, choosen)
          ]);

          toast.success(selectedIdName +' has been Succesfully checkedout');

          // alert(response.data.message);

          setDisplayPopup(!displayPopup);
          setReload(!reload);
          setVistBadgeId('');
      } catch (error) {
          toast.error(error + ' Failed to Checkout Visitor');
          setInputValue('');
      }

  } else {            
      toast.error('Incorrect Visitor Badge');
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
  const [searchQuery, setSearchQuery] = useState(''); // for search input

  useEffect(() => {
    fetch('http://localhost:5000/api/data')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => toast.error('Error fetching data', error));
  }, [reload]);
    


  // Filter data based on search query
  const filteredData = data.filter(item => 
    item.idName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.sharedString.includes(searchQuery) // Customize the search logic based on your needs
  );

  return (
    <div>
      {/* <div className='flex justify-center pt-[10vw]'>
        <div>
          <img src={coatOfArms} className='h-[30vw] mb-[3vw]' alt='Coat of Arms' />
        </div>
      </div> */}

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


      <div className='flex justify-center mt-[8vw]'>
        <input
          type='text'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder='Search Visitor by Name or ID number'
          className='mb-[3vw] w-[85vw] px-[2vw] py-[1.5vw] rounded-[2vw] text-black fixed'
        />

        <div className='w-[10vw] h-[5vw] mb-[9vw]'></div>
      </div>
      
      {filteredData.map(item => (
          <div className='flex justify-center' key={item._id}>
            <div>
              <div className='w-[85vw] pb-[3vw] bg-white bg-opacity-10 text-white border-[0.05vw] rounded-[6vw] pl-[4vw] mb-[3vw]'>
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
                          onClick={() => displayDialogue(item.visitorTag, item.idName, item._id, item.badgeId)}                       
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
                <p className='text-[3.5vw] font-semibold ml-[0.3vw]'>Enter Visitor's Badge Number</p>

                <InputText
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className='w-full text-black rounded-[1.3vw] text-[4vw] font-semibold text-center h-[7.5vw] border-black border-[0.2vw] mt-[0.2vw]'
                />     

                <div className="mt-[3vw] flex justify-center">
                    <Button
                        label="Checkout"
                        onClick={handlePopupSubmit}
                        className="bg-green-500 text-white px-[2vw] py-[1vw]"
                    />
                </div>                           
            </div>
        </Dialog>

        <Toaster richColors position="top-center" />
    </div>
  );
};

export default Checkinpage;
