import React from "react";
const timezones = ["PST", "MST", "MDT", "EST", "UTC"];

export class TimeForm extends React.Component {
  constructor(props) {
    super(props);

    this._changeTimezone = this._changeTimezone.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._changeMsg = this._changeMsg.bind(this);

    const { tz, msg } = this.props;
    this.state = { tz, msg };
  }

  _handleChange(evt) {
    typeof this.props.onFormChange === "function" &&
      this.props.onFormChange(this.state);
  }

  _changeTimezone(evt) {
    const tz = evt.target.value;
    this.setState({ tz }, this._handleChange);
  }

  _changeMsg(evt) {
    const msg = encodeURIComponent(evt.target.value).replace(/%20/g, "+");
    this.setState({ msg }, this._handleChange);
  }

  _handleFormSubmit(evt) {
    evt.preventDefault();
    typeof this.props.onFormSubmit === "function" &&
      this.props.onFormSubmit(this.state);
  }

  render() {
    const { tz } = this.state;

    return (
      <form onSubmit={this._handleFormSubmit}>
        <select onChange={this._changeTimezone} defaultValue={tz}>
          {timezones.map(t => {
            return (
              <option key={t} value={t}>
                {t}
              </option>
            );
          })}
        </select>
        <input
          type="text"
          placeholder="A chronic string message (such as 7 hours from now)"
          onChange={this._changeMsg}
        />
        <input type="submit" value="Update request" />
      </form>
    );
  }
}

export default TimeForm;
