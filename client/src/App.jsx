import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import SignUpPage from './components/pages/SignUpPage';
import SignInPage from './components/pages/SignInPage';
import ApartmentsPage from './components/pages/ApartmentsPage';
import FavoritesPage from './components/pages/FavoritesPage';
import ProtectedRouter from './components/HOCs/ProtectedRouter';
import useUser from './hooks/useUser';
import 'bootstrap/dist/css/bootstrap.min.css';
import NewApartmentForm from './components/pages/NewApartmentForm';
import OneApartament from './components/pages/OneApartament';
import ErrorPage from './components/pages/ErrorPage';
import MainPage from'./components/pages/MainPage';

function App() {
  const { logoutHandler, signInHandler, signUpHandler, user } = useUser();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout user={user} logoutHandler={logoutHandler} />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: user.status === 'logged' ? <ApartmentsPage user={user} /> : <MainPage user={user} />,
        },
        {
          path: '/apartmentsPage',
          element: <ApartmentsPage user={user} />,
        },
        {
          path: '/oneApartment/:id', 
          element: <OneApartament user={user}/>,
        },
        {
          path: '/favorites',
          element: (
            <ProtectedRouter isAllowed={user.status === 'logged'} redirect="222222">
              <FavoritesPage user={user} />
            </ProtectedRouter>
          ),
        },
        {
          path: '/newApartment',
          element: <NewApartmentForm />,
        },
       
        {
          path: '/auth/signin',
          element: (
            <ProtectedRouter isAllowed={user.status !== 'logged'} redirect="/">
              <SignInPage signInHandler={signInHandler} />,
            </ProtectedRouter>
          ),
        },
        {
          path: '/auth/signup',
          element: (
            <ProtectedRouter isAllowed={user.status !== 'logged'} redirect="/">
              <SignUpPage signUpHandler={signUpHandler} />,
            </ProtectedRouter>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;