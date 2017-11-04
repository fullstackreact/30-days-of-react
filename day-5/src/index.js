import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import 'font-awesome/css/font-awesome.css';

import Header from './Header2';
import Timeline from './components/Timeline/Timeline';
import Content from './Content1';
import ContentArr from './Content2';
import ContentFinal from './Content3';

const moment1 = {
  timestamp: new Date().getTime(),
  text: 'Ate lunch',
  user: {
    id: 1,
    name: 'Nate',
    avatar: 'http://www.croop.cl/UI/twitter/images/doug.jpg'
  },
  comments: [{from: 'Ari', text: 'Me too!'}]
};
const activities = [
  {
    timestamp: new Date().getTime(),
    text: 'Ate lunch',
    user: {
      id: 1,
      name: 'Nate',
      avatar: 'http://www.croop.cl/UI/twitter/images/doug.jpg'
    },
    comments: [{from: 'Ari', text: 'Me too!'}]
  },
  {
    timestamp: new Date().getTime(),
    text: 'Woke up early for a beautiful run',
    user: {
      id: 2,
      name: 'Ari',
      avatar: 'http://www.croop.cl/UI/twitter/images/doug.jpg'
    },
    comments: [{from: 'Nate', text: 'I am so jealous'}]
  }
];
export const load = () => {
  ReactDOM.render(<Timeline />, document.getElementById('demo1'));

  /*ReactDOM.render(
    <Header />,
    document.getElementById('headerDemo1'));

  ReactDOM.render(
    <Header title='Timeline' />,
    document.getElementById('headerDemoWithProps'));

  ReactDOM.render(
    <div className='demo'>
      <Header title='Timeline' />
      <Header title='Profile' />
      <Header title='Settings' />
      <Header title='Chat' />
    </div>,
    document.getElementById('demo2'));

  ReactDOM.render(
    <div className='demo'>
      <Content activity={moment1} />
    </div>,
    document.getElementById('demo3'));

  ReactDOM.render(
    <div className='demo'>
      <ContentArr activities={activities} />
    </div>,
    document.getElementById('demo4'));

  ReactDOM.render(
    <div className='demo'>
      <ContentFinal activities={activities} />
    </div>,
    document.getElementById('demo5'));*/
};

try {
  setTimeout(load, 100);
} catch (e) {
  console.log('e ->', e);
}
