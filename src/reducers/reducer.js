import { FETCH_JOBS, FETCHED_JOBS } from '../actions/types';
import { jobsMapper } from '../mappers/jobsMapper';

const initialState = {
  items: [],
  item: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_JOBS:
      return {
        ...state,
        items: jobsMapper(action.payload),
        isFetching: true
      };
    case FETCHED_JOBS:
      return {
        ...state,
        items: jobsMapper(action.payload),
        isFetching: false
      };
    default:
      return state;
  }
}
