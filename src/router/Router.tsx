import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ProtectedRoute from "@/router/ProtectedRoute";

import HomePage from "@/pages/Home";
import NotFoundPage from "@/pages/NotFound";
import LoginPage from "@/pages/auth/Login";
import RegisterPage from "@/pages/auth/Register";
import ProductListPage from "@/pages/buyer/ProductList";
import ProductDetailPage from "@/pages/buyer/ProductDetail";
import CartPage from "@/pages/buyer/Cart";
import CheckoutPage from "@/pages/buyer/Checkout";
import OrderHistoryPage from "@/pages/buyer/OrderHistory";
import SellerDashboardPage from "@/pages/seller/Dashboard";
import SellerOrdersPage from "@/pages/seller/SellerOrders";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/products", element: <ProductListPage /> },
      { path: "/products/:id", element: <ProductDetailPage /> },
      {
        element: <ProtectedRoute allowedRoles={["buyer"]} />,
        children: [
          { path: "/cart", element: <CartPage /> },
          { path: "/checkout", element: <CheckoutPage /> },
          { path: "/orders", element: <OrderHistoryPage /> },
        ],
      },
      {
        element: <ProtectedRoute allowedRoles={["seller"]} />,
        children: [
          { path: "/seller/dashboard", element: <SellerDashboardPage /> },
          { path: "/seller/orders", element: <SellerOrdersPage /> },
        ],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
