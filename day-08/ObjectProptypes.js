import PropTypes from 'prop-types';

Clock.propTypes = {
  basicObject: PropTypes.object,

  numbers: PropTypes.objectOf(PropTypes.numbers),

  messages: PropTypes.instanceOf(Message),

  contactList: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string
  })
};
