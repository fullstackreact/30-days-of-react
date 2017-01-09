class Content extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false, // <~ set loading to false
      activities: []
    }
  }

  // Update the data when the component mounts
  componentDidMount() {
    this.updateData();
  }

  componentWillReceiveProps(nextProps) {
    // Check to see if the requestRefresh prop has changed
    if (nextProps.requestRefresh !== this.props.requestRefresh) {
      this.setState({loading: true}, this.updateData);
    }
  }

  // Call out to github data and refresh directory
  updateData() {
    this.setState({
      loading: false,
      activities: data
    }, this.props.onComponentRefresh);
  }

  render() {
    const {loading, activities} = this.state;
    
    return (
      <div className="content">
        <div className="line"></div>
        {/* Show loading message if loading */}
        {loading && <div>Loading</div>}
        {/* Timeline item */}
        {activities.map((activity) => (
          <ActivityItem
            activity={activity} />
        ))}
        
      </div>
    )
  }
}
