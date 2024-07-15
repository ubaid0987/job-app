import React, { useContext, useState, useEffect, useMemo } from 'react';
import JobContext from '../context/JobContext';
import { Link } from 'react-router-dom';

const AllApplications = () => {
  const { state } = useContext(JobContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCriteria, setFilterCriteria] = useState('');
  const [filteredApplications, setFilteredApplications] = useState([]);

  const allApplications = useMemo(() => {
    return state?.jobs?.reduce((acc, job) => {
      job?.applications?.forEach(application => {
        acc.push({ ...application, jobTitle: job.title });
      });
      return acc;
    }, []);
  }, [state.jobs]);

  useEffect(() => {
    const applications = allApplications.filter(app => {
      return app.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredApplications(applications);
  }, [searchTerm, allApplications]);

  useEffect(() => {
    if (!filterCriteria) {
      setFilteredApplications(allApplications);
      return;
    }

    const applications = allApplications.filter(app => {
      if (filterCriteria === 'name') {
        return app.name.toLowerCase().includes(searchTerm.toLowerCase());
      }
      if (filterCriteria === 'email') {
        return app.email.toLowerCase().includes(searchTerm.toLowerCase());
      }
      if (filterCriteria === 'jobTitle') {
        return app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return true;
    });
    setFilteredApplications(applications);
  }, [filterCriteria, searchTerm, allApplications]);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-3xl font-bold mb-6 text-center">All Applications</h2>
      <div className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search"
          className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Filter By:</label>
        <select
          value={filterCriteria}
          onChange={(e) => setFilterCriteria(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">None</option>
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="jobTitle">Job Title</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Job Title Applied For
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Resume
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Cover Letter
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((app, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {app.name}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {app.email}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {app.jobTitle}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <a href={app.resume} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                    View Resume
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  {app.coverLetter}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 text-center">
        <Link to="/" className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">
          Back to Job Listings
        </Link>
      </div>
    </div>
  );
};

export default AllApplications;
