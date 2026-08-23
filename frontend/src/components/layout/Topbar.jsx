import { useEffect, useRef, useState } from "react";
import {
  Menu,
  Bell,
  CheckCircle2,
  AlertCircle,
  Clock3,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { getAllActivities } from "../../api/tickets";

function Topbar({ setMobileOpen }) {
  const { user } = useAuth();

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [activities, setActivities] = useState([]);

  const notificationRef = useRef(null);

  // ---------------------------------
  // Load recent activities
  // ---------------------------------

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const data = await getAllActivities();

        setActivities(
          Array.isArray(data)
            ? data.slice(0, 5)
            : []
        );
      } catch (error) {
        console.error(
          "Failed to load notifications:",
          error
        );
      }
    };

    loadNotifications();
  }, []);

  // ---------------------------------
  // Close notification dropdown
  // ---------------------------------

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // ---------------------------------
  // User information
  // ---------------------------------

  const userName =
    user?.name ||
    user?.full_name ||
    "User";

  const userRole =
    user?.role
      ? user.role.charAt(0).toUpperCase() +
        user.role.slice(1)
      : "Support Agent";

  const userInitial =
    userName.charAt(0).toUpperCase();

  // ---------------------------------
  // Notification icon
  // ---------------------------------

  const getNotificationIcon = (activity) => {
    const type =
      activity.activity_type?.toUpperCase();

    if (
      type?.includes("AI") &&
      type?.includes("ACCEPT")
    ) {
      return (
        <CheckCircle2
          size={16}
          className="text-emerald-600"
        />
      );
    }

    if (
      type?.includes("FAILED") ||
      type?.includes("REJECT")
    ) {
      return (
        <AlertCircle
          size={16}
          className="text-red-600"
        />
      );
    }

    return (
      <Clock3
        size={16}
        className="text-violet-600"
      />
    );
  };

  // ---------------------------------
  // Format time
  // ---------------------------------

  const formatNotificationTime = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleString(
      "en-IN",
      {
        dateStyle: "medium",
        timeStyle: "short",
      }
    );
  };

  return (
    <header className="relative flex h-20 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">

      {/* Left */}
      <div className="flex items-center gap-3">

        {/* Mobile menu */}
        <button
          onClick={() => setMobileOpen(true)}
          className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={21} />
        </button>

        {/* Page context */}
        <div className="hidden sm:block">
          <p className="text-sm font-semibold text-slate-900">
            Support Workspace
          </p>

          <p className="text-xs text-slate-500">
            Manage tickets and AI-assisted support
          </p>
        </div>

      </div>

      {/* Right */}
      <div className="flex items-center gap-3">

        {/* Notifications */}
        <div
          ref={notificationRef}
          className="relative"
        >
          <button
            type="button"
            onClick={() =>
              setNotificationsOpen(
                (current) => !current
              )
            }
            className="relative rounded-lg p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Notifications"
          >
            <Bell size={20} />

            {activities.length > 0 && (
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-violet-600" />
            )}
          </button>

          {/* Notification dropdown */}
          {notificationsOpen && (
            <div className="absolute right-0 top-12 z-50 w-80 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">

              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">

                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    Notifications
                  </h3>

                  <p className="text-xs text-slate-500">
                    Recent workspace activity
                  </p>
                </div>

                <Bell
                  size={16}
                  className="text-violet-600"
                />

              </div>

              {/* Notifications */}
              {activities.length === 0 ? (
                <div className="px-4 py-8 text-center">

                  <Bell
                    size={24}
                    className="mx-auto text-slate-300"
                  />

                  <p className="mt-2 text-sm font-medium text-slate-700">
                    No notifications
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    You're all caught up.
                  </p>

                </div>
              ) : (
                <div className="max-h-80 overflow-y-auto">

                  {activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="border-b border-slate-100 px-4 py-3 transition hover:bg-slate-50"
                    >

                      <div className="flex gap-3">

                        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                          {getNotificationIcon(
                            activity
                          )}
                        </div>

                        <div className="min-w-0">

                          <p className="text-sm leading-5 text-slate-700">
                            {activity.description}
                          </p>

                          {activity.ticket_id && (
                            <p className="mt-1 text-xs font-medium text-violet-600">
                              Ticket #{activity.ticket_id}
                            </p>
                          )}

                          <p className="mt-1 text-[11px] text-slate-400">
                            {formatNotificationTime(
                              activity.created_at
                            )}
                          </p>

                        </div>

                      </div>

                    </div>
                  ))}

                </div>
              )}

            </div>
          )}
        </div>

        {/* Divider */}
        <div className="hidden h-8 w-px bg-slate-200 sm:block" />

        {/* Logged-in user */}
        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-100">
            <span className="text-sm font-semibold text-violet-700">
              {userInitial}
            </span>
          </div>

          <div className="hidden sm:block">

            <p className="text-sm font-semibold text-slate-900">
              {userName}
            </p>

            <p className="text-xs text-slate-500">
              {userRole}
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Topbar;