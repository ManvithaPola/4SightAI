import { useState } from "react";
import { ArrowLeft, Send, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { createTicket } from "../api/tickets";

function CreateTicket() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    subject: "",
    description: "",
    product_module: "",
    attachment_url: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (
      !formData.customer_name.trim() ||
      !formData.customer_email.trim() ||
      !formData.subject.trim() ||
      !formData.description.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);

      const data = await createTicket({
        customer_name: formData.customer_name.trim(),
        customer_email: formData.customer_email.trim(),
        subject: formData.subject.trim(),
        description: formData.description.trim(),
        product_module: formData.product_module.trim() || null,
        attachment_url: formData.attachment_url.trim() || null,
      });

      navigate(`/tickets/${data.id}`);
    } catch (err) {
      console.error(err);

      if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else {
        setError("Unable to create the ticket. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/tickets"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-violet-700"
        >
          <ArrowLeft size={16} />
          Back to Tickets
        </Link>

        <div className="mt-6">
          <p className="text-sm font-semibold text-violet-700">
            Support Workspace
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            Create Ticket
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Create a customer support ticket for your team to review and
            analyze.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          {/* Customer Information */}
          <div className="border-b border-slate-200 p-6 lg:p-8">
            <h2 className="text-base font-semibold text-slate-900">
              Customer Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Enter the customer details associated with this ticket.
            </p>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {/* Customer Name */}
              <div>
                <label
                  htmlFor="customer_name"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Customer Name
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  id="customer_name"
                  name="customer_name"
                  type="text"
                  value={formData.customer_name}
                  onChange={handleChange}
                  placeholder="e.g. XYZ Technologies"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="customer_email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Customer Email
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  id="customer_email"
                  name="customer_email"
                  type="email"
                  value={formData.customer_email}
                  onChange={handleChange}
                  placeholder="customer@example.com"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                />
              </div>
            </div>
          </div>

          {/* Ticket Information */}
          <div className="border-b border-slate-200 p-6 lg:p-8">
            <h2 className="text-base font-semibold text-slate-900">
              Ticket Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Describe the issue clearly so AI analysis can provide useful
              recommendations.
            </p>

            <div className="mt-6 space-y-5">
              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Subject
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Users unable to access production application"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                />
              </div>

              {/* Product Module */}
              <div>
                <label
                  htmlFor="product_module"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Product / Module
                </label>

                <input
                  id="product_module"
                  name="product_module"
                  type="text"
                  value={formData.product_module}
                  onChange={handleChange}
                  placeholder="e.g. Authentication"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Description
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <textarea
                  id="description"
                  name="description"
                  rows={7}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the customer's issue, impact, and any relevant details..."
                  className="w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                />

                <p className="mt-2 text-xs text-slate-400">
                  Provide enough context for accurate AI analysis.
                </p>
              </div>

              {/* Attachment URL */}
              <div>
                <label
                  htmlFor="attachment_url"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Attachment URL
                  <span className="ml-2 text-xs font-normal text-slate-400">
                    Optional
                  </span>
                </label>

                <input
                  id="attachment_url"
                  name="attachment_url"
                  type="url"
                  value={formData.attachment_url}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                />
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mx-6 mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 lg:mx-8">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 p-6 sm:flex-row sm:justify-end lg:p-8">
            <Link
              to="/tickets"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  Creating Ticket...
                </>
              ) : (
                <>
                  <Send size={17} />
                  Create Ticket
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTicket;
