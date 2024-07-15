import React, { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import JobContext from '../context/JobContext';

const JobForm = () => {
  const { state, dispatch } = useContext(JobContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const existingJob = id ? state.jobs.find(job => job.id === parseInt(id)) : null;

  const [title, setTitle] = useState(existingJob ? existingJob.title : '');
  const [description, setDescription] = useState(existingJob ? existingJob.description : '');
  const [skills, setSkills] = useState(existingJob ? existingJob.skills : '');
  const [salary, setSalary] = useState(existingJob ? existingJob.salary : '');
  const [location, setLocation] = useState(existingJob ? existingJob.location : '');
  const [company, setCompany] = useState(existingJob ? existingJob.company : '');
  const [status, setStatus] = useState(existingJob ? existingJob.status : 'open');

  const handleSubmit = (e) => {
    e.preventDefault();
    const jobData = {
      id: existingJob ? existingJob.id : Date.now(),
      title,
      description,
      skills,
      salary,
      location,
      company,
      status,
    };

    if (existingJob) {
      dispatch({ type: 'UPDATE_JOB', payload: jobData });
    } else {
      dispatch({ type: 'ADD_JOB', payload: jobData });
    }

    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{existingJob ? 'Update Job' : 'Add Job'}</h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="my-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div className="my-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                id="description"
                name="description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div className="my-4">
              <label htmlFor="skills" className="block text-sm font-medium text-gray-700">Skills Required</label>
              <input
                id="skills"
                name="skills"
                type="text"
                required
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div className="my-4">
              <label htmlFor="salary" className="block text-sm font-medium text-gray-700">Salary</label>
              <input
                id="salary"
                name="salary"
                type="text"
                required
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div className="my-4">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
              <input
                id="location"
                name="location"
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div className="my-4">
              <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company Name</label>
              <input
                id="company"
                name="company"
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div className="my-4">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
              <select
                id="status"
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              >
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {existingJob ? 'Update Job' : 'Add Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobForm;
