Clock.propTypes = {
  counts: React.PropTypes.array,
  users: React.PropTypes.arrayOf(React.PropTypes.object),
  alarmColor: React.PropTypes.oneOf(['red', 'blue']),
  description: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.instanceOf(Title)
    ]),
}