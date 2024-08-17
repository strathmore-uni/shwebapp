import React from 'react'
import Select from 'react-select';


const Addusers = ({setShowUsersForm}) => {

    const options = [
        { value: 'guard', label: 'Guard' },
        { value: 'receptionist', label: 'Receptionist' },
      ];

    const handleChange = (selectedOption) => {
      console.log(`Selected:`, selectedOption);
    };

    const handleClick = () => {
      setShowUsersForm(false);
    };
      

  return (
    <div>
        <div className='w-screen h-screen absolute left-[0vw] top-[0vw] flex justify-end'>
            <div className='w-screen h-screen bg-black bg-opacity-5 backdrop-blur-[0.1vw] absolute left-[0vw] top-[0vw] flex justify-end z-0'></div>

            <div className='w-[21vw] h-screen bg-white border-border-grey border-[0.2vw] rounded-[0.3vw] flex justify-center pt-[1.5vw] z-10'>
                <div>
                    <div>
                        <p className='text-center font-bold text-[1.2vw]'>
                            ADD NEW USER
                        </p>

                        <div className='flex justify-center'>
                            <div className='w-[7vw] h-[0.1vw] mt-[0.1vw] mb-[1vw] bg-background-grey'></div>
                        </div>                    
                    </div>

                    <div>
                        <label>
                            <p className='mb-[0.2vw] ml-[0.3vw] text-[1vw]'>
                                Enter Full Name :
                            </p>

                            <input name="telnumber" type="number" placeholder='Enter Name' className='text-black rounded-[0.3vw] text-[1vw] pl-[0.5vw] h-[2vw] w-[16vw] border-black border-[0.2vw] mb-[0.9vw]'  onChange={e => setphoneno(e.target.value)} />
                        </label>

                        <label>
                            <p className='mb-[0.2vw] ml-[0.3vw] text-[1vw]'>
                                Enter Staff ID :
                            </p>

                            <input name="telnumber" type="number" placeholder='Enter ID' className='text-black rounded-[0.3vw] text-[1vw] pl-[0.5vw] h-[2vw] w-[16vw] border-black border-[0.2vw] mb-[0.9vw]'  onChange={e => setphoneno(e.target.value)} />
                        </label> 

                        <label>
                            <p className='mb-[0.2vw] ml-[0.3vw] text-[1vw]'>
                                Enter Email Address :
                            </p>

                            <input name="telnumber" type="number" placeholder='Email Address' className='text-black rounded-[0.3vw] text-[1vw] pl-[0.5vw] h-[2vw] w-[16vw] border-black border-[0.2vw] mb-[0.9vw]'  onChange={e => setphoneno(e.target.value)} />
                        </label> 

                        <label>
                            <p className='mb-[0.2vw] ml-[0.3vw] text-[1vw]'>
                                Generate Password :
                            </p>

                            <input name="telnumber" type="number" placeholder='Email Address' className='text-black rounded-[0.3vw] text-[1vw] pl-[0.5vw] h-[2vw] w-[16vw] border-black border-[0.2vw] mb-[0.9vw]'  onChange={e => setphoneno(e.target.value)} />
                        </label> 

                        <p className='mb-[0.2vw] ml-[0.3vw] text-[1vw]'>
                            Select Role :
                        </p>

                        <Select
                            options={options}
                            onChange={handleChange}
                            placeholder="Choose a role"
                            className='border-black border-[0.15vw] rounded-[0.4vw]'
                        />                       
                    </div>

                    <div className='flex justify-center'>
                        <div>
                            <div className='w-[12vw] mt-[13.5vw] border-black bg-black text-white border-[0.15vw] rounded-[0.3vw] h-[2.5vw] flex justify-center text-[1.2vw] font-semibold cursor-pointer'>
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

export default Addusers