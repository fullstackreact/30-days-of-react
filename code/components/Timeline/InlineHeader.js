import React, { PropTypes as T } from 'react'
import classnames from 'classnames';

import 'font-awesome/css/font-awesome.css'
import styles from './timeline.module.css'

export class InlineHeader extends React.Component {
  static propTypes = {
    title: T.string,
    additionalClassesOn: T.bool
  }

  static defaultProps = {
    title: 'Timeline',
    additionalClassesOn: false
  }

  constructor(props) {
    super(props);

    this.state = {
      searchVisible: false
    }
  }

  showSearchIcon() {
    this.setState({
      searchVisible: !this.state.searchVisible
    })
  }

  render() {
    const {title, additionalClassesOn} = this.props;
    return (
      <div style={{
        backgroundColor: 'rgba(251, 202, 43, 1)'
      }} className={classnames(styles.header, {
        'timelineHeading': additionalClassesOn
      })}>
        <div className={classnames(styles.menuIcon, {
          'timelineMenuIcon': additionalClassesOn
        })}>
          <div
            style={{backgroundColor: '#333333'}}
            className={styles.dashTop}></div>
          <div
            style={{backgroundColor: '#333333'}}
            className={styles.dashBottom}></div>
          <div
            style={{backgroundColor: '#333333'}}
            className={styles.circle}></div>
        </div>

        <span
          style={{color: '#333333'}}
          className={classnames({
          'timelineTitle': additionalClassesOn
        }, styles.title)}>{title}</span>

        <input
          type="text"
          className={classnames(styles.searchInput, {
            [styles.active]: this.state.searchVisible
          })}
          placeholder="Search ..." />

        <div
          style={{color: '#333333'}}
          onClick={this.showSearchIcon.bind(this)}
          className={classnames("fa fa-search", {
            "timelineSearchIcon": additionalClassesOn
          }, styles.searchIcon)}></div>
      </div>
    )
  }
}

export default InlineHeader