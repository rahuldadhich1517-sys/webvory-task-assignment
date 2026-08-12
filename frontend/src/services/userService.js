import { get } from './api.js'

export function fetchUsers() {
  return get('/users')
}
