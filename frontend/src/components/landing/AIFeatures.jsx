import {
  Brain,
  Tag,
  Gauge,
  Users,
  MessageSquareText,
  CheckCircle2,
} from 'lucide-react'

const aiCapabilities = [
  {
    icon: Tag,
    title: 'Automatic Categorization',
    description:
      'Identify the most relevant support category from the ticket description using structured AI analysis.',
  },
  {
    icon: Gauge,
    title: 'Priority Detection',
    description:
      'Evaluate the impact of an issue and suggest Low, Medium, High, or Critical priority with a clear reason.',
  },
  {
    icon: Users,
    title: 'Team Recommendation',
    description:
      'Recommend the support team most likely to handle the reported issue effectively.',
  },
  {
    icon: MessageSquareText,
    title: 'Response Suggestions',
    description:
      'Generate a professional customer-facing response without claiming that the issue has already been resolved.',
  },
]

function AIFeatures() {
  return (
    <section
      id="ai-capabilities"
      className="border-t border-slate-800 bg-slate-950 py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 ring-1 ring-violet-400/20">
            <Brain
              size={24}
              className="text-violet-400"
            />
          </div>

          <p className="mt-5 text-sm font-semibold uppercase tracking-wider text-violet-400">
            AI Capabilities
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Intelligence that turns tickets into action
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-400">
            Gemini analyzes each ticket and produces structured suggestions
            that support agents can review before making the final decision.
          </p>

        </div>

        {/* Main AI workflow visual */}
        <div className="mt-16 grid gap-8 lg:grid-cols-5">

          {/* Ticket input */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 lg:col-span-2">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800">
                <MessageSquareText
                  size={19}
                  className="text-slate-300"
                />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  Input
                </p>

                <p className="text-sm font-semibold text-white">
                  Customer Ticket
                </p>
              </div>

            </div>

            <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950 p-4">

              <p className="text-sm font-semibold leading-6 text-slate-200">
                Production users unable to login
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Multiple users are receiving authentication errors
                after the latest deployment.
              </p>

            </div>

          </div>

          {/* AI center */}
          <div className="flex items-center justify-center">

            <div className="relative">

              <div className="absolute inset-0 rounded-full bg-violet-600/20 blur-2xl" />

              <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-violet-400/30 bg-violet-500/10">
                <Brain
                  size={38}
                  className="text-violet-400"
                />
              </div>

            </div>

          </div>

          {/* AI output */}
          <div className="rounded-2xl border border-violet-400/20 bg-slate-900 p-6 lg:col-span-2">

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10">
                  <Brain
                    size={19}
                    className="text-violet-400"
                  />
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                    Output
                  </p>

                  <p className="text-sm font-semibold text-white">
                    AI Recommendation
                  </p>
                </div>

              </div>

              <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-300">
                Structured
              </span>

            </div>

            <div className="mt-6 space-y-3">

              <div className="flex items-center justify-between rounded-lg bg-slate-950 px-4 py-3">
                <span className="text-xs text-slate-500">
                  Category
                </span>

                <span className="text-sm font-medium text-slate-200">
                  Authentication
                </span>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-slate-950 px-4 py-3">
                <span className="text-xs text-slate-500">
                  Priority
                </span>

                <span className="text-sm font-semibold text-rose-400">
                  Critical
                </span>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-slate-950 px-4 py-3">
                <span className="text-xs text-slate-500">
                  Team
                </span>

                <span className="text-sm font-medium text-slate-200">
                  Platform Engineering
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* Capability cards */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {aiCapabilities.map((item) => {
            const Icon = item.icon

            return (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-violet-400/30"
              >

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10">
                  <Icon
                    size={19}
                    className="text-violet-400"
                  />
                </div>

                <h3 className="mt-5 text-base font-semibold text-white">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {item.description}
                </p>

              </div>
            )
          })}

        </div>

        {/* Structured output note */}
        <div className="mx-auto mt-10 flex max-w-3xl items-start gap-3 rounded-xl border border-slate-800 bg-slate-900 p-5">

          <CheckCircle2
            size={19}
            className="mt-0.5 shrink-0 text-violet-400"
          />

          <p className="text-sm leading-6 text-slate-400">
            AI responses are validated against the application's expected
            structure before they become suggestions. This keeps the AI
            helpful while maintaining predictable application behavior.
          </p>

        </div>

      </div>
    </section>
  )
}

export default AIFeatures