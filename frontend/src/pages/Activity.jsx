import { useEffect, useState } from "react";
import {
  Activity as ActivityIcon,
  RefreshCw,
  Ticket,
  User,
  Clock3,
  MessageSquare,
  UserPlus,
  CircleDot,
  Sparkles,
  CheckCircle2,
  XCircle,
  PlusCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { getAllActivities } from "../api/tickets";

function Activity() {
  const navigate = useNavigate();

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadActivities = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAllActivities();

      setActivities(Array.isArray(data) ? data : data?.items || []);
    } catch (err) {
      console.error(err);

      const detail = err.response?.data?.detail;

      setError(
        Array.isArray(detail)
          ? detail.map((item) => item.msg).join(", ")
          : detail ||
              err.response?.data?.message ||
              "Unable to load activities.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActivities();
  }, []);

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const getActivityIcon = (type) => {
    switch (type?.toUpperCase()) {
      case "TICKET_CREATED":
        return {
          icon: PlusCircle,
          wrapper: "bg-emerald-100",
          color: "text-emerald-700",
        };

      case "TICKET_ASSIGNED":
        return {
          icon: UserPlus,
          wrapper: "bg-blue-100",
          color: "text-blue-700",
        };

      case "STATUS_CHANGED":
        return {
          icon: CircleDot,
          wrapper: "bg-violet-100",
          color: "text-violet-700",
        };

      case "COMMENT_ADDED":
        return {
          icon: MessageSquare,
          wrapper: "bg-slate-100",
          color: "text-slate-700",
        };

      case "AI_ANALYSIS_COMPLETED":
        return {
          icon: Sparkles,
          wrapper: "bg-violet-100",
          color: "text-violet-700",
        };

      case "AI_ANALYSIS_FAILED":
        return {
          icon: XCircle,
          wrapper: "bg-red-100",
          color: "text-red-700",
        };

      case "AI_SUGGESTIONS_ACCEPTED":
        return {
          icon: CheckCircle2,
          wrapper: "bg-emerald-100",
          color: "text-emerald-700",
        };

      case "AI_SUGGESTIONS_REJECTED":
        return {
          icon: XCircle,
          wrapper: "bg-red-100",
          color: "text-red-700",
        };

      default:
        return {
          icon: ActivityIcon,
          wrapper: "bg-slate-100",
          color: "text-slate-600",
        };
    }
  };

  const groupActivitiesByDate = () => {
    const groups = {};

    const sortedActivities = [...activities].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at),
    );

    const today = new Date();

    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    sortedActivities.forEach((activity) => {
      const date = new Date(activity.created_at);

      let key;

      if (date.toDateString() === today.toDateString()) {
        key = "Today";
      } else if (date.toDateString() === yesterday.toDateString()) {
        key = "Yesterday";
      } else {
        key = date.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
      }

      if (!groups[key]) {
        groups[key] = [];
      }

      groups[key].push(activity);
    });

    return Object.entries(groups);
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
                <ActivityIcon size={20} className="text-violet-700" />
              </div>

              <div>
                <h1 className="text-xl font-bold text-slate-900">Activity</h1>

                <p className="mt-1 text-sm text-slate-500">
                  Global activity timeline across all tickets.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={loadActivities}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-violet-300 hover:text-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="mt-8 flex min-h-[300px] items-center justify-center rounded-2xl border border-slate-200 bg-white">
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <RefreshCw size={18} className="animate-spin" />
              Loading activity...
            </div>
          </div>
        ) : activities.length === 0 ? (
          /* Empty State */
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100">
              <ActivityIcon size={26} className="text-violet-600" />
            </div>

            <h2 className="mt-4 text-base font-semibold text-slate-900">
              No activity yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Ticket assignments, status changes, comments, and AI actions will
              appear here.
            </p>
          </div>
        ) : (
          /* Activity Timeline */
          <div className="mt-8 space-y-8">
            {groupActivitiesByDate().map(([date, dateActivities]) => (
              <section key={date}>
                {/* Date Heading */}
                <div className="mb-4 flex items-center gap-3">
                  <h2 className="text-sm font-semibold text-slate-900">
                    {date}
                  </h2>

                  <div className="h-px flex-1 bg-slate-200" />
                </div>

                {/* Activities */}
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-5 top-5 bottom-5 hidden w-px bg-slate-200 sm:block" />

                  <div className="space-y-4">
                    {dateActivities.map((activity) => {
                      const activityStyle = getActivityIcon(
                        activity.activity_type,
                      );

                      const Icon = activityStyle.icon;

                      return (
                        <div
                          key={activity.id}
                          className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-violet-200"
                        >
                          <div className="flex gap-4">
                            {/* Icon */}
                            <div
                              className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${activityStyle.wrapper}`}
                            >
                              <Icon size={19} className={activityStyle.color} />
                            </div>

                            {/* Content */}
                            <div className="min-w-0 flex-1">
                              {/* Top Row */}
                              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                <div className="min-w-0">
                                  <p className="text-sm font-semibold text-slate-900">
                                    {activity.description}
                                  </p>

                                  {activity.ticket_subject && (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        navigate(
                                          `/tickets/${activity.ticket_id}`,
                                        )
                                      }
                                      className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-violet-600 hover:text-violet-800"
                                    >
                                      <Ticket size={13} />
                                      Ticket #{activity.ticket_id}
                                      <span className="text-slate-400">·</span>
                                      <span className="max-w-[280px] truncate">
                                        {activity.ticket_subject}
                                      </span>
                                    </button>
                                  )}
                                </div>

                                <div className="flex shrink-0 items-center gap-1.5 text-xs text-slate-400">
                                  <Clock3 size={13} />

                                  {formatDate(activity.created_at)}
                                </div>
                              </div>

                              {/* Metadata */}
                              <div className="mt-4 flex flex-wrap items-center gap-2">
                                {activity.user_name && (
                                  <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                                    <User size={12} />

                                    {activity.user_name}
                                  </span>
                                )}

                                {activity.activity_type && (
                                  <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">
                                    {activity.activity_type.replaceAll(
                                      "_",
                                      " ",
                                    )}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Activity;
