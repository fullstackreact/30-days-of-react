import React from 'react';
import MenuButton from './MenuButton'

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <MenuButton/>

        <span className="title">Timeline</span>

        <input
          type="text"
          className="searchInput"
          placeholder="Search ..." />

        <div className="fa fa-search searchIcon"></div>
      </div>
    )
  }
}

export default Header
