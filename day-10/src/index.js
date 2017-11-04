import React from 'react';
import ReactDOM from 'react-dom';

import 'font-awesome/css/font-awesome.css';
import './index.css';

import go from './mousemove';

import MouseMover from './MouseMover';
import InteractionEventBindings from './InteractionEventBindings';
import SearchForm from './SearchForm';
import SearchFormWithSubmit from './SearchFormWithSubmit';
import Header from './components/Timeline/Header';
import HeaderSearch from './HeaderSearch';
import ContentSearch from './ContentSearch';

class SimpleSearchHolder extends React.Component {
  state = {searchText: ''};
  handleSubmit = searchText => this.setState({searchText});
  render() {
    const {Component} = this.props;
    const {searchText} = this.state;
    return (
      <div>
        <Component searchText={searchText} onSubmit={this.handleSubmit} />
        <div>You searched for: {searchText}</div>
      </div>
    );
  }
}

export const load = () => {
  ReactDOM.render(<MouseMover />, document.getElementById('demo1'));

  ReactDOM.render(
    <InteractionEventBindings />,
    document.getElementById('demo2')
  );

  ReactDOM.render(<SearchForm />, document.getElementById('demo3'));

  ReactDOM.render(<Header />, document.getElementById('searchStylesDemo'));

  ReactDOM.render(
    <SimpleSearchHolder Component={SearchFormWithSubmit} />,
    document.getElementById('searchForm')
  );

  ReactDOM.render(
    <SimpleSearchHolder Component={HeaderSearch} />,
    document.getElementById('headerSearch')
  );

  ReactDOM.render(<ContentSearch />, document.getElementById('searchDemo'));

  go();
};

try {
  load();
} catch (e) {
  console.log(e);
}
