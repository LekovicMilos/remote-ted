import * as R from 'ramda';

export const mapper = payload => {
  return R.applySpec({
    company: R.propOr(R.propOr('', 'company')(payload), 'company_name'),
    id: R.propOr('', 'id'),
    company_logo: R.propOr('', 'company_logo'),
    description: R.propOr('', 'description'),
    title: R.propOr(R.propOr('', 'title')(payload), 'position'),
    type: R.propOr('', 'type'),
    url: R.propOr('', 'url'),
    location: R.propOr('', 'location'),
    tags: R.propOr([], 'tags'),
    date: R.propOr(R.propOr(R.propOr(R.propOr(R.propOr(R.propOr('', 'pubDate')(payload), 'pub_date')(payload), 'dateadded')(payload), 'published')(payload), 'date')(payload), 'created_at')
  })(payload)
};

export const jobsMapper = payload => {
  return R.reject(R.where({title: R.equals('')}), R.pipe(
    R.map(mapper)
)(payload))};