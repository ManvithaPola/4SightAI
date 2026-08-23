import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Tickets from "../pages/Tickets";
import CreateTicket from "../pages/CreateTicket";
import TicketDetails from "../pages/TicketDetails";
import AISuggestions from "../pages/AISuggestions";
import Activity from "../pages/Activity";
import ProtectedRoute from "./ProtectedRoute";
import AppLayout from "../components/layout/AppLayout";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/dashboard"
            element={
              <AppLayout>
                <Dashboard />
              </AppLayout>
            }
          />

          <Route
            path="/tickets"
            element={
              <AppLayout>
                <Tickets />
              </AppLayout>
            }
          />

          <Route
            path="/tickets/create"
            element={
              <AppLayout>
                <CreateTicket />
              </AppLayout>
            }
          />

          <Route
            path="/tickets/:ticketId"
            element={
              <AppLayout>
                <TicketDetails />
              </AppLayout>
            }
          />

          <Route
            path="/ai-suggestions"
            element={
              <AppLayout>
                <AISuggestions />
              </AppLayout>
            }
          />

          <Route
            path="/activity"
            element={
              <AppLayout>
                <Activity />
              </AppLayout>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
