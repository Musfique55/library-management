import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ToggleSignIn from './Components/ToggleSignIn.jsx';
import AuthProvider from './Components/AuthProvider.jsx';

const router = createBrowserRouter([
  {
    path : '/login',
    element : <ToggleSignIn></ToggleSignIn>
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
