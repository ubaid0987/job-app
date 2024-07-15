import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import JobContext from '../context/JobContext';
import { FaMapMarkerAlt, FaMoneyBillWave, FaBuilding } from 'react-icons/fa';

const JobList = () => {
  const { state } = useContext(JobContext);
  const [searchTerm, setSearchTerm] = useState('');
  const { jobs } = state;

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.skills.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.salary.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Job Listings</h2>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search jobs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <ul className="space-y-4">
          {filteredJobs.map(job => (
            <li key={job.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <Link to={`/job/${job.id}`} className="block text-2xl font-semibold text-blue-600 hover:underline mb-2">
                {job.title}
              </Link>

              <div className='flex justify-between align-middle'>
                <div className="flex items-center text-gray-500 mb-2">
                  <FaBuilding className="mr-2" /> {job.company}
                </div>
                <div className="flex items-center text-gray-500 mb-2">
                  <FaMapMarkerAlt className="mr-2" /> {job.location}
                </div>
                <div className="flex items-center text-gray-500 mb-2">
                  <FaMoneyBillWave className="mr-2" /> {job.salary}
                </div>
              </div>
              <p className="text-gray-600 mt-4">{job.description.substring(0, 100)}...</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default JobList;
