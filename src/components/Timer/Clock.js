import React from 'react';

import Formatter from './Formatter'

class Clock extends React.Component {
  state = { currentTime: new Date() }
  componentDidMount() {
    this.setState({
      currentTime: new Date()
    }, this.updateTime);
  }
  componentWillUnmount() {
    if (this.timerId) {
      clearTimeout(this.timerId)
    }
  }
  
  updateTime = e => {
    this.timerId = setTimeout(() => {
      this.setState({
        currentTime: new Date()
      }, this.updateTime);
    })
  }
  
  render() {
    const { currentTime } = this.state
    const hour = currentTime.getHours();
    const minute = currentTime.getMinutes();
    const second = currentTime.getSeconds();

    return (
      <div className='clock'>
        <Formatter
          {...this.props}
          state={this.state}
          hours={hour}
          minutes={minute}
          seconds={second}
        />
      </div>
    )
  }
}

export default Clock