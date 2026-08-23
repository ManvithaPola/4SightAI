import {
  Brain,
  Route,
  ShieldCheck,
  Activity,
  RefreshCw,
  MessageSquareText,
} from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'Intelligent Ticket Analysis',
    description:
      'Analyze incoming support tickets with AI to identify the issue category, priority, reasoning, and recommended response.',
  },
  {
    icon: Route,
    title: 'Smart Team Recommendation',
    description:
      'Recommend the support team best suited to handle each issue, helping reduce manual triage and routing effort.',
  },
  {
    icon: ShieldCheck,
    title: 'Human-in-the-Loop',
    description:
      'AI suggestions remain pending until a support agent reviews them. Humans always retain control over the final decision.',
  },
  {
    icon: Activity,
    title: 'Complete Activity Timeline',
    description:
      'Track ticket creation, AI analysis, assignments, status changes, reviews, and other important actions in one timeline.',
  },
  {
    icon: MessageSquareText,
    title: 'AI Response Drafting',
    description:
      'Generate professional customer-facing response suggestions while keeping the final communication under human control.',
  },
  {
    icon: RefreshCw,
    title: 'Resilient AI Processing',
    description:
      'Handle AI provider failures gracefully with rollback, failure logging, and retry support when the provider becomes available.',
  },
]

function Features() {
  return (
    <section
      id="features"
      className="border-t border-slate-200 bg-white py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">

          <p className="text-sm font-semibold uppercase tracking-wider text-violet-700">
            Powerful Support Workflow
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Everything your support team needs
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-600">
            4Sight AI combines intelligent ticket analysis with practical
            support workflows, giving teams the tools to move from incoming
            issues to actionable decisions faster.
          </p>

        </div>

        {/* Feature cards */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {features.map((feature) => {
            const Icon = feature.icon

            return (
              <div
                key={feature.title}
                className="group rounded-2xl border border-slate-200 bg-white p-7 transition duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-100/40"
              >

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100">
                  <Icon
                    size={21}
                    className="text-violet-700"
                  />
                </div>

                <h3 className="mt-6 text-lg font-semibold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {feature.description}
                </p>

              </div>
            )
          })}

        </div>

      </div>
    </section>
  )
}

export default Features