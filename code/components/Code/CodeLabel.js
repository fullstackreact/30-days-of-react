import React, { PropTypes as T, Children as C } from 'react'
import classnames from 'classnames';
import moment from 'moment';

import 'font-awesome/css/font-awesome.css'
import styles from './code.module.css'

export class CodeLabel extends React.Component {
  render() {
    const {lang, label, code} = this.props;

    return (
      <pre className={classnames(styles.code, styles[lang])}>
        <label>{label}</label>
        <code __dangerouslySetInnerHTML={{html:code}} />
      </pre>
    );
  }
}

export default CodeLabel