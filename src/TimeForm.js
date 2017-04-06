import React from 'react'
const timezones = ['PST', 'MST', 'MDT', 'EST', 'UTC']

export class TimeForm extends React.Component {
  constructor(props) {
    super(props);

    const {tz, msg} = this.props;
    this.state = {tz, msg};
  }

  _handleChange(evt) {
    typeof this.props.onFormChange === 'function' && 
      this.props.onFormChange(this.state);
  }

  _changeTimezone(evt) {
    const tz = evt.target.value;
    this.setState({tz}, this._handleChange);
  }

  _changeMsg(evt) {
    const msg = 
      encodeURIComponent(evt.target.value).replace(/%20/, '+');
    this.setState({msg}, this._handleChange);
  }

  _handleFormSubmit(evt) {
    evt.preventDefault();
    typeof this.props.onFormSubmit === 'function' &&
      this.props.onFormSubmit(this.state);
  }

  render() {
    const {tz} = this.state;

    return (
      <form onSubmit={this._handleFormSubmit.bind(this)}>
        <select
          onChange={this._changeTimezone.bind(this)}
          defaultValue={tz}>
          {timezones.map(t => {
            return (<option key={t} value={t}>{t}</option>)
          })}
        </select>
        <input
          type="text"
          placeholder="A chronic string message (such as 7 hours from now)"
          onChange={this._changeMsg.bind(this)}
        />
        <input
          type="submit"
          value="Update request"
        />
      </form>
    )
  }
}

export default TimeForm;
