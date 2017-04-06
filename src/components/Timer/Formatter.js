import React from 'react';

import Hour from './Hour';
import Minute from './Minute';
import Second from './Second';
import Ampm from './Ampm';
import Separator from './Separator';

const Formatter = (props) => {
  let children = props.format.split('').map((e, idx) => {
    if (e === 'h') {
      return <Hour key={idx} {...props} />
    } else if (e === 'm') {
      return <Minute key={idx} {...props} />
    } else if (e === 's') {
      return <Second key={idx} {...props} />
    } else if (e === 'p') {
      return <Ampm key={idx} {...props} />
    } else if (e === ' ') {
      return <span key={idx}> </span>;
    } else {
      return <Separator key={idx} {...props} />
    }
  });

  return <span>{children}</span>;
}

export default Formatter