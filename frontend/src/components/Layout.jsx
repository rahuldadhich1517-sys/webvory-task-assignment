import { NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Tasks', path: '/tasks' },
  { label: 'Team', path: '/team' },
]

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="w-full border-b border-slate-200 bg-white p-4 lg:h-screen lg:w-72 lg:border-r lg:border-b-0">
          <div className="mb-8">
            <div className="text-xl font-semibold text-slate-900">TaskBoard</div>
            <p className="mt-1 text-sm text-slate-600">Internal team task dashboard</p>
          </div>
          <nav className="space-y-2">
            {navItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `block rounded-xl px-4 py-3 text-sm font-medium transition ${isActive ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <main className="flex-1 p-4 lg:p-6">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  )
}
