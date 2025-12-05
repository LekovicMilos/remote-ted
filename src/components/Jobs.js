import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllJobs } from '../reducers/jobsSlice';
import Job from './Job';
import { Box, Typography, LinearProgress } from '@mui/material';

const Jobs = () => {
  const dispatch = useDispatch();
  const { items: jobs, isFetching } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchAllJobs());
  }, [dispatch]);

  return (
    <>
      {isFetching && <LinearProgress />}
      <Box
        sx={{
          maxWidth: 1000,
          margin: '0 auto',
        }}
      >
        <Typography
          component="h1"
          variant="h1"
          sx={{
            fontWeight: 900,
            margin: '50px 0 30px 0',
          }}
        >
          Remote jobs
        </Typography>
        <Typography
          component="h5"
          variant="subtitle1"
          sx={{ marginBottom: '12px' }}
        >
          {jobs.length} jobs found
        </Typography>
        {jobs.map((job, index) => (
          <Job key={job.id || `job-${index}`} job={job} index={index} />
        ))}
      </Box>
    </>
  );
};

export default Jobs;
