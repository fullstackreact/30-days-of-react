const rootUrl = `https://api.github.com`
const endpoint = `/users/fullstackreact/events`

class Panel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false, // <~ set loading to false
      activities: []
    }
  }

  componentDidMount() {this.updateData();}
  componentWillReceiveProps(nextProps) {
    // Check to see if the requestRefresh prop has changed
    if (nextProps.requestRefresh !== this.props.requestRefresh) {
      this.setState({loading: true}, this.updateData);
    }
  }

  // Call out to github and refresh directory
  updateData() {
    this.setState({
      loading: false,
      activities: data
    }, this.props.onComponentRefresh);
  }

  render() {
    const {loading, activities} = this.state;
    
    return (
      <div>
        <Header
          title="Github activity" />
        <Content 
          requestRefresh={loading}
          onComponentRefresh={this.onComponentRefresh.bind(this)}
          fetchData={this.updateData.bind(this)} />
      </div>
    )
  }
}
