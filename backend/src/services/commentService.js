import { query } from '../utils/db.js'

export async function getCommentsForTask(req, res, next) {
  try {
    const { id } = req.params
    const result = await query(
      `SELECT comments.id, comments.comment, comments.created_at, comments.user_id, users.name AS user_name
       FROM comments JOIN users ON comments.user_id = users.id WHERE comments.task_id = $1 ORDER BY comments.created_at ASC`,
      [id]
    )
    res.json({ data: result.rows })
  } catch (error) {
    next(error)
  }
}

export async function createComment(req, res, next) {
  try {
    const { id } = req.params
    const { comment, user_id } = req.body
    if (!comment || !user_id) {
      return res.status(400).json({ error: 'Comment and user_id are required' })
    }
    const taskResult = await query('SELECT id FROM tasks WHERE id = $1', [id])
    if (!taskResult.rows.length) {
      return res.status(404).json({ error: 'Task not found' })
    }
    const userResult = await query('SELECT id FROM users WHERE id = $1', [user_id])
    if (!userResult.rows.length) {
      return res.status(404).json({ error: 'User not found' })
    }
    const result = await query(
      'INSERT INTO comments (task_id, user_id, comment, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *',
      [id, user_id, comment]
    )
    res.status(201).json({ data: result.rows[0] })
  } catch (error) {
    next(error)
  }
}

export async function deleteComment(req, res, next) {
  try {
    const { id } = req.params
    const result = await query('DELETE FROM comments WHERE id = $1 RETURNING *', [id])
    if (!result.rows.length) {
      return res.status(404).json({ error: 'Comment not found' })
    }
    res.json({ data: result.rows[0] })
  } catch (error) {
    next(error)
  }
}
