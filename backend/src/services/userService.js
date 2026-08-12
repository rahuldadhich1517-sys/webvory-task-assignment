import { query } from '../utils/db.js'

export async function getUsers(req, res, next) {
  try {
    const result = await query('SELECT id, name, email, role, created_at FROM users ORDER BY name')
    res.json({ data: result.rows })
  } catch (error) {
    next(error)
  }
}

export async function createUser(req, res, next) {
  try {
    const { name, email, role } = req.body
    if (!name || !email || !role) {
      return res.status(400).json({ error: 'Name, email, and role are required' })
    }
    const result = await query(
      'INSERT INTO users (name, email, role, created_at) VALUES ($1, $2, $3, NOW()) RETURNING id, name, email, role, created_at',
      [name, email, role]
    )
    res.status(201).json({ data: result.rows[0] })
  } catch (error) {
    next(error)
  }
}
