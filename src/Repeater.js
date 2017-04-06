import React from 'react';

const a = [1, 10, 100, 1000, 10000];
const App = (props) => {
  return (
    <ul>
      {a.map(i => {
        return <li>{i}</li>
      })}
    </ul>
  )
}

export default App