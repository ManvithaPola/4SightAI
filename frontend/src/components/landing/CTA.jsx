import { ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

function CTA() {
  return (
    <section className="border-t border-slate-200 bg-slate-50 py-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-slate-950 px-6 py-16 text-center shadow-xl sm:px-12">

          {/* Background decoration */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-violet-600/20 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-32 -left-24 h-64 w-64 rounded-full bg-violet-600/10 blur-3xl" />

          <div className="relative">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 ring-1 ring-violet-400/20">
              <Sparkles
                size={22}
                className="text-violet-400"
              />
            </div>

            <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-violet-400">
              Smarter Support Starts Here
            </p>

            <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Turn every support ticket into an actionable workflow.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-400">
              Bring AI-powered ticket analysis, intelligent routing, and
              human-controlled decisions together in one support workspace.
            </p>

            <Link
              to="/login"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-violet-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-violet-500"
            >
              Enter Support Workspace
              <ArrowRight size={17} />
            </Link>

          </div>

        </div>
      </div>
    </section>
  )
}

export default CTA