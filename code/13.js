import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import Demo from './components/Demo'

export const load = function(err, cb) {
  let mount;

  let a = 10;
  const ShowA = () => (<div>{a}</div>)
  const MultipleA = () => (<div>{a * a}</div>)

  mount = document.querySelector('#demo1');
  ReactDOM.render(<Demo>
    <ShowA />
    <MultipleA />
  </Demo>, mount);

  a = [1, 10, 100, 1000];
  const ListA = (props) => {
    return (
      <ul>
        {a.map(i => {
          return <li key={i}>{i}</li>
        })}
      </ul>
    )
  }

  mount = document.querySelector('#demo2');
  ReactDOM.render(<Demo>
    <ListA />
  </Demo>, mount);

}

export default load;