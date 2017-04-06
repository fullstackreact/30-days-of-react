class Container extends React.Component {
  constructor(props) {
    super(props);

    this.state = {refreshing: false}
  }

  // Bound to the refresh button
  refresh() {
    this.setState({refreshing: true})
  }

  // Callback from the `Content` component
  onComponentRefresh() {
    this.setState({refreshing: false});
  }

  render() {
    const {refreshing} = this.state;
    return (
      <Panel>
        <Header title="Github activity" />
        {/* refreshing is the component's state */}
        <Content
          onComponentRefresh={this.onComponentRefresh.bind(this)}
          requestRefresh={refreshing}
          fetchData={fetchEvents} />
        {/* A container for styling */}
        <Footer>
          <button onClick={this.refresh.bind(this)}>
            <i className="fa fa-refresh" />
            Refresh
          </button>
        </Footer>
      </Panel>
    )
  }
}