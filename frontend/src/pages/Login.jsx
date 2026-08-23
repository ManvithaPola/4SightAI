import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, ArrowLeft, Loader2 } from 'lucide-react'

import { useAuth } from '../context/AuthContext'

function Login() {

  const navigate = useNavigate()

  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [showPassword, setShowPassword] = useState(false)

  const [loading, setLoading] = useState(false)

  const [error, setError] = useState('')

  const handleSubmit = async (event) => {

    event.preventDefault()

    setError('')

    if (!email || !password) {
      setError('Please enter your email and password.')
      return
    }

    try {

      setLoading(true)

      await login(email, password)

      navigate('/dashboard')

    } catch (error) {

      if (error.response?.status === 401) {
        setError('Invalid email or password.')
      } else {
        setError(
          'Unable to connect to the server. Please try again.'
        )
      }

    } finally {

      setLoading(false)

    }
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Top bar */}
      <header className="border-b border-slate-200 bg-white">

        <div className="mx-auto flex h-20 max-w-7xl items-center px-6 lg:px-8">

          <Link
            to="/"
            className="flex items-center gap-2"
          >

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-700">
              <span className="text-sm font-bold text-white">
                4
              </span>
            </div>

            <span className="text-xl font-bold tracking-tight text-slate-900">
              4Sight
              <span className="text-violet-700">
                {' '}AI
              </span>
            </span>

          </Link>

        </div>

      </header>

      {/* Login */}
      <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-12">

        <div className="w-full max-w-md">

          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-violet-700"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>

          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">

            {/* Heading */}
            <div>

              <p className="text-sm font-semibold uppercase tracking-wider text-violet-700">
                Support Workspace
              </p>

              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
                Welcome back
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Sign in to manage customer tickets and access
                AI-powered support tools.
              </p>

            </div>

            {/* Error */}
            {error && (
              <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >

              {/* Email */}
              <div>

                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                />

              </div>

              {/* Password */}
              <div>

                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Password
                </label>

                <div className="relative">

                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-slate-400 transition hover:text-slate-700"
                    aria-label={
                      showPassword
                        ? 'Hide password'
                        : 'Show password'
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>

              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-violet-700 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-60"
              >

                {loading ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}

              </button>

            </form>

          </div>

          <p className="mt-6 text-center text-xs text-slate-400">
            Secure access to the 4Sight AI support workspace.
          </p>

        </div>

      </main>

    </div>
  )
}

export default Login