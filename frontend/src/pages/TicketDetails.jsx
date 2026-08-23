import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Brain,
  RefreshCw,
  UserRound,
  Calendar,
  Mail,
  Building2,
  AlertCircle,
  CheckCircle2,
  Clock3,
  Sparkles,
  MessageSquare,
  Send,
  Loader2,
  Pencil,
  Users,
  XCircle,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import {
  getTicket,
  analyzeTicket,
  getAISuggestions,
  reviewAISuggestion,
  getComments,
  createComment,
  getActivities,
  getTeams,
  getUsers,
  assignTicket,
  updateTicketStatus,
  updateTicket,
  rejectAISuggestion,
} from "../api/tickets";

function TicketDetails() {
  const { ticketId } = useParams();

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [aiSuggestions, setAISuggestions] = useState([]);
  const [aiLoading, setAILoading] = useState(false);
  const [aiError, setAIError] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState("");
  const [overrideOpen, setOverrideOpen] = useState(false);
  const [overrideData, setOverrideData] = useState({
    category: "",
    priority: "",
    priority_reason: "",
    recommended_team_id: "",
  });
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentError, setCommentError] = useState("");
  const [activities, setActivities] = useState([]);
  const [activityLoading, setActivityLoading] = useState(false);
  const [activityError, setActivityError] = useState("");
  const [teams, setTeams] = useState([]);
  const [teamsLoading, setTeamsLoading] = useState(false);
  const [teamsError, setTeamsError] = useState("");
  const [users, setUsers] = useState([]);
  const [assignmentLoading, setAssignmentLoading] = useState(false);
  const [assignmentError, setAssignmentError] = useState("");
  const [assignmentSuccess, setAssignmentSuccess] = useState("");
  const [assignmentData, setAssignmentData] = useState({
    team_id: "",
    user_id: "",
  });
  const filteredUsers = users.filter(
    (user) => Number(user.team_id) === Number(assignmentData.team_id),
  );
  const [statusValue, setStatusValue] = useState("");
  const [statusLoading, setStatusLoading] = useState(false);
  const [statusError, setStatusError] = useState("");
  const [statusSuccess, setStatusSuccess] = useState("");
  const [editMode, setEditMode] = useState(false);

  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");
  const [editSuccess, setEditSuccess] = useState("");

  const [editData, setEditData] = useState({
    customer_name: "",
    customer_email: "",
    subject: "",
    description: "",
    product_module: "",
    attachment_url: "",
    category: "",
    priority: "",
    priority_reason: "",
  });
  const [rejectLoading, setRejectLoading] = useState(false);
  const [rejectError, setRejectError] = useState("");
  const [rejectSuccess, setRejectSuccess] = useState("");

  const loadTicket = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getTicket(ticketId);

      setTicket(data);

      setStatusValue(data.status || "");

      setAssignmentData({
        team_id: data.assigned_team_id ? String(data.assigned_team_id) : "",
        user_id: data.assigned_user_id ? String(data.assigned_user_id) : "",
      });

      setEditData({
        customer_name: data.customer_name || "",
        customer_email: data.customer_email || "",
        subject: data.subject || "",
        description: data.description || "",
        product_module: data.product_module || "",
        attachment_url: data.attachment_url || "",
        category: data.category || "",
        priority: data.priority || "",
        priority_reason: data.priority_reason || "",
      });
    } catch (err) {
      console.error(err);

      setError("Unable to load ticket details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTicket = async (event) => {
    event.preventDefault();

    try {
      setEditLoading(true);
      setEditError("");
      setEditSuccess("");

      await updateTicket(ticketId, editData);

      setEditSuccess("Ticket details updated successfully.");

      setEditMode(false);

      await loadTicket();
      await loadActivities();
    } catch (err) {
      console.error(err);

      setEditError(
        err.response?.data?.detail ||
          err.response?.data?.message ||
          "Unable to update ticket details.",
      );
    } finally {
      setEditLoading(false);
    }
  };

  const handleRejectSuggestion = async () => {
    try {
      setRejectLoading(true);
      setRejectError("");
      setRejectSuccess("");

      await rejectAISuggestion(ticketId);

      setRejectSuccess("AI suggestion rejected successfully.");

      // Refresh AI suggestions
      await loadAISuggestions();

      // Refresh activity timeline
      await loadActivities();
    } catch (err) {
      console.error(err);

      setRejectError(
        err.response?.data?.detail ||
          err.response?.data?.message ||
          "Unable to reject AI suggestion.",
      );
    } finally {
      setRejectLoading(false);
    }
  };

  const loadUsers = async () => {
    try {
      const data = await getUsers();

      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);

      setAssignmentError(err.response?.data?.detail || "Unable to load users.");
    }
  };

  const handleStatusUpdate = async (event) => {
    event.preventDefault();

    if (!statusValue) {
      setStatusError("Please select a status.");
      return;
    }

    try {
      setStatusLoading(true);
      setStatusError("");
      setStatusSuccess("");

      await updateTicketStatus(ticketId, statusValue);

      setStatusSuccess("Ticket status updated successfully.");

      await loadTicket();
      await loadActivities();
    } catch (err) {
      console.error(err);

      setStatusError(
        err.response?.data?.detail ||
          err.response?.data?.message ||
          "Unable to update ticket status.",
      );
    } finally {
      setStatusLoading(false);
    }
  };

  const loadTeams = async () => {
    try {
      setTeamsLoading(true);
      setTeamsError("");

      const data = await getTeams();

      setTeams(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);

      setTeamsError(err.response?.data?.detail || "Unable to load teams.");
    } finally {
      setTeamsLoading(false);
    }
  };

  const loadAISuggestions = async () => {
    try {
      setAIError("");

      const data = await getAISuggestions(ticketId);

      setAISuggestions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);

      setAISuggestions([]);
    }
  };

  const loadComments = async () => {
    try {
      const data = await getComments(ticketId);

      setComments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);

      setCommentError("Unable to load comments.");
    }
  };

  const loadActivities = async () => {
    try {
      setActivityLoading(true);
      setActivityError("");

      const data = await getActivities(ticketId);

      setActivities(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);

      setActivityError(
        err.response?.data?.detail || "Unable to load activity timeline.",
      );
    } finally {
      setActivityLoading(false);
    }
  };

  const handleAcceptSuggestion = async (suggestion) => {
    try {
      setReviewLoading(true);
      setReviewError("");
      setReviewSuccess("");

      await reviewAISuggestion(ticketId, {
        category: suggestion.category,
        priority: suggestion.priority,
        priority_reason: suggestion.priority_reason,
        recommended_team_id: suggestion.recommended_team_id || null,
      });

      setReviewSuccess("AI suggestions accepted successfully.");

      await loadTicket();
      await loadAISuggestions();
      await loadActivities();
    } catch (err) {
      console.error(err);

      setReviewError(
        err.response?.data?.detail || "Unable to accept AI suggestions.",
      );
    } finally {
      setReviewLoading(false);
    }
  };

  const handleOverrideClick = (suggestion) => {
    setOverrideData({
      category: suggestion.category || "",
      priority: suggestion.priority || "",
      priority_reason: suggestion.priority_reason || "",
      recommended_team_id: suggestion.recommended_team_id || "",
    });

    setOverrideOpen(true);

    setReviewError("");
    setReviewSuccess("");
  };

  const formatActivityType = (type) => {
    if (!type) {
      return "Activity";
    }

    return type
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const handleOverrideSubmit = async (event) => {
    event.preventDefault();

    try {
      setReviewLoading(true);
      setReviewError("");
      setReviewSuccess("");

      await reviewAISuggestion(ticketId, {
        category: overrideData.category,
        priority: overrideData.priority,
        priority_reason: overrideData.priority_reason,
        recommended_team_id: overrideData.recommended_team_id
          ? Number(overrideData.recommended_team_id)
          : null,
      });

      setOverrideOpen(false);

      setReviewSuccess("AI suggestion overridden successfully.");

      await loadTicket();
      await loadAISuggestions();
      await loadActivities();
    } catch (err) {
      console.error(err);

      setReviewError(
        err.response?.data?.detail || "Unable to override AI suggestion.",
      );
    } finally {
      setReviewLoading(false);
    }
  };

  useEffect(() => {
    loadTicket();
    loadAISuggestions();
    loadComments();
    loadActivities();
    loadTeams();
    loadUsers();
  }, [ticketId]);

  const handleAssignTicket = async (event) => {
    event.preventDefault();

    if (!assignmentData.team_id) {
      setAssignmentError("Please select a team.");
      return;
    }

    if (!assignmentData.user_id) {
      setAssignmentError("Please select an assignee.");
      return;
    }

    try {
      setAssignmentLoading(true);
      setAssignmentError("");
      setAssignmentSuccess("");

      await assignTicket(ticketId, {
        team_id: Number(assignmentData.team_id),
        user_id: Number(assignmentData.user_id),
      });

      setAssignmentSuccess("Ticket assigned successfully.");

      await loadTicket();
      await loadActivities();
    } catch (err) {
      console.error(err);

      setAssignmentError(
        err.response?.data?.detail || "Unable to assign ticket.",
      );
    } finally {
      setAssignmentLoading(false);
    }
  };

  const handleAddComment = async (event) => {
    event.preventDefault();

    const content = commentText.trim();

    if (!content) {
      return;
    }

    try {
      setCommentLoading(true);
      setCommentError("");

      await createComment(ticketId, content);

      setCommentText("");

      await loadComments();
      await loadActivities();
    } catch (err) {
      console.error(err);

      setCommentError(err.response?.data?.detail || "Unable to add comment.");
    } finally {
      setCommentLoading(false);
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
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

  const getStatusClass = (status) => {
    switch (status) {
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

  const formatStatus = (status) => {
    return status
      ?.replaceAll("_", " ")
      ?.toLowerCase()
      ?.replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  const handleAnalyze = async () => {
    try {
      setAILoading(true);
      setAIError("");

      await analyzeTicket(ticketId);

      await loadAISuggestions();
    } catch (err) {
      console.error(err);

      const detail = err.response?.data?.detail;

      setAIError(detail || "AI analysis failed. Please try again.");
    } finally {
      setAILoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  if (loading) {
    return (
      <div className="p-6 lg:p-8">
        <div className="animate-pulse">
          <div className="h-4 w-28 rounded bg-slate-200" />

          <div className="mt-6 h-8 w-96 rounded bg-slate-200" />

          <div className="mt-3 h-4 w-72 rounded bg-slate-200" />

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="h-72 rounded-2xl bg-slate-200 lg:col-span-2" />

            <div className="h-72 rounded-2xl bg-slate-200" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 lg:p-8">
        <Link
          to="/tickets"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-violet-700"
        >
          <ArrowLeft size={16} />
          Back to Tickets
        </Link>

        <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6">
          <p className="text-sm font-medium text-red-700">{error}</p>

          <button
            onClick={loadTicket}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            <RefreshCw size={16} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Back */}
      <Link
        to="/tickets"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-violet-700"
      >
        <ArrowLeft size={16} />
        Back to Tickets
      </Link>

      {/* Header */}
      <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-semibold text-slate-400">
              Ticket #{ticket.id}
            </span>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                ticket.status,
              )}`}
            >
              {formatStatus(ticket.status)}
            </span>

            {ticket.priority && (
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${getPriorityClass(
                  ticket.priority,
                )}`}
              >
                {ticket.priority}
              </span>
            )}
          </div>

          <h1 className="mt-3 max-w-4xl text-2xl font-bold tracking-tight text-slate-900 lg:text-3xl">
            {ticket.subject}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Created {formatDate(ticket.created_at)}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setEditMode(true);
              setEditError("");
              setEditSuccess("");
            }}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-violet-300 hover:text-violet-700"
          >
            <Pencil size={16} />
            Edit Details
          </button>

          <button
            type="button"
            onClick={loadTicket}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-violet-300 hover:text-violet-700"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Ticket Details */}
        <div className="space-y-6 lg:col-span-2">
          {editMode && (
            <section className="rounded-2xl border border-violet-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-base font-semibold text-slate-900">
                      Edit Ticket Details
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                      Update customer and ticket information.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setEditMode(false);
                      setEditError("");
                      setEditSuccess("");
                    }}
                    className="text-sm font-medium text-slate-500 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                </div>
              </div>

              <form onSubmit={handleUpdateTicket} className="p-6">
                {editError && (
                  <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {editError}
                  </div>
                )}

                {editSuccess && (
                  <div className="mb-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                    {editSuccess}
                  </div>
                )}

                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Customer Name */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Customer Name
                    </label>

                    <input
                      type="text"
                      value={editData.customer_name}
                      onChange={(event) =>
                        setEditData((current) => ({
                          ...current,
                          customer_name: event.target.value,
                        }))
                      }
                      className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                    />
                  </div>

                  {/* Customer Email */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Customer Email
                    </label>

                    <input
                      type="email"
                      value={editData.customer_email}
                      onChange={(event) =>
                        setEditData((current) => ({
                          ...current,
                          customer_email: event.target.value,
                        }))
                      }
                      className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                    />
                  </div>

                  {/* Subject */}
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Subject
                    </label>

                    <input
                      type="text"
                      value={editData.subject}
                      onChange={(event) =>
                        setEditData((current) => ({
                          ...current,
                          subject: event.target.value,
                        }))
                      }
                      className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                    />
                  </div>

                  {/* Product / Module */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Product / Module
                    </label>

                    <input
                      type="text"
                      value={editData.product_module}
                      onChange={(event) =>
                        setEditData((current) => ({
                          ...current,
                          product_module: event.target.value,
                        }))
                      }
                      className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Category
                    </label>

                    <input
                      type="text"
                      value={editData.category}
                      onChange={(event) =>
                        setEditData((current) => ({
                          ...current,
                          category: event.target.value,
                        }))
                      }
                      className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                    />
                  </div>

                  {/* Priority */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Priority
                    </label>

                    <select
                      value={editData.priority}
                      onChange={(event) =>
                        setEditData((current) => ({
                          ...current,
                          priority: event.target.value,
                        }))
                      }
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </div>

                  {/* Attachment URL */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Attachment URL
                    </label>

                    <input
                      type="text"
                      value={editData.attachment_url}
                      onChange={(event) =>
                        setEditData((current) => ({
                          ...current,
                          attachment_url: event.target.value,
                        }))
                      }
                      className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                    />
                  </div>

                  {/* Priority Reason */}
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Priority Reason
                    </label>

                    <textarea
                      rows={3}
                      value={editData.priority_reason}
                      onChange={(event) =>
                        setEditData((current) => ({
                          ...current,
                          priority_reason: event.target.value,
                        }))
                      }
                      className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                    />
                  </div>

                  {/* Description */}
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Description
                    </label>

                    <textarea
                      rows={6}
                      value={editData.description}
                      onChange={(event) =>
                        setEditData((current) => ({
                          ...current,
                          description: event.target.value,
                        }))
                      }
                      className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2.5 text-sm leading-6 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end border-t border-slate-200 pt-5">
                  <button
                    type="submit"
                    disabled={editLoading}
                    className="inline-flex items-center gap-2 rounded-lg bg-violet-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {editLoading ? (
                      <>
                        <RefreshCw size={16} className="animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={16} />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            </section>
          )}
          {/* Assignment */}
          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
                  <Users size={20} className="text-violet-700" />
                </div>

                <div>
                  <h2 className="text-base font-semibold text-slate-900">
                    Assignment
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Assign this ticket to a support team and agent.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleAssignTicket} className="p-6">
              {assignmentError && (
                <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {assignmentError}
                </div>
              )}

              {assignmentSuccess && (
                <div className="mb-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {assignmentSuccess}
                </div>
              )}

              <div className="grid gap-5 sm:grid-cols-2">
                {/* Team */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Team
                  </label>

                  <select
                    value={assignmentData.team_id}
                    onChange={(event) =>
                      setAssignmentData({
                        team_id: event.target.value,
                        user_id: "",
                      })
                    }
                    disabled={teamsLoading || assignmentLoading}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 disabled:bg-slate-50"
                  >
                    <option value="">Select a team</option>

                    {teams.map((team) => (
                      <option key={team.id} value={team.id}>
                        {team.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Assignee */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Assignee
                  </label>

                  <select
                    value={assignmentData.user_id}
                    onChange={(event) =>
                      setAssignmentData((current) => ({
                        ...current,
                        user_id: event.target.value,
                      }))
                    }
                    disabled={assignmentLoading}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 disabled:bg-slate-50"
                  >
                    <option value="">Select an assignee</option>

                    {filteredUsers.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-5 flex justify-end">
                <button
                  type="submit"
                  disabled={assignmentLoading}
                  className="inline-flex items-center gap-2 rounded-lg bg-violet-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {assignmentLoading ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" />
                      Assigning...
                    </>
                  ) : (
                    <>
                      <Users size={16} />
                      Assign Ticket
                    </>
                  )}
                </button>
              </div>
            </form>
          </section>

          {/* Status Management */}
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                  <RefreshCw size={20} className="text-emerald-600" />
                </div>

                <div>
                  <h2 className="text-base font-semibold text-slate-900">
                    Ticket Status
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Update the current state of this ticket.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleStatusUpdate} className="p-6">
              {statusError && (
                <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {statusError}
                </div>
              )}

              {statusSuccess && (
                <div className="mb-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {statusSuccess}
                </div>
              )}

              <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <div className="flex-1">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Status
                  </label>

                  <select
                    value={statusValue}
                    onChange={(event) => setStatusValue(event.target.value)}
                    disabled={statusLoading}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 disabled:bg-slate-50"
                  >
                    <option value="OPEN">Open</option>

                    <option value="ASSIGNED">Assigned</option>

                    <option value="IN_PROGRESS">In Progress</option>

                    <option value="WAITING_FOR_CUSTOMER">
                      Waiting for Customer
                    </option>

                    <option value="RESOLVED">Resolved</option>

                    <option value="CLOSED">Closed</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={statusLoading || statusValue === ticket?.status}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {statusLoading ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <RefreshCw size={16} />
                      Update Status
                    </>
                  )}
                </button>
              </div>
            </form>
          </section>

          {/* Description */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                <AlertCircle size={20} className="text-slate-600" />
              </div>

              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  Issue Description
                </h2>

                <p className="text-xs text-slate-500">
                  Customer-reported issue
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-slate-50 p-5">
              <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
                {ticket.description}
              </p>
            </div>
          </section>

          {/* AI Analysis */}
          <section className="overflow-hidden rounded-2xl border border-violet-200 bg-white shadow-sm">
            {/* Header */}
            <div className="border-b border-violet-100 bg-violet-50/50 p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                {/* Title */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
                    <Brain size={21} className="text-violet-700" />
                  </div>

                  <div>
                    <h2 className="text-base font-semibold text-slate-900">
                      AI Analysis
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                      Gemini-powered ticket analysis
                    </p>
                  </div>
                </div>

                {/* Analyze Button */}
                <button
                  onClick={handleAnalyze}
                  disabled={aiLoading}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {aiLoading ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Brain size={16} />
                      Analyze with Gemini
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* AI Content */}
            <div className="p-6">
              {/* AI Error */}
              {aiError && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {aiError}
                </div>
              )}
              {rejectError && (
                <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {rejectError}
                </div>
              )}

              {rejectSuccess && (
                <div className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {rejectSuccess}
                </div>
              )}

              {/* Loading */}
              {aiLoading && (
                <div className="rounded-xl border border-violet-100 bg-violet-50/30 p-8 text-center">
                  <RefreshCw
                    size={28}
                    className="mx-auto animate-spin text-violet-600"
                  />

                  <h3 className="mt-4 text-sm font-semibold text-slate-900">
                    Gemini is analyzing the ticket
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    Generating category, priority, team recommendation, and
                    customer response.
                  </p>
                </div>
              )}

              {/* No AI Suggestion */}
              {!aiLoading && aiSuggestions.length === 0 && (
                <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100">
                    <Brain size={23} className="text-violet-600" />
                  </div>

                  <h3 className="mt-4 text-sm font-semibold text-slate-900">
                    No AI analysis yet
                  </h3>

                  <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                    Run Gemini analysis to generate a category, priority,
                    recommended team, and customer response.
                  </p>
                </div>
              )}

              {/* AI Suggestions */}
              {!aiLoading && aiSuggestions.length > 0 && (
                <div className="space-y-8">
                  {aiSuggestions.map((suggestion) => (
                    <div key={suggestion.id} className="space-y-6">
                      {/* AI Summary */}
                      <div>
                        <div className="flex items-center gap-2">
                          <Sparkles size={17} className="text-violet-600" />

                          <h3 className="text-sm font-semibold text-slate-900">
                            AI Summary
                          </h3>
                        </div>

                        <div className="mt-3 rounded-xl bg-slate-50 p-4">
                          <p className="text-sm leading-6 text-slate-700">
                            {suggestion.summary}
                          </p>
                        </div>
                      </div>

                      {/* Classification */}
                      <div className="grid gap-4 sm:grid-cols-3">
                        {/* Category */}
                        <div className="rounded-xl border border-slate-200 p-4">
                          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                            Category
                          </p>

                          <p className="mt-2 text-sm font-semibold text-slate-900">
                            {suggestion.category || "—"}
                          </p>
                        </div>

                        {/* Priority */}
                        <div className="rounded-xl border border-slate-200 p-4">
                          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                            Priority
                          </p>

                          <div className="mt-2">
                            <span
                              className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getPriorityClass(
                                suggestion.priority,
                              )}`}
                            >
                              {suggestion.priority || "—"}
                            </span>
                          </div>
                        </div>

                        {/* Recommended Team */}
                        <div className="rounded-xl border border-slate-200 p-4">
                          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                            Recommended Team
                          </p>

                          <p className="mt-2 text-sm font-semibold text-slate-900">
                            {suggestion.recommended_team || "—"}
                          </p>
                        </div>
                      </div>

                      {/* Priority Reason */}
                      <div>
                        <h3 className="text-sm font-semibold text-slate-900">
                          Priority Reason
                        </h3>

                        <div className="mt-3 rounded-xl border border-slate-200 p-4">
                          <p className="text-sm leading-6 text-slate-600">
                            {suggestion.priority_reason || "—"}
                          </p>
                        </div>
                      </div>

                      {/* Suggested Response */}
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-semibold text-slate-900">
                            Suggested Customer Response
                          </h3>

                          <span className="text-xs font-medium text-violet-600">
                            AI Generated
                          </span>
                        </div>

                        <div className="mt-3 rounded-xl border border-violet-100 bg-violet-50/40 p-4">
                          <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">
                            {suggestion.suggested_response || "—"}
                          </p>
                        </div>
                      </div>

                      {/* Metadata */}
                      <div className="flex flex-wrap items-center gap-3 border-t border-slate-200 pt-4">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                          Status: {suggestion.status || "PENDING"}
                        </span>

                        {suggestion.model_provider && (
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                            Provider: {suggestion.model_provider}
                          </span>
                        )}

                        {suggestion.model_name && (
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                            Model: {suggestion.model_name}
                          </span>
                        )}
                      </div>

                      {/* Human Review */}
                      <div className="border-t border-slate-200 pt-6">
                        <div className="flex items-start gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
                            <CheckCircle2
                              size={18}
                              className="text-emerald-600"
                            />
                          </div>

                          <div>
                            <h3 className="text-sm font-semibold text-slate-900">
                              Human Review
                            </h3>

                            <p className="mt-1 text-xs leading-5 text-slate-500">
                              Review the AI recommendation before applying it to
                              the ticket.
                            </p>
                          </div>
                        </div>

                        {/* Review Success */}
                        {reviewSuccess && (
                          <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                            {reviewSuccess}
                          </div>
                        )}

                        {/* Review Error */}
                        {reviewError && (
                          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {reviewError}
                          </div>
                        )}

                        {/* Review Buttons */}
                        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                          {/* Accept */}
                          <button
                            onClick={() => handleAcceptSuggestion(suggestion)}
                            disabled={
                              reviewLoading || suggestion.status !== "PENDING"
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {reviewLoading ? (
                              <>
                                <RefreshCw size={16} className="animate-spin" />
                                Applying...
                              </>
                            ) : (
                              <>
                                <CheckCircle2 size={16} />
                                Accept AI Suggestions
                              </>
                            )}
                          </button>

                          {/* Override */}
                          <button
                            type="button"
                            onClick={() => handleOverrideClick(suggestion)}
                            disabled={
                              reviewLoading || suggestion.status !== "PENDING"
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            Override
                          </button>

                          <button
                            type="button"
                            onClick={handleRejectSuggestion}
                            disabled={
                              rejectLoading || suggestion.status !== "PENDING"
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {rejectLoading ? (
                              <>
                                <RefreshCw size={16} className="animate-spin" />
                                Rejecting...
                              </>
                            ) : (
                              <>
                                <XCircle size={16} />
                                Reject AI Suggestion
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Already Reviewed */}
                      {suggestion.status !== "PENDING" && (
                        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                          <div className="flex items-center gap-2">
                            <CheckCircle2
                              size={17}
                              className="text-emerald-600"
                            />

                            <p className="text-sm font-semibold text-emerald-800">
                              This AI suggestion has already been reviewed.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Comments */}
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
            {/* Header */}
            <div className="border-b border-slate-200 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                  <MessageSquare size={20} className="text-slate-600" />
                </div>

                <div>
                  <h2 className="text-base font-semibold text-slate-900">
                    Comments
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Internal discussion about this ticket
                  </p>
                </div>
              </div>
            </div>

            {/* Comments */}
            <div className="p-6">
              {commentError && (
                <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {commentError}
                </div>
              )}

              {comments.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                  <MessageSquare size={24} className="mx-auto text-slate-400" />

                  <p className="mt-3 text-sm font-semibold text-slate-700">
                    No comments yet
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Start the conversation about this ticket.
                  </p>
                </div>
              ) : (
                <div className="space-y-5">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      {/* Avatar */}
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-semibold text-violet-700">
                        {(comment.author_name || "U").charAt(0).toUpperCase()}
                      </div>

                      {/* Comment */}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-semibold text-slate-900">
                            {comment.author_name || "Unknown User"}
                          </span>

                          {comment.created_at && (
                            <span className="text-xs text-slate-400">
                              {new Date(comment.created_at).toLocaleString(
                                "en-IN",
                                {
                                  dateStyle: "medium",
                                  timeStyle: "short",
                                },
                              )}
                            </span>
                          )}
                        </div>

                        <div className="mt-2 rounded-xl bg-slate-50 px-4 py-3">
                          <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">
                            {comment.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Comment */}
              <form
                onSubmit={handleAddComment}
                className="mt-6 border-t border-slate-200 pt-6"
              >
                <label
                  htmlFor="comment"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Add Comment
                </label>

                <textarea
                  id="comment"
                  value={commentText}
                  onChange={(event) => setCommentText(event.target.value)}
                  rows={4}
                  placeholder="Write an internal comment..."
                  className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                />

                <div className="mt-3 flex justify-end">
                  <button
                    type="submit"
                    disabled={commentLoading || !commentText.trim()}
                    className="inline-flex items-center gap-2 rounded-lg bg-violet-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {commentLoading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Add Comment
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </section>

          {/* Activity Timeline */}
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
            {/* Header */}
            <div className="border-b border-slate-200 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                  <Clock3 size={20} className="text-slate-600" />
                </div>

                <div>
                  <h2 className="text-base font-semibold text-slate-900">
                    Activity Timeline
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    History of actions and changes on this ticket
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="p-6">
              {activityError && (
                <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {activityError}
                </div>
              )}

              {activityLoading ? (
                <div className="flex items-center justify-center py-10">
                  <RefreshCw
                    size={22}
                    className="animate-spin text-violet-600"
                  />

                  <span className="ml-3 text-sm text-slate-500">
                    Loading activity...
                  </span>
                </div>
              ) : activities.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                  <Clock3 size={24} className="mx-auto text-slate-400" />

                  <p className="mt-3 text-sm font-semibold text-slate-700">
                    No activity yet
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Ticket activity will appear here.
                  </p>
                </div>
              ) : (
                <div className="relative">
                  {/* Vertical line */}
                  <div className="absolute left-4 top-2 bottom-2 w-px bg-slate-200" />

                  <div className="space-y-6">
                    {activities.map((activity) => (
                      <div key={activity.id} className="relative flex gap-4">
                        {/* Timeline dot */}
                        <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white">
                          <div className="h-2.5 w-2.5 rounded-full bg-violet-600" />
                        </div>

                        {/* Activity content */}
                        <div className="min-w-0 flex-1 pb-1">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="text-sm font-semibold text-slate-900">
                              {formatActivityType(activity.activity_type)}
                            </span>

                            {activity.created_at && (
                              <span className="text-xs text-slate-400">
                                {new Date(activity.created_at).toLocaleString(
                                  "en-IN",
                                  {
                                    dateStyle: "medium",
                                    timeStyle: "short",
                                  },
                                )}
                              </span>
                            )}
                          </div>

                          <p className="mt-1 text-sm leading-6 text-slate-600">
                            {activity.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>

        {overrideOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
            <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
              {/* Header */}
              <div className="border-b border-slate-200 px-6 py-5">
                <h2 className="text-lg font-semibold text-slate-900">
                  Override AI Suggestion
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Modify the AI recommendation before applying it to the ticket.
                </p>
              </div>

              <form onSubmit={handleOverrideSubmit} className="p-6">
                {/* Category */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Category
                  </label>

                  <select
                    value={overrideData.category}
                    onChange={(event) =>
                      setOverrideData((current) => ({
                        ...current,
                        category: event.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                  >
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

                    <option value="Unknown">Unknown</option>
                  </select>
                </div>

                {/* Priority */}
                <div className="mt-5">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Priority
                  </label>

                  <select
                    value={overrideData.priority}
                    onChange={(event) =>
                      setOverrideData((current) => ({
                        ...current,
                        priority: event.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                  >
                    <option value="Low">Low</option>

                    <option value="Medium">Medium</option>

                    <option value="High">High</option>

                    <option value="Critical">Critical</option>
                  </select>
                </div>

                {/* Priority Reason */}
                <div className="mt-5">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Priority Reason
                  </label>

                  <textarea
                    rows={4}
                    value={overrideData.priority_reason}
                    onChange={(event) =>
                      setOverrideData((current) => ({
                        ...current,
                        priority_reason: event.target.value,
                      }))
                    }
                    placeholder="Explain why you selected this priority..."
                    className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2.5 text-sm leading-6 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                  />
                </div>

                {/* Team ID */}
                {/* Recommended Team */}
                <div className="mt-5">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Recommended Team
                  </label>

                  <select
                    value={overrideData.recommended_team_id}
                    onChange={(event) =>
                      setOverrideData((current) => ({
                        ...current,
                        recommended_team_id: event.target.value,
                      }))
                    }
                    disabled={teamsLoading || reviewLoading}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 disabled:bg-slate-50"
                  >
                    <option value="">Select a team</option>

                    {teams.map((team) => (
                      <option key={team.id} value={team.id}>
                        {team.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Actions */}
                <div className="mt-7 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setOverrideOpen(false)}
                    className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={reviewLoading}
                    className="inline-flex items-center gap-2 rounded-lg bg-violet-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-800 disabled:opacity-50"
                  >
                    {reviewLoading && (
                      <RefreshCw size={16} className="animate-spin" />
                    )}
                    Save Override
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Customer / Metadata */}
        <div className="space-y-6">
          {/* Customer */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">Customer</h2>

            <div className="mt-5 space-y-5">
              <div className="flex items-start gap-3">
                <UserRound size={18} className="mt-0.5 text-slate-400" />

                <div>
                  <p className="text-xs text-slate-400">Name</p>

                  <p className="mt-1 text-sm font-medium text-slate-900">
                    {ticket.customer_name}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail size={18} className="mt-0.5 text-slate-400" />

                <div className="min-w-0">
                  <p className="text-xs text-slate-400">Email</p>

                  <p className="mt-1 break-all text-sm font-medium text-slate-900">
                    {ticket.customer_email}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Ticket Metadata */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              Ticket Details
            </h2>

            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-slate-500">
                  <Building2 size={16} />
                  <span className="text-sm">Product / Module</span>
                </div>

                <span className="text-right text-sm font-medium text-slate-900">
                  {ticket.product_module || "—"}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-slate-500">
                  <Clock3 size={16} />
                  <span className="text-sm">Status</span>
                </div>

                <span className="text-sm font-medium text-slate-900">
                  {formatStatus(ticket.status)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-slate-500">
                  <Calendar size={16} />
                  <span className="text-sm">Created</span>
                </div>

                <span className="text-right text-xs font-medium text-slate-900">
                  {formatDate(ticket.created_at)}
                </span>
              </div>

              {/* Assigned Team */}
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                  <Users size={17} className="text-slate-500" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-400">
                    Assigned Team
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {ticket.assigned_team_name || "Unassigned"}
                  </p>
                </div>
              </div>

              {/* Assigned To */}
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                  <UserRound size={17} className="text-slate-500" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-400">
                    Assigned To
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {ticket.assigned_user_name || "Unassigned"}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default TicketDetails;
