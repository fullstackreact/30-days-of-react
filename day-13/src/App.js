import React from "react";

const a = [1, 10, 100, 1000, 10000];
const App = props => {
  return (
    <ul>
      {React.Children.map(a, i => (
        <li>{i}</li>
      ))}
    </ul>
  );
};

export default App;
