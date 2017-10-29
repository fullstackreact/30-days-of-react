import React from 'react';

import Header from './HeaderSearch';
import ActivityItem from './components/Timeline/GithubActivityItem';

const data = require('./data.json');

class Panel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false, // <~ set loading to false
      activities: data,
      filtered: data
    };
  }

  componentDidMount() {
    this.updateData();
  }
  componentWillReceiveProps(nextProps) {
    // Check to see if the requestRefresh prop has changed
    if (nextProps.requestRefresh === true) {
      this.setState({loading: true}, this.updateData);
    }
  }

  handleSearch = txt => {
    if (txt === '') {
      this.setState({
        filtered: this.state.activities
      });
    } else {
      const {activities} = this.state;
      const filtered = activities.filter(
        a => a.actor && a.actor.login.match(txt)
      );
      this.setState({
        filtered
      });
    }
  };

  // Call out to github and refresh directory
  updateData() {
    this.setState(
      {
        loading: false,
        activities: data
      },
      this.props.onComponentRefresh
    );
  }

  render() {
    const {loading, filtered} = this.state;

    return (
      <div>
        <Header onSubmit={this.handleSearch} title="Github activity" />
        <div className="content">
          <div className="line" />
          {/* Show loading message if loading */}
          {loading && <div>Loading</div>}
          {/* Timeline item */}
          {filtered.map(activity => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
        </div>
      </div>
    );
  }
}

export default Panel;
