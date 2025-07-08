import React from 'react'

const Dashboard = () => {
  return (
    <div className='pt-[1vw] pl-[1vw]'>
      <div className='flex gap-[1vw]'>
        <div className='border-gray-300 border-[0.1vw] rounded-[0.5vw] w-[15vw] pt-[1vw] pb-[0.3vw] pl-[1.2vw]'>
          <p className='text-[0.9vw]'>
            Visitors Checked-In Today
          </p>

          <p className='text-[2vw] font-bold'>
            50
          </p>
        </div>

        <div className='border-gray-300 border-[0.1vw] rounded-[0.5vw] w-[18vw] pt-[1vw] pb-[0.3vw] pl-[1.2vw]'>
          <p className='text-[0.9vw]'>
            Active System Users
          </p>

          <div className='flex gap-[1vw]'>
            <div className='flex gap-[0.3vw]'>
              <p className='text-[2vw] font-bold'>
                10
              </p>

              <p className='text-[0.9vw] mt-[1vw]'>
                Guards
              </p>
            </div>

            <div className='mt-[1.8vh] w-[0.1vw] h-[2.5vh] bg-gray-300'></div>

            <div className='flex gap-[0.3vw]'>
              <p className='text-[2vw] font-bold'>
                7
              </p>

              <p className='text-[0.9vw] mt-[1vw]'>
                Receptionists
              </p>
            </div>
          </div>
        </div>

        <div className='border-gray-300 border-[0.1vw] rounded-[0.5vw] w-[15vw] pt-[1vw] pb-[0.3vw] pl-[1.2vw]'>
          <p className='text-[0.9vw]'>
            Total of Visitors Checked-In 
          </p>

          <p className='text-[2vw] font-bold'>
            500
          </p>
        </div>
      </div>

      <div>
        <p>
            View total number of visitors by day and time (graph) & Also Currently registered Visitors
        </p>

        <p>
            Piechart showing departments visited and how many people visted the department
        </p>

        <p>
            Also view by branch of the company. Mombasa Branch, Nairobi Branch 
        </p>

        <p>
          Table with Visitor Name, Check-in Time, Department Headed to, Time Cleared by Repetionist, Check-out Time
        </p>
      </div>
    </div>
  )
}

export default Dashboard