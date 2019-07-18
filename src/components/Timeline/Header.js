import React from 'react';
import PropTypes from 'prop-types';
import MenuButton from './MenuButton';

class Header extends React.Component {
  render() {
    const {title} = this.props //Get the title from props object
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
//Set value for a property in the props object
Header.propTypes={ 
  title: PropTypes.string
}
//Set default value of props
Header.defaultProps = {
  title: "Github timelime"
} 
export default Header
