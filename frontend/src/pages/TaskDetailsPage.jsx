import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchTask, updateTask, deleteTask, createComment, deleteComment } from '../services/taskService.js'
import { fetchUsers } from '../services/userService.js'
import LoadingState from '../components/LoadingState.jsx'
import ErrorState from '../components/ErrorState.jsx'
import EmptyState from '../components/EmptyState.jsx'
import Modal from '../components/Modal.jsx'
import TaskForm from '../components/TaskForm.jsx'
import ConfirmModal from '../components/ConfirmModal.jsx'
import Button from '../components/Button.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import PriorityBadge from '../components/PriorityBadge.jsx'

export default function TaskDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [task, setTask] = useState(null)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [commentText, setCommentText] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)

  const loadTask = () => {
    setLoading(true)
    setError('')
    fetchTask(id)
      .then(data => setTask(data))
      .catch(() => setError('Unable to load task'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchUsers().then(setUsers).catch(() => {})
    loadTask()
  }, [id])

  const handleSave = data => {
    setActionLoading(true)
    updateTask(id, data)
      .then(() => {
        setModalOpen(false)
        loadTask()
      })
      .catch(() => setError('Unable to save task'))
      .finally(() => setActionLoading(false))
  }

  const handleDelete = () => {
    setActionLoading(true)
    deleteTask(id)
      .then(() => navigate('/tasks'))
      .catch(() => setError('Unable to delete task'))
      .finally(() => setActionLoading(false))
  }

  const handleAddComment = event => {
    event.preventDefault()
    if (!commentText.trim()) return
    setActionLoading(true)
    createComment(id, { comment: commentText, user_id: 1 })
      .then(() => {
        setCommentText('')
        loadTask()
      })
      .catch(() => setError('Unable to add comment'))
      .finally(() => setActionLoading(false))
  }

  const handleRemoveComment = commentId => {
    setActionLoading(true)
    deleteComment(commentId)
      .then(() => loadTask())
      .catch(() => setError('Unable to delete comment'))
      .finally(() => setActionLoading(false))
  }

  if (loading) return <LoadingState message="Loading task details..." />
  if (error) return <ErrorState message={error} />
  if (!task) return <EmptyState message="Task not found." />

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Task details</p>
          <h1 className="text-3xl font-semibold text-slate-900">{task.title}</h1>
          <p className="mt-2 text-sm text-slate-600">Assigned to {task.assignee_name || 'Unassigned'}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => setModalOpen(true)}>Edit</Button>
          <button className="rounded-lg border border-rose-300 bg-rose-50 px-4 py-2 text-sm font-medium text-rose-700 hover:bg-rose-100" onClick={() => setDeleteOpen(true)}>
            Delete
          </button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-slate-500">Status</p>
              <StatusBadge status={task.status} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Priority</p>
              <PriorityBadge priority={task.priority} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Due date</p>
              <p className="mt-1 text-slate-900">{task.due_date ? new Date(task.due_date).toLocaleDateString() : 'Not set'}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Last updated</p>
              <p className="mt-1 text-slate-900">{task.updated_at ? new Date(task.updated_at).toLocaleDateString() : '—'}</p>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-sm text-slate-500">Description</p>
            <p className="mt-3 whitespace-pre-line text-slate-700">{task.description || 'No description provided.'}</p>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Assigned user</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">{task.assignee_name || 'Unassigned'}</p>
            <p className="mt-1 text-sm text-slate-600">Current user tasks are shown in dashboard summary.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Task notes</p>
            <p className="mt-2 text-sm text-slate-700">{task.comments.length} comments</p>
          </div>
        </aside>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4 pb-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Comments</h2>
            <p className="text-sm text-slate-500">Add notes or update the task discussion.</p>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleAddComment}>
          <textarea
            className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-slate-900"
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            placeholder="Write a new comment"
          />
          <div className="flex justify-end gap-3">
            <button type="submit" className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-60" disabled={actionLoading}>
              Add comment
            </button>
          </div>
        </form>

        {task.comments.length === 0 ? (
          <EmptyState message="No comments yet." />
        ) : (
          <div className="space-y-3 pt-4">
            {task.comments.map(comment => (
              <div key={comment.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium text-slate-900">{comment.user_name}</p>
                    <p className="text-xs text-slate-500">{new Date(comment.created_at).toLocaleString()}</p>
                  </div>
                  <button className="rounded-lg border border-slate-300 bg-white px-3 py-1 text-xs text-slate-700 hover:bg-slate-100" onClick={() => handleRemoveComment(comment.id)}>
                    Delete
                  </button>
                </div>
                <p className="mt-3 text-slate-700">{comment.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal open={modalOpen} title="Edit task" onClose={() => setModalOpen(false)}>
        <TaskForm task={task} users={users} onSubmit={handleSave} onCancel={() => setModalOpen(false)} loading={actionLoading} />
      </Modal>

      <ConfirmModal
        open={deleteOpen}
        title="Delete task"
        message="Are you sure you want to delete this task?"
        onCancel={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  )
}
