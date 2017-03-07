import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import 'whatwg-fetch';

import {
  Panel, Header, Content, Item,
  ContentContainer,
  AsyncContent, Footer,
  ActivityItem
} from './components/Timeline/Timeline';

import {
  Clock
} from './components/Timer/clock';

import data from './data/07.json'

const rootUrl = `https://api.github.com`
const endpoint = `/users/fullstackreact/events`

export const load = function(err, cb) {

  const count = 4;
  const fetchEvents = () => Promise.resolve(data)
                              .then(json => json.slice(0, 4))

  let mount = document.querySelector('#demo1');
  ReactDOM.render(<Panel>
      <Header title="Github activity" />
      <AsyncContent fetchData={fetchEvents} />
    </Panel>, mount);

  class Demo2 extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        refreshing: false
      }
    }

    refresh() {
      this.setState({refreshing: true})
    }

    onComponentRefresh() {
      this.setState({refreshing: false});
    }

    render() {
      const {refreshing} = this.state;
      return (
        <Panel>
          <Header title="Github activity" />
          <AsyncContent 
            onComponentRefresh={this.onComponentRefresh.bind(this)}
            requestRefresh={refreshing}
            fetchData={fetchEvents} />
          <Footer>
            <button onClick={this.refresh.bind(this)}>
              <i className={classnames("fa fa-refresh", {
                "fa-spin": refreshing
              })} />
              Refresh
            </button>
          </Footer>
        </Panel>
      )
    }
  }

  mount = document.querySelector('#demo2');
  ReactDOM.render(<Demo2 />, mount);

  mount = document.querySelector('#clock');
  ReactDOM.render(<Clock />, mount);
}

export default load;