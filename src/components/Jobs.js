import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAll, fetchedJobs } from '../actions/actions';
import Job from './Job.js';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import moment from 'moment';

const styles = theme => ({
  cardsWrapper: {
    maxWidth: 1000,
    margin: '0 auto'
  },
  jobsCount: {
    marginBottom: 12
  },
  title: {
    fontWeight: 900,
    margin: '50px 0 30px 0'
  }
});

class Jobs extends Component {
  componentWillMount() {
    this.props.fetchAll();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newJobs) {
      this.props.Jobs.unshift(nextProps.newJobs);
    }
  }

  returnDate = (date) => {
    return date === undefined || date === '' ? '' : moment(date).fromNow();
  }

  render() {
    const { classes, Jobs, isFetching } = this.props;
    const jobItems = Jobs.map((job, index) => (
      <Job job={job} index={index} />
    ));
    return (
      <Fragment>
        {isFetching && <LinearProgress />}
      <div className={classes.cardsWrapper}>
        <Typography component="h1" variant="h1" className={classes.title}>Remote jobs</Typography>
        <Typography component="h5" variant="subheading" className={classes.jobsCount}>{Jobs.length} jobs found</Typography>
        {jobItems}
      </div>
      </Fragment>
    );
  }
}

Jobs.propTypes = {
  fetchAll: PropTypes.func.isRequired,
  Jobs: PropTypes.array.isRequired,
  newJobs: PropTypes.object,
  isFetching: PropTypes.bool,
  fetchedJobs: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  Jobs: state.Jobs.items,
  newJobs: state.Jobs.item,
  isFetching: state.Jobs.isFetching
});

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, { fetchAll, fetchedJobs })(Jobs));
