import React, {PropTypes as T} from 'react';

import classnames from 'classnames';
import Frame from 'react-frame-component';

// import 'font-awesome/css/font-awesome.css'
import styleMod from './demoStyles.module.css'

export class IFrameDemo extends React.Component {
  static propTypes = {
    styles: T.object,
    className: T.string
  }

  static defaultProps = {
    styles: {},
    className: 'demo'
  }

  _renderHead() {
    const {head} = this.props;
    const reset = "body {margin: 0;padding: 0;}"
    return head ? head : <style type="text/css">{reset}</style>
  }

  render() {
    const {styles, className, head} = this.props;
    const demoStyleObj = Object.assign({}, {
      width: '100%',
      background: '#fff',
      border: '1px solid #333',
      boxShadow: '1px 2px 10px 0px rgba(0, 0, 0, 0.3)',
      minHeight: 250
    }, styles);

    return (
      <div
        className={classnames(styleMod.iFrame)}>
          <Frame 
            head={this._renderHead()}
            style={demoStyleObj}>
              {this.props.children}
          </Frame>
      </div>
    )
  }
}

export default IFrameDemo;