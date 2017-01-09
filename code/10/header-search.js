class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchVisible: false
    }
  }

  // toggle visibility when run on the state
  showSearch() {
    this.setState({
      searchVisible: !this.state.searchVisible
    })
  }

  handleSearch(val) {
    // Called when the 
  }

  render() {
    // Classes to add to the <input /> element
    let searchInputClasses = ["searchInput"];

    // Update the class array if the state is visible
    if (this.state.searchVisible) {
      searchInputClasses.push("active");
    }

    return (
      <div className="header">
        <div className="fa fa-more"></div>

        <span className="title">
          {this.props.title}
        </span>

        <SearchForm
          searchVisible={this.state.searchVisible}
          onSubmit={this.handleSearch.bind(this)} />

        {/* Adding an onClick handler to call the showSearch button */}
        <div
          onClick={this.showSearch.bind(this)}
          className="fa fa-search searchIcon"></div>
      </div>
    )
  }
}
