import PropTypes from 'prop-types';

Clock.propTypes = {
  counts: PropTypes.array,
  users: PropTypes.arrayOf(PropTypes.object),
  alarmColor: PropTypes.oneOf(['red', 'blue']),
  description: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Title)
  ])
};
