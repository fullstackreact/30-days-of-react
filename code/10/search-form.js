class SearchForm extends React.Component {
  static propTypes = {
    onSubmit: T.func.isRequired,
    searchVisible: T.bool
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
    const {searchVisible, className} = this.props;

    return (
      <form onSubmit={this.submitForm.bind(this)}>
        <input
          type="search"
          className={classnames(styles.searchInput, {
            [styles.active]: searchVisible
          })}
          onChange={this.updateSearchInput.bind(this)}
          placeholder="Search ..." />
      </form>
    );
  }
}