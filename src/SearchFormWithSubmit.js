import React from 'react';

class SearchForm extends React.Component {
  static propTypes = {
    onSubmit: React.PropTypes.func.isRequired,
    searchVisible: React.PropTypes.bool
  }

  static defaultProps = {
    onSubmit: () => {},
    searchVisible: false
  }

  constructor(props) {
    super(props);

    this.state = {
      searchText: ''
    }
  }

  updateSearchInput(e) {
    const val = e.target.value;
    this.setState({
      searchText: val
    });
  }

  submitForm(e) {
    e.preventDefault();

    const {searchText} = this.state;
    this.props.onSubmit(searchText);
  }

  render() {
    const { searchVisible } = this.props;
    let searchClasses = ['searchInput']
    if (searchVisible) {
      searchClasses.push('active')
    }

    return (
      <form onSubmit={this.submitForm.bind(this)}>
        <input
          type="search"
          className={searchClasses.join(' ')}
          onChange={this.updateSearchInput.bind(this)}
          placeholder="Search ..." />
      </form>
    );
  }
}

export default SearchForm