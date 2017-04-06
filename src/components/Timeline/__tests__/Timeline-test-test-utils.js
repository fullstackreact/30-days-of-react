import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Timeline from '../Timeline';

describe('Timeline', () => {

  it('wraps content in a div with .notificationsFrame class', () => {
    const wrapper = TestUtils.renderIntoDocument(<Timeline />);
    TestUtils
      .findRenderedDOMComponentWithClass(wrapper, 'notificationsFrame');
  });

})