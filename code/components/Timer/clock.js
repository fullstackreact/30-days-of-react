import React, { PropTypes as T } from 'react'
import classnames from 'classnames';

import styles from './clock.module.css'

export class Clock extends React.Component {

  static defaultProps = {
    offset: -7,
    title: 'San Francisco'
  }

  constructor(props) {
    super(props);

    this.state = this.getTime();
  }

  componentDidMount() {
    this.setTimer();
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  setTimer() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.updateClock.bind(this), 1000);
  }

  updateClock() {
    this.setState(this.getTime(), this.setTimer);
  }

  getTime() {
    const rawTime = new Date();
    const utc = rawTime.getTime() + (rawTime.getTimezoneOffset() * 60000);
    const currentTime = new Date(utc + (3600000*this.props.offset));
    return {
      hours: currentTime.getHours(),
      minutes: currentTime.getMinutes(),
      seconds: currentTime.getSeconds(),
      ampm: currentTime.getHours() > 12 ? 'pm' : 'am'
    }
  }

  render() {
    const {title} = this.props;
    const {hours, minutes, seconds, ampm} = this.state;
    return (
      <div className={styles.clock}>
        {
          hours == 0 ? 12 :
            (hours > 12) ?
              hours - 12 : hours
        }:{
          minutes > 9 ? minutes : `0${minutes}`
        }:{
          seconds > 9 ? seconds : `0${seconds}`
        } {ampm}
      </div>
    )
  }
}

export default Clock