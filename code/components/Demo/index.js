import React, {PropTypes as T} from 'react';

import classnames from 'classnames';

import 'font-awesome/css/font-awesome.css'
import styles from './demoStyles.module.css'

export class Demo extends React.Component {
  static propTypes = {
    styles: T.object
  }

  static defaultProps = {
    styles: {}
  }

  render() {
    const {styles} = this.props;
    const demoStyleObj = Object.assign({}, styles);
    return (
      <div
        style={demoStyleObj}
        className={styles.demo}>
          {this.props.children}
      </div>
    )
  }
}

export default Demo;