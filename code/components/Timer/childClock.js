import React, { PropTypes as T } from 'react'
import classnames from 'classnames';

import styles from './clock.module.css'

export const Hour    = (props) => {
  let {hours} = props;
  if (hours == 0) {
    hours = 12;
  }
  if (props.twelveHours) {
    hours = hours - 12;
  }
  return (<span>{hours}</span>)
}
export const Minute  = ({minutes}) => (<span>{minutes<10 && '0'}{minutes}</span>)
export const Second  = ({seconds}) => (<span>{seconds<10 && '0'}{seconds}</span>)
export const Separator = ({separator}) => (<span>{separator || ':'}</span>)
export const Space = () => (<span> </span>)
export const Ampm = ({hours}) => (<span>{hours >= 12 ? 'pm' : 'am'}</span>)

export const Formatter = ({format, state}) => {
  let children = format.split('').map(e => {
    if (e == 'h') {
      return <Hour />
    } else if (e == 'm') {
      return <Minute />
    } else if (e == 's') {
      return <Second />
    } else if (e == 'p') {
      return <Ampm />
    } else if (e == ' ') {
      return <Space />;
    } else {
      return <Separator />
    }
  });
  return <span>
    {React.Children.map(children, c => React.cloneElement(c, state))}</span>
}

Formatter.PropTypes = {
  hours: T.number,
  minutes: T.number
}

export class ChildClock extends React.Component {

  static defaultProps = {
    offset: -7,
    title: 'San Francisco',
    separator: ':',
    format: 'h:m:s p',
    twelveHours: false,
    hours: 0,
    minutes: 0,
    seconds: 0,
    ampm: 'pm'
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
    return (
      <div className={styles.clock}>
        <Formatter {...this.props} state={this.state} />
      </div>
    )
  }
}

export default ChildClock