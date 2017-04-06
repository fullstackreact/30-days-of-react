import React from 'react';

const Second  = ({seconds}) => (<span>{seconds<10 && '0'}{seconds}</span>)

export default Second