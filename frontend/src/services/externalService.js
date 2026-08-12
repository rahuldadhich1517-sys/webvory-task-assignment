import { get } from './api.js'

export function fetchExternalUsers() {
  return get('/external/users')
}
