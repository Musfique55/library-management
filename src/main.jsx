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
import UpdateBooks from './Components/UpdateBooks.jsx';
import SpecificCategory from './Components/SpecificCategory.jsx';
import BookDetails from './Components/BookDetails.jsx';
import BorrowedBooks from './Components/BorrowedBooks.jsx';

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
        element : <PrivateRoute><Allbooks></Allbooks></PrivateRoute>,
        loader : () => fetch('https://library-management-server-ten.vercel.app/allbooks')
      },
      {
        path : '/allbooks/:id',
        element : <PrivateRoute><UpdateBooks></UpdateBooks></PrivateRoute>,
        loader : ({params}) => fetch(`https://library-management-server-ten.vercel.app/allbooks/${params.id}`)
      },
      {
        path : '/addbooks',
        element : <PrivateRoute><AddBooks></AddBooks></PrivateRoute>
      },
      {
        path : '/category/:book',
        element : <PrivateRoute><SpecificCategory></SpecificCategory></ PrivateRoute>,
        loader : ({params}) => fetch(`https://library-management-server-ten.vercel.app/books/${params.book}`)

      },
      {
        path : 'book-details/:id',
        element : <PrivateRoute><BookDetails></BookDetails></PrivateRoute>,
        loader : ({params}) => fetch(`https://library-management-server-ten.vercel.app/allbooks/${params.id}`)
      },
      {
        path : '/borrowed-books',
        element : <PrivateRoute><BorrowedBooks></BorrowedBooks></PrivateRoute>
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
