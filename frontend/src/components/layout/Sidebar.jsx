import {
  LayoutDashboard,
  Ticket,
  Sparkles,
  Activity,
  LogOut,
  X,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const navigation = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Tickets",
    path: "/tickets",
    icon: Ticket,
  },
  {
    name: "AI Suggestions",
    path: "/ai-suggestions",
    icon: Sparkles,
  },
  {
    name: "Activity",
    path: "/activity",
    icon: Activity,
  },
];

function Sidebar({ mobileOpen, setMobileOpen, collapsed, setCollapsed }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 hidden h-screen border-r border-slate-200 bg-white transition-all duration-300 lg:flex lg:flex-col ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Logo / Collapse */}
        <div
          className={`flex h-20 items-center border-b border-slate-200 ${
            collapsed ? "justify-center px-3" : "justify-between px-5"
          }`}
        >
          {!collapsed && (
            <NavLink to="/dashboard" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-700">
                <span className="text-sm font-bold text-white">4</span>
              </div>

              <span className="text-xl font-bold tracking-tight text-slate-900">
                4Sight
                <span className="text-violet-700"> AI</span>
              </span>
            </NavLink>
          )}

          {collapsed && (
            <NavLink to="/dashboard">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-700">
                <span className="text-sm font-bold text-white">4</span>
              </div>
            </NavLink>
          )}

          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              aria-label="Collapse sidebar"
              title="Collapse sidebar"
            >
              <PanelLeftClose size={19} />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-6">
          {!collapsed && (
            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Workspace
            </p>
          )}

          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                title={collapsed ? item.name : undefined}
                className={({ isActive }) =>
                  `group flex items-center rounded-lg py-2.5 text-sm font-medium transition ${
                    collapsed ? "justify-center px-2" : "gap-3 px-3"
                  } ${
                    isActive
                      ? "bg-violet-50 text-violet-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`
                }
              >
                <Icon size={19} />

                {!collapsed && <span>{item.name}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-slate-200 p-3">
          {/* Expand button */}
          {collapsed && (
            <button
              onClick={() => setCollapsed(false)}
              className="mb-2 flex w-full items-center justify-center rounded-lg py-2.5 text-slate-500 transition hover:bg-violet-50 hover:text-violet-700"
              aria-label="Expand sidebar"
              title="Expand sidebar"
            >
              <PanelLeftOpen size={19} />
            </button>
          )}

          {/* Logout */}
          <button
            onClick={handleLogout}
            title={collapsed ? "Logout" : undefined}
            className={`flex w-full items-center rounded-lg py-2.5 text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600 ${
              collapsed ? "justify-center px-2" : "gap-3 px-3"
            }`}
          >
            <LogOut size={19} />

            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-slate-950/40"
            onClick={() => setMobileOpen(false)}
          />

          {/* Sidebar */}
          <aside className="relative flex h-full w-72 flex-col bg-white shadow-xl">
            {/* Mobile Header */}
            <div className="flex h-20 items-center justify-between border-b border-slate-200 px-5">
              <NavLink
                to="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-700">
                  <span className="text-sm font-bold text-white">4</span>
                </div>

                <span className="text-xl font-bold text-slate-900">
                  4Sight
                  <span className="text-violet-700"> AI</span>
                </span>
              </NavLink>

              <button
                onClick={() => setMobileOpen(false)}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close sidebar"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex-1 space-y-1 px-3 py-6">
              <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Workspace
              </p>

              {navigation.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                        isActive
                          ? "bg-violet-50 text-violet-700"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`
                    }
                  >
                    <Icon size={19} />
                    {item.name}
                  </NavLink>
                );
              })}
            </nav>

            {/* Mobile Logout */}
            <div className="border-t border-slate-200 p-3">
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600"
              >
                <LogOut size={19} />
                Logout
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

export default Sidebar;
