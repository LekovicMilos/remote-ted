import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Collapse,
  Button,
  Box,
} from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const RemoteTedLogo = '/img/camel05.png';

const Job = ({ job, index }) => {
  const [expanded, setExpanded] = useState(false);

  const formatDate = useCallback((date) => {
    if (!date) return '';
    return dayjs(date).fromNow();
  }, []);

  const handleExpand = useCallback(() => {
    setExpanded(true);
  }, []);

  const handleCollapse = useCallback((e) => {
    e.stopPropagation();
    setExpanded(false);
  }, []);

  const tags = typeof job.tags === 'string' 
    ? job.tags.split(',').filter(Boolean) 
    : (Array.isArray(job.tags) ? job.tags : []);

  return (
    <Card
      sx={{
        display: 'flex',
        marginBottom: '12px',
        position: 'relative',
        transitionDuration: '0.2s',
        minHeight: 80,
        cursor: expanded ? 'default' : 'pointer',
        paddingBottom: expanded ? '70px' : 0,
        '&:hover': {
          boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.35), 0px 1px 2px 0px rgba(0,0,0,0.24), 0px 3px 1px -1px rgba(0,0,0,0.12)',
        },
      }}
      onClick={!expanded ? handleExpand : undefined}
    >
      <CardMedia
        sx={{
          width: 80,
          height: 80,
          backgroundSize: 'contain',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
        image={job.company_logo || RemoteTedLogo}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          paddingBottom: '6px',
          marginLeft: '80px',
        }}
      >
        <CardContent
          sx={{
            flex: '1 0 auto',
            '&:last-child': {
              padding: '0 12px',
            },
          }}
        >
          <Typography
            component="h6"
            variant="h6"
            sx={{ fontWeight: 'bold' }}
          >
            {job.title}
          </Typography>
          <Typography
            component="span"
            variant="subtitle2"
            sx={{ lineHeight: 1, marginBottom: '6px', display: 'block' }}
          >
            {job.company}
          </Typography>
          {tags.map((tag, i) => (
            <Chip
              key={`tag-${index}-${i}`}
              label={tag}
              variant="outlined"
              sx={{ height: 20, marginRight: '6px' }}
            />
          ))}
          <Typography
            component="span"
            variant="subtitle2"
            sx={{
              position: 'absolute',
              top: 6,
              right: 12,
            }}
          >
            {formatDate(job.date)}
          </Typography>
          <Collapse in={expanded}>
            <Box>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                sx={{ margin: '20px 0' }}
                dangerouslySetInnerHTML={{ __html: job.description }}
              />
              <Button
                href={job.url}
                target="_blank"
                variant="outlined"
                size="medium"
                color="primary"
              >
                View job ad
              </Button>
            </Box>
          </Collapse>
        </CardContent>
      </Box>
      {expanded && (
        <Box
          sx={{
            padding: '20px 0',
            cursor: 'pointer',
            borderTop: '1px solid #f0f0f0',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            textAlign: 'center',
            '&:hover': {
              background: '#fafafa',
            },
          }}
          onClick={handleCollapse}
        >
          Collapse
        </Box>
      )}
    </Card>
  );
};

Job.propTypes = {
  job: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default Job;
