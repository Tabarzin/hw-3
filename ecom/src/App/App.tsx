import * as React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.scss';

import NavbarLinks from './commonComponents/NavbarLinks';
import MainPage from './pages/MainPage';

const App = () => {
  return (
    <div className="app">
      <MainPage />
    </div>
  );
};

export default App;
