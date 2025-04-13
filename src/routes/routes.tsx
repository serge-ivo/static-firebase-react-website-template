import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/error/ErrorPage"; // Keep error page
import HomePage from "../pages/HomePage"; // Keep the placeholder page
import LoginPage from "../pages/auth/LoginPage"; // Assuming a LoginPage component exists
import DashboardPage from "../pages/DashboardPage"; // Assuming a DashboardPage component exists
import UserProfilePage from "../pages/UserProfile/UserProfilePage"; // Import UserProfilePage
import UserProfileEditPage from "../pages/UserProfile/UserProfileEditPage"; // Import UserProfileEditPage
import MainLayout from "../components/layout/MainLayout"; // Keep the simplified layout
import PrivateRoute from "./PrivateRoute"; // Add PrivateRoute back

// Simplified router configuration
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // Main layout wraps protected routes
    errorElement: <ErrorPage />,
    children: [
      // Protected Routes wrapped by PrivateRoute
      {
        element: <PrivateRoute />, // Wrap protected routes
        children: [
          {
            index: true, // Default route for authenticated users
            element: <HomePage />,
          },
          {
            path: "dashboard", // Example protected route
            element: <DashboardPage />,
          },
          // User Profile Routes
          {
            path: "user/:userId",
            element: <UserProfilePage />,
          },
          {
            path: "user/:userId/edit",
            element: <UserProfileEditPage />,
          },
          // Add other authenticated pages here
        ],
      },
    ],
  },
  // Standalone Login Page (outside MainLayout)
  {
    path: "/login",
    element: <LoginPage />,
    // Optional: Add error element specific to login if needed
  },
  // Optional: Add other non-authenticated routes here (e.g., /signup, /about)
]);

// Remove future flag configuration

export default router;
