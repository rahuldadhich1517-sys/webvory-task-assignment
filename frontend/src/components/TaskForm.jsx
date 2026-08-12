import { useEffect, useState } from 'react'
import Button from './Button.jsx'
import Input from './Input.jsx'
import Select from './Select.jsx'

const statuses = ['Pending', 'In Progress', 'Completed', 'Blocked']
const priorities = ['Low', 'Medium', 'High', 'Urgent']

export default function TaskForm({ task, users, onSubmit, onCancel, loading }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    status: 'Pending',
    priority: 'Medium',
    assigned_to: '',
    due_date: '',
  })

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || '',
        description: task.description || '',
        status: task.status || 'Pending',
        priority: task.priority || 'Medium',
        assigned_to: task.assigned_to || '',
        due_date: task.due_date ? task.due_date.slice(0, 10) : '',
      })
    }
  }, [task])

  const handleChange = event => {
    const { name, value } = event.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = event => {
    event.preventDefault()
    onSubmit({ ...form, assigned_to: Number(form.assigned_to) })
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Input label="Title" name="title" value={form.title} onChange={handleChange} required />
      <label className="block text-sm text-slate-700">
        <span className="font-medium">Description</span>
        <textarea
          className="mt-2 h-24 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-slate-900"
          name="description"
          value={form.description}
          onChange={handleChange}
        />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <Select label="Status" name="status" value={form.status} onChange={handleChange}>
          {statuses.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </Select>
        <Select label="Priority" name="priority" value={form.priority} onChange={handleChange}>
          {priorities.map(priority => (
            <option key={priority} value={priority}>{priority}</option>
          ))}
        </Select>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Select label="Assigned to" name="assigned_to" value={form.assigned_to} onChange={handleChange} required>
          <option value="">Select a user</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </Select>
        <Input label="Due date" type="date" name="due_date" value={form.due_date} onChange={handleChange} />
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save task'}</Button>
        <button type="button" className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  )
}
