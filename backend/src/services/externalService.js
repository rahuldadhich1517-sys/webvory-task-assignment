import fetch from 'node-fetch'

export async function getExternalUsers(req, res, next) {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users', { timeout: 5000 })
    if (!response.ok) {
      throw new Error('Failed to fetch external users')
    }
    const users = await response.json()
    const processed = users.slice(0, 6).map(user => ({
      id: user.id,
      name: user.name,
      company: user.company?.name || 'N/A',
      email: user.email,
    }))
    res.json({ data: processed })
  } catch (error) {
    if (error.type === 'request-timeout' || error.code === 'ETIMEDOUT') {
      return res.status(504).json({ error: 'External API request timed out' })
    }
    next(error)
  }
}
