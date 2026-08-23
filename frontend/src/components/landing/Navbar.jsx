import { Link } from 'react-router-dom'
import { ArrowRight, Menu, X } from 'lucide-react'
import { useState } from 'react'

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => setMobileOpen(false)}
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

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">

          <a
            href="#features"
            className="text-sm font-medium text-slate-600 transition hover:text-violet-700"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="text-sm font-medium text-slate-600 transition hover:text-violet-700"
          >
            How It Works
          </a>

          <a
            href="#ai-capabilities"
            className="text-sm font-medium text-slate-600 transition hover:text-violet-700"
          >
            AI Capabilities
          </a>

        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">

          <Link
            to="/login"
            className="rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Login
          </Link>

          <Link
            to="/login"
            className="inline-flex items-center gap-2 rounded-lg bg-violet-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-800"
          >
            Get Started
            <ArrowRight size={16} />
          </Link>

        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>

      </nav>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-6 py-5 md:hidden">

          <div className="flex flex-col gap-4">

            <a
              href="#features"
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium text-slate-700"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium text-slate-700"
            >
              How It Works
            </a>

            <a
              href="#ai-capabilities"
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium text-slate-700"
            >
              AI Capabilities
            </a>

            <div className="border-t border-slate-200 pt-4">

              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-4 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                Login
              </Link>

              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-violet-700 px-4 py-3 text-sm font-semibold text-white"
              >
                Get Started
                <ArrowRight size={16} />
              </Link>

            </div>

          </div>

        </div>
      )}

    </header>
  )
}

export default Navbar