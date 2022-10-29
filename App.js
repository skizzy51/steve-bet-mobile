import { Provider } from 'react-redux';
import { store } from './ReduxStore';
import React from 'react';
import AppNav from './navigation-stacks/AppNav';


export default function App() {
  return (
    <>
      <Provider store={store}>
        <AppNav/>
      </Provider>
    </>
  );
}