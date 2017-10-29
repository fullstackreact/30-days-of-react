import React from 'react'

class UserLink extends React.Component {
  render() {
    const { user } = this.props
    return (
      <div>
        Welcome back {user.name}
      </div>
    )
  }
}

UserLink.propTypes = {
  user: (props, propName, componentName) => {
    if (!props[propName] || !props[propName].name) {
      return new Error(
        "Invalid " + propName + ": No name property defined for component " + componentName
      )
    }
  }
}

export default UserLink