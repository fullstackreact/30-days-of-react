import React from 'react';

const Hour    = (props) => {
  let {hours} = props;
  if (hours === 0) { hours = 12; }
  if (props.twelveHours) { hours -= 12; }
  return (<span>{hours}</span>)
}

export default Hour