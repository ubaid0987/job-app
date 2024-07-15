import React, { useReducer, useEffect } from 'react';
import JobContext from './JobContext';

const initialState = {
  jobs: JSON.parse(localStorage.getItem('jobs')) || [],
};

const jobReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_JOB':
      return { ...state, jobs: [...state.jobs, action.payload] };
    case 'UPDATE_JOB':
      return {
        ...state,
        jobs: state.jobs.map(job =>
          job.id === action.payload.id ? action.payload : job
        ),
      };
    case 'DELETE_JOB':
      return {
        ...state,
        jobs: state.jobs.filter(job => job.id !== action.payload),
      };
    default:
      return state;
  }
};

const JobProvider = ({ children }) => {
  const [state, dispatch] = useReducer(jobReducer, initialState);

  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(state.jobs));
  }, [state.jobs]);

  return (
    <JobContext.Provider value={{ state, dispatch }}>
      {children}
    </JobContext.Provider>
  );
};

export default JobProvider;
