import { query } from '../utils/db.js'

const currentUserId = 1

export async function getDashboard(req, res, next) {
  try {
    const totals = await query('SELECT COUNT(*) FROM tasks')
    const pending = await query("SELECT COUNT(*) FROM tasks WHERE status = 'Pending'")
    const inProgress = await query("SELECT COUNT(*) FROM tasks WHERE status = 'In Progress'")
    const completed = await query("SELECT COUNT(*) FROM tasks WHERE status = 'Completed'")
    const overdue = await query("SELECT COUNT(*) FROM tasks WHERE due_date < NOW() AND status != 'Completed'")
    const assignedToCurrent = await query('SELECT COUNT(*) FROM tasks WHERE assigned_to = $1', [currentUserId])
    const recent = await query(
      `SELECT tasks.id, tasks.title, tasks.status, tasks.due_date, users.name AS assignee_name
       FROM tasks LEFT JOIN users ON tasks.assigned_to = users.id
       ORDER BY tasks.created_at DESC LIMIT 5`
    )

    res.json({
      data: {
        totalTasks: Number(totals.rows[0].count),
        pendingTasks: Number(pending.rows[0].count),
        inProgressTasks: Number(inProgress.rows[0].count),
        completedTasks: Number(completed.rows[0].count),
        overdueTasks: Number(overdue.rows[0].count),
        assignedToCurrent: Number(assignedToCurrent.rows[0].count),
        recentTasks: recent.rows,
      },
    })
  } catch (error) {
    next(error)
  }
}
