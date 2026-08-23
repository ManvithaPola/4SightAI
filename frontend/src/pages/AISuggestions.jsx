import { useEffect, useState } from "react";
import {
  Brain,
  CheckCircle2,
  XCircle,
  ExternalLink,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  getAllAISuggestions,
  reviewAISuggestion,
  rejectAISuggestion,
} from "../api/tickets";

function AISuggestions() {
  const navigate = useNavigate();

  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadSuggestions = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAllAISuggestions();

      setSuggestions(Array.isArray(data) ? data : data?.items || []);
    } catch (err) {
      console.error(err);

      setError(err.response?.data?.detail || "Unable to load AI suggestions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSuggestions();
  }, []);

  const handleAccept = async (suggestion) => {
    try {
      setActionLoading(`accept-${suggestion.id}`);
      setError("");
      setSuccess("");

      await reviewAISuggestion(suggestion.ticket_id, {
        category: suggestion.category,
        priority: suggestion.priority,
        priority_reason: suggestion.priority_reason,
        recommended_team_id: suggestion.recommended_team_id ?? null,
      });

      setSuccess(`AI suggestion for Ticket #${suggestion.ticket_id} accepted.`);

      await loadSuggestions();
    } catch (err) {
      console.error(err);

      const detail = err.response?.data?.detail;

      setError(
        Array.isArray(detail)
          ? detail.map((item) => item.msg).join(", ")
          : detail ||
              err.response?.data?.message ||
              "Unable to accept AI suggestion.",
      );
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (suggestion) => {
    try {
      setActionLoading(`reject-${suggestion.id}`);
      setError("");
      setSuccess("");

      await rejectAISuggestion(suggestion.ticket_id);

      setSuccess(`AI suggestion for Ticket #${suggestion.ticket_id} rejected.`);

      await loadSuggestions();
    } catch (err) {
      console.error(err);

      const detail = err.response?.data?.detail;

      let errorMessage = "Unable to reject AI suggestion.";

      if (Array.isArray(detail)) {
        errorMessage = detail.map((item) => item.msg).join(", ");
      } else if (typeof detail === "string") {
        errorMessage = detail;
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }

      setError(errorMessage);
    } finally {
      setActionLoading(null);
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority?.toLowerCase()) {
      case "critical":
        return "bg-red-50 text-red-700 border-red-200";

      case "high":
        return "bg-orange-50 text-orange-700 border-orange-200";

      case "medium":
        return "bg-amber-50 text-amber-700 border-amber-200";

      case "low":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";

      default:
        return "bg-slate-50 text-slate-600 border-slate-200";
    }
  };

  const getStatusClass = (status) => {
    switch (status?.toUpperCase()) {
      case "PENDING":
        return "bg-violet-50 text-violet-700";

      case "ACCEPTED":
        return "bg-emerald-50 text-emerald-700";

      case "REJECTED":
        return "bg-red-50 text-red-700";

      case "OVERRIDDEN":
        return "bg-blue-50 text-blue-700";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
                <Sparkles size={20} className="text-violet-700" />
              </div>

              <div>
                <h1 className="text-xl font-bold text-slate-900">
                  AI Suggestions
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  Review and manage AI-generated ticket recommendations.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={loadSuggestions}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-violet-300 hover:text-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        {/* Messages */}
        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {success}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="mt-8 flex min-h-[300px] items-center justify-center rounded-2xl border border-slate-200 bg-white">
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <RefreshCw size={18} className="animate-spin" />
              Loading AI suggestions...
            </div>
          </div>
        ) : suggestions.length === 0 ? (
          /* Empty State */
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100">
              <Brain size={26} className="text-violet-600" />
            </div>

            <h2 className="mt-4 text-base font-semibold text-slate-900">
              No AI suggestions
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              AI-generated ticket recommendations will appear here when tickets
              are analyzed.
            </p>
          </div>
        ) : (
          /* Suggestions */
          <div className="mt-8 space-y-5">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                {/* Card Header */}
                <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold text-violet-600">
                          Ticket #{suggestion.ticket_id}
                        </span>

                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClass(
                            suggestion.status,
                          )}`}
                        >
                          {suggestion.status || "PENDING"}
                        </span>
                      </div>

                      <h2 className="mt-2 text-base font-semibold text-slate-900">
                        {suggestion.subject ||
                          suggestion.ticket_subject ||
                          "Ticket"}
                      </h2>

                      {suggestion.customer_name && (
                        <p className="mt-1 text-xs text-slate-500">
                          Customer: {suggestion.customer_name}
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/tickets/${suggestion.ticket_id}`)
                      }
                      className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-violet-200 hover:text-violet-700"
                    >
                      Review Ticket
                      <ExternalLink size={14} />
                    </button>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6">
                  {/* Summary */}
                  {suggestion.summary && (
                    <div className="mb-5 rounded-xl bg-slate-50 p-4">
                      <div className="flex items-center gap-2">
                        <Brain size={16} className="text-violet-600" />

                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          AI Summary
                        </p>
                      </div>

                      <p className="mt-2 text-sm leading-6 text-slate-700">
                        {suggestion.summary}
                      </p>
                    </div>
                  )}

                  {/* Classification */}
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-xl border border-slate-200 p-4">
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Category
                      </p>

                      <p className="mt-2 text-sm font-semibold text-slate-900">
                        {suggestion.category || "—"}
                      </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 p-4">
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Priority
                      </p>

                      <div className="mt-2">
                        <span
                          className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${getPriorityClass(
                            suggestion.priority,
                          )}`}
                        >
                          {suggestion.priority || "—"}
                        </span>
                      </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 p-4">
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Recommended Team
                      </p>

                      <p className="mt-2 text-sm font-semibold text-slate-900">
                        {suggestion.recommended_team ||
                          suggestion.recommended_team_name ||
                          "—"}
                      </p>
                    </div>
                  </div>

                  {/* Suggested Response */}
                  {suggestion.suggested_response && (
                    <div className="mt-5 rounded-xl border border-violet-100 bg-violet-50 p-4">
                      <div className="flex items-center gap-2">
                        <Sparkles size={16} className="text-violet-600" />

                        <p className="text-xs font-semibold uppercase tracking-wide text-violet-700">
                          Suggested Response
                        </p>
                      </div>

                      <p className="mt-2 text-sm leading-6 text-slate-700">
                        {suggestion.suggested_response}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-6 flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      onClick={() => handleReject(suggestion)}
                      disabled={
                        actionLoading !== null ||
                        suggestion.status !== "PENDING"
                      }
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {actionLoading === `reject-${suggestion.id}` ? (
                        <>
                          <RefreshCw size={16} className="animate-spin" />
                          Rejecting...
                        </>
                      ) : (
                        <>
                          <XCircle size={16} />
                          Reject
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleAccept(suggestion)}
                      disabled={
                        actionLoading !== null ||
                        suggestion.status !== "PENDING"
                      }
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {actionLoading === `accept-${suggestion.id}` ? (
                        <>
                          <RefreshCw size={16} className="animate-spin" />
                          Accepting...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 size={16} />
                          Accept Suggestion
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AISuggestions;
