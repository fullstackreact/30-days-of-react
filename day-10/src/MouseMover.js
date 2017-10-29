import React from 'react';

class MouseMover extends React.Component {
  state = {}

  handleMouseMove = e => {
    this.setState({
      x: e.clientX,
      y: e.clientY
    })
  }

  render() {
    return (
      <div onMouseMove={this.handleMouseMove}>
        {
          this.state ? 
          'The mouse is at x: ' + this.state.x +
          ', y: ' + this.state.y
          : 'Move the mouse over this box'
        }
      </div>
    )
  }
}

export default MouseMover