import { Link } from 'react-router-dom'
import {
  Brain,
  Mail,
} from 'lucide-react'

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">

      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-2">

            <Link
              to="/"
              className="inline-flex items-center gap-2"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-700">
                <span className="text-sm font-bold text-white">
                  4
                </span>
              </div>

              <span className="text-xl font-bold tracking-tight text-slate-900">
                4Sight
                <span className="text-violet-700"> AI</span>
              </span>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-6 text-slate-500">
              AI-powered customer support ticket management designed to
              help teams analyze issues faster while keeping humans in
              control of important decisions.
            </p>

            <div className="mt-6 flex items-center gap-3">


              <a
                href="mailto:support@4sightai.com"
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-violet-200 hover:text-violet-700"
              >
                <Mail size={17} />
              </a>

            </div>

          </div>

          {/* Product */}
          <div>

            <h3 className="text-sm font-semibold text-slate-900">
              Product
            </h3>

            <ul className="mt-5 space-y-3">

              <li>
                <a
                  href="#features"
                  className="text-sm text-slate-500 transition hover:text-violet-700"
                >
                  Features
                </a>
              </li>

              <li>
                <a
                  href="#how-it-works"
                  className="text-sm text-slate-500 transition hover:text-violet-700"
                >
                  How It Works
                </a>
              </li>

              <li>
                <a
                  href="#ai-capabilities"
                  className="text-sm text-slate-500 transition hover:text-violet-700"
                >
                  AI Capabilities
                </a>
              </li>

              <li>
                <Link
                  to="/login"
                  className="text-sm text-slate-500 transition hover:text-violet-700"
                >
                  Support Workspace
                </Link>
              </li>

            </ul>

          </div>

          {/* Resources */}
          <div>

            <h3 className="text-sm font-semibold text-slate-900">
              Resources
            </h3>

            <ul className="mt-5 space-y-3">

              <li>
                <a
                  href="#how-it-works"
                  className="text-sm text-slate-500 transition hover:text-violet-700"
                >
                  Workflow
                </a>
              </li>

              <li>
                <a
                  href="#ai-capabilities"
                  className="text-sm text-slate-500 transition hover:text-violet-700"
                >
                  AI Intelligence
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-sm text-slate-500 transition hover:text-violet-700"
                >
                  Documentation
                </a>
              </li>

              <li>
                <a
                  href="mailto:support@4sightai.com"
                  className="text-sm text-slate-500 transition hover:text-violet-700"
                >
                  Contact Support
                </a>
              </li>

            </ul>

          </div>

        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-4 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-xs text-slate-500">
            © 2026 4Sight AI. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Brain
              size={14}
              className="text-violet-700"
            />
            <span>
              AI-powered support, built for humans.
            </span>
          </div>

        </div>

      </div>

    </footer>
  )
}

export default Footer