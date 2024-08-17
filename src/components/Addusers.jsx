import React from 'react'

const Addusers = () => {
  return (
    <div>
        <div className='w-screen h-screen bg-black bg-opacity-5 backdrop-blur-[0.1vw] absolute left-[0vw] top-[0vw] flex justify-end'>
            <div className='w-[21vw] h-screen bg-white border-border-grey border-[0.2vw] rounded-[0.3vw] flex justify-center pt-[1.5vw]'>
                <div>
                    <div>
                        <p className='text-center'>
                            Add New User
                        </p>

                        <div className='flex justify-center'>
                            <div className='w-[7vw] h-[0.1vw] mt-[0.2vw] bg-background-grey'></div>
                        </div>                    
                    </div>

                    <div>
                        <label>
                            <p className='mb-[1vw]'>
                                Enter phone number :
                            </p>
                            <input name="telnumber" type="number" placeholder='Phone number' className='text-black rounded-[0.3vw] text-[1vw] pl-[2vw] h-[2vw] w-[15vw] border-black border-[0.2vw]'  onChange={e => setphoneno(e.target.value)} />
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Addusers