import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { jobsMapper } from '../mappers/jobsMapper';

const urls = [
  {
    name: 'Landing jobs',
    url: 'https://landing.jobs/feed',
  },
  { 
    name: 'Remoteok', 
    url: 'https://remoteok.com/api' 
  },
  {
    name: 'Workingnomads',
    url: 'https://www.workingnomads.co/api/exposed_jobs',
  },
];

export const fetchAllJobs = createAsyncThunk(
  'jobs/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const results = await Promise.all(
        urls.map(async (source) => {
          try {
            const response = await fetch(source.url);
            const data = await response.json();
            return data.jobs ? data.jobs : data;
          } catch (error) {
            console.warn(`Failed to fetch from ${source.name}:`, error);
            return [];
          }
        })
      );
      
      const allJobs = results.flat().filter(job => job && typeof job === 'object');
      return jobsMapper(allJobs);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  isFetching: false,
  error: null,
};

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllJobs.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(fetchAllJobs.fulfilled, (state, action) => {
        state.isFetching = false;
        state.items = action.payload;
      })
      .addCase(fetchAllJobs.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload;
      });
  },
});

export default jobsSlice.reducer;

