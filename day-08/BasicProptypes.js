import PropTypes from 'prop-types';

Clock.propTypes = {
  title: PropTypes.string,
  count: PropTypes.number,
  isOn: PropTypes.bool,
  onDisplay: PropTypes.func,
  symbol: PropTypes.symbol,
  user: PropTypes.object,

  name: PropTypes.node
};
