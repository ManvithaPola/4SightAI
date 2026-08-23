import {
  Brain,
  UserCheck,
  Check,
  Pencil,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react'

function HumanInTheLoop() {
  return (
    <section className="border-t border-slate-200 bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">

          <p className="text-sm font-semibold uppercase tracking-wider text-violet-700">
            Human-in-the-Loop
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            AI suggests. Your team decides.
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-600">
            4Sight AI keeps support agents in control. Every AI recommendation
            can be reviewed, accepted, or overridden before it becomes the
            final ticket decision.
          </p>

        </div>

        {/* Main workflow */}
        <div className="mt-16 grid items-center gap-8 lg:grid-cols-5">

          {/* AI Suggestion */}
          <div className="rounded-2xl border border-violet-200 bg-violet-50 p-6 lg:col-span-2">

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
                  <Brain
                    size={20}
                    className="text-violet-700"
                  />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-violet-600">
                    AI Suggestion
                  </p>

                  <p className="text-sm font-semibold text-slate-900">
                    Gemini Analysis
                  </p>
                </div>

              </div>

              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                PENDING
              </span>

            </div>

            <div className="mt-6 space-y-3">

              <div className="rounded-xl border border-violet-100 bg-white p-4">
                <p className="text-xs text-slate-400">
                  Category
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-900">
                  Authentication
                </p>
              </div>

              <div className="rounded-xl border border-violet-100 bg-white p-4">
                <p className="text-xs text-slate-400">
                  AI Priority
                </p>

                <p className="mt-1 text-sm font-semibold text-rose-600">
                  Critical
                </p>
              </div>

              <div className="rounded-xl border border-violet-100 bg-white p-4">
                <p className="text-xs text-slate-400">
                  Recommended Team
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-900">
                  Platform Engineering
                </p>
              </div>

            </div>

          </div>

          {/* Arrow / Review */}
          <div className="flex flex-col items-center justify-center gap-4">

            <div className="hidden h-px w-full bg-slate-200 lg:block" />

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-200 bg-white shadow-sm">
              <UserCheck
                size={25}
                className="text-violet-700"
              />
            </div>

            <p className="text-center text-xs font-semibold uppercase tracking-wider text-violet-700">
              Human Review
            </p>

            <div className="hidden h-px w-full bg-slate-200 lg:block" />

          </div>

          {/* Final Decision */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                <ShieldCheck
                  size={20}
                  className="text-emerald-600"
                />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Final Decision
                </p>

                <p className="text-sm font-semibold text-slate-900">
                  Agent Controlled
                </p>
              </div>

            </div>

            {/* Decision buttons */}
            <div className="mt-6 grid grid-cols-2 gap-3">

              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">

                <div className="flex items-center gap-2">
                  <Check
                    size={17}
                    className="text-emerald-600"
                  />

                  <span className="text-sm font-semibold text-emerald-700">
                    Accept
                  </span>
                </div>

                <p className="mt-2 text-xs leading-5 text-emerald-700/70">
                  Use the AI recommendation.
                </p>

              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">

                <div className="flex items-center gap-2">
                  <Pencil
                    size={17}
                    className="text-slate-600"
                  />

                  <span className="text-sm font-semibold text-slate-700">
                    Override
                  </span>
                </div>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Change the recommendation.
                </p>

              </div>

            </div>

            {/* Final value */}
            <div className="mt-5 rounded-xl bg-slate-950 p-4">

              <p className="text-xs uppercase tracking-wider text-slate-500">
                Final Ticket Priority
              </p>

              <p className="mt-1 text-lg font-bold text-white">
                High
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Final value is controlled by the support agent.
              </p>

            </div>

          </div>

        </div>

        {/* Bottom principle */}
        <div className="mx-auto mt-14 flex max-w-2xl items-center justify-center gap-3 text-center">

          <ShieldCheck
            size={19}
            className="shrink-0 text-violet-700"
          />

          <p className="text-sm font-medium text-slate-600">
            AI accelerates decision-making without taking decision-making
            away from your support team.
          </p>

        </div>

      </div>
    </section>
  )
}

export default HumanInTheLoop