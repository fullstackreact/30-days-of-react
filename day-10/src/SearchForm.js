import React from 'react';
import PropTypes from 'prop-types';

class SearchForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    searchVisible: PropTypes.bool
  };

  static defaultProps = {
    onSubmit: () => {},
    searchVisible: false
  };

  constructor(props) {
    super(props);

    this.state = {
      searchText: ''
    };
  }

  updateSearchInput(e) {
    const val = e.target.value;
    this.setState({
      searchText: val
    });
  }

  showSearch() {
    this.setState({
      searchVisible: !this.state.searchVisible
    });
  }

  render() {
    const {searchVisible} = this.state;
    let searchClasses = ['searchInput'];
    if (searchVisible) {
      searchClasses.push('active');
    }

    return (
      <form className="header">
        <input
          type="search"
          className={searchClasses.join(' ')}
          onChange={this.updateSearchInput.bind(this)}
          placeholder="Search ..."
        />

        <div
          onClick={this.showSearch.bind(this)}
          className="fa fa-search searchIcon"
        />
      </form>
    );
  }
}

export default SearchForm;
