class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getTime();
  }

  componentDidMount() {
    this.setTimer();
  }

  setTimer() {
    this.timeout = setTimeout(this.updateClock.bind(this), 1000);
  }

  updateClock() {
    this.setState(this.getTime, this.setTimer);
  }

  getTime() {
    const currentTime = new Date();
    return {
      hours: currentTime.getHours(),
      minutes: currentTime.getMinutes(),
      seconds: currentTime.getSeconds(),
      ampm: currentTime.getHours() >= 12 ? 'pm' : 'am'
    }
  }

  // ...
}