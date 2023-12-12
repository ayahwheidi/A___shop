import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "../component/web/home/Home.jsx";
import Categories from "../component/web/categories/Categories.jsx";
import DashboardLayout from "./DashboardLayout.jsx";
import Rigester from "../component/web/register/Rigester.jsx";
import HomeDashBord from './../component/dashpord/home/home.jsx';
import CategoriesDashbord from './../component/dashpord/categories/Categories.jsx';
import Login from "../component/web/login/Login.jsx";
import CategoryDetailes from "../component/web/categories/CategoryDetailes.jsx";
import Product from "../component/web/products/Product.jsx";

import ForgetPassword from "../component/web/ForgetPassword.jsx";
import Cart from "../component/cart/Cart.jsx";
import ProctedRoute from "../component/web/proctedRoute/ProctedRoute.jsx";
import Profile from "../component/web/profile/Profile.jsx";
import UserInfo from "../component/web/profile/UserInfo.jsx";
import UserContact from "../component/web/profile/UserContact.jsx";
import SendCode from "../component/web/sendCode.jsx";
//import Auth from "../component/web/proctedRoute/Auth.jsx";
export const router = createBrowserRouter([

  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'register',
        element: <Rigester />
      },
      {
        path: 'login',
        element:

          <Login />

      },

      {
        //path:'/',
        index: true,
        element: <Home />
      },
      {
        path: 'categories',
        element: <Categories />
      },
      {
        path: '*',
        element: <h2>page not found --- web</h2>
      },
      {
        path: '/products/category/:categoryId',
        element: <CategoryDetailes />
      },
      {
        path: '/products/:productId',
        element: <Product />
      },
      {
        path: 'cart',
        element:
          <ProctedRoute>
            <Cart />
          </ProctedRoute>

      },
      {
        path: 'sendcode',
        element: <SendCode/>
      },
      {
        path: 'forgetPassword',
        element: <ForgetPassword />
      },
      {
        path: 'profile',
        element:
          <ProctedRoute>
            <Profile />
          </ProctedRoute>,
        children: [
          {
            path:'contact',
            element:<UserContact />
          },
          {
            path:'info',
            element:<UserInfo />
          }

        ]

      }
    ]
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [{
      path: 'home',
      element: <HomeDashBord />
    }
      , {
      path: 'categories',
      element: <CategoriesDashbord />
    },
    {
      path: '*',
      element: <h2>page not found --- dashboard</h2>
    }
    ]

  }
]);