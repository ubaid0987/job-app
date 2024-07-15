import React, { useContext, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import JobContext from '../context/JobContext';
import AuthContext from '../context/AuthContext';

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useContext(JobContext);
  const { user } = useContext(AuthContext);
  const job = state.jobs.find(job => job.id === parseInt(id));

  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [resumeLink, setResumeLink] = useState('');
  const [coverLetter, setCoverLetter] = useState('');

  const handleDelete = () => {
    dispatch({ type: 'DELETE_JOB', payload: job.id });
    navigate('/');
  };

  const handleAddApplication = (e) => {
    e.preventDefault();
    const newApplication = {
      id: Date.now(),
      name: applicantName,
      email: applicantEmail,
      resume: resumeLink,
      coverLetter: coverLetter,
    };

    const updatedApplications = job.applications ? [...job.applications, newApplication] : [newApplication];
    dispatch({ type: 'UPDATE_JOB', payload: { ...job, applications: updatedApplications } });
    
    setApplicantName('');
    setApplicantEmail('');
    setResumeLink('');
    setCoverLetter('');
  };

  if (!job) {
    return <div className="text-center text-red-500 mt-8">Job not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-3xl font-bold mb-4">{job.title}</h2>
      <p className="mb-2"><span className="font-semibold">Description:</span> {job.description}</p>
      <p className="mb-2"><span className="font-semibold">Skills Required:</span> {job.skills}</p>
      <p className="mb-2"><span className="font-semibold">Salary:</span> {job.salary}</p>
      <p className="mb-2"><span className="font-semibold">Location:</span> {job.location}</p>
      <p className="mb-2"><span className="font-semibold">Company:</span> {job.company}</p>
      <p className="mb-2"><span className="font-semibold">Status:</span> {job.status}</p>
      <div className="flex space-x-4 mt-6">
        {user && user.role === 'employer' && (
          <>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              Delete Job
            </button>
            <Link
              to={`/edit-job/${job.id}`}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Edit Job
            </Link>
            <Link
              to="/applications"
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              View All Applications
            </Link>
          </>
        )}
        <Link
          to="/"
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
        >
          Back to Job Listings
        </Link>
      </div>

      {user && user.role === 'candidate' && (
        <>
          <h3 className="text-2xl font-bold mt-8">Apply for this Job</h3>
          <form onSubmit={handleAddApplication} className="mt-4">
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={applicantEmail}
                onChange={(e) => setApplicantEmail(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Resume Link</label>
              <input
                type="url"
                value={resumeLink}
                onChange={(e) => setResumeLink(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Cover Letter</label>
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              Submit Application
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default JobDetail;
