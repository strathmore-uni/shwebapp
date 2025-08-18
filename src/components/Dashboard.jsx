import React, { useState, useEffect } from 'react'
// BarChart.js
import { Bar, Pie  } from 'react-chartjs-2';
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement,} from 'chart.js';
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Toaster, toast } from 'sonner'
// import { parse } from 'date-fns';
// import { parse } from 'date-fns';

import { startOfWeek, format, isSameDay, parse } from 'date-fns';


// const getHourlyVisitorsToday = (data) => {
//   const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
//   const counts = Array(24).fill(0);

//   const today = new Date();
//   const todayStr = today.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, ' ');

//   data.forEach((visitor) => {
//     const dateStr = visitor.dateTime?.split(" - ")[1];
//     const timeStr = visitor.dateTime?.split(" - ")[0];

//     if (!dateStr || !timeStr) return;

//     if (dateStr === todayStr) {
//       const hour = parseInt(timeStr.split(":")[0]);
//       if (!isNaN(hour)) counts[hour]++;
//     }
//   });

//   return { labels: hours, data: counts };
// };


// const getHourlyVisitorsToday = (data) => {
//   const startHour = 7;
//   const endHour = 18; // 6 PM

//   // Create hour labels: ['07:00', '08:00', ..., '18:00']
//   const hours = Array.from({ length: endHour - startHour + 1 }, (_, i) => {
//     const hour = startHour + i;
//     // return `${hour}:00`;
//     return `${hour % 12 || 12} ${hour < 12 ? 'am' : 'pm'}`;
//   });

//   const counts = Array(endHour - startHour + 1).fill(0);

//   const today = new Date();
//   const todayStr = today.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, ' ');

//   data.forEach((visitor) => {
//     const [timeStr, dateStr] = visitor.dateTime?.split(" - ") || [];

//     if (!dateStr || !timeStr) return;
//     if (dateStr !== todayStr) return;

//     const hour = parseInt(timeStr.split(":")[0]);
//     if (hour >= startHour && hour <= endHour) {
//       counts[hour - startHour]++;
//     }
//   });

//   return { labels: hours, data: counts };
// };


const getHourlyVisitorsToday = (data) => {
  const startHour = 7;
  const endHour = 18;

  const hours = Array.from({ length: endHour - startHour + 1 }, (_, i) => {
    const hour = startHour + i;
    return `${hour % 12 || 12} ${hour < 12 ? 'am' : 'pm'}`;
  });

  const counts = Array(endHour - startHour + 1).fill(0);

  const today = new Date();
  const todayDate = format(today, 'dd MMMM yyyy');

  data.forEach((visitor) => {
    const [timeStr, dateStr] = visitor.dateTime?.split(' - ') || [];
    if (!timeStr || !dateStr) return;

    const parsedDate = parse(dateStr.trim(), 'dd MMMM yyyy', new Date());
    const formattedDate = format(parsedDate, 'dd MMMM yyyy');

    if (formattedDate !== todayDate) return;

    const hour = parseInt(timeStr.split(':')[0]);
    if (!isNaN(hour) && hour >= startHour && hour <= endHour) {
      counts[hour - startHour]++;
    }
  });

  return { labels: hours, data: counts };
};




const getVisitorsPerDay = (data) => {
  const today = new Date();
  const start = startOfWeek(today, { weekStartsOn: 1 }); // Monday
  const days = Array.from({ length: 7 }).map((_, i) =>
    format(new Date(start.getTime() + i * 86400000), 'EEE') // 'Mon', 'Tue', ...
  );

  const counts = Array(7).fill(0);

  data.forEach((visitor) => {
    const dateStr = visitor.dateTime?.split(" - ")[1]; // ✅ correct variable
    if (!dateStr) return;

    const visitorDate = new Date(dateStr); // ✅ use the correct variable
    const dayLabel = format(visitorDate, 'EEE');

    const index = days.indexOf(dayLabel);
    if (index !== -1) counts[index]++;
  });

  return { labels: days, data: counts };
};



const getVisitorsPerWeek = (data) => {
  const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
  const counts = [0, 0, 0, 0];

  data.forEach((visitor) => {
    const datePart = visitor.dateTime?.split(' - ')[1];
    if (!datePart) return;

    // const date = new Date(datePart);
    const date = parse(datePart, 'dd MMM yyyy', new Date());
    const weekNumber = Math.floor((date.getDate() - 1) / 7); // 0 to 3
    if (weekNumber >= 0 && weekNumber < 4) counts[weekNumber]++;
  });

  return { labels: weeks, data: counts };
};


const getVisitorsPerMonth = (data) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const counts = Array(12).fill(0);

  data.forEach((visitor) => {
    const datePart = visitor.dateTime?.split(' - ')[1];
    if (!datePart) return;

    // const date = parse(datePart, 'dd MMM yyyy', new Date());
    const date = parse(datePart, 'dd MMMM yyyy', new Date());
    if (isNaN(date)) {
      console.warn('Invalid date:', datePart);
      return;
    }

    const monthIndex = date.getMonth(); // 0 = Jan, 1 = Feb, etc.
    counts[monthIndex]++;
  });

  return { labels: months, data: counts };
};




// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

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

const getDepartmentVisitorTotals = (data) => {
  const departmentCounts = {};

  data.forEach((visitor) => {
    const dept = visitor.department || 'Unknown';
    departmentCounts[dept] = (departmentCounts[dept] || 0) + 1;
  });

  const labels = Object.keys(departmentCounts);
  const counts = Object.values(departmentCounts);

  return { labels, counts };
};


const columns = [
  { name: "Visitor Name", selector: row => row.idName, sortable: true },
  { name: "ID", selector: row => row.sharedString, sortable: true },
  { name: "Phone Number", selector: row => row.phone },
  { name: "Check-In Time", selector: row => row.dateTime, sortable: true },
  { name: "Destination", selector: row => row.department, sortable: true },
  { name: "Checked In By", selector: row => row.checkedInBy },
  { name: "Cleared By", selector: row => row.clearedBy },
];


const Dashboard = () => {

  const [data, setData] = useState([]);
  const [view, setView] = useState('monthly');
  const visitorsThisWeek = getVisitorsPerDay(data);
  const [dataB, setDataB] = useState([]);

  const getChartData = () => {
    if (view === 'daily') return getVisitorsPerDay(dataB);
    if (view === 'weekly') return getVisitorsPerWeek(dataB);
    if (view === 'monthly') return getVisitorsPerMonth(dataB);
    return { labels: [], data: [] };
  };

  // const getTodayChartData = () => {
  //   return getVisitorsPerDay(data);
  //   // if (view === 'weekly') return getVisitorsPerWeek(data);
  //   // if (view === 'monthly') return getVisitorsPerMonth(data);
  //   return { labels: [], data: [] };
  // };

  const getTodayChartData = () => {
    return getHourlyVisitorsToday(data);
  };
  
  
  const visitorsChartData = getChartData();
  const visitorTodayChartData = getTodayChartData();
  
  const barChartData = {
    labels: visitorsChartData.labels,
    datasets: [
      {
        label: 'Visitors',
        data: visitorsChartData.data,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderRadius: 6,
      },
    ],
  };

  const todayBarChartData = {
    labels: visitorTodayChartData.labels,
    datasets: [
      {
        label: 'Visitors',
        data: visitorTodayChartData.data,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderRadius: 6,
      },
    ],
  };
  
  
  

  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: { display: false, },
  //     // title: { display: true, text: `Bar Chart - ${view.charAt(0).toUpperCase() + view.slice(1)}` },
  //   },
  // };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 5, // ✅ Only show whole numbers
          precision: 0, // ✅ Avoid decimals like 0.1, 0.2
          callback: function (value) {
            if (Number.isInteger(value)) {
              return value;
            }
          },
        },
      },
    },
  };
  


  const [pieView, setPieView] = useState('daily');

  const departmentTodayData = getDepartmentVisitorTotals(data);
  const departmentData = getDepartmentVisitorTotals(dataB);

  const pieData = {
    labels: departmentData.labels,
    datasets: [
      {
        label: 'Visitors',
        data: departmentData.counts,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
        hoverOffset: 10,
      },
    ],
  };

  const pieDataToday = {
    labels: departmentTodayData.labels,
    datasets: [
      {
        label: 'Visitors',
        data: departmentTodayData.counts,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
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
  // const filteredData = dataB.filter(
  //   item =>
  //     item.name?.toLowerCase().includes(filterText.toLowerCase()) ||
  //     item.nationalId?.includes(filterText) ||
  //     item.department?.toLowerCase().includes(filterText.toLowerCase())
  // );

  const filteredData = [
    ...dataB.filter(
      item =>
        item.name?.toLowerCase().includes(filterText.toLowerCase()) ||
        item.nationalId?.includes(filterText) ||
        item.department?.toLowerCase().includes(filterText.toLowerCase())
    ),
    ...data.filter(
      item =>
        item.name?.toLowerCase().includes(filterText.toLowerCase()) ||
        item.nationalId?.includes(filterText) ||
        item.department?.toLowerCase().includes(filterText.toLowerCase())
    )
  ];  

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

  useEffect(() => {
    const fetchData = () => {
      fetch(`${import.meta.env.VITE_API_URL}/api/data`)
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => {
          console.error("Error fetching data", error);
          toast.error("Error fetching data");
        });
    };
  
    // Initial fetch
    fetchData();
  
    // Set interval for auto-refresh
    const intervalId = setInterval(fetchData, 30000); // refresh every 30 seconds
  
    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchData = () => {
      fetch(`${import.meta.env.VITE_API_URL}/api/datab`)
        .then(response => response.json())
        .then(data => setDataB(data))
        .catch(error => {
          console.error("Error fetching data", error);
          toast.error("Error fetching data");
        });
    };
  
    // Initial fetch
    fetchData();
  
    // Set interval for auto-refresh
    const intervalId = setInterval(fetchData, 30000); // refresh every 30 seconds
  
    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, []);
  
  // const totalVisitors = data.length;

  // const isToday = (checkInTimeStr) => {
  //   if (!checkInTimeStr) return false;
  
  //   // Extract date part: "28 May 2025"
  //   const datePart = checkInTimeStr.split(" - ")[1];
  
  //   // Get today's date in the same format
  //   const today = new Date();
  //   const options = { day: '2-digit', month: 'short', year: 'numeric' };
  //   const todayFormatted = today.toLocaleDateString('en-GB', options).replace(/ /g, ' ');
  
  //   return datePart === todayFormatted;
  // };


  useEffect(() => {
    const interval = setInterval(() => {
      setReload(prev => !prev); // Toggle reload state every 5 minutes
    }, 300000); // 300,000 ms = 5 minutes
  
    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);


  const isToday = (checkInTimeStr) => {
    if (!checkInTimeStr) return false;
  
    const datePart = checkInTimeStr.split(" - ")[1];
    if (!datePart) return false;
  
    const parsedDate = parse(datePart.trim(), 'dd MMMM yyyy', new Date());
    const todayFormatted = format(new Date(), 'dd MMMM yyyy');
    const visitorDateFormatted = format(parsedDate, 'dd MMMM yyyy');
  
    return visitorDateFormatted === todayFormatted;
  };
  
  const todayVisitors = data.filter(visitor => isToday(visitor.dateTime));
  const todayCheckedOutVisitors = dataB.filter(visitor => isToday(visitor.checkoutTime));


  return (
    <div className='pt-[6vw] pl-[14vw]'>
      <div className='flex gap-[1vw] mb-[2vh]'>
        <div className='border-gray-300 border-[0.1vw] rounded-[0.5vw] w-[15vw] pt-[1vw] pb-[0.3vw] pl-[1.2vw]'>
          <p className='text-[0.9vw]'>
            Current Checked-In Visitors
          </p>

          <p className='text-[2vw] font-bold'>
            {todayVisitors.length}
          </p>
        </div>

        <div className='border-gray-300 border-[0.1vw] rounded-[0.5vw] w-[15vw] pt-[1vw] pb-[0.3vw] pl-[1.2vw]'>
          <p className='text-[0.9vw]'>
            Visitors Checked-In Today
          </p>

          <p className='text-[2vw] font-bold'>
            {todayVisitors.length}
          </p>
        </div>

        <div className='border-gray-300 border-[0.1vw] rounded-[0.5vw] w-[15vw] pt-[1vw] pb-[0.3vw] pl-[1.2vw]'>
          <p className='text-[0.9vw]'>
            Visitors Checked-Out Today
          </p>

          <p className='text-[2vw] font-bold'>
            {todayCheckedOutVisitors.length}
          </p>
        </div>

        <div className='border-gray-300 border-[0.1vw] rounded-[0.5vw] w-[18vw] pt-[1vw] pb-[0.3vw] pl-[1.2vw]'>
          <p className='text-[0.9vw]'>
            Signed-In System Users
          </p>

          <div className='flex gap-[1vw]'>
            <div className='flex gap-[0.3vw]'>
              <p className='text-[2vw] font-bold'>
                0
              </p>

              <p className='text-[0.9vw] mt-[1vw]'>
                Guards
              </p>
            </div>

            <div className='mt-[0.9vw] w-[0.1vw] h-[1.3vw] bg-gray-300'></div>

            <div className='flex gap-[0.3vw]'>
              <p className='text-[2vw] font-bold'>
                0
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
            {dataB.length}
          </p>
        </div>
      </div>

    

      <div className='flex gap-[1vw]'>
        <div className='border-gray-300 border-[0.1vw] w-[53vw] mb-[2vh] rounded-[0.5vw] px-[1vw] pt-[0.8vw]'>
          <div className='text-[0.9vw] mb-[0.5vw] flex gap-[25.3vw]'>
            <div>
              <p className='font-bold text-[1vw] mt-[0.2vw] mb-[0.5vw]'>
                Visitors Checked-In Today
              </p>
            </div>

            {/* <div className='cursor-pointer'>
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
            </div> */}
          </div>
          <Bar data={todayBarChartData} options={options} />
        </div>

        <div className='border-gray-300 border-[0.1vw] w-[28vw] h-[29vw] rounded-[0.5vw] pt-[0.7vw]'>
          <div>  
            {/* <p className='font-bold text-[1vw] text-center mb-[1vw]'>
              Department Visitors: <span className='font-normal text-[0.9vw]'>{pieView.charAt(0).toUpperCase() + pieView.slice(1)}</span>
            </p> */}

            <p className='font-bold text-[1vw] text-center mb-[1vw]'>
              Visitors per Department 
            </p>

            <div className='flex justify-center'>
              <div className='w-[22vw]'>
                <Pie data={pieDataToday} options={pieOptions} />
              </div>
            </div>

            {/* <div className='flex justify-center mt-[0.8vw] text-[0.9vw]'>
              <button onClick={() => setPieView('daily')} className={`border-gray-300 border-[0.1vw] rounded-l-[0.3vw] px-[1vw] py-[0.3vw] 
          ${pieView === 'daily' ? 'bg-gray-200' : ''}`}>Daily</button>
              <button onClick={() => setPieView('weekly')} className={`border-gray-300 border-[0.1vw] px-[1vw] py-[0.3vw] 
          ${pieView === 'weekly' ? 'bg-gray-200' : ''}`}>Weekly</button>
              <button onClick={() => setPieView('monthly')} className={`border-gray-300 border-[0.1vw] rounded-r-[0.3vw] px-[1vw] py-[0.3vw] 
          ${pieView === 'monthly' ? 'bg-gray-200' : ''}`}>Monthly</button>
            </div> */}
          </div>
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
          <Bar data={barChartData} options={options} />
        </div>

        <div className='border-gray-300 border-[0.1vw] w-[28vw] h-[29vw] rounded-[0.5vw] pt-[0.7vw]'>
          <div>  
            {/* <p className='font-bold text-[1vw] text-center mb-[1vw]'>
              Department Visitors: <span className='font-normal text-[0.9vw]'>{pieView.charAt(0).toUpperCase() + pieView.slice(1)}</span>
            </p> */}

            <p className='font-bold text-[1vw] text-center mb-[1vw]'>
              Visitors per Department 
            </p>

            <div className='flex justify-center'>
              <div className='w-[22vw]'>
                <Pie data={pieData} options={pieOptions} />
              </div>
            </div>

            {/* <div className='flex justify-center mt-[0.8vw] text-[0.9vw]'>
              <button onClick={() => setPieView('daily')} className={`border-gray-300 border-[0.1vw] rounded-l-[0.3vw] px-[1vw] py-[0.3vw] 
          ${pieView === 'daily' ? 'bg-gray-200' : ''}`}>Daily</button>
              <button onClick={() => setPieView('weekly')} className={`border-gray-300 border-[0.1vw] px-[1vw] py-[0.3vw] 
          ${pieView === 'weekly' ? 'bg-gray-200' : ''}`}>Weekly</button>
              <button onClick={() => setPieView('monthly')} className={`border-gray-300 border-[0.1vw] rounded-r-[0.3vw] px-[1vw] py-[0.3vw] 
          ${pieView === 'monthly' ? 'bg-gray-200' : ''}`}>Monthly</button>
            </div> */}
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-bold mb-2">Visitors Log</h2>
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