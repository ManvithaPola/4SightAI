import {
  FileText,
  Brain,
  UserCheck,
  Users,
  CheckCircle2,
  ArrowDown,
} from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: FileText,
    title: 'Ticket Created',
    description:
      'A customer support ticket enters the system with the customer details, subject, description, and relevant information.',
  },
  {
    number: '02',
    icon: Brain,
    title: 'AI Analysis',
    description:
      'Gemini analyzes the ticket and suggests the category, priority, reasoning, recommended team, and customer response.',
  },
  {
    number: '03',
    icon: UserCheck,
    title: 'Human Review',
    description:
      'The AI suggestion remains pending until a support agent reviews and accepts or overrides the recommendation.',
  },
  {
    number: '04',
    icon: Users,
    title: 'Team Assignment',
    description:
      'The ticket is routed to the appropriate support team and can move through the defined status lifecycle.',
  },
  {
    number: '05',
    icon: CheckCircle2,
    title: 'Resolution',
    description:
      'The support team works on the issue, communicates with the customer, and progresses the ticket toward resolution and closure.',
  },
]

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="border-t border-slate-200 bg-slate-50 py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">

          <p className="text-sm font-semibold uppercase tracking-wider text-violet-700">
            How It Works
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            From customer issue to resolution
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-600">
            4Sight AI combines automated intelligence with human judgment
            to turn incoming support requests into actionable workflows.
          </p>

        </div>

        {/* Desktop workflow */}
        <div className="relative mt-16 hidden lg:block">

          {/* Connecting line */}
          <div className="absolute left-[10%] right-[10%] top-8 h-px bg-violet-200" />

          <div className="relative grid grid-cols-5 gap-6">

            {steps.map((step) => {
              const Icon = step.icon

              return (
                <div
                  key={step.number}
                  className="relative text-center"
                >

                  {/* Icon */}
                  <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-200 bg-white shadow-sm">
                    <Icon
                      size={24}
                      className="text-violet-700"
                    />
                  </div>

                  {/* Number */}
                  <span className="mt-5 block text-xs font-bold tracking-wider text-violet-600">
                    {step.number}
                  </span>

                  <h3 className="mt-2 text-base font-semibold text-slate-900">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {step.description}
                  </p>

                </div>
              )
            })}

          </div>

        </div>

        {/* Mobile / Tablet workflow */}
        <div className="mt-14 lg:hidden">

          <div className="mx-auto max-w-xl">

            {steps.map((step, index) => {
              const Icon = step.icon
              const isLast = index === steps.length - 1

              return (
                <div
                  key={step.number}
                  className="flex gap-5"
                >

                  {/* Timeline */}
                  <div className="flex flex-col items-center">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-violet-200 bg-white">
                      <Icon
                        size={20}
                        className="text-violet-700"
                      />
                    </div>

                    {!isLast && (
                      <div className="my-2 h-full min-h-12 w-px bg-violet-200" />
                    )}

                  </div>

                  {/* Content */}
                  <div className="pb-10">

                    <span className="text-xs font-bold tracking-wider text-violet-600">
                      {step.number}
                    </span>

                    <h3 className="mt-1 text-base font-semibold text-slate-900">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {step.description}
                    </p>

                  </div>

                </div>
              )
            })}

          </div>

        </div>

        {/* Human control callout */}
        <div className="mx-auto mt-16 max-w-4xl rounded-2xl border border-violet-200 bg-white p-6 shadow-sm sm:p-8">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-100">
              <UserCheck
                size={23}
                className="text-violet-700"
              />
            </div>

            <div>
              <p className="text-sm font-semibold text-violet-700">
                Human-in-the-loop by design
              </p>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                AI recommendations are suggestions—not final decisions.
                Support agents remain in control of the final ticket
                category, priority, and assignment.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

export default HowItWorks