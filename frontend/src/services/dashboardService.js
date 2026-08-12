import { get } from './api.js'

export function fetchDashboard() {
  return get('/dashboard')
}
