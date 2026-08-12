import { useEffect, useMemo, useState } from 'react'
import { fetchTasks, createTask, updateTask, deleteTask } from '../services/taskService.js'
import { fetchUsers } from '../services/userService.js'
import Button from '../components/Button.jsx'
import TaskTable from '../components/TaskTable.jsx'
import TaskForm from '../components/TaskForm.jsx'
import Modal from '../components/Modal.jsx'
import ConfirmModal from '../components/ConfirmModal.jsx'
import LoadingState from '../components/LoadingState.jsx'
import EmptyState from '../components/EmptyState.jsx'
import ErrorState from '../components/ErrorState.jsx'
import Pagination from '../components/Pagination.jsx'

const statusOptions = ['', 'Pending', 'In Progress', 'Completed', 'Blocked']
const priorityOptions = ['', 'Low', 'Medium', 'High', 'Urgent']

export default function TasksPage() {
  const [tasks, setTasks] = useState([])
  const [users, setUsers] = useState([])
  const [filter, setFilter] = useState({ search: '', status: '', priority: '', assignee: '', sortBy: 'created_at', order: 'desc', page: 1, limit: 6 })
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 6 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [taskToEdit, setTaskToEdit] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [modalLoading, setModalLoading] = useState(false)

  const fetchData = () => {
    setLoading(true)
    setError('')
    fetchTasks(filter)
      .then(data => {
        setTasks(data.data)
        setPagination(data.pagination)
      })
      .catch(() => setError('Unable to load tasks'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchUsers().then(setUsers).catch(() => {})
    fetchData()
  }, [])

  useEffect(() => {
    fetchData()
  }, [filter.status, filter.priority, filter.assignee, filter.search, filter.page, filter.sortBy, filter.order])

  const openCreate = () => {
    setTaskToEdit(null)
    setModalOpen(true)
  }

  const handleEdit = task => {
    setTaskToEdit(task)
    setModalOpen(true)
  }

  const handleDelete = task => {
    setDeleteTarget(task)
  }

  const performDelete = () => {
    if (!deleteTarget) return
    setLoading(true)
    deleteTask(deleteTarget.id)
      .then(() => {
        setDeleteTarget(null)
        fetchData()
      })
      .catch(() => setError('Unable to delete task'))
      .finally(() => setLoading(false))
  }

  const handleSubmit = data => {
    setModalLoading(true)
    const action = taskToEdit ? updateTask(taskToEdit.id, data) : createTask(data)
    action
      .then(() => {
        setModalOpen(false)
        setTaskToEdit(null)
        fetchData()
      })
      .catch(() => setError('Unable to save task'))
      .finally(() => setModalLoading(false))
  }

  const filters = useMemo(() => [
    { label: 'Status', name: 'status', options: statusOptions },
    { label: 'Priority', name: 'priority', options: priorityOptions },
  ], [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Tasks</p>
          <h1 className="text-3xl font-semibold text-slate-900">Task management</h1>
        </div>
        <Button onClick={openCreate}>Create task</Button>
      </div>

      <div className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-[1fr_auto]">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <label className="text-sm text-slate-700">
            <span className="font-medium">Search</span>
            <input
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-900"
              value={filter.search}
              onChange={e => setFilter(prev => ({ ...prev, search: e.target.value, page: 1 }))}
              placeholder="Search tasks"
            />
          </label>
          {filters.map(field => (
            <label key={field.name} className="text-sm text-slate-700">
              <span className="font-medium">{field.label}</span>
              <select
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-900"
                value={filter[field.name]}
                onChange={e => setFilter(prev => ({ ...prev, [field.name]: e.target.value, page: 1 }))}
              >
                {field.options.map(option => (
                  <option key={option} value={option}>{option || 'All'}</option>
                ))}
              </select>
            </label>
          ))}
          <label className="text-sm text-slate-700">
            <span className="font-medium">Assignee</span>
            <select
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-900"
              value={filter.assignee}
              onChange={e => setFilter(prev => ({ ...prev, assignee: e.target.value, page: 1 }))}
            >
              <option value="">All</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="flex flex-col gap-3 sm:items-end">
          <label className="text-sm text-slate-700">
            <span className="font-medium">Sort by</span>
            <select
              className="mt-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-900"
              value={filter.sortBy}
              onChange={e => setFilter(prev => ({ ...prev, sortBy: e.target.value }))}
            >
              <option value="created_at">Created</option>
              <option value="due_date">Due date</option>
              <option value="title">Title</option>
            </select>
          </label>
          <label className="text-sm text-slate-700">
            <span className="font-medium">Order</span>
            <select
              className="mt-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-900"
              value={filter.order}
              onChange={e => setFilter(prev => ({ ...prev, order: e.target.value }))}
            >
              <option value="desc">Newest</option>
              <option value="asc">Oldest</option>
            </select>
          </label>
        </div>
      </div>

      {loading && <LoadingState message="Loading tasks..." />}
      {error && <ErrorState message={error} />}
      {!loading && !error && !tasks.length && <EmptyState message="No tasks found." />}
      {!loading && !error && tasks.length > 0 && (
        <TaskTable tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      {!loading && !error && tasks.length > 0 && (
        <Pagination
          page={filter.page}
          total={pagination.total}
          limit={filter.limit}
          onPageChange={page => setFilter(prev => ({ ...prev, page }))}
        />
      )}

      <Modal open={modalOpen} title={taskToEdit ? 'Edit task' : 'Create task'} onClose={() => setModalOpen(false)}>
        <TaskForm
          task={taskToEdit}
          users={users}
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
          loading={modalLoading}
        />
      </Modal>

      <ConfirmModal
        open={Boolean(deleteTarget)}
        title="Delete task"
        message={`Are you sure you want to delete "${deleteTarget?.title}"?`}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={performDelete}
      />
    </div>
  )
}
