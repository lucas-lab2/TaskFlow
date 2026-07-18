export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">
            TaskFlow
          </span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/login"
            className="px-4 py-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
          >
            Sign In
          </a>
          <a
            href="/register"
            className="px-5 py-2.5 text-sm font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-600/25 transition-all"
          >
            Get Started
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col flex-1 items-center justify-center px-6 py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-3xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-xs font-semibold text-primary-700 bg-primary-50 rounded-full border border-primary-200">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
            Now in Development
          </div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
            Manage tasks,{" "}
            <span className="bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
              ship faster
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto mb-10">
            TaskFlow helps teams organize, track, and complete their work with
            intuitive project boards, smart priorities, and real-time
            collaboration.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/register"
              className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-white bg-primary-600 rounded-xl hover:bg-primary-700 hover:shadow-xl hover:shadow-primary-600/20 hover:-translate-y-0.5 transition-all"
            >
              Start for Free →
            </a>
            <a
              href="#features"
              className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-all"
            >
              See Features
            </a>
          </div>
        </div>

        {/* Feature Cards */}
        <div
          id="features"
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mt-24 w-full"
        >
          {/* Card 1 */}
          <div className="group p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-4 group-hover:bg-primary-100 transition-colors">
              <span className="text-2xl">📋</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              Project Boards
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Organize work with Kanban boards. Drag and drop tasks between
              columns to track progress visually.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-accent-50 flex items-center justify-center mb-4 group-hover:bg-accent-100 transition-colors">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              Smart Priorities
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Set priorities and deadlines. TaskFlow highlights what&apos;s urgent
              so you always know what to work on next.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-secondary-50 flex items-center justify-center mb-4 group-hover:bg-secondary-100 transition-colors">
              <span className="text-2xl">👥</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              Team Collaboration
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Assign tasks, share updates, and keep everyone aligned — no matter
              where your team is located.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-8 text-center text-sm text-slate-400 border-t border-slate-200">
        <p>
          © 2026 TaskFlow — Built for WDD 430 · Web Full-Stack Development ·
          BYU-Idaho
        </p>
      </footer>
    </div>
  );
}
