import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import Demo from './components/Demo'

import styles from './10.module.css';

import {
  Panel, Header, Content, Item,
  ContentContainer, AsyncContent,
  ActivityItem, SearchForm
} from './components/Timeline/Timeline';

import SearchableContent from './components/Timeline/SearchableContent'

import data from './data/07.json'

class MouseMove extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: -1,
      y: -1
    }
  }
  mouseMoved(e) {
    this.setState({
      x: e.screenX,
      y: e.screenY
    })
  }
  render() {
    const {x, y} = this.state;
    return (
      <div onMouseMove={this.mouseMoved.bind(this)}>
        Mouse is at {x}, {y}
      </div>
    )
  }
}

const evts = [
  'MouseMove', 'MouseUp', 'MouseDown', 'Click', 'DoubleClick',
  'MouseLeave', 
  'TouchStart', 'TouchEnd'
];

export class InteractionEventBindings extends React.Component {
  constructor(props) {
    super(props);

    this.state = evts.reduce((sum, e) => ({
      ...sum,
      [e]: false
    }), {});
  }

  onEvent(name, evt) {
    this.setState({ 
      [name]: true
    });
  }

  reset(name) {
    this.setState({
      [name]: false
    })
  }

  render() {
    return (
      <div className={classnames(styles.eventContainer)}>
        <ul>
        {evts.map(e => {
          const triggered = this.state[e];
          const props = {
            [`on${e}`]: this.onEvent.bind(this, e)
          }
          return (
            <li 
              className={styles.eventListing}
              key={e}>
                <div 
                  className={classnames(styles.reset)}
                  onClick={this.reset.bind(this, e)}>
                    <i className={classnames("fa fa-refresh")} />
                </div>
                
                <div className={styles.name} {...props}>
                  {`on${e}`}
                </div>

                <div className={classnames(styles.trigger)}>
                  <i className={classnames("fa", {
                    "fa-square": triggered,
                    "fa-square-o": !triggered
                  })} />
                </div>
            </li>
          )
        })}
        </ul>
      </div>
    )
  }
}

export const load = function(err, cb) {
  let mount;

  (function() {
    const ele = document.querySelector('#mousemove');
    ele.innerHTML = 'Move your mouse to see the demo';
    ele.addEventListener('mousemove', function(evt) {
      const {screenX, screenY} = evt;
      ele.innerHTML = `<div>
                        Mouse is at: X: ${screenX}, Y: ${screenY}
                      </div>`;
    })
  })();

  mount = document.querySelector('#demo1');
  ReactDOM.render(<Demo><MouseMove /></Demo>, mount);

  const count = 4;
  const rootUrl = `https://api.github.com`
  const endpoint = `/users/fullstackreact/events`
  const fetchEvents = (filter) => Promise.resolve(data) // fetch(`${rootUrl}${endpoint}`)
                              // .then(resp => resp.json())
                              .then(json => data)
                              .then(json => filter ? json.filter(filter) : json)
                              .then(json => json.slice(0, 4))


  mount = document.querySelector('#demo2');
  ReactDOM.render(<Demo><Panel>
      <Header title="Event handlers" showIcons={false} />
      <InteractionEventBindings />
    </Panel></Demo>, mount);

  mount = document.querySelector('#demo3');
  ReactDOM.render(<Demo><Panel>
      <Header title="Event handlers" />
    </Panel></Demo>, mount);

  const formSubmitted = (val) => {
    console.log('form formSubmitted ->', val);
  }
  mount = document.querySelector('#searchForm');
  ReactDOM.render(<Demo><Panel>
    <Header
      defaultSearchVisible={true}
      onSearch={formSubmitted}
      title="Search box" />
  </Panel></Demo>, mount);

  mount = document.querySelector('#searchStylesDemo');
  ReactDOM.render(<Demo><Panel>
      <Header defaultSearchVisible={true} title="Search box" />
    </Panel></Demo>, mount);

  // const handleSearchEvents = (val) => {
  //   renderSearch(val);
  // }
  mount = document.querySelector('#searchDemo');
  ReactDOM.render(<Demo>
      <SearchableContent />
    </Demo>, mount);
  // const renderSearch = (filterVal) => {
  //   const fetchEventsWithFilter = () => {
  //     return fetchEvents(e => {
  //       return e.actor.login.match(new RegExp(filterVal))
  //     });
  //   }
  //   ReactDOM.render(
  //     <Demo><Panel>
  //       <Header onSearch={handleSearchEvents} title="Github activity" />
  //       <AsyncContent 
  //         requestRefresh={!!filterVal}
  //         fetchData={fetchEventsWithFilter} />
  //     </Panel></Demo>, mount);
  // }
  // renderSearch()
}

export default load;