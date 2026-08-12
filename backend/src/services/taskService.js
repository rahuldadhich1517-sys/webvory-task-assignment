import { query } from '../utils/db.js'
import { validateTask } from '../schemas/taskSchema.js'

const validStatuses = ['Pending', 'In Progress', 'Completed', 'Blocked']
const validPriorities = ['Low', 'Medium', 'High', 'Urgent']

function normalizeStatus(value) {
  if (!value) return null
  const normalized = value.toString().trim().toLowerCase()
  return {
    pending: 'Pending',
    in_progress: 'In Progress',
    'in progress': 'In Progress',
    completed: 'Completed',
    blocked: 'Blocked',
  }[normalized] || null
}

function normalizePriority(value) {
  if (!value) return null
  const normalized = value.toString().trim().toLowerCase()
  return {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    urgent: 'Urgent',
  }[normalized] || null
}

export async function getTasks(req, res, next) {
  try {
    const {
      status,
      priority,
      assignee,
      search,
      page = 1,
      limit = 10,
      sortBy = 'created_at',
      order = 'desc',
    } = req.query

    const normalizedStatus = normalizeStatus(status)
    const normalizedPriority = normalizePriority(priority)

    const offset = (Number(page) - 1) * Number(limit)
    const filters = []
    const values = []

    if (normalizedStatus) {
      filters.push(`status = $${values.length + 1}`)
      values.push(normalizedStatus)
    }
    if (normalizedPriority) {
      filters.push(`priority = $${values.length + 1}`)
      values.push(normalizedPriority)
    }
    if (assignee) {
      filters.push(`assigned_to = $${values.length + 1}`)
      values.push(assignee)
    }
    if (search) {
      filters.push(`(title ILIKE $${values.length + 1} OR description ILIKE $${values.length + 1})`)
      values.push(`%${search}%`)
    }

    const whereClause = filters.length ? `WHERE ${filters.join(' AND ')}` : ''
    const orderClause = `ORDER BY ${['title', 'created_at', 'due_date', 'updated_at'].includes(sortBy) ? sortBy : 'created_at'} ${order.toLowerCase() === 'asc' ? 'ASC' : 'DESC'}`

    const countResult = await query(`SELECT COUNT(*) FROM tasks ${whereClause}`, values)
    const total = Number(countResult.rows[0].count)

    const tasksResult = await query(
      `SELECT tasks.*, users.name AS assignee_name FROM tasks LEFT JOIN users ON tasks.assigned_to = users.id ${whereClause} ${orderClause} LIMIT $${values.length + 1} OFFSET $${values.length + 2}`,
      [...values, limit, offset]
    )

    res.json({ data: tasksResult.rows, pagination: { total, page: Number(page), limit: Number(limit) } })
  } catch (error) {
    next(error)
  }
}

export async function getTaskById(req, res, next) {
  try {
    const { id } = req.params
    const taskResult = await query(
      `SELECT tasks.*, users.name AS assignee_name FROM tasks LEFT JOIN users ON tasks.assigned_to = users.id WHERE tasks.id = $1`,
      [id]
    )
    if (!taskResult.rows.length) {
      return res.status(404).json({ error: 'Task not found' })
    }
    const commentsResult = await query(
      `SELECT comments.*, users.name AS user_name FROM comments JOIN users ON comments.user_id = users.id WHERE task_id = $1 ORDER BY comments.created_at ASC`,
      [id]
    )
    res.json({ data: { ...taskResult.rows[0], comments: commentsResult.rows } })
  } catch (error) {
    next(error)
  }
}

export async function createTask(req, res, next) {
  try {
    const task = req.body
    const validation = validateTask(task)
    if (!validation.valid) {
      return res.status(400).json({ error: validation.errors.join(', ') })
    }

    const { title, description, status, priority, assigned_to, due_date } = task
    const userResult = await query('SELECT id FROM users WHERE id = $1', [assigned_to])
    if (!userResult.rows.length) {
      return res.status(400).json({ error: 'Assigned user not found' })
    }

    const result = await query(
      `INSERT INTO tasks (title, description, status, priority, assigned_to, due_date, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW()) RETURNING *`,
      [title, description, status, priority, assigned_to, due_date]
    )
    res.status(201).json({ data: result.rows[0] })
  } catch (error) {
    next(error)
  }
}

export async function updateTask(req, res, next) {
  try {
    const { id } = req.params
    const task = req.body
    const validation = validateTask(task, true)
    if (!validation.valid) {
      return res.status(400).json({ error: validation.errors.join(', ') })
    }

    const existingResult = await query('SELECT * FROM tasks WHERE id = $1', [id])
    if (!existingResult.rows.length) {
      return res.status(404).json({ error: 'Task not found' })
    }

    const { title, description, status, priority, assigned_to, due_date } = task
    if (assigned_to) {
      const userResult = await query('SELECT id FROM users WHERE id = $1', [assigned_to])
      if (!userResult.rows.length) {
        return res.status(400).json({ error: 'Assigned user not found' })
      }
    }
    const result = await query(
      `UPDATE tasks SET title = $1, description = $2, status = $3, priority = $4, assigned_to = $5, due_date = $6, updated_at = NOW() WHERE id = $7 RETURNING *`,
      [title, description, status, priority, assigned_to, due_date, id]
    )
    res.json({ data: result.rows[0] })
  } catch (error) {
    next(error)
  }
}

export async function deleteTask(req, res, next) {
  try {
    const { id } = req.params
    const result = await query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id])
    if (!result.rows.length) {
      return res.status(404).json({ error: 'Task not found' })
    }
    res.json({ data: result.rows[0] })
  } catch (error) {
    next(error)
  }
}
