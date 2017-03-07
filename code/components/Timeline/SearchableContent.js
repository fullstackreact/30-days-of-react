import React from 'react'
import {Panel, Header, AsyncContent} from './Timeline';
import styles from './timeline.module.css';
import 'whatwg-fetch'

import data from '../../data/07.json'
const rootUrl = `https://api.github.com`
const endpoint = `/users/fullstackreact/events`

export class SearchableContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false, // <~ set loading to false
      activities: [],
      searchFilter: ''
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

  handleSearch(val) {
    this.setState({
      searchFilter: val,
      loading: true
    })
  }

  onComponentRefresh() {
    this.setState({loading: false})
  }

  // Call out to github and refresh directory
  updateData() {
    const {activities, searchFilter} = this.state;

    const filter = searchFilter !== '' && 
            (e => e.actor.login.match(new RegExp(searchFilter)));

    const fetchDataOrCache = () => Promise.resolve(activities)

    // Use cached data if we have it
    return fetchDataOrCache()
      .then(json => json || data)
      .then(json => filter ? json.filter(filter) : json)
      .then(json => {
        if (activities.length == 0) {
          this.setState({activities: json})
        }
        return json;
      })
      .then(json => json.slice(0, 4))
  }

  render() {
    const {loading} = this.state;
    
    return (
      <Panel>
        <Header
          onSearch={this.handleSearch.bind(this)} 
          title="Github activity" />
        <AsyncContent 
          requestRefresh={loading}
          onComponentRefresh={this.onComponentRefresh.bind(this)}
          fetchData={this.updateData.bind(this)} />
      </Panel>
    )
  }
}

export default SearchableContent