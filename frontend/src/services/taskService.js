import { get, post, put, del } from './api.js'

export function fetchTasks(params) {
  const query = new URLSearchParams(params).toString()
  return get(`/tasks?${query}`)
}

export function fetchTask(id) {
  return get(`/tasks/${id}`)
}

export function createTask(data) {
  return post('/tasks', data)
}

export function updateTask(id, data) {
  return put(`/tasks/${id}`, data)
}

export function deleteTask(id) {
  return del(`/tasks/${id}`)
}

export function createComment(taskId, body) {
  return post(`/tasks/${taskId}/comments`, body)
}

export function deleteComment(commentId) {
  return del(`/comments/${commentId}`)
}
