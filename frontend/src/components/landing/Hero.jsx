import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-50">
      
      {/* Subtle background decoration */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-violet-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-violet-100/40 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">

        {/* Left Content */}
        <div>

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2">
            <Sparkles size={15} className="text-violet-700" />

            <span className="text-sm font-semibold text-violet-800">
              AI-Powered Support Intelligence
            </span>
          </div>

          <h1 className="max-w-2xl text-5xl font-bold leading-[1.08] tracking-tight text-slate-950 sm:text-6xl">

            Smarter Support.
            <br />

            <span className="text-violet-700">
              Faster Resolution.
            </span>

          </h1>

          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
            4Sight AI helps support teams analyze, prioritize,
            route, and resolve customer tickets with intelligent
            AI assistance and human oversight.
          </p>

          {/* CTA Buttons */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">

            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-700 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-800"
            >
              Get Started
              <ArrowRight size={17} />
            </Link>

            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-violet-300 hover:text-violet-700"
            >
              See How It Works
            </a>

          </div>

          {/* Trust indicators */}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-500">

            <div className="flex items-center gap-2">
              <ShieldCheck size={17} className="text-violet-700" />
              Human-in-the-loop
            </div>

            <div className="h-4 w-px bg-slate-300" />

            <div>
              Structured AI analysis
            </div>

          </div>

        </div>

        {/* Right AI Visual */}
        <div className="relative">

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  AI Ticket Analysis
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-900">
                  Ticket #1048
                </p>
              </div>

              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                Critical
              </span>

            </div>

            {/* Ticket */}
            <div className="py-5">

              <p className="text-sm font-semibold text-slate-900">
                Production users unable to login
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Multiple production users are receiving authentication
                errors following the latest deployment.
              </p>

            </div>

            {/* AI Analysis */}
            <div className="rounded-xl bg-slate-50 p-4">

              <div className="mb-4 flex items-center gap-2">

                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-100">
                  <Sparkles size={14} className="text-violet-700" />
                </div>

                <span className="text-sm font-semibold text-slate-900">
                  AI Recommendation
                </span>

              </div>

              <div className="grid grid-cols-2 gap-3">

                <div className="rounded-lg border border-slate-200 bg-white p-3">
                  <p className="text-xs text-slate-400">
                    Category
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    Authentication
                  </p>
                </div>

                <div className="rounded-lg border border-slate-200 bg-white p-3">
                  <p className="text-xs text-slate-400">
                    Priority
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    Critical
                  </p>
                </div>

                <div className="col-span-2 rounded-lg border border-slate-200 bg-white p-3">
                  <p className="text-xs text-slate-400">
                    Recommended Team
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    Platform Engineering
                  </p>
                </div>

              </div>

            </div>

            {/* Human Review */}
            <div className="mt-4 flex items-center justify-between rounded-xl border border-violet-100 bg-violet-50 p-4">

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-violet-600">
                  Human Review
                </p>

                <p className="mt-1 text-sm font-medium text-slate-800">
                  AI suggestion awaiting approval
                </p>
              </div>

              <div className="rounded-lg bg-violet-700 px-3 py-2 text-xs font-semibold text-white">
                Pending
              </div>

            </div>

          </div>

          {/* Small floating status card */}
          <div className="absolute -bottom-6 -left-6 hidden rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-lg sm:block">

            <div className="flex items-center gap-3">

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100">
                <ShieldCheck size={16} className="text-violet-700" />
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-900">
                  Human controlled
                </p>

                <p className="text-xs text-slate-500">
                  AI never makes the final decision
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}

export default Hero