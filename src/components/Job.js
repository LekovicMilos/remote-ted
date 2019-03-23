import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Collapse  from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import moment from 'moment';

const RemoteTedLogo = '/img/camel05.png';

const styles = theme => ({
  card: {
    display: 'flex',
    marginBottom: 12,
    position: 'relative',
    transitionDuration: '0.2s',
    minHeight: 80,
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.35), 0px 1px 2px 0px rgba(0,0,0,0.24), 0px 3px 1px -1px rgba(0,0,0,0.12)'
    }
  },
  expanded: {
    paddingBottom: 70,
    cursor: 'default'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 6,
    marginLeft: 80
  },
  content: {
    flex: '1 0 auto',
    '&:last-child': {
      padding: '0 12px'
    }
  },
  cover: {
    width: 80,
    height: 80,
    backgroundSize: 'contain',
    position: 'absolute',
    top: 0,
    left: 0
  },
  jobTitle: {
    fontWeight: 'bold'
  },
  companyTitle: {
    lineHeight: 1,
    marginBottom: 6
  },
  date: {
    position: 'absolute',
    top: 6,
    right: 12
  },
  chip: {
    height: 20,
    marginRight: 6
  },
  url: {
    display: 'block',
    margin: '0 10px'
  },
  collapser: {
    padding: '20px 0',
    cursor: 'pointer',
    borderTop: '1px solid #f0f0f0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: 'center',
    '&:hover': {
      background: '#fafafa'
    }
  },
  description: {
    margin: '20px 0'
  }
});

class Job extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  returnDate = (date) => {
    return date === undefined || date === '' ? '' : moment(date).fromNow();
  }

  handleExpand = () => {
    this.setState({
      expanded: true
    });
  }

  handleCollapse = () => {
    this.setState({
      expanded: false
    });
  }

  render() {
    const { classes, job, index } = this.props;
    const { expanded } = this.state;
    return (
      <Card className={[classes.card, expanded && classes.expanded]} key={`job-${index}`} onClick={!expanded && this.handleExpand}>
        <CardMedia
          className={classes.cover}
          image={job.company_logo ? job.company_logo : RemoteTedLogo}
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h6" variant="h6" className={classes.jobTitle}>
              {job.title}
            </Typography>
            <Typography component="span" variant="subtitle2" className={classes.companyTitle}>
              {job.company}
            </Typography>
            {typeof job.tags === 'string' ? job.tags.split(',').map((tag, i) => (
              <Chip label={tag} className={classes.chip} variant="outlined" key={`tag-${index}-${i}`} />
              )) : (
                job.tags.map((tag, i) => (
                  <Chip label={tag} className={classes.chip} variant="outlined" key={`tag-2-${index}-${i}`} />
                  ))
                  )
            }
            <Typography component="span" variant="subtitle2" className={classes.date}>{this.returnDate(job.date)}</Typography>
            <Collapse in={expanded}>
              <Fragment>
                <Typography variant="subtitle1" color="textSecondary" className={classes.description} dangerouslySetInnerHTML={{__html: job.description}}>
                </Typography>
                <Button href={job.url} target="_blank" variant="outlined" size="medium" color="primary">
                  View job ad
                </Button>
              </Fragment>
            </Collapse>
          </CardContent>
        </div>
        {expanded &&
          <div className={classes.collapser} onClick={this.handleCollapse}>Collapse</div>
        }
      </Card>
    )
  }
}

Job.propTypes = {
  job: PropTypes.object.isRequired,
};

export default withStyles(styles)(Job);
