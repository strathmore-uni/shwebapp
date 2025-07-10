import React, { useState } from 'react'
// BarChart.js
import { Bar, Pie  } from 'react-chartjs-2';
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement,} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// const data = {
//   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novemeber', 'December'],
//   datasets: [
//     {
//       label: 'Visitors',
//       data: [50, 80, 30, 60, 29, 45, 98, 232, 32, 233, 23, 1],
//       backgroundColor: 'rgba(245, 73, 0, 0.6)',
//       borderRadius: 0,
//     },
//   ],
// };

// const options = {
//   responsive: true,
//   plugins: {
//     legend: { position: 'top' },
//     title: { display: true, text: 'Recorded Visitors' },
//   },
// };


const chartData = {
  daily: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    data: [10, 15, 8, 12, 20, 7, 14],
  },
  weekly: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    data: [60, 75, 50, 90],
  },
  monthly: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'August', 'September', 'October', 'Novemeber', 'December'],
    data: [200, 180, 220, 160, 190, 45, 98, 232, 32, 233, 23, 1],
  },
};

const pieChartData = {
  daily: {
    labels: ['HR', 'IT', 'Finance', 'Security'],
    data: [5, 10, 3, 8],
  },
  weekly: {
    labels: ['HR', 'IT', 'Finance', 'Security'],
    data: [25, 45, 15, 30],
  },
  monthly: {
    labels: ['HR', 'IT', 'Finance', 'Security'],
    data: [110, 130, 85, 95],
  },
};




const Dashboard = () => {

  const [view, setView] = useState('monthly');

  const data = {
    labels: chartData[view].labels,
    datasets: [
      {
        label: 'none',
        data: chartData[view].data,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false, },
      // title: { display: true, text: `Bar Chart - ${view.charAt(0).toUpperCase() + view.slice(1)}` },
    },
  };


  const [pieView, setPieView] = useState('daily');

  const pieData = {
    labels: pieChartData[pieView].labels,
    datasets: [
      {
        label: 'Visitors',
        data: pieChartData[pieView].data,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverOffset: 10,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      title: {
        display: false,
        text: `Department Visitors (${pieView})`,
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className='pt-[1vw] pl-[1vw]'>
      <div className='flex gap-[1vw] mb-[2vh]'>
        <div className='border-gray-300 border-[0.1vw] rounded-[0.5vw] w-[15vw] pt-[1vw] pb-[0.3vw] pl-[1.2vw]'>
          <p className='text-[0.9vw]'>
            Current Checked-In Visitors
          </p>

          <p className='text-[2vw] font-bold'>
            20
          </p>
        </div>

        <div className='border-gray-300 border-[0.1vw] rounded-[0.5vw] w-[15vw] pt-[1vw] pb-[0.3vw] pl-[1.2vw]'>
          <p className='text-[0.9vw]'>
            Visitors Checked-In Today
          </p>

          <p className='text-[2vw] font-bold'>
            50
          </p>
        </div>

        <div className='border-gray-300 border-[0.1vw] rounded-[0.5vw] w-[15vw] pt-[1vw] pb-[0.3vw] pl-[1.2vw]'>
          <p className='text-[0.9vw]'>
            Visitors Checked-Out Today
          </p>

          <p className='text-[2vw] font-bold'>
            30
          </p>
        </div>

        <div className='border-gray-300 border-[0.1vw] rounded-[0.5vw] w-[18vw] pt-[1vw] pb-[0.3vw] pl-[1.2vw]'>
          <p className='text-[0.9vw]'>
            Signed-In System Users
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

            <div className='mt-[0.9vw] w-[0.1vw] h-[1.3vw] bg-gray-300'></div>

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

      <div className='flex gap-[1vw]'>
        <div className='border-gray-300 border-[0.1vw] w-[53vw] mb-[2vh] rounded-[0.5vw] px-[1vw] pt-[0.8vw]'>
          <div className='text-[0.9vw] mb-[0.5vw] flex gap-[25.3vw]'>
            <div>
              <p className='font-bold text-[1vw] mt-[0.2vw]'>
                Total Visitors: <span className='font-normal text-[0.9vw]'>{view.charAt(0).toUpperCase() + view.slice(1)}</span>
              </p>
            </div>

            <div className='cursor-pointer'>
              <button onClick={() => setView('daily')} className='border-gray-300 border-[0.1vw] bg-gray-200 rounded-l-[0.3vw] px-[1vw] py-[0.3vw]'>
                Daily
              </button>

              <button onClick={() => setView('weekly')} className='border-gray-300 border-[0.1vw] px-[1vw] py-[0.3vw]'>
                Weekly
              </button>

              <button onClick={() => setView('monthly')} className='border-gray-300 border-[0.1vw] rounded-r-[0.3vw] px-[1vw] py-[0.3vw]'>
                Monthly
              </button>
            </div>
          </div>
          <Bar data={data} options={options} />
        </div>

        <div className='border-gray-300 border-[0.1vw] w-[28vw] h-[29vw] rounded-[0.5vw] pt-[0.7vw]'>
          <div>  
            <p className='font-bold text-[1vw] text-center mb-[1vw]'>
              Department Visitors (<span className='font-normal text-[0.9vw]'>{pieView.charAt(0).toUpperCase() + pieView.slice(1)}</span>)
            </p>

            <div className='flex justify-center'>
              <div className='w-[22vw]'>
                <Pie data={pieData} options={pieOptions} />
              </div>
            </div>

            <div className='flex justify-center mt-[0.8vw] text-[0.9vw]'>
              <button onClick={() => setPieView('daily')} className='border-gray-300 border-[0.1vw] bg-gray-200 rounded-l-[0.3vw] px-[1vw] py-[0.3vw]'>Daily</button>
              <button onClick={() => setPieView('weekly')} className='border-gray-300 border-[0.1vw] px-[1vw] py-[0.3vw]'>Weekly</button>
              <button onClick={() => setPieView('monthly')} className='border-gray-300 border-[0.1vw] rounded-r-[0.3vw] px-[1vw] py-[0.3vw]'>Monthly</button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <p>
            View Currently registered Visitors in datatable with info about department they are heading to & guard who checked them & receptionist that cleared them.
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