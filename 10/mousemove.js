class MouseMove extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: -1,
      y: -1
    }
  }
  mouseMoved(e) {
    this.setState({
      x: e.screenX,
      y: e.screenY
    })
  }
  render() {
    const {x, y} = this.state;
    return (
      <div onMouseMove={this.mouseMoved.bind(this)}>
        Mouse is at {x}, {y}
      </div>
    )
  }
}