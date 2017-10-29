import React from 'react';

const Formatter = ({format, state}) => {
  let children = format.split('').map(e => {
    if (e == 'h') {
      return <Hour />
    } else if (e == 'm') {
      return <Minute />
    } else if (e == 's') {
      return <Second />
    } else if (e == 'p') {
      return <Ampm />
    } else if (e == ' ') {
      return <span> </span>;
    } else {
      return <Separator />
    }
  });
  return (<span>
      {React.Children
        .map(children, c => React.cloneElement(c, state))}
      </span>)
}

export default Formatter