import Navbar from '@commonComponents/Navbar';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import App from './App/App';
import NavbarLinks from './App/commonComponents/NavbarLinks';
import About from './App/pages/About';
import Categories from './App/pages/Categories';

import Pagination from './App/pages/Pagination';
import Products from './App/pages/Products';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <Navbar />
        <Outlet />
        <Pagination />
      </div>
    ),

    children: [
      {
        path: '/categories',
        element: <Categories />, // Render Categories component here
      },
      {
        path: '/about',
        element: <About />, // Render About component here
      },
      {
        path: '/products',
        element: <Products />, // Render Products component here
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <div>
    <RouterProvider router={router} />
  </div>,
);
