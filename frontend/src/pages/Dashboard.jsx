import { useEffect, useState } from "react";
import {
  Ticket,
  CircleAlert,
  Clock3,
  CheckCircle2,
  RefreshCw,
  UserCheck,
  Hourglass,
  LockKeyhole,
  Sparkles,
  Users,
  ArrowRight,
  BarChart3,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  getDashboardSummary,
  getRecentTickets,
  getTeamPerformance,
} from "../api/dashboard";

import { getAllAISuggestions } from "../api/tickets";

function Dashboard() {
  const navigate = useNavigate();

  const [summary, setSummary] = useState(null);
  const [recentTickets, setRecentTickets] = useState([]);
  const [teamPerformance, setTeamPerformance] = useState([]);
  const [aiSuggestions, setAISuggestions] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ---------------------------------
  // Load dashboard
  // ---------------------------------

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const [
        summaryData,
        recentTicketsData,
        teamPerformanceData,
        aiSuggestionsData,
      ] = await Promise.all([
        getDashboardSummary(),
        getRecentTickets(),
        getTeamPerformance(),
        getAllAISuggestions(),
      ]);

      setSummary(summaryData);

      setRecentTickets(
        Array.isArray(recentTicketsData)
          ? recentTicketsData
          : []
      );

      setTeamPerformance(
        Array.isArray(teamPerformanceData)
          ? teamPerformanceData
          : []
      );

      setAISuggestions(
        Array.isArray(aiSuggestionsData)
          ? aiSuggestionsData
          : []
      );
    } catch (err) {
      console.error(err);

      const detail = err.response?.data?.detail;

      setError(
        Array.isArray(detail)
          ? detail.map((item) => item.msg).join(", ")
          : detail ||
              err.response?.data?.message ||
              "Unable to load dashboard data."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  // ---------------------------------
  // Values
  // ---------------------------------

  const totalTickets =
    summary?.total_tickets ?? 0;

  const openTickets =
    summary?.open_tickets ?? 0;

  const assignedTickets =
    summary?.assigned_tickets ?? 0;

  const inProgressTickets =
    summary?.in_progress_tickets ?? 0;

  const waitingTickets =
    summary?.waiting_for_customer_tickets ?? 0;

  const resolvedTickets =
    summary?.resolved_tickets ?? 0;

  const closedTickets =
    summary?.closed_tickets ?? 0;

  const criticalTickets =
    summary?.critical_tickets ?? 0;

  const pendingAISuggestions =
    aiSuggestions.filter(
      (item) => item.status === "PENDING"
    ).length;

  const acceptedAISuggestions =
    aiSuggestions.filter(
      (item) => item.status === "ACCEPTED"
    ).length;

  const rejectedAISuggestions =
    aiSuggestions.filter(
      (item) => item.status === "REJECTED"
    ).length;

  // ---------------------------------
  // Status
  // ---------------------------------

  const statusData = [
    {
      label: "Open",
      value: openTickets,
      icon: Clock3,
    },
    {
      label: "Assigned",
      value: assignedTickets,
      icon: UserCheck,
    },
    {
      label: "In Progress",
      value: inProgressTickets,
      icon: RefreshCw,
    },
    {
      label: "Waiting for Customer",
      value: waitingTickets,
      icon: Hourglass,
    },
    {
      label: "Resolved",
      value: resolvedTickets,
      icon: CheckCircle2,
    },
    {
      label: "Closed",
      value: closedTickets,
      icon: LockKeyhole,
    },
  ];

  const getPercentage = (value) => {
    if (!totalTickets) return 0;

    return Math.round(
      (value / totalTickets) * 100
    );
  };

  // ---------------------------------
  // Helpers
  // ---------------------------------

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleString(
      "en-IN",
      {
        dateStyle: "medium",
        timeStyle: "short",
      }
    );
  };

  const getStatusClass = (status) => {
    switch (status?.toUpperCase()) {
      case "OPEN":
        return "bg-blue-50 text-blue-700";

      case "ASSIGNED":
        return "bg-violet-50 text-violet-700";

      case "IN_PROGRESS":
        return "bg-amber-50 text-amber-700";

      case "WAITING_FOR_CUSTOMER":
        return "bg-orange-50 text-orange-700";

      case "RESOLVED":
        return "bg-emerald-50 text-emerald-700";

      case "CLOSED":
        return "bg-slate-100 text-slate-700";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority?.toUpperCase()) {
      case "CRITICAL":
        return "bg-red-50 text-red-700";

      case "HIGH":
        return "bg-orange-50 text-orange-700";

      case "MEDIUM":
        return "bg-amber-50 text-amber-700";

      case "LOW":
        return "bg-emerald-50 text-emerald-700";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  // ---------------------------------
  // Loading
  // ---------------------------------

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[500px] max-w-7xl items-center justify-center">
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <RefreshCw
              size={18}
              className="animate-spin"
            />
            Loading dashboard...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* -------------------------------- */}
        {/* Header */}
        {/* -------------------------------- */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <p className="text-sm font-semibold text-violet-700">
              Support Workspace
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
              Dashboard
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Monitor your support operations and ticket activity.
            </p>
          </div>

          <button
            type="button"
            onClick={loadDashboard}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-violet-300 hover:text-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              size={16}
              className={
                loading ? "animate-spin" : ""
              }
            />
            Refresh
          </button>

        </div>

        {/* Error */}

        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* -------------------------------- */}
        {/* Summary Cards */}
        {/* -------------------------------- */}

        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

          {/* Total */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Tickets
                </p>

                <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                  {totalTickets}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50">
                <Ticket
                  size={21}
                  className="text-violet-700"
                />
              </div>

            </div>
          </div>

          {/* Open */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm font-medium text-slate-500">
                  Open Tickets
                </p>

                <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                  {openTickets}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                <Clock3
                  size={21}
                  className="text-blue-700"
                />
              </div>

            </div>
          </div>

          {/* Critical */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm font-medium text-slate-500">
                  Critical Tickets
                </p>

                <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                  {criticalTickets}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50">
                <CircleAlert
                  size={21}
                  className="text-red-600"
                />
              </div>

            </div>
          </div>

          {/* Resolved */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm font-medium text-slate-500">
                  Resolved Tickets
                </p>

                <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                  {resolvedTickets}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
                <CheckCircle2
                  size={21}
                  className="text-emerald-700"
                />
              </div>

            </div>
          </div>

        </div>

        {/* -------------------------------- */}
        {/* Ticket Status + AI */}
        {/* -------------------------------- */}

        <div className="mt-6 grid gap-6 lg:grid-cols-3">

          {/* Ticket Status */}

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Ticket Status
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Current distribution of support tickets.
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">

              {statusData.map((item) => {
                const Icon = item.icon;

                const percentage =
                  getPercentage(item.value);

                return (
                  <div
                    key={item.label}
                    className="rounded-xl border border-slate-100 bg-slate-50 p-4"
                  >

                    <div className="flex items-center justify-between">

                      <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white">
                          <Icon
                            size={17}
                            className="text-violet-700"
                          />
                        </div>

                        <span className="text-sm font-medium text-slate-700">
                          {item.label}
                        </span>

                      </div>

                      <span className="text-sm font-bold text-slate-900">
                        {item.value}
                      </span>

                    </div>

                    <div className="mt-3">
                      <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">

                        <div
                          className="h-full rounded-full bg-violet-600 transition-all duration-500"
                          style={{
                            width: `${percentage}%`,
                          }}
                        />

                      </div>

                      <p className="mt-1 text-right text-xs text-slate-400">
                        {percentage}%
                      </p>
                    </div>

                  </div>
                );
              })}

            </div>

          </section>

          {/* AI Intelligence */}

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
                <Sparkles
                  size={20}
                  className="text-violet-700"
                />
              </div>

              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  AI Intelligence
                </h2>

                <p className="text-xs text-slate-500">
                  AI-assisted support workflow.
                </p>
              </div>

            </div>

            <div className="mt-6 space-y-3">

              <div className="flex items-center justify-between rounded-xl bg-violet-50 p-4">
                <span className="text-sm text-slate-600">
                  Pending
                </span>

                <span className="text-xl font-bold text-slate-900">
                  {pendingAISuggestions}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-emerald-50 p-4">
                <span className="text-sm text-slate-600">
                  Accepted
                </span>

                <span className="text-xl font-bold text-slate-900">
                  {acceptedAISuggestions}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-red-50 p-4">
                <span className="text-sm text-slate-600">
                  Rejected
                </span>

                <span className="text-xl font-bold text-slate-900">
                  {rejectedAISuggestions}
                </span>
              </div>

            </div>

            <button
              type="button"
              onClick={() =>
                navigate("/ai-suggestions")
              }
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-violet-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-800"
            >
              Review AI Suggestions
              <ArrowRight size={16} />
            </button>

          </section>

        </div>

        {/* -------------------------------- */}
        {/* Recent Tickets */}
        {/* -------------------------------- */}

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="flex items-center justify-between border-b border-slate-200 p-6">

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Recent Tickets
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Latest support requests.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                navigate("/tickets")
              }
              className="inline-flex items-center gap-1 text-xs font-semibold text-violet-700 hover:text-violet-800"
            >
              View all
              <ArrowRight size={14} />
            </button>

          </div>

          {recentTickets.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-500">
              No recent tickets.
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full min-w-[700px]">

                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">

                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Ticket
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Customer
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Subject
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Priority
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Status
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Created
                    </th>

                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">

                  {recentTickets.map((ticket) => (
                    <tr
                      key={ticket.id}
                      onClick={() =>
                        navigate(
                          `/tickets/${ticket.id}`
                        )
                      }
                      className="cursor-pointer transition hover:bg-slate-50"
                    >

                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold text-violet-700">
                          #{ticket.id}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-700">
                        {ticket.customer_name}
                      </td>

                      <td className="max-w-[260px] px-6 py-4">

                        <p className="truncate text-sm font-medium text-slate-900">
                          {ticket.subject}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {ticket.category}
                        </p>

                      </td>

                      <td className="px-6 py-4">

                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getPriorityClass(
                            ticket.priority
                          )}`}
                        >
                          {ticket.priority}
                        </span>

                      </td>

                      <td className="px-6 py-4">

                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClass(
                            ticket.status
                          )}`}
                        >
                          {ticket.status?.replaceAll(
                            "_",
                            " "
                          )}
                        </span>

                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-xs text-slate-500">
                        {formatDate(
                          ticket.created_at
                        )}
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          )}

        </section>

        {/* -------------------------------- */}
        {/* Team Performance */}
        {/* -------------------------------- */}

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-200 p-6">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
                <Users
                  size={20}
                  className="text-violet-700"
                />
              </div>

              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  Team Performance
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Ticket workload across support teams.
                </p>
              </div>

            </div>

          </div>

          {teamPerformance.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-500">
              No team performance data available.
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full min-w-[850px]">

                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">

                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Team
                    </th>

                    <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Total
                    </th>

                    <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Open
                    </th>

                    <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Assigned
                    </th>

                    <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-400">
                      In Progress
                    </th>

                    <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Waiting
                    </th>

                    <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Resolved
                    </th>

                    <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Closed
                    </th>

                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">

                  {teamPerformance.map((team) => (
                    <tr
                      key={team.team_id}
                      className="transition hover:bg-slate-50"
                    >

                      <td className="px-6 py-4">

                        <div className="flex items-center gap-3">

                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50">
                            <Users
                              size={15}
                              className="text-violet-700"
                            />
                          </div>

                          <span className="text-sm font-semibold text-slate-800">
                            {team.team_name}
                          </span>

                        </div>

                      </td>

                      <td className="px-6 py-4 text-center text-sm font-bold text-slate-900">
                        {team.total_tickets}
                      </td>

                      <td className="px-6 py-4 text-center text-sm text-slate-600">
                        {team.open_tickets}
                      </td>

                      <td className="px-6 py-4 text-center text-sm text-slate-600">
                        {team.assigned_tickets}
                      </td>

                      <td className="px-6 py-4 text-center text-sm text-slate-600">
                        {team.in_progress_tickets}
                      </td>

                      <td className="px-6 py-4 text-center text-sm text-slate-600">
                        {team.waiting_for_customer_tickets}
                      </td>

                      <td className="px-6 py-4 text-center text-sm text-emerald-600">
                        {team.resolved_tickets}
                      </td>

                      <td className="px-6 py-4 text-center text-sm text-slate-600">
                        {team.closed_tickets}
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          )}

        </section>

        {/* -------------------------------- */}
        {/* Bottom Statistics */}
        {/* -------------------------------- */}

        <div className="mt-6 grid gap-5 sm:grid-cols-3">

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">
                <Ticket
                  size={17}
                  className="text-slate-600"
                />
              </div>

              <p className="text-sm font-medium text-slate-500">
                Active Tickets
              </p>

            </div>

            <p className="mt-3 text-2xl font-bold text-slate-900">
              {openTickets +
                assignedTickets +
                inProgressTickets +
                waitingTickets}
            </p>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50">
                <CheckCircle2
                  size={17}
                  className="text-emerald-600"
                />
              </div>

              <p className="text-sm font-medium text-slate-500">
                Completed Tickets
              </p>

            </div>

            <p className="mt-3 text-2xl font-bold text-slate-900">
              {resolvedTickets +
                closedTickets}
            </p>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50">
                <Sparkles
                  size={17}
                  className="text-violet-600"
                />
              </div>

              <p className="text-sm font-medium text-slate-500">
                AI Suggestions
              </p>

            </div>

            <p className="mt-3 text-2xl font-bold text-slate-900">
              {aiSuggestions.length}
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;