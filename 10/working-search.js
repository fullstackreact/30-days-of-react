const rootUrl = `https://api.github.com`
const endpoint = `/users/fullstackreact/events`

class Panel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false, // <~ set loading to false
      activities: [],
      searchFilter: ''
    }
  }

  // Call out to github and refresh directory
  updateData() {
    const {activities, searchFilter} = this.state;

    // filter function
    const filter = searchFilter !== '' && 
            (e => e.actor.login.match(new RegExp(searchFilter)));

    json = activities.filter(filter);
    if (activities.length == 0) {
      this.setState({activities: json})
    }
    return json;
  }

  // Update the data when the component mounts
  componentDidMount() {this.updateData();}
  componentWillReceiveProps(nextProps) {
    // Check to see if the requestRefresh prop has changed
    if (nextProps.requestRefresh !== this.props.requestRefresh) {
      this.setState({loading: true}, this.updateData);
    }
  }

  onComponentRefresh() {this.setState({loading: false});}
  handleSearch(val) {
    this.setState({
      searchFilter: val,
      loading: true
    })
  }

  render() {
    const {loading} = this.state;
    
    return (
      <div>
        <Header
          onSearch={this.handleSearch.bind(this)} 
          title="Github activity" />
        <Content 
          requestRefresh={loading}
          onComponentRefresh={this.onComponentRefresh.bind(this)}
          fetchData={this.updateData.bind(this)} />
      </div>
    )
  }
}

export default SearchableContent