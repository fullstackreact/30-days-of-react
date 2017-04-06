import React, { Children as C, Component } from 'react';

class Form extends Component {
  state = { fields: {} }

  handleChange = (key, value) => {
    const fields = {
      ...this.state.fields,
      [key]: value
    }
    this.setState({
      fields
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.onSubmit(this.state.fields)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {C.map(this.props.children, c => React.cloneElement(c, {
          ...this.props,
          onChange: this.handleChange
        }))}
        <input
          type='submit'
          name='Submit' />
      </form>
    )
  }
}

export default Form