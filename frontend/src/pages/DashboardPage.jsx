import { useEffect, useState } from 'react'
import { fetchDashboard } from '../services/dashboardService.js'
import LoadingState from '../components/LoadingState.jsx'
import ErrorState from '../components/ErrorState.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import PriorityBadge from '../components/PriorityBadge.jsx'

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchDashboard()
      .then(data => setDashboard(data))
      .catch(() => setError('Unable to load dashboard'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingState message="Loading dashboard..." />
  if (error) return <ErrorState message={error} />

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Overview</p>
          <h1 className="text-3xl font-semibold text-slate-900">Dashboard</h1>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {[
          { label: 'Total tasks', value: dashboard.totalTasks },
          { label: 'Pending', value: dashboard.pendingTasks },
          { label: 'In progress', value: dashboard.inProgressTasks },
          { label: 'Completed', value: dashboard.completedTasks },
          { label: 'Overdue', value: dashboard.overdueTasks },
          { label: 'Assigned to you', value: dashboard.assignedToCurrent },
        ].map(item => (
          <div key={item.label} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">{item.label}</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4 pb-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Recent tasks</h2>
            <p className="text-sm text-slate-500">Latest work items across the team.</p>
          </div>
        </div>
        <div className="space-y-3">
          {dashboard.recentTasks.map(task => (
            <div key={task.id} className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium text-slate-900">{task.title}</p>
                <p className="text-sm text-slate-500">Assigned to {task.assignee_name || 'Unassigned'}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={task.status} />
                <span className="text-sm text-slate-600">Due {task.due_date ? new Date(task.due_date).toLocaleDateString() : '—'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
