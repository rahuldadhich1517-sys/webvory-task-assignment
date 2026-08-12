import { Link } from 'react-router-dom'
import StatusBadge from './StatusBadge.jsx'
import PriorityBadge from './PriorityBadge.jsx'

export default function TaskTable({ tasks, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full border-collapse text-left text-sm">
        <thead className="bg-slate-50 text-slate-900">
          <tr>
            <th className="px-4 py-3 font-medium">Task</th>
            <th className="px-4 py-3 font-medium">Assigned</th>
            <th className="px-4 py-3 font-medium">Priority</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Due date</th>
            <th className="px-4 py-3 font-medium">Updated</th>
            <th className="px-4 py-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {tasks.map(task => (
            <tr key={task.id} className="hover:bg-slate-50">
              <td className="px-4 py-4">
                <Link to={`/tasks/${task.id}`} className="font-medium text-slate-900 hover:text-slate-600">
                  {task.title}
                </Link>
                <p className="text-xs text-slate-500">Created {new Date(task.created_at).toLocaleDateString()}</p>
              </td>
              <td className="px-4 py-4 text-slate-700">{task.assignee_name || 'Unassigned'}</td>
              <td className="px-4 py-4"><PriorityBadge priority={task.priority} /></td>
              <td className="px-4 py-4"><StatusBadge status={task.status} /></td>
              <td className="px-4 py-4 text-slate-700">{task.due_date ? new Date(task.due_date).toLocaleDateString() : '—'}</td>
              <td className="px-4 py-4 text-slate-700">{task.updated_at ? new Date(task.updated_at).toLocaleDateString() : '—'}</td>
              <td className="px-4 py-4 space-x-2 text-right">
                <button className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200" onClick={() => onEdit(task)}>
                  Edit
                </button>
                <button className="rounded-lg bg-rose-100 px-3 py-1 text-xs font-medium text-rose-700 hover:bg-rose-200" onClick={() => onDelete(task)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
