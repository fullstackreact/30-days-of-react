import React, { PropTypes as T } from 'react'
import classnames from 'classnames';

import styles from './clock.module.css'

const timezones = ['PST', 'MST', 'MDT', 'EST', 'UTC']
const host = 'https://fullstacktime.herokuapp.com'
const baseUrl = (str='now', tz='pdt') => {
  return `${host}/${tz}/${str}.json`
}

class TimeForm extends React.Component {
  constructor(props) {
    super(props);

    const {tz, msg} = this.props;
    this.state = {tz, msg};
  }z

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
    const {tz, msg} = this.state;

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

const Loading = ({visible = false}) => {
  return visible ? (<div>Loading...</div>) : <span />
};

const UpdateTimeButton = ({handleClick}) => {
  return (
    <button onClick={handleClick}>
      Get the current time
    </button>
  )
}

export class TimeComponent extends React.Component {
  static propTypes = {
    showTzChange: React.PropTypes.bool
  }

  static defaultProps = {
    showTzChange: false
  }

  constructor(props) {
    super(props);
    this.state = {
      currentTime: null,
      tz: timezones[0],
      msg: 'now',
      loading: false
    }
  }

  fetchCurrentTime() {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
    this.setState({loading: true}, () => this._timeout = setTimeout(this._fetchCurrentTime.bind(this), 300));
  }

  componentWillUnmount() {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
  }

  _fetchCurrentTime() {
    fetch(this.getApiUrl())
      .then(resp => resp.json())
      .then(resp => {
        const currentTime = resp.dateString;
        this.setState({currentTime, loading: false})
      })
      .catch(err => {
        console.log(err);
      })
  }

  getApiUrl() {
    const {tz, msg} = this.state;
    return `${baseUrl(msg, tz)}`;
  }

  handleFormSubmit(evt) {
    this.fetchCurrentTime();
  }

  handleChange(newState) {
    this.setState(newState);
  }

  render() {
    const apiUrl = this.getApiUrl();
    const {loading, currentTime, tz} = this.state;
    const {showTzChange} = this.props;

    return (
      <div>
        <Loading visible={loading} />
        {!currentTime && <UpdateTimeButton handleClick={this.fetchCurrentTime.bind(this)} />}
        {currentTime && <div>The current time is: {currentTime.toString()}</div>}
        {showTzChange && <TimeForm
          onFormSubmit={this.handleFormSubmit.bind(this)}
          onFormChange={this.handleChange.bind(this)}
          tz={tz}
          msg={'now'}
        />}
        <p>We'll be making a request from: <code>{apiUrl}</code></p>
          <small>This demo uses an instance of the <a href="http://chronic.herokuapp.com/">Chronic web server</a>. 
          It is hosted on Heroku at <a href="https://fullstacktime.herokuapp.com">https://fullstacktime.herokuapp.com</a>.
          Check out the docs there for more information.</small>
      </div>
    )
  }
}

export default TimeComponent