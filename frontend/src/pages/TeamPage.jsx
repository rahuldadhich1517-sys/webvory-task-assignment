import { useEffect, useState } from 'react'
import { fetchUsers } from '../services/userService.js'
import { fetchExternalUsers } from '../services/externalService.js'
import LoadingState from '../components/LoadingState.jsx'
import ErrorState from '../components/ErrorState.jsx'
import EmptyState from '../components/EmptyState.jsx'

export default function TeamPage() {
  const [users, setUsers] = useState([])
  const [external, setExternal] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    Promise.all([fetchUsers(), fetchExternalUsers()])
      .then(([teamUsers, externalUsers]) => {
        setUsers(teamUsers)
        setExternal(externalUsers)
      })
      .catch(() => setError('Unable to load team data'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingState message="Loading team..." />
  if (error) return <ErrorState message={error} />

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Team</p>
        <h1 className="text-3xl font-semibold text-slate-900">Team and external resources</h1>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Internal users</h2>
          <p className="mt-2 text-sm text-slate-500">Team members seeded in the dashboard.</p>
          <div className="mt-5 space-y-3">
            {users.map(user => (
              <div key={user.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-medium text-slate-900">{user.name}</p>
                <p className="text-sm text-slate-600">{user.role}</p>
                <p className="text-sm text-slate-500">{user.email}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">External users</h2>
          <p className="mt-2 text-sm text-slate-500">Data sourced from JSONPlaceholder.</p>
          <div className="mt-5 space-y-3">
            {external.length === 0 && <EmptyState message="No external users available." />}
            {external.map(user => (
              <div key={user.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-medium text-slate-900">{user.name}</p>
                <p className="text-sm text-slate-600">{user.company}</p>
                <p className="text-sm text-slate-500">{user.email}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
