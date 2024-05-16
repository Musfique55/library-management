import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ToggleSignIn from './Components/ToggleSignIn.jsx';
import AuthProvider from './Components/AuthProvider.jsx';
import Layout from './Components/Layout.jsx';
import Home from './Components/Home.jsx';
import AddBooks from './Components/AddBooks.jsx';
import PrivateRoute from './Components/PrivateRoute.jsx';
import Allbooks from './Components/Allbooks.jsx';

const router = createBrowserRouter([
  {
    path : '/',
    element : <Layout></Layout>,
    children : [
      {
        path : '/',
        element : <Home></Home>
      },
      {
        path : '/login',
        element : <ToggleSignIn></ToggleSignIn>
      },
      {
        path : '/allbooks',
        element : <Allbooks></Allbooks>,
        loader : () => fetch('https://library-management-server-ten.vercel.app/allbooks')
      },
      {
        path : '/addbooks',
        element : <PrivateRoute><AddBooks></AddBooks></PrivateRoute>
      }
    ]
  }
  
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router}>
    </RouterProvider>
    </AuthProvider>
  </React.StrictMode>,
)
