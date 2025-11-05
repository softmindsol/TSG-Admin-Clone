import React, { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import PATHS from "./path";
import { Preloader } from "../components";
import ProtectedRoute from "./ProtectedRoutes";
import DashboardLayout from "../layout/DashboardLayout/DashboardLayout";
import PATH from "./path";
import Dashboard from "../pages/Dashboard/Dashboard";
import Agents from "../pages/Agents/Agents";
import AgentDetail from "../pages/Agents/AgentDetail";
import Requests from "../pages/Requests/Requests";
import Payments from "../pages/Payments/Payments";
import Reminders from "../pages/Reminders/Reminders";
import Profile from "../pages/Profile/Profile";
import Login from "../pages/Login/Login";

const Loader = () => (
  <div className="flex items-center justify-center h-screen">Loading...</div>
);

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={PATH.login} replace />, // Redirect root to /login
  },
  {
    path: PATH.login,
    element: <Login />,
  },
  {
    path: PATH.dashboard,
    element: (
      <Suspense fallback={<Loader />}>
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      </Suspense>
    ),
    children: [
      { path: "", element: <Dashboard /> },
      { path: PATH.agents, element: <Agents /> },
      { path: "agents/:id", element: <AgentDetail /> },
      { path: PATH.requests, element: <Requests /> },
      { path: PATH.payments, element: <Payments /> },
      { path: PATH.reminders, element: <Reminders /> },
      { path: PATH.profile, element: <Profile /> },
    ],
  },
]);

export default Routes;
