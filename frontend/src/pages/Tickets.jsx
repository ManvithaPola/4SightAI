import { useEffect, useState } from "react";
import {
  Search,
  Filter,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Ticket as TicketIcon,
  Plus,
} from "lucide-react";
import { Link } from "react-router-dom";

import { getTickets, getTeams } from "../api/tickets";

function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");
  const [team, setTeam] = useState("");
  const [teams, setTeams] = useState([]);
  const [teamsLoading, setTeamsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [totalPages, setTotalPages] = useState(0);

  const loadTickets = async () => {
    try {
      setLoading(true);
      setError("");

      const params = {
        page,
        limit,
      };

      if (search.trim()) {
        params.search = search.trim();
      }

      if (status) {
        params.status = status;
      }

      if (priority) {
        params.priority = priority;
      }

      if (category) {
        params.category = category;
      }

      if (team) {
        params.team = Number(team);
      }

      const data = await getTickets(params);

      setTickets(data.items || []);
      setTotal(data.total || 0);
      setTotalPages(data.total_pages || 0);
    } catch (err) {
      console.error(err);

      setError("Unable to load tickets. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loadTeams = async () => {
    try {
      setTeamsLoading(true);

      const data = await getTeams();

      setTeams(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Unable to load teams:", err);
    } finally {
      setTeamsLoading(false);
    }
  };

  useEffect(() => {
    loadTeams();
  }, []);

  useEffect(() => {
    loadTickets();
  }, [page, status, priority, category, team]);

  const handleSearch = (event) => {
    event.preventDefault();

    setPage(1);
    loadTickets();
  };

  const resetFilters = () => {
    setSearch("");
    setStatus("");
    setPriority("");
    setCategory("");
    setTeam("");
    setPage(1);
  };

  const getPriorityClass = (value) => {
    switch (value) {
      case "Critical":
        return "bg-red-50 text-red-700";

      case "High":
        return "bg-orange-50 text-orange-700";

      case "Medium":
        return "bg-amber-50 text-amber-700";

      case "Low":
        return "bg-emerald-50 text-emerald-700";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  const getStatusClass = (value) => {
    switch (value) {
      case "OPEN":
        return "bg-blue-50 text-blue-700";

      case "ASSIGNED":
        return "bg-violet-50 text-violet-700";

      case "IN_PROGRESS":
        return "bg-indigo-50 text-indigo-700";

      case "WAITING_FOR_CUSTOMER":
        return "bg-amber-50 text-amber-700";

      case "RESOLVED":
        return "bg-emerald-50 text-emerald-700";

      case "CLOSED":
        return "bg-slate-100 text-slate-600";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-violet-700">
            Support Workspace
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            Tickets
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Search, filter, and manage customer support tickets.
          </p>
        </div>

        <Link
          to="/tickets/create"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-800"
        >
          <Plus size={17} />
          Create Ticket
        </Link>
      </div>

      {/* Filters */}
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2">
          <Filter size={17} className="text-slate-500" />

          <h2 className="text-sm font-semibold text-slate-900">
            Search & Filters
          </h2>
        </div>

        <form onSubmit={handleSearch} className="mt-5">
          {/* Search */}
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by customer, email, subject, or description..."
                className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
              />
            </div>

            <button
              type="submit"
              className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Search
            </button>
          </div>

          {/* Select filters */}
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <select
              value={status}
              onChange={(event) => {
                setStatus(event.target.value);
                setPage(1);
              }}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-violet-500"
            >
              <option value="">All Statuses</option>

              <option value="OPEN">Open</option>

              <option value="ASSIGNED">Assigned</option>

              <option value="IN_PROGRESS">In Progress</option>

              <option value="WAITING_FOR_CUSTOMER">Waiting for Customer</option>

              <option value="RESOLVED">Resolved</option>

              <option value="CLOSED">Closed</option>
            </select>

            <select
              value={priority}
              onChange={(event) => {
                setPriority(event.target.value);
                setPage(1);
              }}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-violet-500"
            >
              <option value="">All Priorities</option>

              <option value="Critical">Critical</option>

              <option value="High">High</option>

              <option value="Medium">Medium</option>

              <option value="Low">Low</option>
            </select>

            <select
              value={category}
              onChange={(event) => {
                setCategory(event.target.value);
                setPage(1);
              }}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-violet-500"
            >
              <option value="">All Categories</option>

              <option value="Authentication">Authentication</option>

              <option value="Billing">Billing</option>

              <option value="Performance">Performance</option>

              <option value="Data Issue">Data Issue</option>

              <option value="Integration">Integration</option>

              <option value="User Interface">User Interface</option>

              <option value="Access Request">Access Request</option>

              <option value="Feature Request">Feature Request</option>

              <option value="Security">Security</option>

              <option value="General Support">General Support</option>
            </select>

            <select
              value={team}
              onChange={(event) => {
                setTeam(event.target.value);
                setPage(1);
              }}
              disabled={teamsLoading}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-violet-500 disabled:bg-slate-50"
            >
              <option value="">All Teams</option>

              {teams.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </form>

        {/* Reset */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={resetFilters}
            className="text-sm font-medium text-slate-500 transition hover:text-violet-700"
          >
            Reset filters
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Ticket Table */}
      {/* Ticket Table */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Table Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              All Tickets
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              {total} ticket{total !== 1 ? "s" : ""} found
            </p>
          </div>

          <button
            onClick={loadTickets}
            disabled={loading}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 disabled:opacity-50"
            title="Refresh tickets"
          >
            <RefreshCw size={17} className={loading ? "animate-spin" : ""} />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                {/* Ticket */}
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Ticket
                </th>

                {/* Customer */}
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Customer
                </th>

                {/* Subject */}
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Subject
                </th>

                {/* Category */}
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Category
                </th>

                {/* Priority */}
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Priority
                </th>

                {/* Assigned Team */}
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Assigned Team
                </th>

                {/* Assignee */}
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Assignee
                </th>

                {/* Status */}
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {/* Loading */}
              {loading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index}>
                    {Array.from({ length: 8 }).map((_, cell) => (
                      <td key={cell} className="px-5 py-4">
                        <div className="h-4 animate-pulse rounded bg-slate-100" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : tickets.length === 0 ? (
                /* Empty State */
                <tr>
                  <td colSpan="8" className="px-5 py-16 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
                      <TicketIcon size={22} className="text-slate-400" />
                    </div>

                    <p className="mt-4 text-sm font-semibold text-slate-900">
                      No tickets found
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Try changing your search or filters.
                    </p>
                  </td>
                </tr>
              ) : (
                /* Tickets */
                tickets.map((ticket) => (
                  <tr key={ticket.id} className="transition hover:bg-slate-50">
                    {/* Ticket */}
                    <td className="px-5 py-4">
                      <Link
                        to={`/tickets/${ticket.id}`}
                        className="text-sm font-semibold text-violet-700 hover:text-violet-800"
                      >
                        #{ticket.id}
                      </Link>
                    </td>

                    {/* Customer */}
                    <td className="px-5 py-4">
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {ticket.customer_name}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {ticket.customer_email}
                        </p>
                      </div>
                    </td>

                    {/* Subject */}
                    <td className="max-w-xs px-5 py-4">
                      <p className="truncate text-sm font-medium text-slate-700">
                        {ticket.subject}
                      </p>
                    </td>

                    {/* Category */}
                    <td className="px-5 py-4">
                      <span className="text-sm text-slate-600">
                        {ticket.category || "—"}
                      </span>
                    </td>

                    {/* Priority */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getPriorityClass(
                          ticket.priority,
                        )}`}
                      >
                        {ticket.priority || "—"}
                      </span>
                    </td>

                    {/* Assigned Team */}
                    <td className="px-5 py-4">
                      <div>
                        <p className="text-sm font-medium text-slate-700">
                          {ticket.assigned_team_name || "Unassigned"}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">Team</p>
                      </div>
                    </td>

                    {/* Assignee */}
                    <td className="px-5 py-4">
                      <div>
                        <p className="text-sm font-medium text-slate-700">
                          {ticket.assigned_user_name || "Unassigned"}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">Agent</p>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClass(
                          ticket.status,
                        )}`}
                      >
                        {ticket.status?.replaceAll("_", " ") || "—"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && tickets.length > 0 && (
          <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
              Page {page} of {totalPages || 1}
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                disabled={page <= 1}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={16} />
                Previous
              </button>

              <button
                onClick={() =>
                  setPage((current) => Math.min(totalPages, current + 1))
                }
                disabled={page >= totalPages || totalPages === 0}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tickets;
