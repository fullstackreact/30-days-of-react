Clock.propTypes = {
  basicObject: React.PropTypes.object,

  numbers: React.PropTypes
    .objectOf(React.PropTypes.numbers),

  messages: React.PropTypes
    .instanceOf(Message),

  contactList: React.PropTypes.shape({
    name: React.PropTypes.string,
    phone: React.PropTypes.string,
  })
}