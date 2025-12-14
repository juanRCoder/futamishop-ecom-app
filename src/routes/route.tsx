import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy } from "react";

const Products = lazy(() => import('@/pages/Products'));
const Cart = lazy(() => import('@/pages/Cart'));
const Checkout = lazy(() => import('@/pages/Checkout'));
const Voucher = lazy(() => import('@/pages/Voucher'))
const Dashboard = lazy(() => import('@/pages/admin/Dashboard'))
const AdminProducts = lazy(() => import('@/pages/admin/AdminProducts'))
const AdminCategories = lazy(() => import('@/pages/admin/AdminCategories'))
const AdminOrders = lazy(() => import('@/pages/admin/AdminOrders'))

export const mainRouter = createBrowserRouter([
  { path: "/", element: <Products /> },
  { path: "/cart", element: <Cart /> },
  { path: "/checkout", element: <Checkout /> },
  { path: "/voucher", element: <Voucher /> },
  // Admin pages
  {
    path: "/admin",
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "products", element: <AdminProducts /> },
      { path: 'categories', element: <AdminCategories /> },
      { path: 'orders', element: <AdminOrders /> }
    ]
  }
])