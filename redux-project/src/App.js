import React, { Component } from 'react';
import { Provider } from "react-redux";
import store from "./js/store/index";
import UsersContainer from './containers/UsersContainer';
import './App.scss';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
          <UsersContainer />
      </Provider>
    )
  }
}

export default App;
