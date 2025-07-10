import React, { useState } from 'react'
// BarChart.js
import { Bar, Pie  } from 'react-chartjs-2';
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement,} from 'chart.js';
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";

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

const dummyData = [
  {
    id: 1,
    name: "John Doe",
    nationalId: "12345678",
    checkInTime: "2025-07-10 08:30",
    department: "Finance",
    checkedInBy: "Guard A",
    clearedBy: "Receptionist X",
  },
  {
    id: 2,
    name: "Jane Smith",
    nationalId: "87654321",
    checkInTime: "2025-07-10 09:00",
    department: "HR",
    checkedInBy: "Guard B",
    clearedBy: "Receptionist Y",
  },
  {
    id: 3,
    name: "Mike Brown",
    nationalId: "23456789",
    checkInTime: "2025-07-10 09:30",
    department: "IT",
    checkedInBy: "Guard A",
    clearedBy: "Receptionist Z",
  },
  // Add more dummy records here
];

const columns = [
  { name: "Visitor Name", selector: row => row.name, sortable: true },
  { name: "ID", selector: row => row.nationalId, sortable: true },
  { name: "Check-In Time", selector: row => row.checkInTime, sortable: true },
  { name: "Department", selector: row => row.department, sortable: true },
  { name: "Checked In By", selector: row => row.checkedInBy },
  { name: "Cleared By", selector: row => row.clearedBy },
];


const Dashboard = () => {

  const [view, setView] = useState('monthly');

  const data = {
    labels: chartData[view].labels,
    datasets: [
      {
        label: 'Visitors',
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


  const [filterText, setFilterText] = useState("");
  const filteredData = dummyData.filter(
    item =>
      item.name.toLowerCase().includes(filterText.toLowerCase()) ||
      item.nationalId.includes(filterText) ||
      item.department.toLowerCase().includes(filterText.toLowerCase())
  );

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Visitor Report", 14, 10);
    const tableColumn = [
      "Visitor Name",
      "ID",
      "Check-In Time",
      "Department",
      "Checked In By",
      "Cleared By",
    ];
    const tableRows = filteredData.map(row => [
      row.name,
      row.nationalId,
      row.checkInTime,
      row.department,
      row.checkedInBy,
      row.clearedBy,
    ]);
    doc.autoTable({ head: [tableColumn], body: tableRows });
    doc.save("visitor_report.pdf");
  };


  return (
    <div className='pt-[6vw] pl-[14vw]'>
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
              <button onClick={() => setView('daily')} className={`border-gray-300 border-[0.1vw] rounded-l-[0.3vw] px-[1vw] py-[0.3vw] 
          ${view === 'daily' ? 'bg-gray-200' : ''}`}>
                Daily
              </button>

              <button onClick={() => setView('weekly')} className={`border-gray-300 border-[0.1vw] px-[1vw] py-[0.3vw] 
          ${view === 'weekly' ? 'bg-gray-200' : ''}`}>
                Weekly
              </button>

              <button onClick={() => setView('monthly')} className={`border-gray-300 border-[0.1vw] rounded-r-[0.3vw] px-[1vw] py-[0.3vw] 
          ${view === 'monthly' ? 'bg-gray-200' : ''}`}>
                Monthly
              </button>
            </div>
          </div>
          <Bar data={data} options={options} />
        </div>

        <div className='border-gray-300 border-[0.1vw] w-[28vw] h-[29vw] rounded-[0.5vw] pt-[0.7vw]'>
          <div>  
            <p className='font-bold text-[1vw] text-center mb-[1vw]'>
              Department Visitors: <span className='font-normal text-[0.9vw]'>{pieView.charAt(0).toUpperCase() + pieView.slice(1)}</span>
            </p>

            <div className='flex justify-center'>
              <div className='w-[22vw]'>
                <Pie data={pieData} options={pieOptions} />
              </div>
            </div>

            <div className='flex justify-center mt-[0.8vw] text-[0.9vw]'>
              <button onClick={() => setPieView('daily')} className={`border-gray-300 border-[0.1vw] rounded-l-[0.3vw] px-[1vw] py-[0.3vw] 
          ${pieView === 'daily' ? 'bg-gray-200' : ''}`}>Daily</button>
              <button onClick={() => setPieView('weekly')} className={`border-gray-300 border-[0.1vw] px-[1vw] py-[0.3vw] 
          ${pieView === 'weekly' ? 'bg-gray-200' : ''}`}>Weekly</button>
              <button onClick={() => setPieView('monthly')} className={`border-gray-300 border-[0.1vw] rounded-r-[0.3vw] px-[1vw] py-[0.3vw] 
          ${pieView === 'monthly' ? 'bg-gray-200' : ''}`}>Monthly</button>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-bold mb-2">Checked-In Visitors</h2>
        <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            placeholder="Search by name, ID, or department"
            className="border px-2 py-1 rounded-md w-1/2"
            value={filterText}
            onChange={e => setFilterText(e.target.value)}
          />
          {/* <div className="flex gap-2">
            <CSVLink
              data={filteredData}
              filename="visitor_report.csv"
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Export CSV
            </CSVLink>
            <button
              onClick={exportPDF}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Export PDF
            </button>
          </div> */}
        </div>
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          responsive
          persistTableHead
        />
      </div>
    </div>
  )
}

export default Dashboard