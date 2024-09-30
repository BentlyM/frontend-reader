import React from 'react';
import AuthProvider from '../hooks/AuthProvider';
import Navbar from '../components/NavBar';
import App from '../pages/App';
import Register from '../pages/Register';
import Login from '../pages/Login';
import CardDetails from '../pages/CardDetails';
import { RouteObject } from 'react-router-dom';

interface Route {
  path?: string;
  element: React.ReactNode;
  index?: boolean;
  children?: Route[];
}

const routes: Route[] = [
  {
    path: '/',
    element: (
      <AuthProvider>
        <Navbar />
      </AuthProvider>
    ),
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: '/posts/:id',
        element: <CardDetails/>, 
      },
    ],
  },
];

export default routes as RouteObject[]; // this might break not sure lol
