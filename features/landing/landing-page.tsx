import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CalendarRange,
  ClipboardList,
  LayoutDashboard,
  LineChart,
  NotebookPen,
  Wallet,
} from "lucide-react";

import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";
import { Button } from "@/components/ui/button";
import { Logo } from "@/features/landing/logo";

const features = [
  { icon: BookOpen, title: "Courses", description: "Keep every class, instructor, room, and credit organized in one place." },
  { icon: ClipboardList, title: "Assignments", description: "Track due dates, priorities, and progress so nothing slips through." },
  { icon: NotebookPen, title: "Notes", description: "Write personal or course-linked notes and pin the ones that matter." },
  { icon: CalendarRange, title: "Schedule", description: "Plan your week from Monday to Sunday with conflict detection." },
  { icon: Wallet, title: "Expenses", description: "See income, spending, and category breakdowns without the spreadsheet." },
  { icon: LineChart, title: "Analytics & Reports", description: "Understand your momentum and export a clean summary any time." },
];

const values = [
  { icon: LayoutDashboard, title: "Stay organized", description: "One calm workspace for courses, assignments, notes, and your weekly schedule — instead of five disconnected tools." },
  { icon: BarChart3, title: "Track your progress", description: "Completion rates and weekly activity show exactly where your momentum is building and where it is slipping." },
  { icon: Wallet, title: "Manage your finances", description: "Log income and expenses in your own currency and see where your student budget actually goes each month." },
];

const testimonials = [
  { quote: "I stopped juggling three apps and a paper planner. Everything for my semester finally lives in one place.", name: "Maria S.", role: "BS Computer Science, 3rd year" },
  { quote: "Seeing my completion rate move week to week is weirdly motivating. I actually keep up with readings now.", name: "Daniel R.", role: "BS Accountancy, 2nd year" },
  { quote: "The expense tracker paid for itself in the first month. I had no idea how much I was spending on coffee.", name: "Grace L.", role: "BS Nursing, 4th year" },
];

const faqs = [
  { question: "Is Student OS free?", answer: "Yes. Student OS is free and open source under the MIT License. You can run it locally or deploy it yourself at no cost beyond optional hosting." },
  { question: "Does it support Google Sign In?", answer: "Yes. You can create an account with an email and password, or continue with Google in one click. Both methods work side by side." },
  { question: "Is my data synced?", answer: "Every course, assignment, note, schedule event, and expense is stored in your own database account and scoped to you alone. Sign in from any device and your workspace is there." },
  { question: "Can I use it on mobile?", answer: "Yes. Student OS is built mobile-first, with a responsive sidebar, touch-friendly schedules, and layouts that hold up from a 390px phone to a wide desktop." },
];

const previews = [
  { label: "Assignments", detail: "Priorities, due dates, and completion in one list.", href: "/assignments" },
  { label: "Weekly schedule", detail: "Monday to Sunday with automatic conflict checks.", href: "/schedule" },
  { label: "Expenses", detail: "Income, spending, and category breakdowns.", href: "/expenses" },
  { label: "Analytics", detail: "Academic, productivity, and finance momentum.", href: "/analytics" },
];

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-slate-500 dark:text-slate-400">{description}</p> : null}
    </div>
  );
}

export function LandingPage({ hasGoogleProvider }: { hasGoogleProvider: boolean }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-slate-50/80 backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-950/80">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3" aria-label="Student OS home">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300 md:flex">
            <a href="#features" className="transition hover:text-slate-900 dark:hover:text-white">Features</a>
            <a href="#why" className="transition hover:text-slate-900 dark:hover:text-white">Why Student OS</a>
            <a href="#faq" className="transition hover:text-slate-900 dark:hover:text-white">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/login" className="rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white">
              Sign in
            </Link>
            <Link href="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:py-24">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-200">
                Built for college students
              </span>
              <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                The all-in-one productivity system for college students.
              </h1>
              <p className="mt-5 text-base leading-7 text-slate-500 dark:text-slate-400 sm:text-lg">
                Courses, assignments, notes, schedule, and finances in one calm workspace — so you spend less time managing your semester and more time living it.
              </p>

              <div className="mt-8 flex-col gap-3 sm:flex-row sm:items-center">
                <Link href="/register" className="sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                {hasGoogleProvider ? <GoogleSignInButton hasGoogleProvider={hasGoogleProvider} /> : null}
              </div>

              <p className="mt-4 text-xs text-slate-400 dark:text-slate-500">Free and open source · MIT License</p>
            </div>

            {/* Dashboard mockup */}
            <div className="relative">
              <div className="rounded-[28px] border-slate-200 bg-white p-3 shadow-[0_30px_60px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-[0_30px_60px_rgba(2,6,23,0.6)]">
                <div className="flex items-center gap-2 px-2 pb-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <span className="ml-3 h-5 flex-1 rounded-full bg-slate-100 dark:bg-slate-800" />
                </div>
                <div className="rounded-[20px] bg-slate-50 p-4 dark:bg-slate-950">
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Courses", value: "5" },
                      { label: "Pending", value: "7" },
                      { label: "Completed", value: "12" },
                    ].map((stat) => (
                      <div key={stat.label} className="rounded-2xl border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">{stat.label}</p>
                        <p className="mt-1.5 text-xl font-semibold text-slate-900 dark:text-white">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 space-y-2">
                    {[
                      { title: "Algorithm worksheet", meta: "CS101 · Due Fri", tone: "bg-rose-400" },
                      { title: "Read Chapter 4", meta: "PSY201 · Due Mon", tone: "bg-amber-400" },
                      { title: "Group project draft", meta: "ENG110 · Due Wed", tone: "bg-blue-400" },
                    ].map((row) => (
                      <div key={row.title} className="flex items-center gap-3 rounded-2xl border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
                        <span className={`h-8 w-1.5 rounded-full ${row.tone}`} />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-slate-900 dark:text-white">{row.title}</p>
                          <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">{row.meta}</p>
                        </div>
                        <span className="hidden h-6 w-16 rounded-full bg-slate-100 dark:bg-slate-800 sm:block" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 grid-cols-2 gap-3">
                    <div className="rounded-2xl border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">This month</p>
                      <p className="mt-1.5 text-lg font-semibold text-slate-900 dark:text-white">₱4,280</p>
                    </div>
                    <div className="rounded-2xl border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">Progress</p>
                      <div className="mt-3 h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                        <div className="h-2 w-[63%] rounded-full bg-blue-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="border-t border-slate-200/70 py-16 dark:border-slate-800/70 lg:py-24">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <SectionHeading
              eyebrow="Features"
              title="Everything your semester needs"
              description="Six focused modules that work together, so nothing falls between them."
            />
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {features.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="group flex h-full flex-col rounded-[24px] border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_18px_35px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 ring-1 ring-blue-500/20 transition-transform duration-200 group-hover:scale-105 dark:text-blue-300">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY */}
        <section id="why" className="border-t border-slate-200/70 py-16 dark:border-slate-800/70 lg:py-24">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <SectionHeading eyebrow="Why Student OS" title="Built around how students actually work" />
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {values.map(({ icon: Icon, title, description }) => (
                <div key={title} className="flex h-full flex-col rounded-[24px] border-slate-200 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SCREENSHOTS */}
        <section className="border-t border-slate-200/70 py-16 dark:border-slate-800/70 lg:py-24">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <SectionHeading
              eyebrow="Screenshots"
              title="A look at the real workspace"
              description="These previews mirror the live application UI — the same cards, colors, and layouts you get after signing in."
            />
            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {previews.map((preview) => (
                <div key={preview.label} className="overflow-hidden rounded-[24px] border-slate-200 bg-white transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-5 py-3.5 dark:border-slate-800">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">{preview.label}</p>
                      <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">{preview.detail}</p>
                    </div>
                    <Link href="/login" className="shrink-0 rounded-full border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
                      Preview
                    </Link>
                  </div>
                  <div className="bg-slate-50 p-4 dark:bg-slate-950">
                    <div className="space-y-2.5">
                      <div className="h-2.5 w-1/3 rounded-full bg-slate-200 dark:bg-slate-800" />
                      <div className="h-9 rounded-2xl border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900" />
                      <div className="h-9 rounded-2xl border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900" />
                      <div className="h-9 w-4/5 rounded-2xl border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="border-t border-slate-200/70 py-16 dark:border-slate-800/70 lg:py-24">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <SectionHeading eyebrow="Testimonials" title="What students say" />
            <p className="mx-auto mt-4 max-w-md text-center text-xs font-medium text-slate-400 dark:text-slate-500">
              Placeholder examples — illustrative quotes, not real customer testimonials.
            </p>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <figure key={testimonial.name} className="flex h-full flex-col rounded-[24px] border-slate-200 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900">
                  <blockquote className="flex-1 text-sm leading-6 text-slate-600 dark:text-slate-300">“{testimonial.quote}”</blockquote>
                  <figcaption className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500/10 text-xs font-semibold text-blue-600 dark:text-blue-300">
                      {testimonial.name.slice(0, 1)}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-slate-900 dark:text-white">{testimonial.name}</span>
                      <span className="block truncate text-xs text-slate-500 dark:text-slate-400">{testimonial.role}</span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-t border-slate-200/70 py-16 dark:border-slate-800/70 lg:py-24">
          <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
            <SectionHeading eyebrow="FAQ" title="Questions, answered" />
            <div className="mt-12 space-y-3">
              {faqs.map((faq) => (
                <details key={faq.question} className="group rounded-[20px] border-slate-200 bg-white px-5 py-4 transition dark:border-slate-800 dark:bg-slate-900">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-medium text-slate-900 marker:content-none dark:text-white">
                    {faq.question}
                    <span className="shrink-0 text-slate-400 transition-transform duration-200 group-open:rotate-45">＋</span>
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-slate-200/70 py-16 dark:border-slate-800/70 lg:py-20">
          <div className="mx-auto w-full max-w-4xl px-4 text-center sm:px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">Start your semester organized.</h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-500 dark:text-slate-400">
              Create a free account and bring your courses, work, and budget into one place.
            </p>
            <div className="mt-8 flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/register" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login" className="w-full sm:w-auto">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">Sign in</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200/70 py-10 dark:border-slate-800/70">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 px-4 sm:px-6 md:flex-row">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Student OS</span>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-slate-500 dark:text-slate-400">
            <a href="https://github.com/Kermighty/student-os" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition hover:text-slate-900 dark:hover:text-white">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
                <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.1.82-.26.82-.58v-2.23c-3.34.72-4.04-1.4-4.04-1.4-.55-1.4-1.34-1.77-1.34-1.77-1.1-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.3 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.4 1.24-3.24-.13-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.4 11.4 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.23 1.92 1.23 3.24 0 4.63-2.8 5.65-5.48 5.95.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58A12 12 0 0 0 12 .5Z" />
              </svg>
              GitHub
            </a>
            <a href="https://github.com/Kermighty/student-os/blob/main/LICENSE" target="_blank" rel="noreferrer" className="transition hover:text-slate-900 dark:hover:text-white">
              MIT License
            </a>
            <span>© 2026 Student OS</span>
          </nav>
        </div>
      </footer>
    </div>
  );
}
