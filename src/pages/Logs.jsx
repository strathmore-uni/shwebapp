import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ActivityLogPage = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axios.get('https://vms.cognitron.co.ke/api/activity/logs');
        console.log('Fetched logs:', res.data);
        if (Array.isArray(res.data)) {
          setLogs(res.data);
        } else {
          console.warn('Expected array but got:', typeof res.data, res.data);
          setLogs([]); // fallback
        }
      } catch (err) {
        console.error('Failed to fetch logs:', err);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div className='pt-[6vw] pl-[14vw] h-screen overflow-y-scroll w-screen'>
      <h2 className="text-xl font-bold mb-4">User Activity Logs</h2>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="text-left p-2">Name</th>
            <th className="text-left p-2">Staff ID</th>
            <th className="text-left p-2">Role</th>
            <th className="text-left p-2">Action</th>
            <th className="text-left p-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <tr key={log._id} className="border-t">
              <td className="p-2">{log.username}</td>
              <td className="p-2">{log.staffid}</td>
              <td className="p-2">{log.role}</td>
              <td className="p-2 capitalize">{log.action}</td>
              <td className="p-2">{new Date(log.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityLogPage;
