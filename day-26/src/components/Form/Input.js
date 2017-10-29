import React from 'react';

export const Input = ({ onChange, name, type, ...rest }) => {
  return (
    <div className='form'>
      <input
        type={type}
        onChange={e => onChange(name, e.target.value)}
        placeholder={name} />
    </div>
  )
}

export default Input