import React, { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { NoAuth } from 'components/NoAuth/NoAuth';
import { LoginForm } from 'components/LoginForm/LoginForm';

import { isNull } from 'utils/isNull';
import { useUser } from 'store/user';

const PRIVATE_ROUTES = [
  {
    path: '/',
    element: <NoAuth />,
  },
  {
    path: '/login',
    element: <LoginForm />,
  },
  {
    path: '/reg',
    element: <LoginForm />,
  },
  {
    path: '*',
    element: <Navigate to='/' />
  }
];

const PUBLIC_ROUTES = [
  {
    path: '/',
    element: <div>App with auth is here</div>,
  },
  {
    path: '/patches',
    element: <div>Patches is here</div>,
  },
  {
    path: '/account',
    element: <div>Account is here</div>,
  },
  {
    path: '*',
    element: <Navigate to='/' />
  }
];

const RouterConfig: FC = () => {
  const user = useUser();
  return (
    <Routes>
      {(isNull(user.get())
        ? PRIVATE_ROUTES
        : PUBLIC_ROUTES
      ).map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
};

export { RouterConfig };
